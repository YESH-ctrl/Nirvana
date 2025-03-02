import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'

const DivineChat = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState('krishna') // Default guide
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const mediaRecorder = useRef(null)
  const audioChunks = useRef([])
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  const spiritualGuides = {
    krishna: {
      name: "Lord Krishna",
      avatar: "🕉️",
      greeting: "Namaste! I am Krishna, your guide on the path of dharma. How may I assist you today?",
      description: "Wisdom from the Bhagavad Gita",
      bgColor: "from-blue-500/50 to-primary/50"
    },
    shiva: {
      name: "Lord Shiva",
      avatar: "🕉️",
      greeting: "Om Namah Shivaya! I am Shiva, the destroyer of ignorance. What wisdom do you seek?",
      description: "Transformation and enlightenment",
      bgColor: "from-indigo-500/50 to-primary/50"
    },
    ganesha: {
      name: "Lord Ganesha",
      avatar: "🕉️",
      greeting: "Om Gam Ganapataye Namaha! I am Ganesha, remover of obstacles. How may I help you on your journey?",
      description: "Wisdom and new beginnings",
      bgColor: "from-red-500/50 to-primary/50"
    }
  }

  // Quick suggestions based on selected guide
  const quickResponses = {
    krishna: [
      "Tell me about karma yoga",
      "Guide me through the Gita",
      "How to find my dharma?",
      "Explain divine consciousness"
    ],
    shiva: [
      "Teach me meditation",
      "Understanding consciousness",
      "Path to enlightenment",
      "Power of transformation"
    ],
    ganesha: [
      "Remove my obstacles",
      "Bless my new beginning",
      "Path to success",
      "Finding inner wisdom"
    ]
  }

  useEffect(() => {
    // Reset chat when guide changes
    setMessages([
      {
        id: Date.now(),
        text: spiritualGuides[selectedGuide].greeting,
        isBot: true
      }
    ])
  }, [selectedGuide])

  const handleGuideChange = (guide) => {
    setSelectedGuide(guide)
  }

  const handleQuickResponse = (text) => {
    addMessage(text, false)
    simulateBotResponse()
  }

  const addMessage = (text, isBot) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      isBot,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    }
    setMessages(prev => [...prev, newMessage])
  }

  const simulateBotResponse = () => {
    setIsTyping(true)
    const responses = [
      "I sense your spiritual curiosity. Let me guide you with divine wisdom...",
      "Your journey is unique. Here's what the universe wants you to know...",
      "That's an insightful question. Let me share some spiritual guidance...",
    ]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    setTimeout(() => {
      setIsTyping(false)
      addMessage(randomResponse, true)
    }, 2000)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)
      audioChunks.current = []

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data)
        }
      }

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
        handleVoiceInput("Voice message received")
      }

      mediaRecorder.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Please enable microphone access to use voice input')
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop()
      setIsRecording(false)
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  const handleVoiceInput = (text) => {
    addMessage(text, false)
    simulateBotResponse()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    addMessage(inputMessage, false)
    setInputMessage('')
    simulateBotResponse()
  }

  return (
    <div className="min-h-screen bg-dark-300 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Guide Selection */}
        <motion.div 
          className="bg-dark-100 rounded-3xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl text-white mb-4">Choose Your Spiritual Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(spiritualGuides).map(([key, guide]) => (
              <motion.button
                key={key}
                onClick={() => handleGuideChange(key)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  selectedGuide === key
                    ? 'border-primary bg-gradient-to-r ' + guide.bgColor
                    : 'border-primary/20 hover:border-primary/40'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl mb-2">{guide.avatar}</div>
                <h3 className="text-white font-semibold">{guide.name}</h3>
                <p className="text-gray-400 text-sm">{guide.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="bg-dark-100 rounded-3xl shadow-2xl overflow-hidden border border-primary/20">
          {/* Chat Header */}
          <div className="bg-dark-200 border-b border-primary/20 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/50 flex items-center justify-center text-2xl">
                {spiritualGuides[selectedGuide].avatar}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{spiritualGuides[selectedGuide].name}</h1>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  <span className="text-sm text-gray-400">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-[500px] overflow-y-auto p-6">
            <div className="space-y-4">
              {/* Quick Response Suggestions */}
              <div className="flex flex-wrap gap-2 mb-6">
                {quickResponses[selectedGuide].map((response, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="px-4 py-2 bg-dark-200 text-primary rounded-full text-sm hover:bg-primary/10 transition-colors border border-primary/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {response}
                  </motion.button>
                ))}
              </div>

              {/* Messages */}
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-2xl px-6 py-3 ${
                        message.isBot 
                          ? 'bg-dark-200 text-white' 
                          : 'bg-primary text-dark-300'
                      }`}
                    >
                      <p className="text-lg">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-dark-200 rounded-2xl px-6 py-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-primary/20 p-6 bg-dark-200">
            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
              <motion.button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-3 rounded-full ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-primary hover:bg-primary/90'
                } text-dark-300 transition-all`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isRecording ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  )}
                </svg>
              </motion.button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask ${spiritualGuides[selectedGuide].name} anything...`}
                className="flex-1 px-6 py-3 bg-dark-300 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

              <motion.button
                type="submit"
                className="px-6 py-3 bg-primary text-dark-300 rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputMessage.trim()}
              >
                Send
              </motion.button>
            </form>
          </div>
        </div>

        {/* Features or Tips Section */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <motion.div
            className="p-4 bg-dark-200 rounded-xl shadow-sm border border-primary/20"
            whileHover={{ y: -5 }}
          >
            <div className="text-2xl mb-2">🧘‍♀️</div>
            <h3 className="font-medium text-white">Meditation Tips</h3>
            <p className="text-sm text-gray-400">Ask for guided meditation sessions</p>
          </motion.div>

          <motion.div
            className="p-4 bg-dark-200 rounded-xl shadow-sm border border-primary/20"
            whileHover={{ y: -5 }}
          >
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-medium text-white">Spiritual Guidance</h3>
            <p className="text-sm text-gray-400">Get personalized spiritual advice</p>
          </motion.div>

          <motion.div
            className="p-4 bg-dark-200 rounded-xl shadow-sm border border-primary/20"
            whileHover={{ y: -5 }}
          >
            <div className="text-2xl mb-2">🎵</div>
            <h3 className="font-medium text-white">Sound Healing</h3>
            <p className="text-sm text-gray-400">Discover healing frequencies</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DivineChat 