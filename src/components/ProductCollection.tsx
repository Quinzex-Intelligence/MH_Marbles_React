import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiles, Tile } from '@/data/tiles';
import { cn } from '@/lib/utils';
import { SlabImage } from './SlabImage';

gsap.registerPlugin(ScrollTrigger);

export function ProductCollection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="collection" className="py-20 md:py-40 lg:py-64 bg-background overflow-hidden relative">
      {/* Background Grid Pattern to fill space */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-foreground h-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 mb-16 md:mb-32 lg:mb-48">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <span className="text-[10px] font-bold tracking-[0.8em] uppercase text-accent mb-8 block font-inter">THE EXHIBITION</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-light text-foreground leading-[0.85] tracking-tight italic mb-6 md:mb-12">
            Sculptural <br />
            <span className="not-italic font-medium">Statements.</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-foreground/40 max-w-2xl font-light italic leading-relaxed md:leading-loose">
            An immersive walk through the earth’s most exquisite formations.
            Each slab is a singular masterpiece, curated for the visionary architect.
          </p>
        </motion.div>
      </div>

      <div className="space-y-20 md:space-y-48 lg:space-y-64">
        {tiles.slice(0, 6).map((tile, index) => (
          <ShowcaseItem key={tile.id} tile={tile} index={index} />
        ))}
      </div>
    </section>
  );
}

function ShowcaseItem({ tile, index }: { tile: Tile; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Group Reveal
      gsap.from(imageRef.current, {
        x: isEven ? -100 : 100,
        opacity: 0,
        duration: 2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      });

      // Text Interaction
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div ref={containerRef} className={cn(
      "relative container mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-32",
      !isEven && "md:flex-row-reverse md:text-right"
    )}>
      {/* Immersive Slab Showcase */}
      <div className="flex-1 w-full relative group min-h-[300px] md:min-h-[500px]">
        <div ref={imageRef} className="w-full h-full relative z-10">
          <SlabImage image={tile.image} color={tile.textureColor} name={tile.name} />

          <div className={cn(
            "absolute top-0 z-20 pointer-events-none p-8 md:p-12",
            isEven ? "left-0" : "right-0"
          )}>
            <span className="text-[10px] font-bold text-foreground/30 tracking-[0.5em] uppercase block mb-3 font-inter">Curation Ref. 0{index + 1}</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light text-foreground italic tracking-tighter uppercase drop-shadow-sm">{tile.name}</span>
          </div>
        </div>
      </div>

      {/* Narrative Context */}
      <div ref={textRef} className="flex-1 max-w-lg space-y-6 md:space-y-12 pt-4 md:pt-0">
        <div className="space-y-6">
          <span className="text-[11px] font-bold text-accent uppercase tracking-[0.6em]">The Evolution of Space</span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-foreground italic leading-none">{tile.color} <br /> <span className="not-italic font-medium">Composition.</span></h3>
        </div>

        <p className="text-base md:text-lg lg:text-xl text-foreground/60 leading-relaxed font-light italic">
          Each slab of {tile.name} is a billion-year narrative written in mineral.
          Sourced from the heart of the most ancient quarries, it represents the
          pinnacle of natural crystallization. Its {tile.finish} surface
          captures light in ways no manufactured material can replicate.
        </p>

        <div className={cn("flex items-center gap-10", !isEven && "justify-end")}>
          <div className="w-24 h-[1px] bg-accent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30">Limited Exhibition 0{index + 1}</span>
        </div>
      </div>

      {/* Dynamic Background Element */}
      <span className={cn(
        "absolute -z-10 text-[35vw] font-black text-foreground/[0.015] leading-none pointer-events-none select-none italic",
        isEven ? "-right-24 top-1/4" : "-left-24 bottom-1/4"
      )}>
        {tile.name.charAt(0)}
      </span>
    </div>
  );
}

export default ProductCollection;