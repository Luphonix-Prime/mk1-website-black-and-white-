import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface ImageParallaxProps {
  scrollProgress: MotionValue<number>;
  highlightedPart: string | null;
  activeScene: number;
}

export const ImageParallax: React.FC<ImageParallaxProps> = ({ scrollProgress, highlightedPart, activeScene }) => {
  // Parallax transforms for different layers
  const y1 = useTransform(scrollProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.1, 1]);

  // Image mapping based on highlighted parts or scenes
  const getActiveImage = () => {
    if (activeScene === 1) return 'input_file_2.png'; // Gaming
    if (activeScene === 2) return 'input_file_3.png'; // Design/Engineering
    if (activeScene === 3) return 'input_file_0.png'; // Smart Home
    if (activeScene === 4) return 'input_file_4.png'; // Diagram
    
    if (highlightedPart === 'smarthome') return 'input_file_0.png';
    if (highlightedPart === 'flex' || highlightedPart === 'motion') return 'input_file_2.png';
    if (highlightedPart === 'macros') return 'input_file_3.png';
    
    return 'input_file_1.png'; // Default product shot
  };

  const activeImage = getActiveImage();

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Layer - Deep Parallax */}
      <motion.div 
        style={{ y: y3, rotate: -rotate, scale }}
        className="absolute w-[140%] h-[140%] opacity-10"
      >
        <img 
          src="input_file_1.png" 
          alt="Background" 
          className="w-full h-full object-cover blur-2xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Mid Layer - Floating Context Images */}
      <motion.div 
        style={{ y: y2, x: -200, rotate: rotate }}
        className="absolute z-5 w-64 h-64 opacity-30 blur-sm"
      >
        <img 
          src="input_file_0.png" 
          alt="Context 1" 
          className="w-full h-full object-cover rounded-full"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <motion.div 
        style={{ y: y1, x: 250, rotate: -rotate }}
        className="absolute z-5 w-80 h-80 opacity-20 blur-md"
      >
        <img 
          src="input_file_2.png" 
          alt="Context 2" 
          className="w-full h-full object-cover rounded-3xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Main Image Layer */}
      <motion.div 
        key={activeImage}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotate }}
        className="relative z-10 w-full max-w-5xl px-6"
      >
        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.15)] border border-white/10 bg-black/40 backdrop-blur-sm">
          <img 
            src={activeImage} 
            alt="Luphonix Omni-Gesture MK1" 
            className="w-full h-auto object-contain"
            referrerPolicy="no-referrer"
          />
          
          {/* Dynamic Glow based on scene */}
          <motion.div 
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              background: activeScene === 3 ? 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)'
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none" 
          />
        </div>
      </motion.div>

      {/* Foreground Floating Particles */}
      <motion.div 
        style={{ y: y2, x: 150 }}
        className="absolute top-1/4 right-1/4 z-20 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]"
      />
      <motion.div 
        style={{ y: y1, x: -300 }}
        className="absolute bottom-1/3 left-1/4 z-20 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]"
      />
    </div>
  );
};
