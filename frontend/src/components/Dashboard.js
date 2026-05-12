import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  CloudArrowUpIcon,
  CubeIcon,
  ClockIcon,
  SparklesIcon,
  ArrowRightIcon,
  PlayIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const Dashboard = ({ documents, selectedDocument, onDocumentSelect, onDocumentUpload, onChatClick, onAnalyticsClick, onViewClick }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const totalChunks = documents.reduce((sum, doc) => sum + (doc.stats?.total_chunks || 0), 0);
  const totalTextLength = documents.reduce((sum, doc) => sum + (doc.stats?.total_text_length || 0), 0);
  const avgComplexity = documents.length > 0 
    ? documents.reduce((sum, doc) => sum + (doc.stats?.complexity_score || 0), 0) / documents.length 
    : 0;

  const recentDocuments = documents
    .sort((a, b) => new Date(b.extraction_time) - new Date(a.extraction_time))
    .slice(0, 6);

  const handleFileUpload = async (acceptedFiles) => {
    setIsUploading(true);
    for (const file of acceptedFiles) {
      try {
        await onDocumentUpload(file, {
          include_marginalia: true,
          include_metadata: true,
          save_groundings: false
        });
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
      }
    }
    setIsUploading(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        damping: 25,
        stiffness: 100
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  if (documents.length === 0) {
    return (
      <div className="p-8 min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto relative z-10"
        >
          {/* Welcome Header */}
          <motion.div className="text-center mb-12" variants={cardVariants}>
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <SparklesIcon className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">
                AI-Powered Document Intelligence
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Transform Your Documents
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Into Intelligence
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Upload your first document to experience the power of AI-driven document processing and analysis.
            </motion.p>
          </motion.div>

          {/* Upload Area */}
          <motion.div variants={cardVariants} className="mb-12">
            {isUploading ? (
              <motion.div 
                className="relative backdrop-blur-xl bg-blue-500/10 border border-blue-500/20 rounded-2xl p-12 text-center overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-blue-300 mb-2">
                    Processing Documents...
                  </h3>
                  <p className="text-blue-400">
                    AI is analyzing your documents. This may take a few moments.
                  </p>
                  <motion.div 
                    className="mt-6 bg-blue-900/30 rounded-full h-2 overflow-hidden max-w-md mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 overflow-hidden border-white/20 hover:border-white/30 hover:bg-white/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, type: "spring", damping: 20 }}
                  >
                    <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Start Document Extraction
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Drag & drop files or use the buttons below • PDF, PNG, JPG, TIFF, BMP
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.multiple = true;
                        input.accept = '.pdf,.png,.jpg,.jpeg,.tiff,.bmp';
                        input.onchange = (e) => handleFileUpload([...e.target.files]);
                        input.click();
                      }}
                    >
                      Choose Files
                    </button>
                    <button
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.multiple = true;
                        input.accept = '.pdf,.png,.jpg,.jpeg,.tiff,.bmp';
                        input.setAttribute('webkitdirectory', '');
                        input.setAttribute('directory', '');
                        input.onchange = (e) => handleFileUpload([...e.target.files]);
                        input.click();
                      }}
                    >
                      Choose Folder
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            <motion.div 
              variants={cardVariants} 
              className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-4 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">Document Processing</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Multi-format support: PDF, images</li>
                <li>• Advanced extraction: Tables, charts</li>
                <li>• Visual grounding capabilities</li>
                <li>• Batch processing support</li>
              </ul>
            </motion.div>

            <motion.div 
              variants={cardVariants} 
              className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Chat</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Smart context-aware prompts</li>
                <li>• Multiple AI providers support</li>
                <li>• Confidence scoring system</li>
                <li>• Source attribution tracking</li>
              </ul>
            </motion.div>

            <motion.div 
              variants={cardVariants} 
              className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl mb-4 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <ChartBarIcon className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">Advanced Analytics</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Content structure analysis</li>
                <li>• Semantic chunking intelligence</li>
                <li>• Document comparison tools</li>
                <li>• Export in multiple formats</li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Background Effects */}
      <motion.div
        className="absolute top-40 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={cardVariants}>
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <SparklesIcon className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">
              Document Intelligence Hub
            </span>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Overview of your processed documents and analytics</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            variants={cardVariants} 
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Documents</p>
                <p className="text-2xl font-bold text-white">{documents.length}</p>
              </div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", damping: 15 }}>
                <DocumentTextIcon className="w-8 h-8 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            variants={cardVariants} 
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Chunks</p>
                <p className="text-2xl font-bold text-white">{totalChunks.toLocaleString()}</p>
              </div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", damping: 15 }}>
                <CubeIcon className="w-8 h-8 text-purple-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            variants={cardVariants} 
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Text Length</p>
                <p className="text-2xl font-bold text-white">{(totalTextLength / 1000).toFixed(1)}K</p>
              </div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", damping: 15 }}>
                <ChartBarIcon className="w-8 h-8 text-emerald-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            variants={cardVariants} 
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Avg Complexity</p>
                <p className="text-2xl font-bold text-white">{avgComplexity.toFixed(0)}/100</p>
              </div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", damping: 15 }}>
                <ClockIcon className="w-8 h-8 text-orange-400" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Documents Grid - Takes 2 columns */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Your Documents</h2>
                <motion.button
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.accept = '.pdf,.png,.jpg,.jpeg,.tiff,.bmp';
                    input.onchange = (e) => handleFileUpload([...e.target.files]);
                    input.click();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Add Document</span>
                </motion.button>
                <motion.button
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.accept = '.pdf,.png,.jpg,.jpeg,.tiff,.bmp';
                    input.setAttribute('webkitdirectory', '');
                    input.setAttribute('directory', '');
                    input.onchange = (e) => handleFileUpload([...e.target.files]);
                    input.click();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 ml-2 bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Upload Folder</span>
                </motion.button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {recentDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", damping: 25 }}
                    className={`
                      relative p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:bg-white/10
                      ${selectedDocument?.id === doc.id ? 'bg-blue-500/20 border-blue-500/50 ring-2 ring-blue-500/30' : 'border-white/10 hover:border-white/20'}
                    `}
                    onClick={() => onDocumentSelect(doc)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="p-2 bg-blue-500/20 rounded-lg"
                          whileHover={{ rotate: 5 }} 
                          transition={{ type: "spring", damping: 15 }}
                        >
                          <DocumentTextIcon className="w-5 h-5 text-blue-400" />
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm truncate max-w-[200px]">{doc.filename}</p>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                            <span>{doc.stats?.total_chunks || 0} chunks</span>
                            <span>•</span>
                            <span>{new Date(doc.extraction_time).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Always Visible */}
                    <div className="flex space-x-2 mt-3">
                      <motion.button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewClick(doc);
                        }}
                        className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 text-xs bg-white/10 hover:bg-blue-500/20 border border-white/20 hover:border-blue-500/30 text-gray-200 hover:text-blue-300 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <EyeIcon className="w-3 h-3" />
                        <span>View</span>
                      </motion.button>
                      
                      <motion.button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onChatClick(doc);
                        }}
                        className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 hover:border-purple-500/50 text-purple-200 hover:text-purple-100 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/10"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChatBubbleLeftRightIcon className="w-3 h-3" />
                        <span>Chat</span>
                        <ArrowTopRightOnSquareIcon className="w-3 h-3 opacity-60" />
                      </motion.button>
                      
                      <motion.button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAnalyticsClick(doc);
                        }}
                        className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 text-xs bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-200 hover:text-emerald-100 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/10"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChartBarIcon className="w-3 h-3" />
                        <span>Analytics</span>
                        <ArrowTopRightOnSquareIcon className="w-3 h-3 opacity-60" />
                      </motion.button>
                    </div>

                    {/* Selection Indicator */}
                    {selectedDocument?.id === doc.id && (
                      <motion.div
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Panel */}
          <motion.div
            variants={cardVariants}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            
            {/* Quick Upload Document Button */}
            <div className="flex justify-end mb-4 gap-2">
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.multiple = true;
                  input.accept = '.pdf,.png,.jpg,.jpeg,.tiff,.bmp';
                  input.onchange = (e) => handleFileUpload([...e.target.files]);
                  input.click();
                }}
                className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded shadow-sm transition-all duration-200"
                title="Quick Upload Document"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Upload</span>
              </button>
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.multiple = true;
                  input.accept = '.pdf,.png,.jpg,.jpeg,.tiff,.bmp';
                  input.setAttribute('webkitdirectory', '');
                  input.setAttribute('directory', '');
                  input.onchange = (e) => handleFileUpload([...e.target.files]);
                  input.click();
                }}
                className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded shadow-sm transition-all duration-200"
                title="Quick Upload Folder"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Folder</span>
              </button>
            </div>

            {selectedDocument ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <DocumentTextIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 text-sm font-medium">Selected Document</span>
                  </div>
                  <p className="text-white font-medium text-sm mb-2 truncate">{selectedDocument.filename}</p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>{selectedDocument.stats?.total_chunks || 0} chunks processed</div>
                    <div>Complexity: {selectedDocument.stats?.complexity_score || 0}/100</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    onClick={() => onChatClick(selectedDocument)}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 hover:border-purple-500/50 rounded-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/30 rounded-lg">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-200" />
                      </div>
                      <div className="text-left">
                        <p className="text-purple-100 font-medium">Start Conversation</p>
                        <p className="text-purple-300 text-xs">Ask questions about this document</p>
                      </div>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-purple-300 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>

                  <motion.button
                    onClick={() => onAnalyticsClick(selectedDocument)}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-500/30 rounded-lg">
                        <ChartBarIcon className="w-5 h-5 text-emerald-200" />
                      </div>
                      <div className="text-left">
                        <p className="text-emerald-100 font-medium">View Analytics</p>
                        <p className="text-emerald-300 text-xs">Explore document insights</p>
                      </div>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>

                  <motion.button
                    onClick={() => onViewClick(selectedDocument)}
                    className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <EyeIcon className="w-5 h-5 text-gray-200" />
                      </div>
                      <div className="text-left">
                        <p className="text-gray-100 font-medium">View Document</p>
                        <p className="text-gray-300 text-xs">Read extracted content</p>
                      </div>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring", damping: 20 }}
                >
                  <DocumentTextIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                </motion.div>
                <p className="text-gray-400 text-sm mb-4">Select a document to see available actions</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <p>• Chat with AI about your documents</p>
                  <p>• View detailed analytics</p>
                  <p>• Read extracted content</p>
                </div>
              </div>
            )}

            {/* Content Types Distribution */}
            {documents.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-white mb-4">Content Overview</h3>
                <div className="space-y-3">
                  {Object.entries(
                    documents.reduce((acc, doc) => {
                      Object.entries(doc.stats?.chunk_types || {}).forEach(([type, count]) => {
                        acc[type] = (acc[type] || 0) + count;
                      });
                      return acc;
                    }, {})
                  ).map(([type, count], index) => (
                    <motion.div 
                      key={type} 
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, type: "spring", damping: 25 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-gray-300 capitalize">{type.replace('_', ' ')}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{count}</span>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Call-to-Action for Main Features */}
        {documents.length > 0 && (
          <motion.div
            variants={cardVariants}
            className="mt-8 backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Explore Your Documents?</h3>
              <p className="text-gray-300 mb-6">Use AI-powered chat and analytics to unlock insights from your documents</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => selectedDocument && onChatClick(selectedDocument)}
                  disabled={!selectedDocument}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 shadow-lg"
                  whileHover={{ scale: selectedDocument ? 1.05 : 1, y: selectedDocument ? -2 : 0 }}
                  whileTap={{ scale: selectedDocument ? 0.95 : 1 }}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  <span>Start AI Chat</span>
                  <PlayIcon className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  onClick={() => selectedDocument && onAnalyticsClick(selectedDocument)}
                  disabled={!selectedDocument}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 shadow-lg"
                  whileHover={{ scale: selectedDocument ? 1.05 : 1, y: selectedDocument ? -2 : 0 }}
                  whileTap={{ scale: selectedDocument ? 0.95 : 1 }}
                >
                  <ChartBarIcon className="w-5 h-5" />
                  <span>View Analytics</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
              </div>
              
              {!selectedDocument && (
                <p className="text-gray-500 text-sm mt-3">Select a document above to enable these features</p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;