import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DocumentTextIcon,
  TrashIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  DocumentIcon,
  SparklesIcon,
  ClockIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ 
  isOpen, 
  documents, 
  selectedDocument, 
  onDocumentSelect, 
  onDocumentDelete,
  onChatClick,
  onAnalyticsClick,
  onViewClick
}) => {

  const handleDelete = async (documentId, filename) => {
    if (window.confirm(`Are you sure you want to delete "${filename}"?`)) {
      try {
        await onDocumentDelete(documentId);
      } catch (error) {
        console.error('Failed to delete document');
      }
    }
  };

  const getDocumentStats = (doc) => {
    const stats = doc.stats || {};
    return {
      chunks: stats.total_chunks || 0,
      complexity: stats.complexity_score || 0,
      textLength: stats.total_text_length || 0
    };
  };

  // Sort documents by extraction time (newest first)
  const sortedDocuments = [...documents].sort((a, b) => 
    new Date(b.extraction_time) - new Date(a.extraction_time)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-0 top-16 bottom-0 w-80 backdrop-blur-xl bg-black/20 border-r border-white/10 z-40"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <SparklesIcon className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">
                  Document Library
                </h2>
              </div>
              <p className="text-sm text-gray-400">
                Manage and interact with your processed documents
              </p>
            </div>

            {/* Document Stats Overview */}
            {documents.length > 0 && (
              <div className="p-4 border-b border-white/10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <DocumentTextIcon className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="text-sm font-semibold text-white">{documents.length}</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <CubeIcon className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Chunks</p>
                    <p className="text-sm font-semibold text-white">
                      {documents.reduce((sum, doc) => sum + (doc.stats?.total_chunks || 0), 0)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <ClockIcon className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Avg Score</p>
                    <p className="text-sm font-semibold text-white">
                      {documents.length > 0 
                        ? Math.round(documents.reduce((sum, doc) => sum + (doc.stats?.complexity_score || 0), 0) / documents.length)
                        : 0
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Documents List */}
            <div className="flex-1 overflow-y-auto custom-scroll">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-medium text-white">
                    Documents ({documents.length})
                  </h3>
                </div>

                {documents.length === 0 ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <DocumentIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-sm mb-2">
                      No documents uploaded yet
                    </p>
                    <p className="text-gray-500 text-xs">
                      Upload documents from the main dashboard to get started
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {sortedDocuments.map((doc, index) => {
                      const stats = getDocumentStats(doc);
                      return (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`
                            group relative p-4 rounded-xl border cursor-pointer transition-all duration-300
                            ${selectedDocument?.id === doc.id
                              ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }
                          `}
                          onClick={() => onDocumentSelect(doc)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start space-x-3">
                            <motion.div
                              className={`mt-1 p-2 rounded-lg ${
                                selectedDocument?.id === doc.id 
                                  ? 'bg-blue-500/30' 
                                  : 'bg-white/10'
                              }`}
                              whileHover={{ rotate: 5 }}
                              transition={{ type: "spring", damping: 15 }}
                            >
                              <DocumentTextIcon className={`w-4 h-4 ${
                                selectedDocument?.id === doc.id 
                                  ? 'text-blue-300' 
                                  : 'text-blue-400'
                              }`} />
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-white truncate mb-1">
                                    {doc.filename}
                                  </p>
                                  <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                                    <span>{stats.chunks} chunks</span>
                                    <span>•</span>
                                    <span>{stats.complexity}/100</span>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    {new Date(doc.extraction_time).toLocaleDateString()}
                                  </p>
                                </div>
                                
                                <motion.button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(doc.id, doc.filename);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-all duration-200 ml-2"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </motion.button>
                              </div>

                              {/* Document Actions - Always visible for selected document */}
                              {selectedDocument?.id === doc.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="mt-3 pt-3 border-t border-white/10 space-y-2"
                                >
                                  <motion.button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onChatClick(doc);
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 hover:border-purple-500/50 text-purple-200 hover:text-purple-100 rounded-lg transition-all duration-300"
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                    <span className="font-medium">Start AI Chat</span>
                                  </motion.button>
                                  
                                  <motion.button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onAnalyticsClick(doc);
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 text-xs bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-200 hover:text-emerald-100 rounded-lg transition-all duration-300"
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <ChartBarIcon className="w-4 h-4" />
                                    <span className="font-medium">View Analytics</span>
                                  </motion.button>
                                  
                                  <motion.button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onViewClick(doc);
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 text-xs bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-gray-200 hover:text-white rounded-lg transition-all duration-300"
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <EyeIcon className="w-4 h-4" />
                                    <span className="font-medium">View Content</span>
                                  </motion.button>
                                </motion.div>
                              )}
                            </div>
                          </div>

                          {/* Selection Indicator */}
                          {selectedDocument?.id === doc.id && (
                            <motion.div
                              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r"
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}

                          {/* Document Type Indicator */}
                          <div className="absolute top-2 right-2">
                            <motion.div
                              className={`w-2 h-2 rounded-full ${
                                selectedDocument?.id === doc.id 
                                  ? 'bg-blue-400' 
                                  : 'bg-gray-500'
                              }`}
                              animate={selectedDocument?.id === doc.id ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer with Quick Stats or Tips */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              {selectedDocument ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-xs text-gray-400 mb-2">Selected Document</p>
                  <p className="text-sm text-white font-medium truncate mb-2">
                    {selectedDocument.filename}
                  </p>
                  <div className="flex justify-center space-x-4 text-xs text-gray-500">
                    <span>{getDocumentStats(selectedDocument).chunks} chunks</span>
                    <span>•</span>
                    <span>{getDocumentStats(selectedDocument).complexity}/100 complexity</span>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">💡 Pro Tip</p>
                  <p className="text-xs text-gray-400">
                    Click on any document to see available actions like Chat and Analytics
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;