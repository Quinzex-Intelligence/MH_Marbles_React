import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { initialTiles } from '@/data/tiles';

const SLIDES = [
  { 
      label: initialTiles[1].name, 
      over: 'LUXURY', 
      image: initialTiles[1].image || '' 
  },
  { 
      label: initialTiles[3].name, 
      over: 'OBSIDIAN', 
      image: initialTiles[3].image || '' 
  },
  { 
      label: initialTiles[2].name, 
      over: 'ANTIQUITY', 
      image: initialTiles[2].image || '' 
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {});
    
    // Initial load animation for the first slide image
    gsap.fromTo(slideRefs.current[0], 
        { scale: 1.1, filter: 'brightness(0.5)' }, 
        { scale: 1, filter: 'brightness(1)', duration: 4, ease: "power2.out" }
    );

    const interval = setInterval(() => {
        const currentSlide = slideRefs.current[current];
        const nextIdx = (current + 1) % SLIDES.length;
        const nextSlide = slideRefs.current[nextIdx];
        
        // Z-index management
        if (currentSlide) gsap.set(currentSlide, { zIndex: 1 });
        if (nextSlide) gsap.set(nextSlide, { zIndex: 2 });

        // Crossfade image in
        if (nextSlide) {
            gsap.fromTo(nextSlide, 
                { opacity: 0, scale: 1.05 }, 
                { opacity: 1, scale: 1, duration: 2, ease: "power2.inOut", onComplete: () => {
                    if (currentSlide) {
                        gsap.set(currentSlide, { opacity: 0, scale: 1, zIndex: 0 });
                    }
                    setCurrent(nextIdx);
                }}
            );
        }

        // Text stagger out and in
        if (topTextRef.current && bottomTextRef.current) {
            gsap.to([topTextRef.current, bottomTextRef.current], {
                y: -40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.in", onComplete: () => {
                    if (topTextRef.current && bottomTextRef.current) {
                        topTextRef.current.innerText = SLIDES[nextIdx].over;
                        bottomTextRef.current.innerText = SLIDES[nextIdx].label;
                        gsap.fromTo([topTextRef.current, bottomTextRef.current],
                            { y: 40, opacity: 0 },
                            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
                        );
                    }
                }
            });
        }

    }, 6000);

    return () => {
        clearInterval(interval);
        ctx.revert();
    };
  }, [current]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
        
        {/* Background Layer Container */}
        <div className="absolute inset-0 z-0">
            {SLIDES.map((slide, i) => (
                <div 
                    key={i} 
                    ref={el => slideRefs.current[i] = el}
                    className="absolute inset-0 w-full h-full will-change-transform"
                    style={{ opacity: i === 0 ? 1 : 0, zIndex: 0 }}
                >
                    <img 
                        src={slide.image} 
                        alt={slide.label} 
                        className="w-full h-full object-cover"
                    />
                    {/* Minimal Vignette for Text Contrast - Fixed Dark to prevent white shade in light mode */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08]/90 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A08]/40 via-transparent to-[#0C0A08]/40" />
                </div>
            ))}
        </div>

        {/* Foreground Cinematic Typography */}
        <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center px-4">
            
            <h2 className="flex flex-col items-center">
                <span 
                    ref={topTextRef}
                    className="block font-sans font-black text-[12vw] md:text-[8vw] text-foreground/90 leading-[0.8] tracking-tighter mix-blend-overlay uppercase"
                >
                    {SLIDES[0].over}
                </span>
                <span 
                    ref={bottomTextRef}
                    className="block font-serif italic text-[8vw] md:text-[5vw] text-accent leading-[1.2] tracking-normal mt-2 drop-shadow-2xl"
                >
                    {SLIDES[0].label}
                </span>
            </h2>

        </div>

        {/* Cinematic UI Elements */}
        <div className="absolute bottom-12 inset-x-0 z-30 flex justify-center items-center">
            <div className="flex items-center gap-6">
                <div className="text-[10px] font-bold font-sans tracking-[0.4em] text-white/50">
                    0{current + 1}
                </div>
                {/* Minimal tracking bar */}
                <div className="w-16 h-[2px] bg-white/20 relative overflow-hidden hidden md:block">
                    <div 
                        key={current}
                        className="absolute top-0 left-0 h-full bg-accent animate-[grow_6s_linear_forwards]"
                        style={{ '--tw-enter-opacity': '1' } as React.CSSProperties}
                    />
                </div>
                <div className="text-[10px] font-bold font-sans tracking-[0.4em] text-white/50">
                    0{SLIDES.length}
                </div>
            </div>
        </div>

        {/* Scroll Instruction */}
        <div className="absolute bottom-12 right-8 md:bottom-16 md:right-16 z-30 hidden md:block">
            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-foreground/40">Scroll to Explore</span>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
            @keyframes grow {
                from { width: 0%; }
                to { width: 100%; }
            }
        `}} />
    </section>
  );
}

export default Hero;
