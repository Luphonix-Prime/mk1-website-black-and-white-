/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Bluetooth, 
  Activity, 
  Gamepad2, 
  Zap, 
  Home, 
  Sun,
  ChevronRight,
  Github,
  Twitter,
  MessageSquare,
  Instagram,
  Mail,
  Check
} from 'lucide-react';
import { GlassCard, NeonButton } from './components/UIComponents';
import { cn } from './lib/utils';

export default function App() {
  const [activeImage, setActiveImage] = useState(0);

  const handlePreOrder = () => {
    window.open('https://forms.gle/MVz1CToiNXW85BVY9', '_blank');
  };

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-[#050505]">
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img src="/favicons/favicon.png" alt="Luphonix" className="h-10 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#specs" className="hover:text-cyan-400 transition-colors">Specs</a>
          <a href="#size-guide" className="hover:text-cyan-400 transition-colors">Size Guide</a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">Buy Now</a>
        </div>
        <NeonButton variant="blue" className="scale-90" onClick={handlePreOrder}>Pre-Order</NeonButton>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 md:pt-32 px-6 md:px-24 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="relative z-20">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-6 tracking-tighter"
            >
              CONTROL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">REALITY</span> <br />
              WITH YOUR HAND
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed"
            >
              Luphonix Omni-gesture MK1 — The future of control, gaming, and automation. 
              Experience haptic precision like never before.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <NeonButton variant="blue" onClick={() => document.getElementById('product-details')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Features
              </NeonButton>
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm uppercase tracking-widest font-medium"
              >
                Buy Now
              </button>
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={[
                  '/images/Gloves.png',
                  '/images/font-details.jpeg',
                  '/images/little-detials.jpeg'
                ][activeImage]}
                alt="Luphonix Omni-gesture MK1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-auto rounded-2xl"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeImage === i ? "bg-cyan-500 w-6" : "bg-white/30"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Product Details */}
      <section id="product-details" className="relative py-32 px-6 md:px-24 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">PRODUCT DETAILS</h2>
            <div className="h-1 w-24 bg-cyan-500 mx-auto" />
          </div>
          
          {/* Technical Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-white/10"
            >
              <img src="/images/font-details.jpeg" alt="Pressure and Flex Sensors" className="w-full h-auto" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 flex-shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2 uppercase tracking-tight">Pressure Sensors</h3>
                  <p className="text-white/60">High-precision sensors on fingertips detect subtle pressure changes for accurate gesture recognition.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 flex-shrink-0">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2 uppercase tracking-tight">Flex Sensors</h3>
                  <p className="text-white/60">Advanced flex sensors track finger movements, enabling natural hand gestures for control.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Advanced Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center space-y-6 order-2 md:order-1"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-400 flex-shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2 uppercase tracking-tight">OLED Display</h3>
                  <p className="text-white/60">Monochrome OLED screen shows battery status, connection mode, and real-time stats.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-400 flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2 uppercase tracking-tight">Solar Powered</h3>
                  <p className="text-white/60">Integrated solar panel patch extends battery life for all-day usage without charging.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-400 flex-shrink-0">
                  <Bluetooth className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2 uppercase tracking-tight">USB-C Charging</h3>
                  <p className="text-white/60">Fast USB-C charging port ensures you're always ready. Full charge in under 2 hours.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 order-1 md:order-2"
            >
              <img src="/images/little-detials.jpeg" alt="OLED Screen and Components" className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Use Cases in Action */}
      <section id="features" className="relative py-32 px-6 md:px-24 z-10 bg-gradient-to-b from-transparent to-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">SEE IT IN ACTION</h2>
            <div className="h-1 w-24 bg-cyan-500 mx-auto" />
          </div>
          
          <div className="space-y-32">
            {/* Gaming */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30">
                <img src="/images/Gaming.png" alt="Gaming with LUPHONIX" className="w-full h-auto" />
                <div className="absolute top-4 left-4 bg-cyan-500 text-black px-4 py-2 rounded-full text-xs font-bold uppercase">
                  Gaming Mode
                </div>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">GAME WITHOUT LIMITS</h3>
                <p className="text-xl text-white/60 mb-6 leading-relaxed">
                  Experience gaming like never before. Play your favorite games using intuitive hand gestures without the need for a keyboard or mouse.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-white/80">Natural hand movements for precise control</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-white/80">Customizable gesture mapping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-white/80">Ultra-low latency for competitive gaming</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* PC Control */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1">
                <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">CONTROL YOUR WORKSPACE</h3>
                <p className="text-xl text-white/60 mb-6 leading-relaxed">
                  Transform your productivity with gesture-based keyboard and mouse control. Work smarter, not harder.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <span className="text-white/80">Full keyboard and mouse emulation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <span className="text-white/80">Custom macro shortcuts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <span className="text-white/80">Multi-monitor support</span>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 order-1 lg:order-2">
                <img src="/images/Controlling.png" alt="PC Control with LUPHONIX" className="w-full h-auto" />
                <div className="absolute top-4 left-4 bg-purple-500 text-black px-4 py-2 rounded-full text-xs font-bold uppercase">
                  Control Mode
                </div>
              </div>
            </motion.div>

            {/* Smart Home */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30">
                <img src="/images/Smart-contol.jpeg" alt="Smart Home Control" className="w-full h-auto" />
                <div className="absolute top-4 left-4 bg-emerald-500 text-black px-4 py-2 rounded-full text-xs font-bold uppercase">
                  Smart Home
                </div>
              </div>
              <div>
                <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">SMART HOME CONTROL</h3>
                <p className="text-xl text-white/60 mb-6 leading-relaxed">
                  Control your entire smart home ecosystem with simple gestures. Lights, fans, AC, and more - all at your fingertips.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-white/80">Compatible with SmartThings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-white/80">Works with smart switch plugs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-white/80">Create custom automation scenes</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Use Cases */}
      <section id="specs" className="relative py-32 px-6 md:px-24 z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">USE CASES</h2>
            <div className="h-1 w-24 bg-cyan-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpecCard icon={<Cpu />} title="Keyboard & Mouse Control" desc="Control your laptop's keyboard and mouse with hand gestures" />
            <SpecCard icon={<Gamepad2 />} title="Gaming Without Peripherals" desc="Game using glove on laptop without need of keyboard or mouse" />
            <SpecCard icon={<Home />} title="Smart Home Control" desc="Control smart devices and smart home with simple gestures" />
            <SpecCard icon={<Zap />} title="Haptic Feedback" desc="Get real-time haptic feedback for immersive interaction" />
          </div>
        </div>
      </section>

      {/* Section 5: Size Guide */}
      <section id="size-guide" className="relative py-32 px-6 md:px-24 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 uppercase tracking-tighter">SIZE GUIDE</h2>
            <div className="h-1 w-24 bg-cyan-500 mx-auto" />
          </div>
          
          <GlassCard className="overflow-x-auto p-0 border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 font-display font-bold uppercase tracking-widest text-xs text-cyan-400">Size</th>
                  <th className="p-6 font-display font-bold uppercase tracking-widest text-xs text-cyan-400">Hand Circumference</th>
                  <th className="p-6 font-display font-bold uppercase tracking-widest text-xs text-cyan-400">Hand Length</th>
                  <th className="p-6 font-display font-bold uppercase tracking-widest text-xs text-cyan-400">Target Market</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { size: 'XS', circ: '15–16.5 cm', len: '16–17 cm', market: 'Smaller hands / teens' },
                  { size: 'S', circ: '16.5–18 cm', len: '17–18 cm', market: 'Small adults' },
                  { size: 'M', circ: '18–20 cm', len: '18–19 cm', market: 'Average adult' },
                  { size: 'L', circ: '20–22 cm', len: '19–20 cm', market: 'Larger hands' },
                  { size: 'XL', circ: '22–24 cm', len: '20–21.5 cm', market: 'Very large hands' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold text-lg text-white">{row.size}</td>
                    <td className="p-6 text-white/70">{row.circ}</td>
                    <td className="p-6 text-white/70">{row.len}</td>
                    <td className="p-6 text-white/70 italic">{row.market}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <p>* Measured around the knuckles (excluding thumb)</p>
            <p className="md:text-right">** From wrist crease to tip of middle finger</p>
          </div>
        </div>
      </section>

      {/* Section 6: Pricing */}
      <section id="pricing" className="relative py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-12 border-cyan-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-cyan-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Limited Edition</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Luphonix Omni-gesture MK1</h2>
            <p className="text-white/40 mb-8 uppercase tracking-[0.3em] text-xs">The Ultimate Control Interface</p>
            <div className="text-7xl font-display font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              ₹12,499
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <NeonButton variant="blue" className="w-full md:w-auto" onClick={handlePreOrder}>Pre-Order Now</NeonButton>
              <button className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm uppercase tracking-widest font-medium">
                View Demo Video
              </button>
            </div>
            <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-widest text-white/30">
              <div>Free Global Shipping</div>
              <div>2 Year Warranty</div>
              <div>Open Source SDK</div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer className="relative py-20 px-6 md:px-24 z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src="/favicons/favicon.png" alt="Luphonix" className="h-10 w-auto" />
            </div>
            <p className="text-white/40 max-w-sm mb-8">
              Join the revolution of wearable technology. We are building the bridge between the physical and digital worlds.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Github />} />
              <SocialIcon icon={<Twitter />} />
              <SocialIcon icon={<MessageSquare />} />
              <SocialIcon icon={<Instagram />} />
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs w-full focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button className="bg-white text-black p-2 rounded-lg hover:bg-cyan-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <div className="space-y-4 text-xs text-white/40">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>luphonix.prime@gmail.com</span>
              </div>
              <p>Innovation Hub, Tech City <br /> Silicon Valley, CA</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 uppercase tracking-[0.2em]">
          <p>© 2026 LUPHONIX TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

function SpecCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <GlassCard className="group hover:border-cyan-500/30 transition-all duration-500">
      <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{title}</h4>
      <p className="text-lg font-display font-medium">{desc}</p>
    </GlassCard>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
    </a>
  );
}
