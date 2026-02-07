import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

const MagazineHeading = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h2 
    className={`font-normal leading-[0.95] tracking-tight ${className}`}
    style={{ fontFamily: 'Playfair Display, serif' }}
  >
    {children}
  </h2>
)

const EditorialText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p 
    className={`leading-relaxed ${className}`}
    style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}
  >
    {children}
  </p>
)

const VerticalText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span 
    className={`writing-vertical text-xs tracking-[0.4em] uppercase ${className}`}
    style={{ writingMode: 'vertical-rl', fontFamily: 'Outfit, sans-serif' }}
  >
    {children}
  </span>
)

const features = [
  {
    number: '01',
    title: 'Containerized Isolation',
    body: 'Every environment runs in a hardened Docker container. Your host machine remains completely protected from any operations executed within the sandbox.',
  },
  {
    number: '02',
    title: 'Multi-Distro Support',
    body: 'Eleven specialized Linux distributions pre-configured for specific workflows. From penetration testing with Kali to cloud operations with AWS Linux.',
  },
  {
    number: '03',
    title: 'Async Architecture',
    body: 'Built on modern async Python for non-blocking operations. Execute commands, manage containers, and stream output without waiting.',
  },
  {
    number: '04',
    title: 'Universal Compatibility',
    body: 'Works seamlessly with Claude, Cursor, OpenCode, and any MCP-compatible AI agent. One integration, endless possibilities.',
  },
]

const distros = [
  { name: 'Kali', purpose: 'Security' },
  { name: 'Ubuntu', purpose: 'Development' },
  { name: 'Arch', purpose: 'Custom' },
  { name: 'AWS', purpose: 'Cloud' },
  { name: 'Alpine', purpose: 'Containers' },
  { name: 'Debian', purpose: 'Stable' },
]

export default function Design5() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#f8f6f3] text-[#1a1a1a]"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-8"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ x: 4 }}
          >
            <span 
              className="text-2xl tracking-tight"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Linux MCP
            </span>
            <span className="text-xs text-gray-400 tracking-widest uppercase mt-1">Suite</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-12">
            <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors tracking-wide">About</a>
            <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors tracking-wide">Features</a>
            <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors tracking-wide">Documentation</a>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: '#1a1a1a' }}
              className="px-6 py-3 bg-[#2a2a2a] text-white text-sm tracking-wide"
            >
              Get Access
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center px-8 md:px-16 pt-24">
        <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-12 gap-8 items-center">
          {/* Left column - Main heading */}
          <motion.div 
            className="lg:col-span-7"
            style={{ y: heroTextY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8 block">
                Production-Ready Platform
              </span>
              
              <MagazineHeading className="text-[clamp(3rem,8vw,8rem)] text-[#1a1a1a] mb-8">
                Give Your AI
                <br />
                <span className="italic text-[#c9a87c]">Real</span> Linux
                <br />
                Capabilities
              </MagazineHeading>
              
              <EditorialText className="text-lg md:text-xl text-gray-600 max-w-xl mb-12">
                A containerized bridge providing AI agents with secure, isolated access to specialized 
                Linux environments for web development, penetration testing, and cloud operations.
              </EditorialText>
              
              <div className="flex items-center gap-8">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-[#1a1a1a] text-white text-sm tracking-wide"
                >
                  Start Free Trial
                </motion.button>
                <a 
                  href="#" 
                  className="text-sm text-gray-600 hover:text-black transition-colors border-b border-gray-300 pb-1"
                >
                  Read Documentation
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Editorial image/stats */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="aspect-[4/5] bg-[#1a1a1a] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-12">
                  <span className="text-[8rem] md:text-[12rem] font-bold leading-none block" style={{ fontFamily: 'DM Serif Display, serif' }}>
                    11
                  </span>
                  <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
                    Specialized Distributions
                  </span>
                </div>
              </div>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a87c] to-transparent" />
            </div>
            
            {/* Floating label */}
            <motion.div 
              className="absolute -bottom-4 -left-8 bg-white px-6 py-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-gray-400">Version</span>
              <span className="block text-2xl font-semibold" style={{ fontFamily: 'DM Serif Display, serif' }}>2.0</span>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Vertical text */}
        <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2">
          <VerticalText className="text-gray-300">Security First • Docker Powered • Async Ready</VerticalText>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-16 px-8 md:px-16 border-y border-gray-200 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-gray-200">
            {[
              { value: '11+', label: 'Linux Distros' },
              { value: '3', label: 'Supported Agents' },
              { value: '100%', label: 'Sandbox Isolation' },
              { value: '10×', label: 'Async Performance' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-8"
              >
                <span 
                  className="text-5xl md:text-6xl text-[#1a1a1a] block mb-2"
                  style={{ fontFamily: 'DM Serif Display, serif' }}
                >
                  {stat.value}
                </span>
                <span className="text-xs tracking-[0.2em] uppercase text-gray-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 block">Core Capabilities</span>
            <MagazineHeading className="text-5xl md:text-6xl">
              Built for the
              <br />
              <span className="italic text-[#c9a87c]">Modern</span> Workflow
            </MagazineHeading>
          </motion.div>

          <div className="space-y-0">
            {features.map((feature, index) => (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-t border-gray-200 py-12 cursor-pointer group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-xs tracking-[0.2em] text-gray-300">{feature.number}</span>
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 
                      className="text-2xl md:text-3xl group-hover:text-[#c9a87c] transition-colors duration-300"
                      style={{ fontFamily: 'DM Serif Display, serif' }}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <motion.div
                      animate={{ 
                        opacity: hoveredFeature === index ? 1 : 0.6,
                        x: hoveredFeature === index ? 0 : -10 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <EditorialText className="text-gray-600 text-lg">
                        {feature.body}
                      </EditorialText>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Distros Showcase */}
      <section className="py-32 px-8 md:px-16 bg-[#1a1a1a] text-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 block">Available Environments</span>
              <MagazineHeading className="text-5xl md:text-6xl text-white mb-8">
                Eleven
                <br />
                <span className="italic text-[#c9a87c]">Specialized</span>
                <br />
                Distributions
              </MagazineHeading>
              <EditorialText className="text-gray-400 text-lg mb-8 max-w-md">
                Each distribution is optimized for its purpose, pre-loaded with essential tools, 
                and ready to deploy in seconds. From security audits to cloud operations.
              </EditorialText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {distros.map((distro, i) => (
                <motion.div
                  key={distro.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8, backgroundColor: '#2a2a2a' }}
                  className="p-6 border border-gray-800 transition-all cursor-pointer"
                >
                  <span 
                    className="text-2xl block mb-2"
                    style={{ fontFamily: 'DM Serif Display, serif' }}
                  >
                    {distro.name}
                  </span>
                  <span className="text-xs tracking-[0.2em] uppercase text-gray-500">{distro.purpose}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 block">Developer Experience</span>
              <MagazineHeading className="text-5xl md:text-6xl mb-8">
                Elegantly
                <br />
                <span className="italic text-[#c9a87c]">Simple</span>
                <br />
                Integration
              </MagazineHeading>
              <EditorialText className="text-gray-600 text-lg max-w-md">
                Initialize an environment, execute commands, stream output. All in a few lines of clean, 
                async Python code. No complexity, no boilerplate.
              </EditorialText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#1a1a1a] p-8 md:p-12">
                <pre className="text-sm md:text-base overflow-x-auto">
                  <code className="text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
{`from linux_mcp import MCPSuite

`}<span className="text-[#c9a87c]">async def</span>{` main():
    suite = `}<span className="text-[#c9a87c]">await</span>{` MCPSuite.create(
        distro=`}<span className="text-[#8b9a73]">"kali"</span>{`,
        agent=`}<span className="text-[#8b9a73]">"claude"</span>{`
    )
    
    `}<span className="text-gray-500"># Execute with streaming output</span>{`
    `}<span className="text-[#c9a87c]">async for</span>{` line `}<span className="text-[#c9a87c]">in</span>{` suite.stream(
        `}<span className="text-[#8b9a73]">"nmap -sV target.local"</span>{`
    ):
        print(line)`}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 md:px-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-8 block">Ready to Begin?</span>
            <MagazineHeading className="text-6xl md:text-7xl lg:text-8xl mb-8">
              Start
              <br />
              <span className="italic text-[#c9a87c]">Building</span>
            </MagazineHeading>
            <EditorialText className="text-xl text-gray-600 mb-12 max-w-xl mx-auto">
              Give your AI agents the power of real Linux environments. 
              Secure, isolated, and production-ready.
            </EditorialText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-[#1a1a1a] text-white text-sm tracking-wide"
              >
                Get Started Free
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 border border-gray-300 text-[#1a1a1a] text-sm tracking-wide hover:border-gray-400 transition-colors"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-16 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <span 
              className="text-xl tracking-tight"
              style={{ fontFamily: 'DM Serif Display, serif' }}
            >
              Linux MCP Suite
            </span>
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-black transition-colors">GitHub</a>
            <a href="#" className="hover:text-black transition-colors">Discord</a>
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">Documentation</a>
          </div>
          
          <span className="text-xs text-gray-400">© 2024 All rights reserved</span>
        </div>
      </footer>
    </div>
  )
}
