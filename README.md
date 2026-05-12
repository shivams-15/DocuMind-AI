<div align="center">

# DocuMind AI

### *Transform Documents into Actionable Intelligence*

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

**An intelligent document processing platform powered by AI that extracts, analyzes, and enables intelligent interaction with your documents.**

[Features](#-features) • [Demo](#-demo-video) • [Installation](#-installation) • [Usage](#-usage) • [API Docs](#-api-documentation)

---

</div>

## 📋 Overview

DocuMind AI is a full-stack application that leverages advanced AI to extract structured information from documents, visualize content hierarchies, and enable natural language conversations about your documents. Built with modern web technologies and powered by the `agentic-doc` library, it provides an intuitive interface for document analysis and intelligence extraction.

## ✨ Features

### 🔍 **Intelligent Document Processing**
- **Multi-format Support**: Process PDFs, Word documents, images, and more
- **Smart Chunking**: Automatic text, table, and image segmentation
- **Content Analysis**: Extract tables, images, and structured data with precision
- **AI-Powered Parsing**: Leverage agentic-doc for advanced document understanding

### 💬 **Interactive Chat Interface**
- **Document Q&A**: Ask questions about your documents in natural language
- **Context-Aware Responses**: Get accurate answers with source references
- **Chat History**: Maintain conversation history for each document
- **Confidence Scoring**: See confidence levels for AI-generated responses

### 📊 **Analytics Dashboard**
- **Document Statistics**: View comprehensive document metrics
- **Processing Insights**: Track chunk types, tables, and images
- **Visual Analytics**: Beautiful charts powered by Recharts
- **Performance Metrics**: Monitor processing times and success rates

### 🎨 **Modern User Interface**
- **Responsive Design**: Seamless experience across all devices
- **Dark Mode Ready**: Beautiful UI with Tailwind CSS
- **Smooth Animations**: Enhanced UX with Framer Motion
- **Intuitive Navigation**: Easy-to-use sidebar and routing

### 🔐 **Security & Authentication**
- **Protected Routes**: Secure access to application features
- **User Authentication**: JWT-based authentication system
- **Session Management**: Persistent login sessions

## 🎥 Demo Video

Watch DocuMind AI in action! This demo showcases the complete workflow from document upload to intelligent analysis and chat interactions.

<div align="center">

https://github.com/user-attachments/assets/documing.mp4

**Or download the video:** [📥 Download Demo (documing.mp4)](./documing.mp4)

### Demo Highlights:
- 📄 **Document Upload & Processing** - Seamless file handling
- 🔍 **Real-time Content Extraction** - Intelligent chunking and analysis  
- 💬 **Interactive Chat** - Natural language Q&A with your documents
- 📊 **Analytics Dashboard** - Comprehensive insights and metrics
- ⚡ **End-to-end Workflow** - Complete feature demonstration

</div>

## 🛠️ Tech Stack

### **Backend**
- **FastAPI** - High-performance Python web framework
- **agentic-doc** - Advanced document parsing and extraction
- **OpenAI API** - Optional AI-powered features
- **Uvicorn** - ASGI server for production deployment
- **Python-Multipart** - File upload handling

### **Frontend**
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Dropzone** - File upload component
- **React Hot Toast** - Notification system
- **Heroicons** - Beautiful hand-crafted SVG icons

## 📦 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **Python** (3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/agentic_doc_extraction.git
cd agentic_doc_extraction
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file and add your API keys
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "VISION_AGENT_API_KEY=your_vision_agent_key_here" >> .env
```

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Or using yarn
yarn install
```

## 🚀 Usage

### Starting the Application

#### **Option 1: Using the Start Script (Linux/Mac)**

```bash
# From the project root directory
chmod +x start-app.sh
./start-app.sh
```

#### **Option 2: Manual Start**

**Backend:**
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm start
```

### Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Swagger UI)

## 📖 Usage Guide

### 1. **Upload a Document**
   - Navigate to the Dashboard
   - Click "Upload Document" or drag & drop files
   - Select processing options (chunking strategy, visualization settings)
   - Wait for processing to complete

### 2. **View Document Analysis**
   - Explore extracted chunks (text, tables, images)
   - Review document structure and hierarchy
   - View processing statistics and metadata

### 3. **Chat with Your Document**
   - Navigate to the Chat interface
   - Ask questions about the document content
   - Get AI-powered answers with source references
   - View confidence scores and chunk references

### 4. **Monitor Analytics**
   - Check document processing metrics
   - View usage statistics
   - Analyze document complexity scores
   - Track performance over time

## 🔌 API Documentation

### Core Endpoints

#### **Document Management**

```http
POST /api/upload
Upload and process a document

GET /api/documents
Retrieve all processed documents

GET /api/documents/{document_id}
Get specific document details

DELETE /api/documents/{document_id}
Delete a document

GET /api/documents/{document_id}/download
Download original document
```

#### **Document Analysis**

```http
GET /api/documents/{document_id}/chunks
Get document chunks

GET /api/documents/{document_id}/analysis
Get document analysis and statistics
```

#### **Chat Interface**

```http
POST /api/chat/{document_id}
Send a chat message and get AI response

GET /api/chat/{document_id}/history
Retrieve chat history for a document
```

#### **System**

```http
GET /api/status
Check API status and available integrations

GET /api/health
Health check endpoint
```

For detailed API documentation with request/response schemas, visit: http://localhost:8000/docs

## 📁 Project Structure

```
agentic_doc_extraction/
├── backend/
│   ├── main.py                 # FastAPI application and endpoints
│   ├── requirements.txt        # Python dependencies
│   ├── test_versions.py        # Version testing utilities
│   └── .env                    # Environment variables (create this)
│
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Analytics.js    # Analytics dashboard
│   │   │   ├── ChatInterface.js # Chat interface
│   │   │   ├── Dashboard.js    # Main dashboard
│   │   │   ├── DocumentViewer.js # Document viewer
│   │   │   ├── Settings.js     # Settings page
│   │   │   └── ui/             # UI components
│   │   ├── contexts/           # React contexts
│   │   │   ├── AuthContext.js  # Authentication context
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── pages/              # Page components
│   │   │   ├── LandingPage.jsx # Landing page
│   │   │   └── Login.jsx       # Login page
│   │   ├── services/           # API services
│   │   │   └── apiService.js   # API integration
│   │   ├── App.js              # Main application
│   │   ├── index.js            # Entry point
│   │   └── index.css           # Global styles
│   ├── package.json            # Node dependencies
│   ├── tailwind.config.js      # Tailwind configuration
│   └── postcss.config.js       # PostCSS configuration
│
├── README.md                   # This file
└── start-app.sh               # Application start script
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# OpenAI API (Optional - for enhanced AI features)
OPENAI_API_KEY=your_openai_api_key

# Vision Agent API (Optional)
VISION_AGENT_API_KEY=your_vision_agent_api_key

# Application Settings
ENVIRONMENT=development
DEBUG=True
```

### Frontend Configuration

Update CORS settings in `backend/main.py` if deploying to different domains:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint configuration for JavaScript/React
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Ensure Python 3.8+ is installed
- Check if all dependencies are installed: `pip install -r requirements.txt`
- Verify `.env` file exists with required API keys

**Frontend won't start:**
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Ensure Node.js 14+ is installed
- Check for port conflicts (default: 3000)

**Upload fails:**
- Check file size limits
- Verify backend is running on port 8000
- Check CORS configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **agentic-doc** - Powerful document parsing library
- **FastAPI** - Amazing Python web framework
- **React** - Excellent UI library
- **Tailwind CSS** - Beautiful utility-first CSS framework
- **OpenAI** - AI capabilities

## 📞 Support

For issues, questions, or suggestions:
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/agentic_doc_extraction/issues)

---

<div align="center">

**Made with ❤️ by Shivam Singh**

⭐ Star this repo if you find it helpful!

</div>