import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const GlitchText = ({ children, className }: { children: string; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 150)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={isGlitching ? 'animate-pulse' : ''}>{children}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0.5 text-cyan-400 opacity-80 mix-blend-screen">{children}</span>
          <span className="absolute top-0 -left-0.5 text-red-500 opacity-80 mix-blend-screen">{children}</span>
        </>
      )}
    </span>
  )
}

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('')
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, 30)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])
  
  return <span>{displayedText}<span className="animate-pulse">▌</span></span>
}

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, { duration })
    return controls.stop
  }, [count, value, duration])

  useEffect(() => {
    return rounded.on('change', (latest) => setDisplayValue(latest))
  }, [rounded])

  return <span>{displayValue}</span>
}

const TerminalWindow = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-black/80 border border-cyan-500/30 rounded-lg overflow-hidden backdrop-blur-xl">
    <div className="flex items-center gap-2 px-4 py-2 bg-cyan-950/50 border-b border-cyan-500/30">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <span className="text-cyan-400/70 text-sm font-mono ml-2">{title}</span>
    </div>
    <div className="p-6 font-mono text-sm">{children}</div>
  </div>
)

const NeonLine = ({ className }: { className?: string }) => (
  <div className={`h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent ${className}`}>
    <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" />
  </div>
)

const distros = [
  { name: 'Kali Linux', icon: '🐉', desc: 'Penetration Testing' },
  { name: 'Ubuntu', icon: '🟠', desc: 'Development' },
  { name: 'Arch Linux', icon: '🔵', desc: 'Custom Builds' },
  { name: 'AWS Linux', icon: '☁️', desc: 'Cloud Ops' },
  { name: 'Alpine', icon: '⛰️', desc: 'Containers' },
  { name: 'Debian', icon: '🌀', desc: 'Stable Base' },
]

const features = [
  { title: '11 SPECIALIZED DISTROS', value: 11, suffix: '+', desc: 'Pre-configured Linux environments' },
  { title: 'UNIVERSAL AGENT SUPPORT', value: 3, suffix: '', desc: 'Claude, Cursor, OpenCode' },
  { title: 'ISOLATED SANDBOXES', value: 100, suffix: '%', desc: 'Security-first architecture' },
  { title: 'ASYNC OPERATIONS', value: 10, suffix: 'x', desc: 'Faster than sync alternatives' },
]

export default function Design1() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#050510] text-white font-['JetBrains_Mono'] overflow-hidden relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.15) 0%, transparent 50%),
          linear-gradient(to bottom, #050510 0%, #0a0a20 100%)
        `
      }}
    >
      {/* Scanlines overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
        }}
      />
      
      {/* Grid background */}
      <div 
        className="fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 10,
              opacity: 0 
            }}
            animate={{
              y: -10,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-cyan-500/20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-black font-bold">
            MCP
          </div>
          <span className="text-cyan-400 text-lg">LINUX_MCP_SUITE</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">FEATURES</a>
          <a href="#distros" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">DISTROS</a>
          <a href="#docs" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">DOCS</a>
          <button className="px-6 py-2 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-500/30 transition-all text-sm">
            GET_ACCESS
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs mb-6">
                ● SYSTEM ONLINE — v2.0.0
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <GlitchText className="text-white">LINUX</GlitchText>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  MCP SUITE
                </span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Production-ready containerized bridge giving AI agents access to 
                <span className="text-cyan-400"> specialized Linux environments</span> for real DevOps and security tasks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all">
                INITIALIZE_SUITE
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="px-8 py-4 border border-gray-700 text-gray-300 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                VIEW_DOCS
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TerminalWindow title="linux-mcp-suite — bash">
              <div className="space-y-2 text-green-400">
                <p><span className="text-cyan-400">$</span> <TypewriterText text="mcp init --distro kali --agent claude" delay={500} /></p>
                <p className="text-gray-500 mt-4">Initializing sandbox environment...</p>
                <p className="text-yellow-400">→ Pulling kali-linux:latest</p>
                <p className="text-yellow-400">→ Configuring network isolation</p>
                <p className="text-yellow-400">→ Setting up agent bridge</p>
                <p className="text-green-400 mt-4">✓ Environment ready in 2.3s</p>
                <p className="text-cyan-400 mt-4">$ <span className="text-white">nmap -sV target.local</span></p>
                <p className="text-gray-400">Starting Nmap 7.94 scan...</p>
              </div>
            </TerminalWindow>
          </motion.div>
        </div>
      </section>

      <NeonLine className="opacity-50" />

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gradient-to-b from-cyan-500/5 to-transparent border border-cyan-500/10 rounded-xl"
            >
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                <AnimatedCounter value={feature.value} />{feature.suffix}
              </div>
              <div className="text-cyan-400 text-xs tracking-wider mb-2">{feature.title}</div>
              <div className="text-gray-500 text-sm">{feature.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Distros Grid */}
      <section id="distros" className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-cyan-400">[</span> AVAILABLE_DISTROS <span className="text-cyan-400">]</span>
          </h2>
          <p className="text-gray-500">Pre-configured environments for every use case</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {distros.map((distro, index) => (
            <motion.div
              key={distro.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group p-6 bg-black/50 border border-cyan-500/20 rounded-xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all cursor-pointer"
            >
              <div className="text-4xl mb-3">{distro.icon}</div>
              <div className="text-white font-bold text-sm mb-1">{distro.name}</div>
              <div className="text-cyan-400/60 text-xs">{distro.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Code Example Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-cyan-400">ASYNC</span> PYTHON
                <br />ARCHITECTURE
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Built on modern async Python and Docker for blazing-fast operations. 
                Execute commands, manage containers, and orchestrate complex workflows without blocking.
              </p>
              <ul className="space-y-4">
                {['Non-blocking command execution', 'Parallel container management', 'Real-time streaming output'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <span className="w-6 h-6 bg-cyan-500/20 rounded flex items-center justify-center text-cyan-400 text-xs">✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TerminalWindow title="example.py">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-300">
{`from linux_mcp import MCPSuite

async def main():
    `}<span className="text-cyan-400"># Initialize with Kali Linux</span>{`
    suite = await MCPSuite.create(
        distro=`}<span className="text-green-400">"kali"</span>{`,
        agent=`}<span className="text-green-400">"claude"</span>{`
    )
    
    `}<span className="text-cyan-400"># Execute security scan</span>{`
    result = await suite.execute(`}<span className="text-green-400">"""
        nmap -sV -sC target.local
    """</span>{`)
    
    `}<span className="text-cyan-400"># Stream real-time output</span>{`
    async for line in result.stream():
        print(line)
`}
                </code>
              </pre>
            </TerminalWindow>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              READY TO DEPLOY?
            </span>
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            Give your AI agents the power of real Linux environments. Secure, isolated, and ready for production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-lg rounded-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all">
              START_FREE_TRIAL
            </button>
            <button className="px-12 py-5 border border-gray-700 text-gray-300 text-lg rounded-lg hover:border-cyan-500/50 transition-all">
              SCHEDULE_DEMO
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center text-black text-xs font-bold">
              MCP
            </div>
            <span className="text-gray-400 text-sm">© 2024 Linux MCP Suite. All systems operational.</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Discord</a>
            <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
