import React from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How it Works', href: '#features' },
      { name: 'API Documentation', href: '#' },
      { name: 'Integrations', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    resources: [
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Tutorials', href: '#' },
      { name: 'Case Studies', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Security', href: '#' }
    ]
  };

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/10">
      {/* Background Effects */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        style={{
          animationDuration: "15s",
          animationIterationCount: "infinite"
        }}
      />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                DocuMind AI
              </span>
            </motion.div>

            <motion.p
              className="text-gray-400 mb-6 leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Transform your documents into intelligent, searchable knowledge bases with cutting-edge AI technology. 
              Experience the future of document processing today.
            </motion.p>

            <motion.div
              className="space-y-3"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                <span>contact@documind.ai</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <PhoneIcon className="w-5 h-5 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-400"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <MapPinIcon className="w-5 h-5 text-blue-400" />
                <span>San Francisco, CA</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                variants={itemVariants}
              >
                <motion.h3 
                  className="text-white font-semibold mb-4 capitalize"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {category.replace('_', ' ')}
                </motion.h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li 
                      key={linkIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                        whileHover={{ x: 3 }}
                      >
                        {link.name}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          variants={itemVariants}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Updated with AI Innovation
              </h3>
              <p className="text-gray-400">
                Get the latest updates on document AI, new features, and industry insights delivered to your inbox.
              </p>
            </motion.div>

            <motion.div 
              className="flex space-x-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
              </div>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          variants={itemVariants}
        >
          <motion.div 
            className="text-gray-400 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            © 2024 DocuMind AI. All rights reserved.
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              // Twitter
              "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
              // LinkedIn
              "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
              // Pinterest
              "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.989C24.007 5.367 18.641.001 12.017.001z",
              // GitHub
              "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            ].map((path, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={path}/>
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;