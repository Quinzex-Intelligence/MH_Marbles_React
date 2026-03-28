import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax for the main split image
      gsap.to(imageRef.current, {
        y: '25%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Staggered text reveal with mask effect
      gsap.from('.hero-reveal-line', {
        yPercent: 120,
        opacity: 0,
        rotateZ: 2,
        duration: 1.8,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.4
      });

      gsap.from('.hero-fade', {
        opacity: 0,
        y: 20,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power2.out',
        delay: 1.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Structural Lines for that Architectural feel */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[8%] w-[1px] h-full bg-border/40" />
        <div className="absolute left-[50%] w-[1px] h-full bg-border/40 hidden md:block" />
        <div className="absolute right-[8%] w-[1px] h-full bg-border/40" />
      </div>

      <div className="w-full max-w-none px-4 md:px-[8%] relative z-10 w-full flex flex-col md:flex-row items-center h-full pt-20">
        
        {/* Left Side: Exquisite Typography */}
        <div ref={textRef} className="w-full md:w-7/12 flex flex-col justify-center h-full pr-0 md:pr-12 relative z-20">
          <div className="hero-fade flex items-center gap-4 mb-6 md:mb-12">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-accent">
              Signature Collection
            </span>
          </div>

          <div className="mb-8 md:mb-12 space-y-2 relative">
            <div className="overflow-hidden py-2">
              <h1 className="hero-reveal-line text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.8] tracking-tighter text-foreground">
                Visionary
              </h1>
            </div>
            <div className="overflow-hidden py-2 flex items-center gap-6">
              <h1 className="hero-reveal-line text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.8] tracking-tighter italic text-muted-foreground/80">
                Surfaces.
              </h1>
            </div>
          </div>

          <p className="hero-fade text-base md:text-lg lg:text-xl text-foreground/70 max-w-md font-sans font-light leading-relaxed tracking-wide border-l border-accent/30 pl-6 mb-12">
            Curators of the earth's most exquisite architectural statements. Transforming spaces with pristine Italian marble and exotic stones.
          </p>

          <div className="hero-fade flex items-center gap-8">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-sans tracking-[0.2em] uppercase rounded-none h-14 md:h-16 px-8 md:px-10 text-xs transition-all duration-500 relative group overflow-hidden"
              asChild
            >
              <a href="/curation">
                <span className="relative z-10 font-medium">Explore Collection</span>
                <div className="absolute inset-0 h-full w-full bg-accent scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out" />
              </a>
            </Button>
            
            <a href="/atelier" className="group flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground group-hover:text-accent transition-colors duration-500 -rotate-45 group-hover:rotate-0">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/60 group-hover:text-foreground transition-colors duration-500">The Atelier</span>
            </a>
          </div>
        </div>

        {/* Right Side: Architectural Imagery layout */}
        <div className="w-full md:w-5/12 h-[50vh] md:h-[80vh] mt-12 md:mt-0 relative hero-fade">
          <div className="absolute inset-0 bg-secondary/50 transform translate-x-4 translate-y-4" />
          <div className="relative w-full h-full overflow-hidden border border-border/50">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
              alt="Premium Marble Surface"
              className="absolute top-[-15%] left-0 w-full h-[130%] object-cover object-center grayscale-[20%] sepia-[10%] contrast-[1.1]"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          
          {/* Floating Metric Card */}
          <div className="absolute -bottom-6 -left-12 bg-background border border-border p-6 shadow-luxury hidden lg:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2 font-bold">Since 1980</p>
            <p className="font-serif italic text-2xl text-foreground">40+ Years of Mastery</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-0 left-[50%] -translate-x-1/2 flex flex-col items-center justify-end pb-8 z-20"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-border to-accent relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[slide-up_2s_ease-in-out_infinite]" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/40 mt-4">Scroll</span>
      </motion.div>
    </section>
  );
}

export default Hero;
