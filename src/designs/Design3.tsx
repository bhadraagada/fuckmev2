import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const CRTOverlay = () => (
  <>
    {/* Scanlines */}
    <div 
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)',
        animation: 'scanline 8s linear infinite',
      }}
    />
    {/* CRT curvature vignette */}
    <div 
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
      }}
    />
    {/* Phosphor flicker */}
    <div 
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.02] mix-blend-overlay"
      style={{
        animation: 'flicker 0.15s infinite',
      }}
    />
  </>
)

const PhosphorText = ({ children, className = '', color = 'green' }: { children: React.ReactNode; className?: string; color?: 'green' | 'amber' | 'cyan' }) => {
  const colors = {
    green: { main: '#39ff14', glow: '0 0 20px #39ff14, 0 0 40px #39ff14, 0 0 60px #39ff14' },
    amber: { main: '#ffb000', glow: '0 0 20px #ffb000, 0 0 40px #ffb000' },
    cyan: { main: '#00ffff', glow: '0 0 20px #00ffff, 0 0 40px #00ffff' },
  }
  
  return (
    <span 
      className={className}
      style={{ 
        color: colors[color].main,
        textShadow: colors[color].glow,
        fontFamily: 'IBM Plex Mono, monospace',
      }}
    >
      {children}
    </span>
  )
}

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([])
  const hasStarted = useRef(false)
  const bootLines = [
    'LINUX MCP SUITE v2.0.0',
    '═══════════════════════════════════════',
    'INITIALIZING SYSTEM...',
    'LOADING KERNEL MODULES.............. [OK]',
    'MOUNTING DOCKER DAEMON.............. [OK]',
    'CONFIGURING NETWORK ISOLATION....... [OK]',
    'LOADING DISTRO IMAGES............... [OK]',
    '  → KALI LINUX 2024.1',
    '  → UBUNTU 24.04 LTS', 
    '  → ARCH LINUX (ROLLING)',
    '  → AWS LINUX 2023',
    'ESTABLISHING MCP BRIDGE............. [OK]',
    'AGENT PROTOCOLS ACTIVE.............. [OK]',
    '═══════════════════════════════════════',
    'SYSTEM READY. WELCOME, OPERATOR.',
  ]

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    
    let i = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines(prev => [...prev, bootLines[i]])
        i++
      } else {
        clearInterval(interval)
        setTimeout(onComplete, 1000)
      }
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="font-mono text-sm max-w-2xl">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PhosphorText color="green">{line}</PhosphorText>
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <PhosphorText color="green">▌</PhosphorText>
        </motion.span>
      </div>
    </div>
  )
}

const RetroButton = ({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) => (
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative px-8 py-4 font-bold uppercase tracking-wider border-2 ${
      primary 
        ? 'border-[#39ff14] text-[#39ff14] bg-[#39ff14]/10 hover:bg-[#39ff14]/20' 
        : 'border-[#00ffff] text-[#00ffff] bg-transparent hover:bg-[#00ffff]/10'
    }`}
    style={{
      fontFamily: 'IBM Plex Mono, monospace',
      boxShadow: primary 
        ? '0 0 20px rgba(57,255,20,0.3), inset 0 0 20px rgba(57,255,20,0.1)' 
        : '0 0 10px rgba(0,255,255,0.2)',
    }}
  >
    {children}
  </motion.button>
)

const DataPanel = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div 
    className="border border-[#39ff14]/50 p-6"
    style={{ 
      background: 'linear-gradient(180deg, rgba(57,255,20,0.05) 0%, transparent 100%)',
      boxShadow: '0 0 20px rgba(57,255,20,0.1), inset 0 0 40px rgba(57,255,20,0.02)',
    }}
  >
    <div className="border-b border-[#39ff14]/30 pb-2 mb-4">
      <PhosphorText color="amber" className="text-xs tracking-widest">{title}</PhosphorText>
    </div>
    {children}
  </div>
)

const features = [
  { id: 'SEC-01', name: 'SANDBOX ISOLATION', status: 'ACTIVE', detail: 'Container-level security' },
  { id: 'NET-02', name: 'NETWORK POLICIES', status: 'ENFORCED', detail: 'Zero trust architecture' },
  { id: 'SYS-03', name: 'RESOURCE LIMITS', status: 'CONFIGURED', detail: 'Memory & CPU caps' },
  { id: 'LOG-04', name: 'AUDIT LOGGING', status: 'STREAMING', detail: 'Full command history' },
]

const distros = [
  { name: 'KALI LINUX', version: '2024.1', purpose: 'PENETRATION TESTING' },
  { name: 'UBUNTU', version: '24.04', purpose: 'DEVELOPMENT' },
  { name: 'ARCH LINUX', version: 'ROLLING', purpose: 'CUSTOMIZATION' },
  { name: 'AWS LINUX', version: '2023', purpose: 'CLOUD OPS' },
  { name: 'ALPINE', version: '3.19', purpose: 'CONTAINERS' },
  { name: 'DEBIAN', version: '12', purpose: 'STABILITY' },
]

export default function Design3() {
  const [booted, setBooted] = useState(true) // Skip boot sequence for now
  const [time, setTime] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.02)
        mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.02)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!booted) {
    return (
      <>
        <CRTOverlay />
        <BootSequence onComplete={() => setBooted(true)} />
      </>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative"
      style={{ fontFamily: 'IBM Plex Mono, monospace' }}
    >
      <style>{`
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100vh; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.04; }
        }
        @keyframes datastream {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
      
      <CRTOverlay />

      {/* Ambient grid */}
      <div 
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#39ff14 1px, transparent 1px), linear-gradient(90deg, #39ff14 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header bar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-[#39ff14]/30">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 border-2 border-[#39ff14] flex items-center justify-center relative overflow-hidden">
            <PhosphorText color="green" className="text-lg font-bold">MCP</PhosphorText>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#39ff14]/10 to-transparent animate-pulse" />
          </div>
          <div>
            <PhosphorText color="green" className="text-sm">LINUX MCP SUITE</PhosphorText>
            <PhosphorText color="amber" className="text-xs">v2.0.0 // STATUS: OPERATIONAL</PhosphorText>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-8"
        >
          <PhosphorText color="cyan" className="text-sm">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </PhosphorText>
          <nav className="flex gap-6 text-sm">
            <a href="#" className="text-[#39ff14]/70 hover:text-[#39ff14] transition-colors">SYSTEM</a>
            <a href="#" className="text-[#39ff14]/70 hover:text-[#39ff14] transition-colors">DISTROS</a>
            <a href="#" className="text-[#39ff14]/70 hover:text-[#39ff14] transition-colors">DOCS</a>
          </nav>
          <RetroButton>ACCESS</RetroButton>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <motion.div
          style={{ x: springX, y: springY }}
          className="relative"
        >
          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-24"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#39ff14] animate-pulse shadow-[0_0_10px_#39ff14]" />
              <PhosphorText color="amber" className="text-sm tracking-[0.3em]">SYSTEM INTERFACE</PhosphorText>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <PhosphorText color="green">
                CONTAINERIZED
                <br />
                <span style={{ textShadow: '0 0 40px #39ff14, 0 0 80px #39ff14' }}>LINUX</span>
                <br />
                <span className="text-[#00ffff]" style={{ textShadow: '0 0 30px #00ffff' }}>FOR AI AGENTS</span>
              </PhosphorText>
            </h1>
            
            <p className="text-xl text-[#39ff14]/60 max-w-2xl mb-12 leading-relaxed">
              Production-ready bridge providing AI agents with secure, isolated access to 
              specialized Linux environments for DevOps, security testing, and cloud operations.
            </p>
            
            <div className="flex gap-4">
              <RetroButton primary>INITIALIZE SYSTEM</RetroButton>
              <RetroButton>VIEW DOCUMENTATION</RetroButton>
            </div>
          </motion.section>

          {/* Stats grid */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-4 gap-4 mb-24"
          >
            {[
              { label: 'DISTROS', value: '11', unit: '+' },
              { label: 'AGENTS', value: '3', unit: '' },
              { label: 'ISOLATION', value: '100', unit: '%' },
              { label: 'UPTIME', value: '99.9', unit: '%' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="border border-[#39ff14]/30 p-6 text-center"
                style={{ background: 'linear-gradient(180deg, rgba(57,255,20,0.05) 0%, transparent 100%)' }}
              >
                <div className="text-4xl font-bold mb-2">
                  <PhosphorText color="green">{stat.value}</PhosphorText>
                  <PhosphorText color="amber" className="text-2xl">{stat.unit}</PhosphorText>
                </div>
                <PhosphorText color="cyan" className="text-xs tracking-widest">{stat.label}</PhosphorText>
              </motion.div>
            ))}
          </motion.section>

          {/* Two column layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-24">
            {/* Security status panel */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <DataPanel title="SECURITY STATUS">
                <div className="space-y-3">
                  {features.map((feature, i) => (
                    <motion.div
                      key={feature.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="flex items-center justify-between py-2 border-b border-[#39ff14]/10 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <PhosphorText color="amber" className="text-xs">{feature.id}</PhosphorText>
                        <PhosphorText color="green" className="text-sm">{feature.name}</PhosphorText>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#39ff14]/50 text-xs">{feature.detail}</span>
                        <span className="px-2 py-1 bg-[#39ff14]/20 text-[#39ff14] text-xs">
                          {feature.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </DataPanel>
            </motion.div>

            {/* Terminal preview */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <DataPanel title="TERMINAL">
                <div className="text-sm space-y-1">
                  <div><PhosphorText color="cyan">root@mcp-kali</PhosphorText><PhosphorText color="green">:</PhosphorText><PhosphorText color="amber">~</PhosphorText><PhosphorText color="green"># nmap -sV target.local</PhosphorText></div>
                  <div className="text-[#39ff14]/50">Starting Nmap 7.94 ( https://nmap.org )</div>
                  <div className="text-[#39ff14]/50">Nmap scan report for target.local (192.168.1.100)</div>
                  <div className="text-[#39ff14]/50">PORT    STATE SERVICE VERSION</div>
                  <div><PhosphorText color="green">22/tcp  open  ssh     OpenSSH 8.9</PhosphorText></div>
                  <div><PhosphorText color="green">80/tcp  open  http    nginx 1.24.0</PhosphorText></div>
                  <div><PhosphorText color="green">443/tcp open  https   nginx 1.24.0</PhosphorText></div>
                  <div className="pt-2">
                    <PhosphorText color="cyan">root@mcp-kali</PhosphorText>
                    <PhosphorText color="green">:</PhosphorText>
                    <PhosphorText color="amber">~</PhosphorText>
                    <PhosphorText color="green"># </PhosphorText>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <PhosphorText color="green">▌</PhosphorText>
                    </motion.span>
                  </div>
                </div>
              </DataPanel>
            </motion.div>
          </div>

          {/* Distros grid */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <PhosphorText color="amber" className="text-sm tracking-[0.3em]">AVAILABLE DISTRIBUTIONS</PhosphorText>
              <div className="flex-1 h-px bg-gradient-to-r from-[#ffb000]/50 to-transparent" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {distros.map((distro, i) => (
                <motion.div
                  key={distro.name}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4 + i * 0.05 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(57,255,20,0.3)' }}
                  className="border border-[#39ff14]/30 p-4 text-center cursor-pointer transition-all"
                  style={{ background: 'linear-gradient(180deg, rgba(57,255,20,0.03) 0%, transparent 100%)' }}
                >
                  <PhosphorText color="green" className="text-sm font-bold block mb-1">{distro.name}</PhosphorText>
                  <PhosphorText color="amber" className="text-xs block mb-2">{distro.version}</PhosphorText>
                  <span className="text-[#39ff14]/40 text-[10px] tracking-wider">{distro.purpose}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </main>

      {/* CTA */}
      <section className="relative z-10 border-t border-[#39ff14]/30 py-24">
        <div className="max-w-4xl mx-auto text-center px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <PhosphorText color="amber" className="text-sm tracking-[0.5em] mb-8 block">READY FOR DEPLOYMENT</PhosphorText>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <PhosphorText color="green">
                ENTER THE
                <br />
                <span className="text-[#00ffff]" style={{ textShadow: '0 0 40px #00ffff' }}>MATRIX</span>
              </PhosphorText>
            </h2>
            <p className="text-[#39ff14]/60 text-lg mb-12 max-w-xl mx-auto">
              Equip your AI agents with real operating system capabilities.
              Web dev. Pentesting. Cloud ops. All secure. All isolated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RetroButton primary>BEGIN INITIALIZATION</RetroButton>
              <RetroButton>SCHEDULE DEMO</RetroButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#39ff14]/30 py-8 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <PhosphorText color="green" className="text-xs">© 2024 LINUX MCP SUITE // ALL SYSTEMS NOMINAL</PhosphorText>
          <div className="flex gap-6">
            <a href="#" className="text-[#39ff14]/50 hover:text-[#39ff14] text-xs transition-colors">GITHUB</a>
            <a href="#" className="text-[#39ff14]/50 hover:text-[#39ff14] text-xs transition-colors">DISCORD</a>
            <a href="#" className="text-[#39ff14]/50 hover:text-[#39ff14] text-xs transition-colors">DOCS</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
