import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || error.message);
      }
    );
  }

  // API Status
  async getApiStatus() {
    return this.client.get('/api/status');
  }

  // Document Management
  async uploadDocument(file, settings = {}) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('include_marginalia', settings.include_marginalia ?? true);
    formData.append('include_metadata', settings.include_metadata ?? true);
    formData.append('save_groundings', settings.save_groundings ?? false);

    return this.client.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 minutes for large files
    });
  }

  async getDocuments() {
    return this.client.get('/api/documents');
  }

  async getDocument(documentId) {
    return this.client.get(`/api/documents/${documentId}`);
  }

  async deleteDocument(documentId) {
    return this.client.delete(`/api/documents/${documentId}`);
  }

  // Smart Prompts
  async getSmartPrompts(documentId) {
    return this.client.get(`/api/documents/${documentId}/prompts`);
  }

  // Chat Functionality
  async chatWithDocument(documentId, question, provider = 'openai') {
    const formData = new FormData();
    formData.append('question', question);
    formData.append('provider', provider);

    return this.client.post(`/api/documents/${documentId}/chat`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getChatHistory(documentId) {
    return this.client.get(`/api/documents/${documentId}/chat`);
  }

  async clearChatHistory(documentId) {
    return this.client.delete(`/api/documents/${documentId}/chat`);
  }

  // Utility Methods
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

export const apiService = new ApiService();