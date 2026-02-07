import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const BrutalBox = ({ children, className = '', rotate = 0 }: { children: React.ReactNode; className?: string; rotate?: number }) => (
  <motion.div 
    className={`bg-[#1a1a1a] border-4 border-black shadow-[8px_8px_0_0_#000] ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
    whileHover={{ x: -4, y: -4, boxShadow: '12px 12px 0 0 #000' }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
)

const DistortedText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`relative ${className}`}>
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 text-yellow-400 translate-x-1 translate-y-1 -z-10 opacity-50">{children}</span>
  </span>
)

const StampBadge = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-block px-4 py-2 border-4 border-red-600 text-red-600 font-bold uppercase tracking-widest transform -rotate-12 ${className}`}
    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
  >
    {children}
  </div>
)

const features = [
  { num: '01', title: 'CONTAINERIZED ISOLATION', desc: 'Each environment runs in a hardened Docker container with zero access to host systems.' },
  { num: '02', title: 'MULTI-DISTRO SUPPORT', desc: '11 specialized Linux distributions pre-configured for specific tasks.' },
  { num: '03', title: 'ASYNC ARCHITECTURE', desc: 'Non-blocking Python operations for maximum throughput and responsiveness.' },
  { num: '04', title: 'AGENT AGNOSTIC', desc: 'Works with Claude, Cursor, OpenCode, and any MCP-compatible AI agent.' },
]

const distros = [
  'KALI', 'UBUNTU', 'ARCH', 'AWS', 'ALPINE', 'DEBIAN', 
  'FEDORA', 'CENTOS', 'MINT', 'MANJARO', 'PARROT'
]

export default function Design2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#e8e4dc] text-black overflow-hidden" style={{ fontFamily: 'Archivo Black, sans-serif' }}>
      {/* Noise texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.08] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Exposed grid lines */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Floating geometric shapes */}
      <motion.div 
        style={{ y: y1 }}
        className="fixed top-20 right-20 w-40 h-40 border-8 border-black bg-yellow-400 z-0"
      />
      <motion.div 
        style={{ y: y2, rotate }}
        className="fixed bottom-40 left-20 w-24 h-24 bg-red-600 z-0"
      />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 border-b-4 border-black bg-[#e8e4dc]">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <div className="w-16 h-16 bg-black text-[#e8e4dc] flex items-center justify-center text-2xl font-bold">
            MCP
          </div>
        </motion.div>
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-8"
        >
          <a href="#" className="text-black hover:text-red-600 transition-colors uppercase tracking-wider">About</a>
          <a href="#" className="text-black hover:text-red-600 transition-colors uppercase tracking-wider">Features</a>
          <a href="#" className="text-black hover:text-red-600 transition-colors uppercase tracking-wider">Docs</a>
          <button className="px-6 py-3 bg-black text-[#e8e4dc] border-4 border-black hover:bg-yellow-400 hover:text-black transition-all uppercase tracking-wider shadow-[4px_4px_0_0_#000]">
            Download
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <StampBadge className="mb-8">Production Ready</StampBadge>
            
            <h1 className="text-[8rem] md:text-[12rem] leading-[0.85] tracking-tighter mb-8">
              <DistortedText>LINUX</DistortedText>
              <br />
              <span className="text-red-600">MCP</span>
              <br />
              <span className="text-stroke text-transparent" style={{ WebkitTextStroke: '3px black' }}>SUITE</span>
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 mt-20">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="text-2xl leading-relaxed mb-8" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400 }}>
                A containerized bridge that gives AI agents access to specialized Linux environments 
                for <span className="bg-yellow-400 px-2">real DevOps</span> and 
                <span className="bg-red-600 text-white px-2 ml-1">security tasks</span>.
              </p>
              
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-black text-[#e8e4dc] text-xl uppercase tracking-wider shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all">
                  Get Started →
                </button>
                <button className="px-8 py-4 border-4 border-black text-xl uppercase tracking-wider hover:bg-black hover:text-[#e8e4dc] transition-all">
                  Learn More
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <BrutalBox className="p-8" rotate={-1}>
                <pre className="text-sm overflow-x-auto" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
{`$ docker pull linuxmcp/suite:latest

Pulling from linuxmcp/suite
━━━━━━━━━━━━━━━━━━━━ 100%

$ mcp init --distro kali
✓ Container created
✓ Network isolated  
✓ Agent bridge ready

READY FOR DEPLOYMENT`}
                </pre>
              </BrutalBox>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Distro Marquee */}
      <section className="relative z-10 py-12 bg-black text-[#e8e4dc] border-y-4 border-black overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1920] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...distros, ...distros, ...distros].map((distro, i) => (
            <span key={i} className="text-6xl tracking-widest">
              {distro} <span className="text-red-600">●</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-8 py-32 bg-[#1a1a1a] text-[#e8e4dc]">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-7xl mb-20 tracking-tighter"
          >
            CORE
            <br />
            <span className="text-yellow-400">CAPABILITIES</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.num}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BrutalBox className="p-8 bg-[#e8e4dc] text-black h-full">
                  <span className="text-8xl font-bold text-red-600 opacity-30">{feature.num}</span>
                  <h3 className="text-3xl tracking-tight mt-4 mb-4">{feature.title}</h3>
                  <p className="text-lg" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400 }}>
                    {feature.desc}
                  </p>
                </BrutalBox>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="relative z-10 px-8 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-red-600 text-xl uppercase tracking-widest mb-4 block">Architecture</span>
              <h2 className="text-6xl tracking-tighter mb-8">
                SECURITY
                <br />
                <span className="text-yellow-400">FIRST</span>
              </h2>
              <p className="text-xl mb-8" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400 }}>
                Every container runs in complete isolation. Your host machine is never exposed. 
                Network policies prevent lateral movement. It's paranoid by design.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-black text-[#e8e4dc] uppercase tracking-wider">Docker Isolation</span>
                <span className="px-4 py-2 bg-black text-[#e8e4dc] uppercase tracking-wider">Network Policies</span>
                <span className="px-4 py-2 bg-black text-[#e8e4dc] uppercase tracking-wider">Resource Limits</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Architecture diagram */}
              <div className="relative">
                <BrutalBox className="p-6 bg-yellow-400 text-black mb-4" rotate={1}>
                  <span className="text-xl">AI AGENT (Claude/Cursor/OpenCode)</span>
                </BrutalBox>
                
                <div className="flex justify-center my-2">
                  <div className="w-1 h-16 bg-black" />
                </div>
                
                <BrutalBox className="p-6 bg-red-600 text-white mb-4" rotate={-1}>
                  <span className="text-xl">MCP BRIDGE</span>
                </BrutalBox>
                
                <div className="flex justify-center my-2">
                  <div className="w-1 h-16 bg-black" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {['KALI', 'UBUNTU', 'ARCH'].map((distro, i) => (
                    <BrutalBox key={distro} className="p-4 bg-[#1a1a1a] text-[#e8e4dc] text-center" rotate={(i - 1) * 2}>
                      <span className="text-sm">{distro}</span>
                    </BrutalBox>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-8 py-20 bg-black text-[#e8e4dc]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '11+', label: 'DISTROS' },
            { value: '3', label: 'AGENTS' },
            { value: '100%', label: 'ISOLATED' },
            { value: '10x', label: 'FASTER' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-7xl md:text-8xl font-bold text-yellow-400">{stat.value}</div>
              <div className="text-xl tracking-widest mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-8 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <StampBadge className="mb-8 scale-150">Deploy Now</StampBadge>
            
            <h2 className="text-6xl md:text-8xl tracking-tighter mb-8">
              BUILD
              <br />
              <span className="text-red-600">SOMETHING</span>
              <br />
              BRUTAL
            </h2>
            
            <p className="text-2xl mb-12" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 400 }}>
              Give your AI the power of raw Linux.
              No compromises. No abstractions. Just pure capability.
            </p>
            
            <button className="px-16 py-6 bg-black text-[#e8e4dc] text-2xl uppercase tracking-wider shadow-[12px_12px_0_0_#dc2626] hover:shadow-[16px_16px_0_0_#dc2626] hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all">
              Start Building →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-12 bg-black text-[#e8e4dc] border-t-4 border-[#e8e4dc]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#e8e4dc] text-black flex items-center justify-center font-bold">
              MCP
            </div>
            <span>© 2024 LINUX MCP SUITE</span>
          </div>
          <div className="flex gap-8 uppercase tracking-widest text-sm">
            <a href="#" className="hover:text-yellow-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Discord</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
