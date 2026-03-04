import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SlabImageProps {
  image?: string;
  color: string;
  name: string;
}

export function SlabImage({ image, color, name }: SlabImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse positions for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center perspective-1000">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[240px] h-[320px] sm:w-[280px] sm:h-[370px] md:w-[350px] md:h-[460px] lg:w-[450px] lg:h-[600px] group"
      >
        {/* Shadow Layer */}
        <div className="absolute -inset-4 bg-foreground/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Main Slab Image Container */}
        <div className="relative w-full h-full overflow-hidden shadow-2xl ring-1 ring-white/20">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div 
              className="w-full h-full" 
              style={{ backgroundColor: color }}
            />
          )}

          {/* Premium Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* Floating Detail Badge (Glassmorphism) */}
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-background/40 backdrop-blur-xl border border-foreground/10 p-6 md:p-8 shadow-luxury min-w-[150px]"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent block">Specimen</span>
            <span className="text-lg md:text-xl font-light italic text-foreground tracking-tight">{name}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
