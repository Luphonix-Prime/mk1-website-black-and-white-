import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram, Mail, ChevronRight, Target, Zap, Shield, Cpu, Globe, Layers } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const Marquee = ({ text, speed = 30 }: { text: string; speed?: number }) => {
  return (
    <div className="relative flex overflow-x-hidden border-y border-white/10 py-6 bg-black">
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mx-4 flex items-center">
            {text} <span className="mx-8 text-white/20">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="font-display text-sm text-white/40">{number}</span>
    <div className="h-[1px] flex-grow bg-white/10" />
    <h2 className="font-display text-sm uppercase tracking-widest font-medium">{title}</h2>
  </div>
);

const FeatureItem = ({ title, description }: { title: string; description: string }) => (
  <div className="group border-b border-white/10 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors px-6">
    <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
      {title}
    </h3>
    <p className="text-white/40 max-w-md text-sm md:text-base leading-relaxed">
      {description}
    </p>
  </div>
);

const ProjectCard = ({ title, category, image }: { title: string; category: string; image: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative aspect-[16/10] overflow-hidden border border-white/10"
  >
    <img 
      src={image} 
      alt={title} 
      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs uppercase tracking-widest mb-2 text-white/60">{category}</p>
          <h3 className="text-3xl font-display font-bold tracking-tighter">{title}</h3>
        </div>
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="noise-overlay" />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-2">
          <img src="./images/logo.png" alt="Luphonix Logo" className="w-9 h-9 object-contain" />
          <span className="font-display font-bold text-xl tracking-tighter uppercase">Luphonix</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-bold">
          <a href="#about" className="hover:text-white/60 transition-colors">About</a>
          <a href="#details" className="hover:text-white/60 transition-colors">Product Details</a>
          <a href="#action" className="hover:text-white/60 transition-colors">See in Action</a>
          <a href="#use-cases" className="hover:text-white/60 transition-colors">Use Cases</a>
        </div>
        <a href="https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform" target="_blank" rel="noopener noreferrer">
          <button className="text-[10px] uppercase tracking-[0.2em] font-bold border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">
            Pre-book
          </button>
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
        <div className="grid-lines absolute inset-0 opacity-20" />
        
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[12vw] md:text-[10vw] font-display font-bold leading-[0.85] tracking-tighter uppercase mb-12">
              Omni-gesture <br />
              <span className="text-stroke">MK1</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-2xl text-white/60 max-w-xl leading-tight font-light"
            >
              The future of control, gaming, and automation. Experience haptic precision like never before.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="flex justify-end"
            >
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">Luphonix Systems</p>
                <p className="text-sm font-display italic">Next-Gen Interface</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee text="LUPHONIX OMNI-GESTURE MK1 • THE FUTURE OF CONTROL • GAMING • AUTOMATION • HAPTIC PRECISION" />

      {/* About / Intro Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="01" title="The Vision" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="relative aspect-square overflow-hidden border border-white/10 bg-white/5">
              <img 
                src="./images/Gloves.png" 
                alt="Luphonix Omni-gesture MK1" 
                className="w-full h-full object-contain p-8 grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center space-y-8">
              <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-none">
                Experience haptic precision like never before.
              </h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Luphonix Omni-gesture MK1 is a high-performance smart glove designed for seamless interaction with digital worlds, VR, and industrial robotics. It bridges the gap between human intent and digital execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section id="details" className="border-t border-white/10">
        <div className="px-6 py-12">
          <SectionHeader number="02" title="Product Details" />
        </div>
        <FeatureItem 
          title="Pressure Sensors" 
          description="High-precision sensors on fingertips detect subtle pressure changes for accurate gesture recognition."
        />
        <FeatureItem 
          title="Flex Sensors" 
          description="Advanced flex sensors track finger movements, enabling natural hand gestures for control."
        />
        <FeatureItem 
          title="OLED Display" 
          description="Monochrome OLED screen shows battery status, connection mode, and real-time stats."
        />
        <FeatureItem 
          title="Solar Powered" 
          description="Integrated solar panel patch extends battery life for all-day usage without charging."
        />
        <FeatureItem 
          title="USB-C Charging" 
          description="Fast USB-C charging port ensures you're always ready. Full charge in under 2 hours."
        />
      </section>

      {/* See it in Action Section */}
      <section id="action" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="03" title="See it in Action" />
          
          <div className="space-y-32">
            {/* Gaming */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-6 uppercase">Game Without Limits</h3>
                <p className="text-white/60 text-lg mb-8">
                  Experience gaming like never before. Play your favorite games using intuitive hand gestures without the need for a keyboard or mouse.
                </p>
                <ul className="space-y-4">
                  {['Natural hand movements for precise control', 'Customizable gesture mapping', 'Ultra-low latency for competitive gaming'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 aspect-video overflow-hidden border border-white/10">
                <img 
                  src="./images/1.png" 
                  alt="Gaming with Luphonix MK1" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Workspace */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="aspect-video overflow-hidden border border-white/10">
                <img 
                  src="./images/4.png" 
                  alt="3D Modeling with Luphonix MK1" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-6 uppercase">Control Your Workspace</h3>
                <p className="text-white/60 text-lg mb-8">
                  Transform your productivity with gesture-based keyboard and mouse control. Work smarter, not harder.
                </p>
                <ul className="space-y-4">
                  {['Full keyboard and mouse emulation', 'Custom macro shortcuts', 'Multi-monitor support'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Smart Home */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-6 uppercase">Smart Home Control</h3>
                <p className="text-white/60 text-lg mb-8">
                  Control your entire smart home ecosystem with simple gestures. Lights, fans, AC, and more - all at your fingertips.
                </p>
                <ul className="space-y-4">
                  {['Compatible with SmartThings', 'Works with smart switch plugs', 'Create custom automation scenes'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 aspect-video overflow-hidden border border-white/10">
                <img 
                  src="./images/2.png" 
                  alt="Smart Home Ecosystem Control" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-32 px-6 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-display text-sm text-black/40">04</span>
            <div className="h-[1px] flex-grow bg-black/10" />
            <h2 className="font-display text-sm uppercase tracking-widest font-medium">Use Cases</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Keyboard & Mouse Control', desc: "Control your laptop's keyboard and mouse with hand gestures" },
              { title: 'Gaming Without Peripherals', desc: "Game using glove on laptop without need of keyboard or mouse" },
              { title: 'Smart Home Control', desc: "Control smart devices and smart home with simple gestures" },
              { title: 'Haptic Feedback', desc: "Get real-time haptic feedback for immersive interaction" }
            ].map((useCase, i) => (
              <div key={i} className="border border-black/10 p-8 flex flex-col justify-between aspect-square hover:bg-black hover:text-white transition-all duration-500">
                <span className="font-display text-xs opacity-40">0{i+1}</span>
                <div>
                  <h4 className="text-2xl font-display font-bold tracking-tighter mb-4 uppercase">{useCase.title}</h4>
                  <p className="text-sm opacity-60 leading-relaxed">{useCase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[10vw] font-display font-bold tracking-tighter uppercase mb-12">
            Let's build <br />
            <span className="text-stroke">the future</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button className="x group flex items-center gap-4 text-2xl md:text-4xl font-display font-bold hover:text-white/60 transition-colors">
              luphonix.com <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img src="./images/logo.png" alt="Luphonix Logo" className="w-9 h-9 object-contain" />
            <span className="font-display font-bold text-sm tracking-tighter uppercase">Luphonix</span>
          </div>
          
          <div className="flex gap-8">
            <Twitter className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <Github className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
          </div>

          <p className="text-[10px] uppercase tracking-widest text-white/20">
            © 2025 Luphonix Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
