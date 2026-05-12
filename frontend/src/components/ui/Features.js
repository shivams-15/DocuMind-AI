import React from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  CpuChipIcon,
  EyeIcon,
  LightBulbIcon,
  ArrowPathIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Features = () => {
  const features = [
    {
      icon: DocumentTextIcon,
      title: "Multi-Format Processing",
      description: "Extract text and data from PDFs, images, tables, and complex documents with industry-leading accuracy.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "AI-Powered Chat",
      description: "Have natural conversations with your documents. Ask questions and get instant, contextual answers.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics",
      description: "Gain deep insights into document structure, content patterns, and semantic relationships.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: CpuChipIcon,
      title: "Smart AI Processing",
      description: "Powered by LandingAI and OpenAI for maximum accuracy and intelligent content understanding.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: EyeIcon,
      title: "Visual Grounding",
      description: "See exactly where information comes from with precise visual references and bounding boxes.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: LightBulbIcon,
      title: "Smart Insights",
      description: "Auto-generated summaries, key points extraction, and intelligent content categorization.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: ArrowPathIcon,
      title: "Batch Processing",
      description: "Process multiple documents simultaneously with automated workflows and bulk operations.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure & Private",
      description: "Enterprise-grade security with local processing options and complete data privacy control.",
      gradient: "from-gray-500 to-slate-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <motion.div
        className="absolute top-40 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        style={{
          animationDuration: "12s",
          animationIterationCount: "infinite"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        style={{
          animationDuration: "15s",
          animationIterationCount: "infinite",
          animationDelay: "3s"
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <CpuChipIcon className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">
              Advanced Features
            </span>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything You Need for
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Document Intelligence
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Transform your document workflow with cutting-edge AI technology. 
            From extraction to analysis, our platform handles it all with unprecedented accuracy and speed.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <motion.div
                className="relative h-full p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 overflow-hidden"
                whileHover={{ 
                  y: -8,
                  transition: { 
                    duration: 0.3, 
                    ease: "easeOut",
                    type: "spring",
                    damping: 20,
                    stiffness: 300
                  }
                }}
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl mb-4 shadow-lg`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3, type: "spring", damping: 15 }
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    damping: 20,
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <motion.h3 
                  className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {feature.title}
                </motion.h3>

                <motion.p 
                  className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {feature.description}
                </motion.p>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent)`,
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;