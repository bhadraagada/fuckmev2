import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const GlowingOrb = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
)

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-emerald-400/50"
    initial={{ y: '100vh', x: Math.random() * window.innerWidth, opacity: 0 }}
    animate={{
      y: '-10vh',
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      repeat: Infinity,
      delay,
      ease: 'linear',
    }}
  />
)

const BioCard = ({ children, className = '', glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    className={`relative overflow-hidden rounded-3xl ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: glow ? '0 0 60px rgba(52,211,153,0.15)' : 'none',
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-50" />
    <div className="relative z-10">{children}</div>
  </motion.div>
)

const FeatureItem = ({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="flex gap-4 items-start"
  >
    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-blue-500/20 flex items-center justify-center text-2xl border border-white/10 shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>{description}</p>
    </div>
  </motion.div>
)

const distros = [
  { name: 'Kali Linux', icon: '🔮', tagline: 'Penetration Testing' },
  { name: 'Ubuntu', icon: '🌿', tagline: 'Development' },
  { name: 'Arch Linux', icon: '💎', tagline: 'Customization' },
  { name: 'AWS Linux', icon: '☁️', tagline: 'Cloud Native' },
  { name: 'Alpine', icon: '🏔️', tagline: 'Lightweight' },
  { name: 'Debian', icon: '🌊', tagline: 'Stability' },
]

export default function Design4() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 20, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 20, damping: 30 })

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 30)
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#050a09] text-white overflow-hidden"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Custom cursor glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)',
          left: cursorPos.x - 192,
          top: cursorPos.y - 192,
        }}
      />

      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GlowingOrb className="w-[600px] h-[600px] bg-emerald-500/30 -top-40 -left-40" delay={0} />
        <GlowingOrb className="w-[800px] h-[800px] bg-blue-500/20 top-1/3 -right-60" delay={2} />
        <GlowingOrb className="w-[500px] h-[500px] bg-teal-500/25 bottom-0 left-1/3" delay={4} />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Mesh gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(52,211,153,0.2) 0%, transparent 50%),
            radial-gradient(at 80% 70%, rgba(59,130,246,0.2) 0%, transparent 50%),
            radial-gradient(at 50% 50%, rgba(20,184,166,0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-40 px-8 py-6"
        style={{ 
          background: 'linear-gradient(180deg, rgba(5,10,9,0.9) 0%, transparent 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            style={{ x: springX, y: springY }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <span className="text-black font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>MCP</span>
            </div>
            <span className="text-lg font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>Linux MCP Suite</span>
          </motion.div>
          
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-6 text-sm text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#distros" className="hover:text-white transition-colors">Distros</a>
              <a href="#docs" className="hover:text-white transition-colors">Docs</a>
            </nav>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-semibold text-sm"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center px-8 pt-24"
      >
        <motion.div
          style={{ x: springX, y: springY }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-400/10 text-emerald-400 text-sm mb-8 border border-emerald-400/20">
              ✨ Introducing Linux MCP Suite v2.0
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]" style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-blue-400">
                Give AI Agents
              </span>
              <br />
              <span className="text-white">
                Real Linux Power
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              A production-ready containerized bridge providing secure, isolated access to 
              specialized Linux environments. Web development. Penetration testing. Cloud operations.
              All without risking your host machine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(52,211,153,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 text-black font-semibold text-lg shadow-lg shadow-emerald-500/20"
              >
                Start Free Trial →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl border border-white/20 text-white font-medium text-lg"
              >
                View Documentation
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="relative z-10 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '11+', label: 'Linux Distros', icon: '🐧' },
              { value: '3', label: 'AI Agents', icon: '🤖' },
              { value: '100%', label: 'Isolated', icon: '🔒' },
              { value: '10x', label: 'Faster Async', icon: '⚡' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <BioCard className="p-8 text-center">
                  <span className="text-3xl mb-4 block">{stat.icon}</span>
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-400 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </BioCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-emerald-400 text-sm uppercase tracking-widest mb-4 block">Core Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Built for Security
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FeatureItem
                icon="🛡️"
                title="Sandbox Isolation"
                description="Every environment runs in a hardened Docker container with zero access to host systems. Complete network isolation prevents lateral movement."
                delay={0.1}
              />
              <FeatureItem
                icon="🔄"
                title="Async Architecture"
                description="Non-blocking Python operations for maximum throughput. Execute commands, manage containers, and orchestrate workflows without waiting."
                delay={0.2}
              />
              <FeatureItem
                icon="🤝"
                title="Universal Agent Support"
                description="Works seamlessly with Claude, Cursor, OpenCode, and any MCP-compatible AI agent. One bridge, infinite possibilities."
                delay={0.3}
              />
              <FeatureItem
                icon="📊"
                title="Real-time Streaming"
                description="Watch command output as it happens. No waiting for completion. Get instant feedback on long-running operations."
                delay={0.4}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BioCard className="p-8" glow>
                <pre className="text-sm overflow-x-auto text-gray-300">
                  <code>
{`from linux_mcp import MCPSuite

async def main():
    `}<span className="text-emerald-400"># Initialize with Kali Linux</span>{`
    suite = await MCPSuite.create(
        distro=`}<span className="text-teal-400">"kali"</span>{`,
        agent=`}<span className="text-teal-400">"claude"</span>{`
    )
    
    `}<span className="text-emerald-400"># Run penetration test</span>{`
    async for line in suite.stream(`}<span className="text-teal-400">"""
        nmap -sV -sC target.local
    """</span>{`):
        print(line)
    
    `}<span className="text-emerald-400"># Cleanup automatically</span>{`
    await suite.destroy()`}
                  </code>
                </pre>
              </BioCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Distros Grid */}
      <section id="distros" className="relative z-10 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-emerald-400 text-sm uppercase tracking-widest mb-4 block">Pre-configured Environments</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
              11 Specialized Distros
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Each distribution is optimized for its purpose, pre-loaded with essential tools, and ready to deploy in seconds.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {distros.map((distro, i) => (
              <motion.div
                key={distro.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <BioCard className="p-6 text-center cursor-pointer group">
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {distro.icon}
                  </motion.div>
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-emerald-400 transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {distro.name}
                  </h3>
                  <span className="text-gray-500 text-xs">{distro.tagline}</span>
                </BioCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <BioCard className="p-16" glow>
              <span className="text-emerald-400 text-sm uppercase tracking-widest mb-6 block">Ready to Deploy?</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-blue-400">
                  Start Building Today
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Give your AI agents the power they need. Secure, isolated, and production-ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(52,211,153,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 text-black font-bold text-lg"
                >
                  Get Started Free →
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-2xl border border-white/20 text-white font-medium text-lg hover:bg-white/5 transition-colors"
                >
                  Schedule Demo
                </motion.button>
              </div>
            </BioCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <span className="text-black text-xs font-bold">MCP</span>
            </div>
            <span className="text-gray-500 text-sm">© 2024 Linux MCP Suite. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Discord</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
