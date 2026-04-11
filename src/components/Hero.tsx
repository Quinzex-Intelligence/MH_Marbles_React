import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGallery } from '@/contexts/GalleryContext';
import { initialTiles } from '@/data/tiles';


export function Hero() {
  const { media } = useGallery();
  const [current, setCurrent] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);

  // Stable refs so the interval never becomes stale or stacks
  const currentRef = useRef(0);
  const slidesRef = useRef<{ label: string; over: string; image: string }[]>([]);

  const slides = useMemo(() => {
    // 1. Define high-quality static fallbacks
    const staticSlides = [
        { label: 'Calacatta Gold', over: 'LUXURY', image: '/calacatta-gold.png' },
        { label: 'Obsidian Black', over: 'OBSIDIAN', image: '/onyx_translucent_texture_dark_1769248364215.png' },
        { label: 'Statuario White', over: 'ANTIQUITY', image: '/carrara_luxury_texture_1769248332961.png' },
    ];

    // 2. If no backend data yet, return static
    if (!media || media.length === 0) return staticSlides;

    // 3. Map backend Hero slides to the format expected by the Hero component
    // Mapping: heading -> label, subtext -> over
    return media.map(m => ({
      label: m.heading || 'Exquisite Stone',
      over: m.subtext || 'COLLECTION',
      image: m.image || staticSlides[0].image
    }));
  }, [media]);

  // Keep refs in sync with state
  useEffect(() => { currentRef.current = current; }, [current]);
  useEffect(() => { slidesRef.current = slides; }, [slides]);

  // Interval created ONCE — reads state via stable refs
  useEffect(() => {
    gsap.fromTo(slideRefs.current[0],
        { scale: 1.1, filter: 'brightness(0.5)' },
        { scale: 1, filter: 'brightness(1)', duration: 4, ease: "power2.out" }
    );

    const interval = setInterval(() => {
        const cur = currentRef.current;
        const allSlides = slidesRef.current;
        const nextIdx = (cur + 1) % allSlides.length;
        const currentSlide = slideRefs.current[cur];
        const nextSlide = slideRefs.current[nextIdx];

        if (currentSlide) gsap.set(currentSlide, { zIndex: 1 });
        if (nextSlide) gsap.set(nextSlide, { zIndex: 2 });

        if (nextSlide) {
            gsap.fromTo(nextSlide,
                { opacity: 0, scale: 1.05 },
                { opacity: 1, scale: 1, duration: 2, ease: "power2.inOut", onComplete: () => {
                    if (currentSlide) gsap.set(currentSlide, { opacity: 0, scale: 1, zIndex: 0 });
                    setCurrent(nextIdx);
                }}
            );
        }

        if (topTextRef.current && bottomTextRef.current) {
            gsap.to([topTextRef.current, bottomTextRef.current], {
                y: -40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.in",
                onComplete: () => {
                    if (topTextRef.current && bottomTextRef.current) {
                        topTextRef.current.innerText = allSlides[nextIdx].over;
                        bottomTextRef.current.innerText = allSlides[nextIdx].label;
                        gsap.fromTo([topTextRef.current, bottomTextRef.current],
                            { y: 40, opacity: 0 },
                            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
                        );
                    }
                }
            });
        }
    }, 6000);

    return () => clearInterval(interval);
  }, []); // ← empty deps: created once, never stacks

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
        
        {/* Background Layer Container */}
        <div className="absolute inset-0 z-0">
            {slides.map((slide, i) => (
                <div 
                    key={i} 
                    ref={el => slideRefs.current[i] = el}
                    className="absolute inset-0 w-full h-full will-change-transform"
                    style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
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
                    {slides[current].over}
                </span>
                <span 
                    ref={bottomTextRef}
                    className="block font-serif italic text-[8vw] md:text-[5vw] text-accent leading-[1.2] tracking-normal mt-2 drop-shadow-2xl"
                >
                    {slides[current].label}
                </span>
            </h2>

        </div>

        {/* Cinematic UI Elements */}
        <div className="absolute bottom-12 inset-x-0 z-30 flex justify-center items-center">
            <div className="flex items-center gap-6">
                <div className="text-[10px] font-bold font-sans tracking-[0.4em] text-foreground/50">
                    0{current + 1}
                </div>
                {/* Minimal tracking bar */}
                <div className="w-16 h-[2px] bg-foreground/20 relative overflow-hidden hidden md:block">
                    <div 
                        key={current}
                        className="absolute top-0 left-0 h-full bg-accent animate-[grow_6s_linear_forwards]"
                        style={{ '--tw-enter-opacity': '1' } as React.CSSProperties}
                    />
                </div>
                <div className="text-[10px] font-bold font-sans tracking-[0.4em] text-foreground/50">
                    0{slides.length}
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
