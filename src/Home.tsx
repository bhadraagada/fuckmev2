import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  const designs = [
    { path: '/1', name: 'Cyberpunk Terminal', description: 'Neon-lit hacker aesthetic with glitch effects' },
    { path: '/2', name: 'Brutalist Industrial', description: 'Raw concrete and steel with exposed grid systems' },
    { path: '/3', name: 'Retro CRT', description: '80s sci-fi with scanlines and phosphor glow' },
    { path: '/4', name: 'Organic Synthesis', description: 'Nature meets technology with flowing gradients' },
    { path: '/5', name: 'Editorial Luxury', description: 'Minimalist magazine aesthetic with refined typography' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-['Outfit']">
      <div className="max-w-6xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Linux MCP Suite
          </h1>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl">
            Marketing homepage designs showcase. Each design presents a unique creative direction 
            for the platform's visual identity.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {designs.map((design, index) => (
            <motion.div
              key={design.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={design.path}
                className="group block p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-emerald-400 font-mono text-sm mb-2 block">
                      Design {index + 1}
                    </span>
                    <h2 className="text-2xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {design.name}
                    </h2>
                    <p className="text-gray-500 mt-1">{design.description}</p>
                  </div>
                  <span className="text-4xl text-gray-600 group-hover:text-emerald-400 group-hover:translate-x-2 transition-all">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
