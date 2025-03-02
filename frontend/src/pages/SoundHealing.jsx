import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SoundHealing = () => {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const frequencies = [
    {
      id: 1,
      name: "432 Hz Miracle Tone",
      frequency: "432 Hz",
      duration: "15 min",
      benefits: "Universal healing, Pure effects, Natural frequency of the universe",
      description: "Known as the miracle tone, 432 Hz resonates with the universe's natural frequency.",
      color: "from-blue-500/20 to-primary/20"
    },
    {
      id: 2,
      name: "528 Hz Love Frequency",
      frequency: "528 Hz",
      duration: "20 min",
      benefits: "DNA repair, Transformation, Miracles",
      description: "The frequency of love and miracles, helping in cellular healing and transformation.",
      color: "from-green-500/20 to-primary/20"
    },
    {
      id: 3,
      name: "639 Hz Heart Chakra",
      frequency: "639 Hz",
      duration: "25 min",
      benefits: "Relationships, Love, Heart Chakra healing",
      description: "Connects with the heart chakra, promoting love and positive relationships.",
      color: "from-pink-500/20 to-primary/20"
    },
    {
      id: 4,
      name: "741 Hz Spiritual Detox",
      frequency: "741 Hz",
      duration: "30 min",
      benefits: "Spiritual awakening, Intuition, Expression",
      description: "Cleanses the body from toxins and electromagnetic radiation.",
      color: "from-purple-500/20 to-primary/20"
    }
  ]

  const handlePlay = (trackId) => {
    setCurrentTrack(trackId)
    setIsPlaying(true)
  }

  return (
    <div className="min-h-screen bg-dark-300 pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source 
            src=".\videos\sound-healing-bg.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-dark-300/70" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            Sacred Sound Healing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the healing power of sacred frequencies. Each tone is carefully crafted to resonate with your body's natural energy centers.
          </p>
        </motion.div>

        {/* Frequency Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {frequencies.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${track.color} backdrop-blur-lg rounded-3xl p-8 border border-primary/20`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-white">{track.name}</h3>
                <span className="text-primary font-medium">{track.frequency}</span>
              </div>
              <p className="text-gray-400 mb-6">{track.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{track.duration}</span>
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => handlePlay(track.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentTrack === track.id && isPlaying
                        ? 'bg-primary text-dark-300'
                        : 'bg-primary/20 text-primary hover:bg-primary/30'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentTrack === track.id && isPlaying ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </motion.button>
                  <motion.button
                    className="text-primary hover:text-primary/80"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div 
          className="bg-dark-100/50 backdrop-blur-lg rounded-3xl p-12 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-8">Benefits of Sound Healing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Stress Reduction",
                  description: "Sacred frequencies help reduce stress and anxiety levels"
                },
                {
                  title: "Energy Balance",
                  description: "Align and balance your body's natural energy centers"
                },
                {
                  title: "Deep Healing",
                  description: "Promote cellular healing and spiritual transformation"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SoundHealing 