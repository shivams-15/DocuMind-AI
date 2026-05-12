import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/ui/Navbar';
import Hero from '../components/ui/Hero';
import Features from '../components/ui/Features';
import Blog from '../components/ui/Blog';
import Footer from '../components/ui/Footer';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        {/* Content sections with matching gradient background */}
        <div className="relative bg-gradient-to-br from-gray-900 via-cyan-900/20 to-purple-900/30">
          {/* Background pattern for content sections */}
          <div className="absolute inset-0 opacity-5">
            <div style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%2300FFFF\" fillOpacity=\"0.1\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
              backgroundSize: '60px 60px'
            }} className="w-full h-full" />
          </div>
          
          <Features />
          <Blog />
          <Footer />
        </div>
      </div>

      {/* Floating Elements for content sections only */}
      <motion.div
        className="fixed top-[100vh] left-10 w-2 h-2 bg-cyan-400 rounded-full opacity-40 pointer-events-none"
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="fixed top-[120vh] right-20 w-3 h-3 bg-purple-400 rounded-full opacity-30 pointer-events-none"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transform-gpu z-50 origin-left"
        style={{
          scaleX: scrollProgress
        }}
      />

      {/* Mouse Follow Effect - Only for content sections */}
      <motion.div
        className="fixed pointer-events-none z-0 w-64 h-64 rounded-full opacity-3"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)',
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          display: scrollProgress > 0.1 ? 'block' : 'none'
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
      />

      {/* Additional ambient effects for content sections */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ top: '100vh' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.12, 0.05],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </motion.div>

      {/* Particle System for content sections */}
      <div className="fixed inset-0 pointer-events-none" style={{ top: '100vh' }}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`content-particle-${i}`}
            className={`absolute w-0.5 h-0.5 rounded-full opacity-20 ${
              i % 3 === 0 ? 'bg-cyan-400' : 
              i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.4, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Loading Overlay */}
      <motion.div
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            DocuMind AI
          </motion.h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;