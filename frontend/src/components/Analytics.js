import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  ChartBarIcon,
  DocumentTextIcon,
  CubeIcon,
  TableCellsIcon,
  PhotoIcon,
  ClockIcon,
  SparklesIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const Analytics = ({ document, apiService }) => {
  const [documentData, setDocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const loadDocumentData = useCallback(async () => {
    try {
      setIsLoading(true);
      let data;
      if (apiService && apiService.getDocument) {
        data = await apiService.getDocument(document.id);
      } else {
        // Create more realistic mock data for demo
        data = {
          ...document,
          content: document.content || `This is the extracted text content from ${document.filename}. 

The document contains various sections including headers, paragraphs, and structured content. This text has been processed by our AI system to extract meaningful information and enable intelligent analysis.

Key sections identified:
- Introduction and overview
- Main content body
- Data tables and figures
- Conclusions and recommendations

The semantic analysis has broken this content into meaningful chunks that can be searched and analyzed independently.`,
          semantic_chunks: document.semantic_chunks || [
            { id: 1, text: "Introduction section content...", type: "header", length: 150, keywords: [["introduction", 3], ["overview", 2]] },
            { id: 2, text: "Main body paragraph content...", type: "paragraph", length: 450, keywords: [["analysis", 5], ["data", 4], ["results", 3]] },
            { id: 3, text: "Table data content...", type: "table", length: 200, keywords: [["statistics", 4], ["values", 3]] },
            { id: 4, text: "Conclusion section...", type: "paragraph", length: 300, keywords: [["conclusion", 2], ["summary", 3]] },
            { id: 5, text: "Additional content...", type: "paragraph", length: 600, keywords: [["additional", 2], ["content", 4]] }
          ],
          stats: document.stats || {
            total_chunks: 5,
            total_text_length: 1700,
            complexity_score: 75,
            avg_chunk_length: 340,
            chunk_types: {
              "paragraph": 3,
              "header": 1,
              "table": 1
            },
            tables_count: 2,
            images_count: 1
          },
          extraction_time: document.extraction_time || new Date().toISOString()
        };
      }
      setDocumentData(data);
    } catch (error) {
      console.error('Failed to load document data:', error);
      setDocumentData({
        ...document,
        content: "Error loading document content",
        semantic_chunks: [],
        stats: {
          total_chunks: 0,
          total_text_length: 0,
          complexity_score: 0,
          avg_chunk_length: 0,
          chunk_types: {},
          tables_count: 0,
          images_count: 0
        },
        extraction_time: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  }, [document, apiService]);

  useEffect(() => {
    if (document) {
      loadDocumentData();
    }
  }, [document, loadDocumentData]);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
        />

        <motion.div 
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
          >
            <ChartBarIcon className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Document Analytics</h2>
          <p className="text-gray-400">Select a document to view detailed analytics and insights</p>
        </motion.div>
      </div>
    );
  }

  if (isLoading || !documentData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900/30 to-black relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        <motion.div 
          className="text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-purple-300 mb-2">
            Analyzing Document
          </h3>
          <p className="text-purple-400">
            Processing analytics data...
          </p>
        </motion.div>
      </div>
    );
  }

  const stats = documentData.stats || {};
  const chunks = documentData.semantic_chunks || [];

  // Prepare chart data with better error handling
  const chunkTypeData = Object.entries(stats.chunk_types || {}).map(([type, count]) => ({
    name: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value: count,
    percentage: ((count / (stats.total_chunks || 1)) * 100).toFixed(1)
  }));

  // Fixed chunk length distribution calculation
  const chunkLengthData = chunks.length > 0 ? chunks
    .map(chunk => ({ length: chunk.length || 0, type: chunk.type }))
    .reduce((acc, curr) => {
      const range = curr.length < 100 ? '0-100' :
                   curr.length < 500 ? '100-500' :
                   curr.length < 1000 ? '500-1000' :
                   curr.length < 2000 ? '1000-2000' : '2000+';
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {}) : { '0-100': 0 };

  const lengthDistribution = Object.entries(chunkLengthData).map(([range, count]) => ({
    range,
    count,
    percentage: chunks.length > 0 ? ((count / chunks.length) * 100).toFixed(1) : '0'
  }));

  // Fixed keyword frequency calculation
  const keywordFrequency = chunks.length > 0 ? chunks
    .flatMap(chunk => chunk.keywords || [])
    .reduce((acc, [keyword, freq]) => {
      acc[keyword] = (acc[keyword] || 0) + freq;
      return acc;
    }, {}) : {};

  const topKeywords = Object.entries(keywordFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([keyword, frequency]) => ({ keyword, frequency }));

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900/30 to-black relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute top-40 left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
      />

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <ChartBarIcon className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-3 py-1 mb-2 backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <SparklesIcon className="w-3 h-3 text-purple-400" />
                <span className="text-purple-300 text-xs font-medium">
                  AI Analytics
                </span>
              </motion.div>
              <h1 className="text-3xl font-bold text-white">Document Analytics</h1>
              <p className="text-gray-400">{document.filename}</p>
            </div>
          </div>

          {/* Tabs */}
          <motion.div 
            className="flex flex-wrap gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'content', label: 'Content Analysis' },
              { id: 'distribution', label: 'Distribution' },
              { id: 'keywords', label: 'Keywords' },
              { id: 'raw', label: 'Raw Text' }
            ].map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Key Metrics */}
              <motion.div variants={cardVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Chunks</p>
                      <p className="text-2xl font-bold text-white">{stats.total_chunks || 0}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <CubeIcon className="w-8 h-8 text-blue-400" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Text Length</p>
                      <p className="text-2xl font-bold text-white">{((stats.total_text_length || 0) / 1000).toFixed(1)}K</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <DocumentTextIcon className="w-8 h-8 text-green-400" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Tables</p>
                      <p className="text-2xl font-bold text-white">{stats.tables_count || 0}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <TableCellsIcon className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Images</p>
                      <p className="text-2xl font-bold text-white">{stats.images_count || 0}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <PhotoIcon className="w-8 h-8 text-orange-400" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Complexity & Processing Info */}
              <motion.div variants={cardVariants} className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Document Complexity</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Complexity Score</span>
                        <span className="text-white font-medium">{stats.complexity_score || 0}/100</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${stats.complexity_score || 0}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Avg Chunk Length</p>
                        <p className="text-white font-medium">{Math.round(stats.avg_chunk_length || 0)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Content Types</p>
                        <p className="text-white font-medium">{Object.keys(stats.chunk_types || {}).length}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Processing Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <ClockIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Processed</p>
                        <p className="text-white">{new Date(documentData.extraction_time).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-gray-400 text-sm mb-2">Processing Settings</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-green-400">✓ Marginalia extraction enabled</p>
                        <p className="text-green-400">✓ Metadata preservation enabled</p>
                        <p className="text-green-400">✓ Semantic chunking applied</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-8">
              {/* Content Type Distribution */}
              <motion.div 
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6">Content Type Distribution</h3>
                {chunkTypeData.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={chunkTypeData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                          >
                            {chunkTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(0, 0, 0, 0.9)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '12px',
                              color: '#f1f5f9',
                              backdropFilter: 'blur(20px)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                      {chunkTypeData.map((item, index) => (
                        <motion.div 
                          key={item.name} 
                          className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-white font-medium">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">{item.value}</p>
                            <p className="text-gray-400 text-sm">{item.percentage}%</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No content type data available</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {activeTab === 'distribution' && (
            <div className="space-y-8">
              {/* Chunk Length Distribution */}
              <motion.div 
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6">Chunk Length Distribution</h3>
                {lengthDistribution.length > 0 && lengthDistribution.some(item => item.count > 0) ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={lengthDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis
                        dataKey="range"
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      />
                      <YAxis
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.9)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: '#f1f5f9',
                          backdropFilter: 'blur(20px)'
                        }}
                        formatter={(value, name) => [value, 'Chunks']}
                        labelFormatter={(label) => `Range: ${label} characters`}
                      />
                      <Bar dataKey="count" fill="url(#barGradient)" />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No distribution data available</p>
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {activeTab === 'keywords' && (
            <div className="space-y-8">
              {/* Top Keywords */}
              <motion.div 
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6">Top Keywords</h3>
                {topKeywords.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={topKeywords} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                      <XAxis
                        type="number"
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                      />
                      <YAxis
                        type="category"
                        dataKey="keyword"
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                        width={100}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.9)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: '#f1f5f9',
                          backdropFilter: 'blur(20px)'
                        }}
                        formatter={(value) => [value, 'Frequency']}
                      />
                      <Bar dataKey="frequency" fill="url(#keywordGradient)" />
                      <defs>
                        <linearGradient id="keywordGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#EF4444" />
                          <stop offset="100%" stopColor="#F97316" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No keyword data available</p>
                  </div>
                )}
              </motion.div>

              {/* Keyword Cloud */}
              {topKeywords.length > 0 && (
                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Keyword Overview</h3>
                  <div className="flex flex-wrap gap-3">
                    {topKeywords.map((item, index) => (
                      <motion.span
                        key={item.keyword}
                        className="px-4 py-2 rounded-full text-sm border transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: `${COLORS[index % COLORS.length]}20`,
                          borderColor: COLORS[index % COLORS.length],
                          color: COLORS[index % COLORS.length],
                          fontSize: `${Math.max(12, Math.min(18, 12 + (item.frequency / Math.max(...topKeywords.map(k => k.frequency))) * 6))}px`
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {item.keyword} ({item.frequency})
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'raw' && (
            <div className="space-y-8">
              {/* Raw Text Display */}
              <motion.div 
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <EyeIcon className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Raw Extracted Text</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>Length: {(documentData.content || '').length} characters</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div 
                    className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-h-96 overflow-y-auto text-gray-200 whitespace-pre-wrap leading-relaxed text-sm font-mono custom-scroll"
                    style={{ 
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(59, 130, 246, 0.3) rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {documentData.content || 'No extracted text available.'}
                  </div>
                  
                  {/* Copy button */}
                  <motion.button
                    className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(documentData.content || '');
                      // You could add a toast notification here
                    }}
                  >
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </motion.button>
                </div>
                
                {/* Text Statistics */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-white">{(documentData.content || '').split(' ').length}</p>
                    <p className="text-xs text-gray-400">Words</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-white">{(documentData.content || '').split('\n').length}</p>
                    <p className="text-xs text-gray-400">Lines</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-white">{(documentData.content || '').split(/[.!?]+/).length - 1}</p>
                    <p className="text-xs text-gray-400">Sentences</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-white">{Math.ceil((documentData.content || '').length / 5)}</p>
                    <p className="text-xs text-gray-400">Est. Reading Time (min)</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;