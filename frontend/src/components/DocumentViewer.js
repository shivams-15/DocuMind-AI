import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  DocumentTextIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentArrowDownIcon,
  ClipboardDocumentIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

import { apiService } from '../services/apiService';

const DocumentViewer = ({ document }) => {
  const [documentData, setDocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('markdown'); // 'markdown' or 'raw'
  const [showMetadata, setShowMetadata] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChunk, setSelectedChunk] = useState(null);

  const loadDocumentData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getDocument(document.id);
      setDocumentData(data);
    } catch (error) {
      console.error('Failed to load document data:', error);
      toast.error('Failed to load document content');
    } finally {
      setIsLoading(false);
    }
  }, [document]);

  useEffect(() => {
    if (document) {
      loadDocumentData();
    }
  }, [document, loadDocumentData]);

  const handleCopyContent = () => {
    if (!documentData) return;
    
    const content = viewMode === 'markdown' ? documentData.content : JSON.stringify(documentData, null, 2);
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard');
  };

  const handleDownload = () => {
    if (!documentData) return;
    
    const content = viewMode === 'markdown' ? documentData.content : JSON.stringify(documentData, null, 2);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.filename}_${viewMode}.${viewMode === 'markdown' ? 'md' : 'json'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Document downloaded');
  };

  const highlightSearchTerm = (text) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-300 text-black">$1</mark>');
  };

  const filteredChunks = documentData?.semantic_chunks?.filter(chunk =>
    !searchTerm || chunk.text.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!document) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <DocumentTextIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400">Select a document to view its content</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-8 h-8 text-primary-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">{document.filename}</h1>
              <p className="text-slate-400">
                Processed on {apiService.formatDate(documentData?.extraction_time)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopyContent}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <ClipboardDocumentIcon className="w-4 h-4" />
              <span>Copy</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('markdown')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  viewMode === 'markdown' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Markdown
              </button>
              <button
                onClick={() => setViewMode('chunks')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  viewMode === 'chunks' 
                    ? 'bg-primary-500 text-white' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Chunks
              </button>
            </div>

            {/* Metadata Toggle */}
            <button
              onClick={() => setShowMetadata(!showMetadata)}
              className="flex items-center space-x-2 px-3 py-1 text-slate-300 hover:text-white transition-colors"
            >
              {showMetadata ? (
                <EyeSlashIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
              <span className="text-sm">Metadata</span>
            </button>
          </div>

          {/* Search */}
          {viewMode === 'chunks' && (
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>

      {/* Metadata Panel */}
      {showMetadata && documentData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Document Metadata</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Total Chunks</p>
              <p className="text-white font-medium">{documentData.stats?.total_chunks || 0}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Text Length</p>
              <p className="text-white font-medium">{(documentData.stats?.total_text_length || 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Complexity Score</p>
              <p className="text-white font-medium">{documentData.stats?.complexity_score || 0}/100</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Processing Time</p>
              <p className="text-white font-medium">{apiService.formatDate(documentData.extraction_time)}</p>
            </div>
          </div>
          
          {documentData.stats?.chunk_types && (
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Content Types</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(documentData.stats.chunk_types).map(([type, count]) => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                  >
                    {type.replace('_', ' ')}: {count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Content Display */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
        {viewMode === 'markdown' ? (
          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown className="text-slate-200">
                {documentData?.content || 'No content available'}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-700">
            {/* Chunks Header */}
            <div className="p-4 bg-slate-800/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Document Chunks ({filteredChunks.length})
                </h3>
                {searchTerm && (
                  <span className="text-sm text-slate-400">
                    Filtered by: "{searchTerm}"
                  </span>
                )}
              </div>
            </div>

            {/* Chunks List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredChunks.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-slate-400">
                    {searchTerm ? 'No chunks match your search' : 'No chunks available'}
                  </p>
                </div>
              ) : (
                filteredChunks.map((chunk, index) => (
                  <motion.div
                    key={chunk.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      p-4 cursor-pointer transition-colors hover:bg-slate-700/30
                      ${selectedChunk?.id === chunk.id ? 'bg-primary-500/10 border-l-4 border-primary-500' : ''}
                    `}
                    onClick={() => setSelectedChunk(selectedChunk?.id === chunk.id ? null : chunk)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">
                          Chunk {chunk.id}
                        </span>
                        <span className="text-xs text-slate-400 capitalize">
                          {chunk.type.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-slate-500">
                          {chunk.length} chars
                        </span>
                      </div>
                      
                      {chunk.keywords && chunk.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {chunk.keywords.slice(0, 3).map(([keyword, freq], idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-accent-500/20 text-accent-300 px-1 py-0.5 rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-slate-300 text-sm line-clamp-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchTerm(chunk.summary || chunk.text.substring(0, 200) + '...')
                        }}
                      />
                    </div>

                    {selectedChunk?.id === chunk.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-slate-600"
                      >
                        <h4 className="text-white font-medium mb-2">Full Content</h4>
                        <div className="bg-slate-900/50 rounded-lg p-4 max-h-64 overflow-y-auto">
                          <div
                            className="text-slate-300 text-sm whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                              __html: highlightSearchTerm(chunk.text)
                            }}
                          />
                        </div>
                        
                        {chunk.keywords && chunk.keywords.length > 0 && (
                          <div className="mt-3">
                            <h5 className="text-slate-400 text-xs font-medium mb-2">Keywords</h5>
                            <div className="flex flex-wrap gap-1">
                              {chunk.keywords.map(([keyword, freq], idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded"
                                >
                                  {keyword} ({freq})
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {documentData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary-400">
              {documentData.stats?.total_chunks || 0}
            </p>
            <p className="text-sm text-slate-400">Total Chunks</p>
          </div>
          
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-accent-400">
              {documentData.stats?.tables_count || 0}
            </p>
            <p className="text-sm text-slate-400">Tables</p>
          </div>
          
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              {documentData.stats?.images_count || 0}
            </p>
            <p className="text-sm text-slate-400">Images</p>
          </div>
          
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-orange-400">
              {documentData.stats?.complexity_score || 0}
            </p>
            <p className="text-sm text-slate-400">Complexity</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentViewer;