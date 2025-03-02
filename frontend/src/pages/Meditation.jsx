import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Meditation = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Meditations' },
    { id: 'krishna', name: 'Krishna Meditation' },
    { id: 'shiva', name: 'Shiva Meditation' },
    { id: 'ganesha', name: 'Ganesha Meditation' },
  ]

  const meditations = [
    {
      id: 1,
      title: "Overcoming Fear",
      duration: "10 min",
      category: "krishna",
      instructor: "with Krishna",
      image: "/assets/meditation/krishna-fear.jpg",
      description: "Release fear and find courage through Krishna's guidance",
      level: "All Levels",
      deity: "Krishna"
    },
    {
      id: 2,
      title: "Inner Peace & Detachment",
      duration: "15 min",
      category: "shiva",
      instructor: "with Shiva",
      image: "/assets/meditation/shiva-peace.jpg",
      description: "Find stillness and let go of attachments",
      level: "All Levels",
      deity: "Shiva"
    },
    {
      id: 3,
      title: "Clarity & Wisdom",
      duration: "10 min",
      category: "ganesha",
      instructor: "with Ganesha",
      image: "/assets/meditation/ganesha-clarity.jpg",
      description: "Clear obstacles and gain mental clarity",
      level: "All Levels",
      deity: "Ganesha"
    }
  ]

  const filteredMeditations = selectedCategory === 'all' 
    ? meditations 
    : meditations.filter(m => m.category === selectedCategory)

  return (
    <div className="min-h-screen bg-dark-300 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            Divine Meditation
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience sacred meditation practices guided by divine energy
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-dark-300'
                  : 'bg-dark-100 text-gray-400 hover:bg-primary/10 hover:text-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Meditation Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredMeditations.map((meditation) => (
              <motion.div
                key={meditation.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-100 rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className="relative aspect-video">
                  <img 
                    src={meditation.image} 
                    alt={meditation.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100 to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-dark-300/80 backdrop-blur-sm px-4 py-1 rounded-full text-primary text-sm">
                    {meditation.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <span>{meditation.instructor}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{meditation.title}</h3>
                  <p className="text-gray-400 mb-4">{meditation.description}</p>
                  <motion.button
                    className="w-full flex items-center justify-center space-x-2 text-white bg-primary/20 hover:bg-primary/30 px-4 py-3 rounded-full transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Begin Meditation</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Featured Section */}
        <motion.div 
          className="mt-24 bg-dark-100 rounded-3xl p-12 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">Start Your Journey Today</h2>
            <p className="text-gray-400 mb-8 max-w-2xl">
              Join our community of meditators and experience the transformative power of guided meditation. 
              Whether you're a beginner or experienced practitioner, we have sessions perfect for your level.
            </p>
            <motion.button
              className="bg-primary text-dark-300 px-8 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Meditation 