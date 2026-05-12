import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Bars3Icon, 
  DocumentTextIcon,
  CogIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Header = ({ selectedDocument, onToggleSidebar }) => {
  const navigate = useNavigate();
  const { logout, username } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onToggleSidebar}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bars3Icon className="w-6 h-6" />
          </motion.button>
          
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <DocumentTextIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                DocuMind AI
              </h1>
              {selectedDocument && (
                <motion.p 
                  className="text-sm text-gray-400 truncate max-w-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {selectedDocument.filename}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <motion.div
            className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <UserIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">{username}</span>
          </motion.div>

          <motion.button 
            onClick={() => navigate('/landing')}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Go to Landing Page"
          >
            <HomeIcon className="w-5 h-5" />
          </motion.button>
          
          <motion.button 
            onClick={() => navigate('/settings')}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Settings"
          >
            <CogIcon className="w-5 h-5" />
          </motion.button>

          <motion.button 
            onClick={handleLogout}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;