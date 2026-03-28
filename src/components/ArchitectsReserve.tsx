import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function ArchitectsReserve() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current && textRef.current) {
        // Simple, original-style scroll animation for the background text
        gsap.to(textRef.current, {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }

      if (buttonRef.current) {
        const button = buttonRef.current;
        const handleMouseMove = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(button, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          button.removeEventListener('mousemove', handleMouseMove);
          button.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, containerRef);

    // Refresh layout-sensitive ScrollTriggers
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="architects-reserve-container min-h-screen bg-[#C8A96E] text-[#0C0A08] relative flex flex-col items-center justify-center overflow-hidden selection:bg-[#0C0A08] selection:text-[#C8A96E]">
      <div className="w-full max-w-none relative z-10 flex flex-col items-center">
        
        {/* Huge scrubbed text background (Left-aligned as in original) */}
        <div className="w-full overflow-hidden whitespace-nowrap mb-12">
          <h2 ref={textRef} className="text-[25vw] md:text-[20vw] font-serif italic font-light leading-none opacity-20 pointer-events-none select-none">
            Architect's Reserve / Architect's Reserve
          </h2>
        </div>
        
        <div className="text-center px-6 relative z-20 mt-[-15vw] md:mt-[-10vw]">
          <span className="text-[10px] sm:text-xs font-sans font-black uppercase tracking-[1em] mb-6 block">Private Viewing</span>
          <h3 className="text-5xl sm:text-6xl md:text-8xl font-serif font-light tracking-tighter leading-[0.9] mb-8">
            Beyond The <br />
            Public Gallery.
          </h3>
          <p className="text-sm md:text-base font-sans max-w-md mx-auto mb-16 opacity-80 leading-relaxed font-semibold">
            Off-market slabs, hyper-rare chromas, and zero-defect monolithic blocks reserved exclusively for master architects and visionaries.
          </p>
          
          <Link 
            ref={buttonRef}
            to="/contact"
            className="inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#0C0A08] text-[#C8A96E] text-[10px] font-sans font-black uppercase tracking-[0.4em] transition-all hover:scale-110 shadow-2xl z-30 relative"
          >
            <span className="text-center px-4 leading-relaxed">Request<br/>Access<br/>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArchitectsReserve;
