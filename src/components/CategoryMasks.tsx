import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { categories, initialTiles } from '@/data/tiles';

gsap.registerPlugin(ScrollTrigger);

const getCategoryImage = (categoryId: string): string => {
    const tile = initialTiles.find(t => t.category === categoryId);
    return tile?.image || 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?auto=format&fit=crop&q=80&w=2000';
};

export function CategoryMasks() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        if (!containerRef.current) return;

        // One massive master timeline pinned for all categories
        const totalDuration = categories.length; // generic time units
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${categories.length * 250}%`, // 250vh per category for much smoother scroll pacing
                scrub: 1,
                pin: true,
            }
        });

        // Initialize layers: Only the first layer is visible. 
        categories.forEach((_, i) => {
            const currentSection = sectionRefs.current[i];
            gsap.set(currentSection, { 
                scale: 1, // Fix: Must remain 1 so crossfades work correctly
                opacity: i === 0 ? 1 : 0,
                transformOrigin: "50% 50%",
                zIndex: i + 1 // Ensures next category safely fades in ON TOP of current
            });
            gsap.set(textRefs.current[i], { scale: 1, opacity: 1 });
            gsap.set(imageRefs.current[i], { scale: 1 });
        });

        categories.forEach((cat, i) => {
            const currentMask = textRefs.current[i];
            const currentImg = imageRefs.current[i];
            const nextSection = sectionRefs.current[i + 1];
            
            // Absolute time marker for this category's phase (1 segment = 1 full transition sequence)
            const st = i * 1.0; 
            
            // Phase A: The Current Mask zooms and fades
            tl.to(currentMask, { scale: 30, ease: "power2.inOut", duration: 0.5 }, st);
            tl.to(currentMask, { opacity: 0, ease: "power2.in", duration: 0.2 }, st + 0.3);
            
            // Pan the current image so it feels alive
            tl.to(currentImg, { scale: 1.15, duration: 0.8, ease: "none" }, st);

            // Phase B: Pause on Naked Texture (t=0.5 to 0.7)

            // Phase C: If there is a next category, smoothly fade it in Over the current.
            // Using .to() instead of .fromTo() guarantees perfect reverse scroll scrub behavior!
            if (nextSection) {
                tl.to(nextSection, { opacity: 1, ease: "power1.inOut", duration: 0.3 }, st + 0.7);
            }
        });

        // Final Phase: Fade to Obsidian
        if (fadeOverlayRef.current) {
            tl.to(fadeOverlayRef.current, 
                { opacity: 1, duration: 0.2, ease: "power2.inOut" }, 
                (categories.length - 1) * 1.0 + 0.8 
            );
        }

    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background">
        
        {categories.map((category, index) => (
            <div 
                key={category.id} 
                ref={el => sectionRefs.current[index] = el}
                className="absolute inset-0 w-full h-full will-change-transform"
            >
                
                {/* The Category Image */}
                <img 
                    ref={el => imageRefs.current[index] = el}
                    src={getCategoryImage(category.id)} 
                    alt={category.name} 
                    className="absolute inset-0 z-0 w-full h-full object-cover filter contrast-[1.1] saturate-[1.2] will-change-transform" 
                />

                {/* The Typographic Mask (Theme-aware Blend) */}
                <div 
                    ref={el => textRefs.current[index] = el}
                    className={cn(
                        "absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none will-change-transform",
                        isLight ? "bg-background mix-blend-screen" : "bg-black mix-blend-multiply"
                    )}
                >
                    <h2 
                        className={cn(
                            "font-serif font-black tracking-[-0.04em] leading-none text-center uppercase whitespace-nowrap",
                            isLight ? "text-black" : "text-white"
                        )}
                        style={{ fontSize: 'min(18vw, 25vh)', margin: 0, padding: 0 }}
                    >
                        {category.name}
                    </h2>
                </div>

            </div>
        ))}

        {/* Seamless Fade To Next Section */}
        <div 
            ref={fadeOverlayRef} 
            className="absolute inset-0 z-20 bg-background pointer-events-none will-change-opacity" 
            style={{ opacity: 0 }} 
        />

        {/* Global UX Hint overlay */}
        <div className="absolute bottom-12 right-8 md:bottom-16 md:right-16 z-30 pointer-events-none opacity-40 mix-blend-difference text-foreground">
            <span className="text-[9px] font-bold uppercase tracking-[0.8em]">
                Collection Portal
            </span>
        </div>

    </section>
  );
}

export default CategoryMasks;
