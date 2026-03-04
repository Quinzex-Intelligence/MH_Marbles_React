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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(bgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Text Entrance
      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Architectural Interior"
          className="w-full h-full object-cover opacity-60 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="container mx-auto px-12 relative z-10">
        <div className="max-w-5xl">
          <div ref={textRef}>
            <div className="hero-reveal flex items-center gap-4 mb-8">
              <div className="w-16 h-[1px] bg-accent" />
              <span className="text-[11px] font-bold tracking-[0.6em] uppercase text-accent">
                ESTABLISHED EXCELLENCE
              </span>
            </div>

            <h1 className="hero-reveal text-5xl md:text-9xl font-light leading-[0.85] text-white mb-10 tracking-tight italic text-shadow-xl">
              Timeless <br />
              <span className="not-italic font-medium text-white shadow-sm">Masterpieces.</span>
            </h1>

            <p className="hero-reveal text-xl md:text-2xl text-white/90 max-w-2xl mb-16 font-light leading-relaxed tracking-wide italic">
              A curated sanctuary of the world&apos;s most exquisite stones,
              crafted for the architectural visionary.
            </p>

            <div className="hero-reveal flex flex-wrap gap-8 md:gap-12 items-center">
              <Button
                size="xl"
                className="bg-accent hover:bg-white hover:text-black text-white font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase rounded-none h-16 md:h-20 px-8 md:px-14 transition-all duration-700 shadow-2xl relative z-20 w-full md:w-auto"
                asChild
              >
                <a href="/curation">
                  DISCOVER THE COLLECTION
                </a>
              </Button>

              <div className="hidden md:flex flex-col border-l border-white/20 pl-8 space-y-2 relative z-20">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Curation 01</span>
                <span className="text-sm font-light text-white/80 uppercase tracking-widest italic">Italian Marble Series</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Scroll Indicator - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 right-12 hidden md:flex flex-col items-center gap-4 z-10"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/40 rotate-90 mb-8 mt-4">SCROLL</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}

export default Hero;