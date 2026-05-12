from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import json
import tempfile
import uuid
from pathlib import Path
from typing import List, Dict, Any, Optional
import requests
from datetime import datetime
import asyncio
from dataclasses import dataclass, asdict
import re

# Import the agentic-doc library
try:
    from agentic_doc.parse import parse_documents
    from agentic_doc.config import VisualizationConfig, ChunkType
except ImportError:
    raise ImportError("Please install the agentic-doc library: pip install agentic-doc")

from dotenv import load_dotenv
load_dotenv()

# Optional LLM integrations
OPENAI_AVAILABLE = False

try:
    import openai
    OPENAI_AVAILABLE = True
except ImportError:
    pass

app = FastAPI(title="AI Document Intelligence API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (replace with database in production)
documents_store = {}
chat_history_store = {}

@dataclass
class ChatMessage:
    question: str
    answer: str
    timestamp: str
    confidence: float = 0.0
    sources: List[str] = None
    chunk_references: List[int] = None

    def __post_init__(self):
        if self.sources is None:
            self.sources = []
        if self.chunk_references is None:
            self.chunk_references = []

def check_api_keys():
    """Check API key availability"""
    landingai_key = os.getenv('VISION_AGENT_API_KEY')
    openai_key = os.getenv('OPENAI_API_KEY')
    
    return {
        'landingai': bool(landingai_key),
        'openai': OPENAI_AVAILABLE and bool(openai_key)
    }

def analyze_document_content(parsed_doc) -> Dict[str, Any]:
    """Analyze document content for enhanced insights"""
    chunks = parsed_doc.chunks
    
    analysis = {
        'total_chunks': len(chunks),
        'chunk_types': {},
        'total_text_length': 0,
        'avg_chunk_length': 0,
        'tables_count': 0,
        'images_count': 0,
        'complexity_score': 0
    }
    
    text_lengths = []
    
    for chunk in chunks:
        chunk_type = getattr(chunk, 'chunk_type', 'unknown')
        chunk_text = getattr(chunk, 'text', '')
        
        analysis['chunk_types'][chunk_type] = analysis['chunk_types'].get(chunk_type, 0) + 1
        analysis['total_text_length'] += len(chunk_text)
        text_lengths.append(len(chunk_text))
        
        if chunk_type == 'table':
            analysis['tables_count'] += 1
        elif chunk_type in ['image', 'figure']:
            analysis['images_count'] += 1
    
    if text_lengths:
        analysis['avg_chunk_length'] = sum(text_lengths) / len(text_lengths)
    
    # Simple complexity scoring
    analysis['complexity_score'] = min(100, 
        (analysis['tables_count'] * 10) + 
        (analysis['images_count'] * 5) + 
        (len(analysis['chunk_types']) * 5)
    )
    
    return analysis

def create_semantic_chunks(parsed_doc) -> List[Dict[str, Any]]:
    """Create semantic chunks for better search and retrieval"""
    semantic_chunks = []
    
    for i, chunk in enumerate(parsed_doc.chunks):
        chunk_text = getattr(chunk, 'text', '')
        chunk_type = getattr(chunk, 'chunk_type', 'unknown')
        
        if len(chunk_text.strip()) > 10:  # Only meaningful chunks
            semantic_chunk = {
                'id': i,
                'text': chunk_text,
                'type': chunk_type,
                'length': len(chunk_text),
                'keywords': extract_keywords(chunk_text),
                'summary': summarize_chunk(chunk_text) if len(chunk_text) > 200 else chunk_text[:100]
            }
            semantic_chunks.append(semantic_chunk)
    
    return semantic_chunks

def extract_keywords(text: str) -> List[List]:
    """Extract keywords from text"""
    words = re.findall(r'\b[A-Za-z]{4,}\b', text.lower())
    word_freq = {}
    for word in words:
        if word not in ['this', 'that', 'with', 'have', 'will', 'from', 'they', 'been', 'were', 'said']:
            word_freq[word] = word_freq.get(word, 0) + 1
    
    # Return top keywords as list of [word, frequency] pairs
    return sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:5]

def summarize_chunk(text: str) -> str:
    """Simple text summarization"""
    sentences = text.split('. ')
    if len(sentences) <= 2:
        return text
    return '. '.join(sentences[:2]) + '.'

def generate_smart_prompts(document_content: str, chunks: List[Any]) -> Dict[str, List[str]]:
    """Generate intelligent prompts based on document analysis"""
    content_lower = document_content.lower()
    
    # Analyze content types
    has_tables = any('table' in getattr(chunk, 'chunk_type', '').lower() for chunk in chunks)
    has_figures = any('figure' in getattr(chunk, 'chunk_type', '').lower() for chunk in chunks)
    has_financial = any(term in content_lower for term in ['revenue', 'profit', 'cost', 'budget', 'financial'])
    has_research = any(term in content_lower for term in ['research', 'study', 'analysis', 'methodology', 'results'])
    has_legal = any(term in content_lower for term in ['policy', 'regulation', 'compliance', 'legal', 'contract'])
    has_technical = any(term in content_lower for term in ['system', 'process', 'method', 'technology', 'implementation'])
    
    prompts = {
        'General': [
            "What is the main purpose of this document?",
            "Can you provide a comprehensive summary?",
            "What are the key takeaways?",
            "Who is the target audience for this document?"
        ],
        'Analysis': [
            "What are the most important findings?",
            "What conclusions can be drawn from this document?",
            "Are there any risks or challenges mentioned?",
            "What recommendations are provided?"
        ]
    }
    
    if has_tables:
        prompts['Data & Tables'] = [
            "What data is presented in the tables?",
            "What trends are visible in the numerical data?",
            "Can you explain the key statistics?",
            "How do the different data points relate to each other?"
        ]
    
    if has_figures:
        prompts['Figures & Charts'] = [
            "What do the figures and charts show?",
            "What insights can be gained from the visual elements?",
            "How do the images support the text content?"
        ]
    
    if has_financial:
        prompts['Financial'] = [
            "What are the key financial metrics?",
            "What is the financial performance or outlook?",
            "Are there any budget considerations or cost analyses?",
            "What are the revenue and expense patterns?"
        ]
    
    if has_research:
        prompts['Research'] = [
            "What research methodology was used?",
            "What are the main research findings?",
            "What are the limitations of this study?",
            "How reliable are the research conclusions?"
        ]
    
    if has_legal:
        prompts['Legal & Policy'] = [
            "What are the key policy recommendations?",
            "What compliance requirements are mentioned?",
            "Are there any legal implications discussed?",
            "What regulatory considerations are addressed?"
        ]
    
    if has_technical:
        prompts['Technical'] = [
            "What technical processes are described?",
            "How does the system or method work?",
            "What are the technical requirements?",
            "Are there any implementation challenges?"
        ]
    
    return prompts

def chat_with_document_basic(question: str, document_content: str, semantic_chunks: List[Dict]) -> ChatMessage:
    """Basic document Q&A using semantic matching, now also searches raw extracted text if no chunk matches"""
    question_lower = question.lower()
    question_words = set(question_lower.split())

    # Find relevant chunks
    chunk_scores = []
    for chunk in semantic_chunks:
        chunk_text_lower = chunk['text'].lower()
        chunk_words = set(chunk_text_lower.split())
        overlap_score = len(question_words.intersection(chunk_words))
        keyword_score = sum(1 for keyword, freq in chunk['keywords'] if keyword in question_lower)
        total_score = overlap_score + (keyword_score * 2)
        if total_score > 0:
            chunk_scores.append((chunk, total_score))

    # Sort by relevance
    chunk_scores.sort(key=lambda x: x[1], reverse=True)
    relevant_chunks = [chunk for chunk, score in chunk_scores[:3]]

    if relevant_chunks:
        response_parts = []
        sources = []
        chunk_refs = []
        response_parts.append("Based on the document content, here's what I found:\n")
        for i, chunk in enumerate(relevant_chunks, 1):
            chunk_type = chunk['type'].replace('_', ' ').title()
            response_parts.append(f"**{chunk_type} Section {i}:**")
            response_parts.append(chunk['summary'] if chunk['summary'] else chunk['text'][:300] + "...")
            response_parts.append("")
            sources.append(f"{chunk_type} (Chunk {chunk['id']})")
            chunk_refs.append(chunk['id'])
        response_parts.append("\U0001F4A1 *This response is based on semantic analysis of document content.*")
        confidence = min(0.9, len(relevant_chunks) * 0.3)
        return ChatMessage(
            question=question,
            answer="\n".join(response_parts),
            timestamp=datetime.now().strftime("%H:%M:%S"),
            confidence=confidence,
            sources=sources,
            chunk_references=chunk_refs
        )
    else:
        # If no relevant semantic chunk, search the raw extracted text for relevant sentences
        # Find sentences containing any question word
        import re
        sentences = re.split(r'(?<=[.!?])\s+', document_content)
        relevant_sentences = [s for s in sentences if any(qw in s.lower() for qw in question_words)]
        if relevant_sentences:
            answer = "Here are some relevant excerpts from the document:\n\n" + "\n".join(relevant_sentences[:5])
            answer += "\n\n*These are direct excerpts from the raw extracted document text.*"
            return ChatMessage(
                question=question,
                answer=answer,
                timestamp=datetime.now().strftime("%H:%M:%S"),
                confidence=0.5,
                sources=["Raw Extracted Text"],
                chunk_references=[]
            )
        else:
            return ChatMessage(
                question=question,
                answer="I couldn't find specific information related to your question in the document. Try rephrasing your question or asking about different aspects of the document content.",
                timestamp=datetime.now().strftime("%H:%M:%S"),
                confidence=0.1,
                sources=[],
                chunk_references=[]
            )

def chat_with_document_openai(question: str, document_content: str, semantic_chunks: List[Dict]) -> ChatMessage:
    """Advanced document Q&A using OpenAI API, always includes full raw extracted text in prompt context"""
    try:
        client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        question_lower = question.lower()
        question_words = set(question_lower.split())
        chunk_scores = []
        for chunk in semantic_chunks:
            chunk_text_lower = chunk['text'].lower()
            chunk_words = set(chunk_text_lower.split())
            overlap_score = len(question_words.intersection(chunk_words))
            keyword_score = sum(1 for keyword, freq in chunk['keywords'] if keyword in question_lower)
            length_bonus = min(len(chunk['text']) / 1000, 1)
            total_score = overlap_score + (keyword_score * 2) + length_bonus
            if total_score > 0:
                chunk_scores.append((chunk, total_score))
        chunk_scores.sort(key=lambda x: x[1], reverse=True)
        top_chunks = [chunk for chunk, score in chunk_scores[:5]]
        # Always include the full raw extracted text in the context
        context_parts = ["RAW EXTRACTED DOCUMENT TEXT:\n" + (document_content[:3000] + "..." if len(document_content) > 3000 else document_content)]
        if top_chunks:
            for i, chunk in enumerate(top_chunks, 1):
                chunk_preview = chunk['text'][:800] + "..." if len(chunk['text']) > 800 else chunk['text']
                context_parts.append(f"Section {i} ({chunk['type']}):\n{chunk_preview}")
        else:
            for i, chunk in enumerate(semantic_chunks[:3], 1):
                chunk_preview = chunk['text'][:800] + "..." if len(chunk['text']) > 800 else chunk['text']
                context_parts.append(f"Section {i} ({chunk['type']}):\n{chunk_preview}")
        context = "\n\n".join(context_parts)
        system_prompt = f"""You are an AI assistant specialized in analyzing and answering questions about documents.\n\nDOCUMENT CONTEXT:\n{context}\n\nINSTRUCTIONS:\n1. Answer the user's question based ONLY on the provided document context.\n2. Use Markdown formatting for your answer: use numbered and bulleted lists, bold (**text**) for headings, and italics (*text*) for emphasis.\n3. Do NOT use asterisks for formatting unless they are part of Markdown.\n4. If the answer is not in the context, clearly state that the information is not available in the document.\n5. Be specific and cite relevant details from the document when possible.\n6. If you find relevant information, quote or reference specific parts of the document.\n7. Keep your answer concise but comprehensive.\n8. If the question asks for specific numbers, dates, or facts, look carefully in the context for exact information.\n\nRemember: Only use information from the provided document context. Do not make assumptions or add external knowledge. Format your answer for best readability in a modern chat UI."""
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question}
            ],
            temperature=0.1,
            max_tokens=1000
        )
        answer = response.choices[0].message.content
        confidence = 0.9 if top_chunks else 0.3
        if top_chunks:
            avg_score = sum(score for _, score in chunk_scores[:5]) / min(5, len(chunk_scores))
            confidence = min(0.95, 0.6 + (avg_score * 0.1))
        sources = []
        chunk_refs = []
        for chunk in top_chunks:
            sources.append(f"{chunk['type'].replace('_', ' ').title()} (Chunk {chunk['id']})")
            chunk_refs.append(chunk['id'])
        return ChatMessage(
            question=question,
            answer=answer,
            timestamp=datetime.now().strftime("%H:%M:%S"),
            confidence=confidence,
            sources=sources or ["OpenAI Analysis"],
            chunk_references=chunk_refs
        )
    except Exception as e:
        return ChatMessage(
            question=question,
            answer=f"I apologize, but I encountered an error while processing your question: {str(e)}. Please try again.",
            timestamp=datetime.now().strftime("%H:%M:%S"),
            confidence=0.0,
            sources=[],
            chunk_references=[]
        )

# API Routes

@app.get("/")
async def root():
    return {"message": "AI Document Intelligence API", "version": "1.0.0"}

@app.get("/api/status")
async def get_api_status():
    """Get API key status"""
    return check_api_keys()

@app.post("/api/upload")
async def upload_document(
    file: UploadFile = File(...),
    include_marginalia: bool = Form(True),
    include_metadata: bool = Form(True),
    save_groundings: bool = Form(False)
):
    """Upload and process a document"""
    try:
        # Save uploaded file
        suffix = Path(file.filename).suffix
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            file_path = tmp_file.name
        
        # Create temporary directory for groundings
        grounding_dir = tempfile.mkdtemp() if save_groundings else None
        
        # Parse the document
        results = parse_documents(
            [file_path],
            include_marginalia=include_marginalia,
            include_metadata_in_markdown=include_metadata,
            grounding_save_dir=grounding_dir
        )
        
        parsed_doc = results[0]
        
        # Enhanced processing
        document_id = str(uuid.uuid4())
        enhanced_data = {
            'id': document_id,
            'filename': file.filename,
            'parsed_doc': {
                'markdown': parsed_doc.markdown,
                'chunks': [
                    {
                        'text': getattr(chunk, 'text', ''),
                        'chunk_type': getattr(chunk, 'chunk_type', 'unknown')
                    }
                    for chunk in parsed_doc.chunks
                ]
            },
            'file_path': file_path,
            'grounding_dir': grounding_dir,
            'extraction_time': datetime.now().isoformat(),
            'settings': {
                'include_marginalia': include_marginalia,
                'include_metadata': include_metadata,
                'save_groundings': save_groundings
            },
            'stats': analyze_document_content(parsed_doc),
            'semantic_chunks': create_semantic_chunks(parsed_doc)
        }
        
        # Store document
        documents_store[document_id] = enhanced_data
        chat_history_store[document_id] = []
        
        # Clean up temp file
        os.unlink(file_path)
        
        return {
            'success': True,
            'document_id': document_id,
            'filename': file.filename,
            'stats': enhanced_data['stats']
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")

@app.get("/api/documents")
async def get_documents():
    """Get list of processed documents"""
    documents = []
    for doc_id, doc_data in documents_store.items():
        documents.append({
            'id': doc_id,
            'filename': doc_data['filename'],
            'extraction_time': doc_data['extraction_time'],
            'stats': doc_data['stats']
        })
    return documents

@app.get("/api/documents/{document_id}")
async def get_document(document_id: str):
    """Get specific document data"""
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="Document not found")
    
    doc_data = documents_store[document_id]
    return {
        'id': document_id,
        'filename': doc_data['filename'],
        'content': doc_data['parsed_doc']['markdown'],
        'stats': doc_data['stats'],
        'semantic_chunks': doc_data['semantic_chunks'],
        'extraction_time': doc_data['extraction_time']
    }

@app.delete("/api/documents/{document_id}")
async def delete_document(document_id: str):
    """Delete a document"""
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="Document not found")
    
    del documents_store[document_id]
    if document_id in chat_history_store:
        del chat_history_store[document_id]
    
    return {"success": True, "message": "Document deleted"}

@app.get("/api/documents/{document_id}/prompts")
async def get_smart_prompts(document_id: str):
    """Get smart prompts for a document"""
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="Document not found")
    
    doc_data = documents_store[document_id]
    prompts = generate_smart_prompts(
        doc_data['parsed_doc']['markdown'],
        doc_data['parsed_doc']['chunks']
    )
    
    return prompts

@app.post("/api/documents/{document_id}/chat")
async def chat_with_document(
    document_id: str,
    question: str = Form(...),
    provider: str = Form("openai")  # Default to OpenAI
):
    """Chat with a document using OpenAI"""
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Check if OpenAI API key is available
    if not check_api_keys()['openai']:
        return {
            'question': question,
            'answer': 'OpenAI API key is required for chat functionality. Please add your OpenAI API key to use the chat feature.',
            'timestamp': datetime.now().strftime("%H:%M:%S"),
            'confidence': 0.0,
            'sources': [],
            'chunk_references': []
        }
    
    doc_data = documents_store[document_id]
    document_content = doc_data['parsed_doc']['markdown']
    semantic_chunks = doc_data['semantic_chunks']
    
    # Always use OpenAI
    response = chat_with_document_openai(question, document_content, semantic_chunks)
    
    # Store in chat history
    chat_history_store[document_id].append(response)
    
    return asdict(response)

@app.get("/api/documents/{document_id}/chat")
async def get_chat_history(document_id: str):
    """Get chat history for a document"""
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="Document not found")
    
    history = chat_history_store.get(document_id, [])
    return [asdict(msg) for msg in history]

@app.delete("/api/documents/{document_id}/chat")
async def clear_chat_history(document_id: str):
    """Clear chat history for a document"""
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="Document not found")
    
    chat_history_store[document_id] = []
    return {"success": True, "message": "Chat history cleared"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)