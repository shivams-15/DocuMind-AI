import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Authentication
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import Login from './pages/Login';

// UI Components
import LandingPage from './pages/LandingPage';
import Header from './components/ui/Header';
import Sidebar from './components/ui/Sidebar';

// Original Components
import Dashboard from './components/Dashboard';
import DocumentViewer from './components/DocumentViewer';
import ChatInterface from './components/ChatInterface';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

// Services
import { apiService } from './services/apiService';

// Styles
import './index.css';

function AppContent() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [apiStatus, setApiStatus] = useState({ landingai: false, openai: false });
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isAppRoute = ['/app', '/document', '/chat', '/analytics', '/settings'].some(route =>
    location.pathname.startsWith(route)
  );

  const initializeApp = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Check API status
      const status = await apiService.getApiStatus();
      setApiStatus(status);
      
      // Load existing documents
      const docs = await apiService.getDocuments();
      setDocuments(docs);
      
      // Select first document if available
      if (docs.length > 0 && !selectedDocument) {
        setSelectedDocument(docs[0]);
      }
    } catch (error) {
      console.error('Failed to initialize app:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDocument]);

  useEffect(() => {
    if (isAppRoute) {
      initializeApp();
    } else {
      setIsLoading(false);
    }
  }, [isAppRoute, initializeApp]);

  const handleDocumentUpload = async (file, settings) => {
    try {
      const result = await apiService.uploadDocument(file, settings);
      
      // Refresh documents list
      const docs = await apiService.getDocuments();
      setDocuments(docs);
      
      // Select the newly uploaded document
      const newDoc = docs.find(doc => doc.id === result.document_id);
      if (newDoc) {
        setSelectedDocument(newDoc);
        // Navigate to dashboard after upload
        navigate('/app');
      }
      
      return result;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  const handleDocumentDelete = async (documentId) => {
    try {
      await apiService.deleteDocument(documentId);
      
      // Remove from local state
      setDocuments(docs => docs.filter(doc => doc.id !== documentId));
      
      // Clear selection if deleted document was selected
      if (selectedDocument?.id === documentId) {
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  };

  const handleChatClick = (document = selectedDocument) => {
    if (document) {
      setSelectedDocument(document);
      navigate(`/chat/${document.id}`);
    }
  };

  const handleAnalyticsClick = (document = selectedDocument) => {
    if (document) {
      setSelectedDocument(document);
      navigate(`/analytics/${document.id}`);
    }
  };

  const handleViewClick = (document = selectedDocument) => {
    if (document) {
      setSelectedDocument(document);
      navigate(`/document/${document.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route path="/*" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(15, 23, 42, 0.95)',
                  color: '#f1f5f9',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }
              }}
            />

            <Header
              selectedDocument={selectedDocument}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            <div className="flex">
              <Sidebar
                isOpen={sidebarOpen}
                documents={documents}
                selectedDocument={selectedDocument}
                onDocumentSelect={setSelectedDocument}
                onDocumentUpload={handleDocumentUpload}
                onDocumentDelete={handleDocumentDelete}
                onChatClick={handleChatClick}
                onAnalyticsClick={handleAnalyticsClick}
                onViewClick={handleViewClick}
              />

              <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} pt-16`}>
                <Routes>
                  <Route
                    path="/app"
                    element={
                      <Dashboard
                        documents={documents}
                        selectedDocument={selectedDocument}
                        onDocumentSelect={setSelectedDocument}
                        onDocumentUpload={handleDocumentUpload}
                        onChatClick={handleChatClick}
                        onAnalyticsClick={handleAnalyticsClick}
                        onViewClick={handleViewClick}
                      />
                    }
                  />
                  <Route
                    path="/document/:id"
                    element={
                      <DocumentViewer
                        document={selectedDocument}
                      />
                    }
                  />
                  <Route
                    path="/chat/:id"
                    element={
                      <ChatInterface
                        document={selectedDocument}
                        apiStatus={apiStatus}
                        apiService={apiService}
                      />
                    }
                  />
                  <Route
                    path="/analytics/:id"
                    element={
                      <Analytics
                        document={selectedDocument}
                      />
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <Settings
                        apiStatus={apiStatus}
                        onApiStatusChange={setApiStatus}
                      />
                    }
                  />
                </Routes>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;