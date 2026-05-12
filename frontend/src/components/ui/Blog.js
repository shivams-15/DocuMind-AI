import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
  const blogPosts = [
    {
      title: "Going Beyond OCR+LLM: Introducing Agentic Document Extraction",
      excerpt: "Explore how LandingAI's revolutionary Agentic Document Extraction treats documents as structured visual representations, enabling more accurate and verifiable answers than traditional OCR methods.",
      author: "Ankit Khare",
      date: "2025-03-21",
      readTime: "4 min read",
      category: "AI Technology",
      image: "/blog-1.jpg",
      gradient: "from-blue-500 to-cyan-500",
      url: "https://landing.ai/blog/going-beyond-ocrllm-introducing-agentic-document-extraction"
    },
    {
      title: "Top Knowledge Management Trends - 2025",
      excerpt: "Discover how AI-KM symbiosis, enterprise semantic layers, and memory agents are transforming how organizations manage knowledge assets in the age of artificial intelligence.",
      author: "Zach Wahl",
      date: "2025-01-21",
      readTime: "12 min read",
      category: "Enterprise AI",
      image: "/blog-2.jpg",
      gradient: "from-purple-500 to-pink-500",
      url: "https://enterprise-knowledge.com/top-knowledge-management-trends-2025/"
    },
    {
      title: "Semantic Chunking for RAG: Better Context, Better Results",
      excerpt: "Learn how semantic chunking enhances RAG systems by improving context, precision, and performance through optimized chunking strategies that preserve document meaning and structure.",
      author: "Unstructured AI Team",
      date: "2024-12-10",
      readTime: "6 min read",
      category: "Machine Learning",
      image: "/blog-3.jpg",
      gradient: "from-emerald-500 to-teal-500",
      url: "https://www.multimodal.dev/post/semantic-chunking-for-rag"
    },
    {
      title: "Auto-Fill Job Applications with Agentic Document Extraction",
      excerpt: "Build powerful automation tools that extract key data from resumes using LandingAI's Agentic Document Extraction API, demonstrating practical applications of advanced document AI.",
      author: "Ankit Khare",
      date: "2025-05-29",
      readTime: "10 min read",
      category: "Platform Update",
      image: "/blog-4.jpg",
      gradient: "from-orange-500 to-red-500",
      url: "https://landing.ai/blog/auto-fill-job-applications-with-agentic-document-extraction"
    },
    {
      title: "Global Trends in Privacy, Security, and AI Regulations in 2025",
      excerpt: "Navigate the evolving landscape of privacy regulations and AI compliance, including GDPR updates, new state privacy laws, and strategies for secure document processing.",
      author: "PrivacyPerfect Team",
      date: "2025-01-28",
      readTime: "7 min read",
      category: "Security",
      image: "/blog-5.jpg",
      gradient: "from-indigo-500 to-purple-500",
      url: "https://privacyperfect.com/global-trends-in-privacy-security-and-ai-regulations-in-2025/"
    },
    {
      title: "8 Types of Chunking for RAG Systems",
      excerpt: "Master the fundamentals of text chunking for Retrieval-Augmented Generation systems, from fixed-size to semantic chunking, with practical implementations and best practices.",
      author: "Pankaj Singh",
      date: "2025-04-04",
      readTime: "9 min read",
      category: "Technology",
      image: "/blog-6.jpg",
      gradient: "from-yellow-500 to-orange-500",
      url: "https://www.analyticsvidhya.com/blog/2025/02/types-of-chunking-for-rag-systems/"
    }
  ];

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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="blog" className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        style={{
          animationDuration: "10s",
          animationIterationCount: "infinite"
        }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.3, 0.1]
        }}
        style={{
          animationDuration: "12s",
          animationIterationCount: "infinite",
          animationDelay: "2s"
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
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <UserIcon className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">
              Latest Insights
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
              Stay Updated with
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Innovation
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover the latest trends, techniques, and breakthroughs in document AI. 
            From technical deep-dives to practical implementation guides.
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onClick={() => {
                if (post.url) {
                  window.open(post.url, '_blank', 'noopener');
                }
              }}
            >
              <motion.div
                className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500"
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
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    className={`w-full h-full bg-gradient-to-br ${post.gradient} opacity-20`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className={`px-3 py-1 bg-gradient-to-r ${post.gradient} text-white text-xs font-medium rounded-full shadow-lg`}>
                      {post.category}
                    </span>
                  </motion.div>

                  {/* Fallback content for missing images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
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
                        <UserIcon className="w-12 h-12 text-white/60 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-white/80 text-sm font-medium">{post.category}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <motion.div 
                    className="flex items-center space-x-4 text-sm text-gray-400 mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3 
                    className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {post.title}
                  </motion.h3>

                  {/* Excerpt */}
                  <motion.p 
                    className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed mb-4 line-clamp-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    {post.excerpt}
                  </motion.p>

                  {/* Author & Read More */}
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-300">{post.author}</span>
                    </div>

                    <motion.button
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors group/btn"
                      whileHover={{ x: 3 }}
                    >
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(147, 51, 234, 0.1), transparent)`,
                    border: '1px solid rgba(147, 51, 234, 0.2)'
                  }}
                />
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;