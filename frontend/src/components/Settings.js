import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  CogIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

const Settings = ({ apiStatus, onApiStatusChange }) => {
  const [activeTab, setActiveTab] = useState('api');
  const [apiKeys, setApiKeys] = useState({
    landingai: '',
    openai: ''
  });
  const [showKeys, setShowKeys] = useState({
    landingai: false,
    openai: false
  });

  const handleSaveApiKey = (provider) => {
    // In a real app, you'd save this to your backend or secure storage
    toast.success(`${provider} API key saved (Note: This is a demo - keys are not actually saved)`);
  };

  const handleTestConnection = async (provider) => {
    toast.loading(`Testing ${provider} connection...`);
    
    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      if (success) {
        toast.success(`${provider} connection successful!`);
        onApiStatusChange({
          ...apiStatus,
          [provider]: true
        });
      } else {
        toast.error(`${provider} connection failed. Please check your API key.`);
      }
    }, 2000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <CogIcon className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-slate-400">Configure your AI Document Intelligence Hub</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-800 rounded-lg p-1">
          {[
            { id: 'api', label: 'API Configuration' },
            { id: 'processing', label: 'Processing Settings' },
            { id: 'about', label: 'About' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API Status Overview */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">API Status Overview</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {apiStatus.landingai ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircleIcon className="w-6 h-6 text-red-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">LandingAI</p>
                      <p className="text-sm text-slate-400">
                        {apiStatus.landingai ? 'Connected' : 'Not configured'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    apiStatus.landingai ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {apiStatus.landingai ? 'Active' : 'Required'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {apiStatus.openai ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircleIcon className="w-6 h-6 text-slate-500" />
                    )}
                    <div>
                      <p className="text-white font-medium">OpenAI</p>
                      <p className="text-sm text-slate-400">
                        {apiStatus.openai ? 'Connected' : 'Optional'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    apiStatus.openai ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {apiStatus.openai ? 'Active' : 'Optional'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* LandingAI Configuration */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <KeyIcon className="w-6 h-6 text-primary-400" />
                <h3 className="text-lg font-semibold text-white">LandingAI Configuration</h3>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Required</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <InformationCircleIcon className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-amber-400 font-medium text-sm">LandingAI API Key Required</p>
                      <p className="text-amber-300 text-sm mt-1">
                        This API key is required for document processing capabilities.
                      </p>
                      <a 
                        href="https://va.landing.ai/account/api-key" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 mt-2 text-amber-400 hover:text-amber-300 text-sm underline"
                      >
                        <LinkIcon className="w-4 h-4" />
                        <span>Get your API key here</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    API Key
                  </label>
                  <div className="flex space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type={showKeys.landingai ? 'text' : 'password'}
                        value={apiKeys.landingai}
                        onChange={(e) => setApiKeys({ ...apiKeys, landingai: e.target.value })}
                        placeholder="Enter your LandingAI API key"
                        className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKeys({ ...showKeys, landingai: !showKeys.landingai })}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                      >
                        {showKeys.landingai ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <button
                      onClick={() => handleSaveApiKey('LandingAI')}
                      disabled={!apiKeys.landingai}
                      className="px-4 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleTestConnection('landingai')}
                      disabled={!apiKeys.landingai}
                      className="px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* OpenAI Configuration */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <KeyIcon className="w-6 h-6 text-accent-400" />
                <h3 className="text-lg font-semibold text-white">OpenAI Configuration</h3>
                <span className="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded">Optional</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <InformationCircleIcon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-blue-400 font-medium text-sm">Enhanced AI Chat</p>
                      <p className="text-blue-300 text-sm mt-1">
                        Add OpenAI API key for advanced GPT-4 powered document analysis and chat capabilities.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    API Key
                  </label>
                  <div className="flex space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type={showKeys.openai ? 'text' : 'password'}
                        value={apiKeys.openai}
                        onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                        placeholder="Enter your OpenAI API key (optional)"
                        className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKeys({ ...showKeys, openai: !showKeys.openai })}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                      >
                        {showKeys.openai ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <button
                      onClick={() => handleSaveApiKey('OpenAI')}
                      disabled={!apiKeys.openai}
                      className="px-4 py-3 bg-accent-500 hover:bg-accent-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleTestConnection('openai')}
                      disabled={!apiKeys.openai}
                      className="px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'processing' && (
          <div className="space-y-6">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Default Processing Settings</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-600 bg-slate-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-slate-800"
                  />
                  <div>
                    <p className="text-white font-medium">Include Marginalia</p>
                    <p className="text-slate-400 text-sm">Extract headers, footers, and page numbers</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-600 bg-slate-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-slate-800"
                  />
                  <div>
                    <p className="text-white font-medium">Include Metadata</p>
                    <p className="text-slate-400 text-sm">Preserve document metadata in extracted content</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="rounded border-slate-600 bg-slate-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-slate-800"
                  />
                  <div>
                    <p className="text-white font-medium">Save Visual Groundings</p>
                    <p className="text-slate-400 text-sm">Save bounding box images (slower processing)</p>
                  </div>
                </label>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Performance Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Batch Processing Size
                  </label>
                  <select className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="1">1 document at a time</option>
                    <option value="2">2 documents at a time</option>
                    <option value="4" selected>4 documents at a time (recommended)</option>
                    <option value="8">8 documents at a time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Processing Timeout
                  </label>
                  <select className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="60">1 minute</option>
                    <option value="120" selected>2 minutes (recommended)</option>
                    <option value="300">5 minutes</option>
                    <option value="600">10 minutes</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">AI Document Intelligence Hub</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-300 mb-4">
                    Transform any document into an intelligent, searchable knowledge base with advanced AI capabilities.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Version</h4>
                      <p className="text-slate-400">1.0.0</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Backend</h4>
                      <p className="text-slate-400">FastAPI + Python</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Frontend</h4>
                      <p className="text-slate-400">React + Tailwind CSS</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-600 pt-4">
                  <h4 className="text-white font-medium mb-3">Key Features</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Multi-format document processing (PDF, images)</li>
                    <li>• Advanced AI-powered chat interface</li>
                    <li>• Semantic content analysis and chunking</li>
                    <li>• Interactive document visualization</li>
                    <li>• Comprehensive analytics dashboard</li>
                    <li>• Multiple AI provider support</li>
                  </ul>
                </div>

                <div className="border-t border-slate-600 pt-4">
                  <h4 className="text-white font-medium mb-3">Supported File Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {['PDF', 'PNG', 'JPG', 'JPEG', 'TIFF', 'BMP'].map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 bg-primary-500/20 text-primary-300 text-sm rounded"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">System Requirements</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Python Backend</span>
                  <span className="text-slate-400">3.8+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">FastAPI</span>
                  <span className="text-slate-400">0.104+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">React Frontend</span>
                  <span className="text-slate-400">18+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Node.js</span>
                  <span className="text-slate-400">16+</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Settings;