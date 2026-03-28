import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGallery } from '@/contexts/GalleryContext';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function Reviews() {
  const { journal } = useGallery();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Header Reveal
      if (headerRef.current) {
          gsap.from(headerRef.current.children, {
              y: 40,
              opacity: 0,
              duration: 1.2,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                  trigger: headerRef.current,
                  start: "top 85%"
              }
          });
      }

      // Horizontal Scroll Track
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const totalScrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      gsap.to(scrollContainer, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalScrollWidth}`, // scroll duration depends on width
          pin: true,
          scrub: 1, // smooth scrub
          anticipatePin: 1,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [journal]);

  return (
    <section ref={sectionRef} id="reviews" className="relative bg-background h-screen overflow-hidden flex flex-col justify-center border-t border-border transition-colors duration-500">
      {/* ── Background Elements ───────────────────────── */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-[8%] w-[1px] h-full bg-[#C8A96E]/10" />
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-border/5" />
        <div className="absolute top-[80%] left-0 w-full h-[1px] bg-border/5" />
      </div>

      {/* ── Fixed Header ────────────────────────────────── */}
      <div className="relative z-10 px-6 md:px-[8%] pt-20 pb-12 w-full flex-shrink-0">
        <div ref={headerRef}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-[1px] bg-[#C8A96E]" />
            <span className="text-[9px] font-sans font-black tracking-[0.9em] uppercase text-[#C8A96E]">
              The Journal
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-serif font-light text-foreground text-5xl sm:text-7xl md:text-[6.5rem] leading-[0.85] tracking-tight">
              Written in <span className="italic text-accent/80">Stone.</span>
            </h2>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="font-serif text-4xl md:text-6xl font-light text-foreground">4.9</div>
                <div className="text-[8px] font-bold uppercase tracking-[0.4em] text-accent/50 mt-1">
                  Avg Rating
                </div>
              </div>
              <div className="w-[1px] h-12 bg-border" />
              <p className="text-[9px] font-sans font-bold uppercase tracking-[0.4em] leading-relaxed text-foreground/30 max-w-[150px]">
                Recognized for unparalleled curation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Horizontal Scrolling Track ───────────────────── */}
      <div className="relative z-20 flex-1 flex items-center overflow-hidden w-full">
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 md:gap-16 px-6 md:px-[8%] w-max pr-[20vw]" // extra padding at end to scroll past
        >
          {journal.map((entry, index) => (
            <div 
              key={entry.id}
              className="w-[85vw] md:w-[600px] flex-shrink-0 group relative"
            >
              {/* Card Background & Borders */}
              <div className="absolute inset-0 bg-background border border-border group-hover:border-accent/20 transition-colors duration-700 shadow-luxury" />
              
              <div className="relative p-10 md:p-14 h-full flex flex-col justify-between">
                
                {/* Top: Index & Meta */}
                <div className="flex items-center justify-between mb-12">
                   <span className="text-[10px] font-black font-sans uppercase tracking-[0.6em] text-[#C8A96E]/40 group-hover:text-[#C8A96E] transition-colors duration-500">
                     {String(index + 1).padStart(2, '0')}
                   </span>
                   <div className="flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                     {[...Array(5)].map((_, i) => (
                       <span key={i} className="text-[#C8A96E] text-xs">★</span>
                     ))}
                   </div>
                </div>

                {/* Middle: Quote */}
                <div className="flex-1 flex items-center">
                  <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-light italic text-foreground/60 leading-relaxed group-hover:text-foreground transition-colors duration-700">
                    "{entry.excerpt}"
                  </p>
                </div>

                {/* Bottom: Client info & divider */}
                <div className="mt-16">
                  <div className="w-full h-[1px] bg-border mb-8 group-hover:bg-accent/20 transition-colors duration-500" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                       <h4 className="font-serif text-xl text-foreground tracking-wide">{entry.title}</h4>
                       <span className="text-[8px] font-black uppercase tracking-[0.5em] text-foreground/20 mt-2 block">
                         Client &middot; Architectural Chronicle
                       </span>
                     </div>
                     <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-accent/40">
                       {entry.date}
                     </span>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Final 'Discover All' card in the scroll track */}
          <div className="w-[85vw] md:w-[400px] flex-shrink-0 flex items-center justify-center p-10">
             <a
              href="https://g.page/mh-marble-hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-6 p-12 border border-border hover:border-accent/30 bg-foreground/[0.01] hover:bg-foreground/[0.03] transition-all duration-700 cursor-pointer h-full w-full"
            >
              <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-all duration-700">
                 <span className="text-accent group-hover:text-white">↗</span>
              </div>
              <span className="text-[10px] font-black font-sans uppercase tracking-[0.5em] text-foreground/40 group-hover:text-foreground text-center leading-loose">
                Discover All<br/>Testimonials
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Reviews;
