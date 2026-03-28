import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tile } from '@/data/tiles';
import { useGallery } from '@/contexts/GalleryContext';
import { cn } from '@/lib/utils';
import { SlabImage } from './SlabImage';

gsap.registerPlugin(ScrollTrigger);

export function ProductCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { tiles } = useGallery();
  const [selectedSpace, setSelectedSpace] = useState<string>('All');
  
  const spaces = ['All', 'Kitchen', 'Living Room', 'Bathroom', 'Outdoor', 'Commercial'];
  
  const filteredTiles = selectedSpace === 'All' 
    ? tiles 
    : tiles.filter(t => t.space === selectedSpace || (t.usage && t.usage.includes(selectedSpace)));

  useEffect(() => {
    // Refresh ScrollTrigger when filter changes to recalculate heights
    ScrollTrigger.refresh();
  }, [selectedSpace]);

  return (
    <section ref={sectionRef} id="collection" className="bg-background relative z-10 w-full pb-48 transition-colors duration-500">
        
      {/* Intro Header aligned with new aesthetic */}
      <div className="w-full max-w-none px-6 md:px-[8%] relative z-10 py-32 md:py-48 bg-background transition-colors duration-500">
        <div className="max-w-5xl">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-16 h-[1px] bg-[#C8A96E]" />
             <span className="text-[9px] font-sans font-black tracking-[0.9em] uppercase text-[#C8A96E]">THE COLLECTION</span>
          </div>
          <h2 className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-light text-foreground leading-[0.8] tracking-tighter mb-12">
            Visual <br />
            <span className="italic text-foreground/30">Majesty.</span>
          </h2>
          <p className="text-xl md:text-3xl text-foreground/50 max-w-3xl font-sans font-light leading-relaxed">
            Experience the raw, unadulterated beauty of the earth's deepest veins. These are not merely stones; they are terrestrial art.
          </p>
        </div>

        {/* Space Filtering UI */}
        <div className="mt-24 md:mt-32 flex flex-wrap gap-x-12 gap-y-8 border-b border-border pb-10">
          {spaces.map((space) => (
            <button
              key={space}
              onClick={() => setSelectedSpace(space)}
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.5em] transition-all duration-500 relative py-2 outline-none focus:outline-none",
                selectedSpace === space ? "text-[#C8A96E]" : "text-white/20 hover:text-white/80"
              )}
            >
              {space}
              {selectedSpace === space && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-[#C8A96E] transition-all" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* The Ultra-Visual Product Showcase List */}
      <div className="flex flex-col w-full relative z-10">
        {filteredTiles.slice(0, 8).map((tile, index) => (
          <ShowcaseItem key={`${tile.id}-${selectedSpace}`} tile={tile} index={index} />
        ))}
        {filteredTiles.length === 0 && (
            <div className="py-48 text-center text-foreground/30 text-xs font-black uppercase tracking-[0.5em] font-sans">
                No monoliths found for this specification.
            </div>
        )}
      </div>

    </section>
  );
}

function ShowcaseItem({ tile, index }: { tile: Tile; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
          scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1
          }
      });

      // Extreme parallax on the image wrapper
      tl.fromTo(imageWrapperRef.current, 
          { yPercent: -15 }, 
          { yPercent: 15, ease: "none" },
          0
      );

      // Deep, massive text drops down slightly as you scroll
      tl.fromTo(textRef.current,
          { yPercent: 40 },
          { yPercent: -10, ease: "none" },
          0
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] min-h-[800px] flex items-center justify-center overflow-hidden bg-background border-t border-border transition-colors duration-500">
      
      {/* Massive Background Typography Marker */}
      <div className="absolute top-0 right-0 p-8 z-0 select-none pointer-events-none">
          <span className="text-[40vw] font-serif font-black italic text-[#C8A96E]/[0.02] leading-none mix-blend-screen">
              0{index + 1}
          </span>
      </div>

      {/* Extreme Full-Bleed Visual Presentation of the Marble */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] flex items-center justify-center z-10 pointer-events-none overflow-hidden" ref={imageWrapperRef}>
         <div className="w-full h-full relative group">
            <img 
                src={tile.image} 
                alt={tile.name} 
                className="w-full h-full object-cover grayscale-[0.2] contrast-125 transition-transform duration-[10s] ease-out group-hover:scale-[1.03]"
            />
            
            {/* Dark vignette to ensure text legibility globally */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_120%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/80" />
         </div>
      </div>

      {/* Floating Tactical Data / Minimalist Overlay text */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-[8%] z-20 h-full flex flex-col justify-end pb-32 pointer-events-none">
          <div ref={textRef} className="w-full pointer-events-auto">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 w-full">
                  <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-[1px] bg-[#C8A96E]" />
                         <span className="text-[10px] sm:text-xs font-sans font-black text-[#C8A96E] uppercase tracking-[0.5em]">{tile.category || "Signature Series"}</span>
                      </div>
                      <h3 className="text-6xl sm:text-8xl md:text-[9rem] font-serif font-light text-foreground leading-[0.8] tracking-tighter mix-blend-difference">
                          {tile.name}
                      </h3>
                  </div>

                  {/* Architectural Data Grid */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-x-8 gap-y-12 max-w-lg mb-4 bg-background/40 backdrop-blur-md p-8 border border-border">
                      <div>
                          <span className="block text-[8px] font-sans font-black uppercase tracking-[0.4em] text-foreground/40 mb-3">Origin Quarry</span>
                          <span className="block text-xl md:text-2xl font-serif italic text-foreground/90">{tile.origin}</span>
                      </div>
                      <div>
                          <span className="block text-[8px] font-sans font-black uppercase tracking-[0.4em] text-foreground/40 mb-3">Finish Types</span>
                          <span className="block text-xl md:text-2xl font-serif italic text-foreground/90">{tile.finishes?.join(', ') || 'Polished'}</span>
                      </div>
                      <div className="col-span-2">
                          <span className="block text-[8px] font-sans font-black uppercase tracking-[0.4em] text-foreground/40 mb-3">Profile</span>
                          <p className="text-sm md:text-base font-sans font-light text-foreground/60 leading-relaxed">
                              {tile.description}
                          </p>
                      </div>
                  </div>
              </div>

              {/* Interaction Details */}
              <div className="w-full flex justify-between items-center mt-12 pt-8 border-t border-white/10">
                  <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
                      <span>{tile.thickness}mm Thickness</span>
                      <span className="hidden md:inline">•</span>
                      <span className="hidden md:inline">{tile.price ? tile.price : 'Price upon request'}</span>
                  </div>
                  <a href="/contact" className="group flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-[#C8A96E] hover:text-white transition-colors">
                      Request Technical Spec <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                  </a>
              </div>

          </div>
      </div>

    </div>
  );
}

export default ProductCollection;
