import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  SparklesIcon, 
  ArrowRightIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Left Bottom Corner Teal-Blue-Black Gradient with Fading Effect */}
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] z-0">
        {/* Main gradient spreading from corner */}
        <motion.div 
          className="w-full h-full bg-gradient-to-tr from-teal-500/70 via-blue-600/50 via-blue-800/30 to-black/0 rounded-full blur-[120px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Secondary layer for smoother blend */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-gradient-to-tr from-teal-400/40 via-blue-500/25 via-slate-900/15 to-transparent rounded-full blur-[100px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        />
        {/* Third layer for subtle cyan highlights */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-gradient-to-tr from-cyan-400/30 via-blue-700/20 to-black/0 rounded-full blur-[80px]"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.6 }}
        />
      </div>

      {/* Right Side Background GIF */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-screen z-0 lg:block hidden"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
      >
        <img 
          src="/animation-gif.gif"
          alt="AI Document Processing Animation"
          className="w-full h-full object-contain object-center"
          style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)'
          }}
          onError={(e) => {
            // Fallback gradient background
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'radial-gradient(ellipse at center, rgba(0, 255, 255, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%)';
          }}
        />
        {/* Subtle gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/10" />
      </motion.div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Left Content - Positioned to avoid GIF overlap */}
        <div className="flex items-center min-h-[80vh]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl space-y-8 lg:max-w-[55%]"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
            >
              <SparklesIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">
                Powered by Advanced AI
              </span>
            </motion.div>

            {/* Main Heading - Completely rewritten */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            >
              <span className="block text-white mb-2">
                Unlock the
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Hidden Intelligence
              </span>
              <span className="block text-white">
                in Every Document
              </span>
            </motion.h1>

            {/* Subheading - Completely rewritten */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8"
            >
              Transform static files into dynamic knowledge repositories. Our AI doesn't just read documents—
              <span className="text-cyan-400 font-medium"> it understands, analyzes, and converses </span>
              with your content like never before.
            </motion.p>

            {/* Feature highlights instead of stats */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.div 
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-300">Multi-format extraction</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-300">Conversational AI</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-300">Deep insights</span>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Button - Updated text */}
            <motion.div
              variants={itemVariants}
              className="mb-12"
            >
              <motion.button
                onClick={() => navigate('/app')}
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 overflow-hidden text-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center space-x-3">
                  <DocumentTextIcon className="w-6 h-6" />
                  <span>Begin Document Intelligence</span>
                  <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </motion.button>
            </motion.div>

            {/* Value proposition instead of stats */}
            <motion.div
              variants={itemVariants}
              className="max-w-2xl"
            >
              <motion.p 
                className="text-lg text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                From PDFs to images, tables to charts—our platform extracts meaning from any document format. 
                Ask questions, get instant answers, and discover insights you never knew existed in your files.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile GIF Display */}
      <motion.div 
        className="lg:hidden absolute inset-0 z-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <img 
          src="/animation-gif.gif"
          alt="AI Document Processing Animation"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center backdrop-blur-sm"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full mt-2"
            animate={{ height: [8, 16, 8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;