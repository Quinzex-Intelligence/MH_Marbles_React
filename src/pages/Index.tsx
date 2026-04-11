import React, { useRef, useEffect } from 'react';
import SEO from '@/components/SEO';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryMasks } from '@/components/CategoryMasks';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { WhyUs } from '@/components/WhyUs';
import { Reviews } from '@/components/Reviews';
import { Contact } from '@/components/Contact';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { MobileSticky } from '@/components/MobileSticky';
import { useGallery } from '@/contexts/GalleryContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Reusable Architect's Reserve Section ─────────────────────────────────────
const ArchitectsReserve = ({
  id,
  containerClass,
  textClass,
  btnClass,
  showButton = true,
}: {
  id: string;
  containerClass?: string;
  textClass?: string;
  btnClass?: string;
  showButton?: boolean;
}) => (
  <div
    className={`reserve-container ${id} min-h-[120vh] bg-[#C8A96E] text-[#0C0A08] relative flex flex-col items-center justify-center overflow-hidden selection:bg-background selection:text-[#C8A96E] ${containerClass || ''}`}
  >
    <div className="w-full max-w-none relative z-10 flex flex-col items-center py-32">
      {/* Huge scrubbed text background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden h-full">
        <h2
          className={`reserve-massive-text ${textClass || ''} text-[35vw] font-serif italic font-light leading-none opacity-[0.07] whitespace-nowrap will-change-transform`}
        >
          Architect's Reserve &mdash; Architect's Reserve &mdash; Architect's Reserve
        </h2>
      </div>

      <div className="text-center px-6 relative z-20">
        <span className="text-[10px] sm:text-xs font-sans font-black uppercase tracking-[1em] mb-8 block">
          Private Viewing
        </span>
        <h3 className="text-6xl sm:text-7xl md:text-9xl font-serif font-light tracking-tighter leading-[0.8] mb-12">
          Beyond The <br />
          <span className="italic">Public Gallery.</span>
        </h3>
        <p className="text-sm md:text-lg font-sans max-w-lg mx-auto mb-20 opacity-90 leading-relaxed font-medium">
          Off-market slabs, hyper-rare chromas, and zero-defect monolithic blocks reserved
          exclusively for master architects and visionaries.
        </p>

        {showButton && (
          <div className="flex flex-col items-center">
            <a
              href="/contact"
              className={`reserve-cta-btn ${btnClass || ''} group inline-flex items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full bg-background text-[#C8A96E] text-[10px] font-sans font-black uppercase tracking-[0.4em] transition-all duration-700 hover:scale-105 shadow-2xl relative`}
            >
              <div className="absolute inset-0 rounded-full border border-[#C8A96E]/20 scale-110 group-hover:scale-125 transition-transform duration-700" />
              <span className="text-center px-4 leading-relaxed z-10">
                Request
                <br />
                Access
                <br />
                &rarr;
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const Index = () => {
  const { backendTiles } = useGallery();

  // Stable refs for both sections
  const reserve1Container = useRef<HTMLDivElement>(null);
  const reserve1Text = useRef<HTMLHeadingElement>(null);
  const reserve1Btn = useRef<HTMLAnchorElement>(null);

  const reserve2Container = useRef<HTMLDivElement>(null);
  const reserve2Text = useRef<HTMLHeadingElement>(null);
  const reserve2Btn = useRef<HTMLAnchorElement>(null);

  // Single effect — runs on mount AND whenever products finish loading.
  // The 800ms delay guarantees FeaturedProducts has set up its own pin before
  // we calculate positions for the sections below it.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const setup = () => {
      // Kill any previously created triggers so we never double-up
      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === 'reserve-scroll-1' || t.vars.id === 'reserve-scroll-2')
        .forEach((t) => t.kill());

      const r1c = reserve1Container.current;
      const r1t = reserve1Text.current;
      const r2c = reserve2Container.current;
      const r2t = reserve2Text.current;

      if (r1c && r1t) {
        gsap.to(r1t, {
          xPercent: -40,
          ease: 'none',
          scrollTrigger: {
            id: 'reserve-scroll-1',
            trigger: r1c,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });
      }

      if (r2c && r2t) {
        gsap.to(r2t, {
          xPercent: -40,
          ease: 'none',
          scrollTrigger: {
            id: 'reserve-scroll-2',
            trigger: r2c,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });
      }

      // Magnetic button for the second (CTA) section
      const btn = reserve2Btn.current;
      if (btn) {
        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.4,
            y: (e.clientY - r.top - r.height / 2) * 0.4,
            duration: 0.3,
            ease: 'power2.out',
          });
        };
        const onLeave = () =>
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        btn.addEventListener('mousemove', onMove);
        btn.addEventListener('mouseleave', onLeave);
      }

      ScrollTrigger.refresh();
    };

    // First pass — after initial paint
    timers.push(setTimeout(setup, 400));

    // Second pass — after products have loaded and FeaturedProducts pin is stable
    if (backendTiles.length > 0) {
      timers.push(setTimeout(setup, 900));
    }

    return () => {
      timers.forEach(clearTimeout);
      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === 'reserve-scroll-1' || t.vars.id === 'reserve-scroll-2')
        .forEach((t) => t.kill());
    };
  }, [backendTiles.length]);

  return (
    <>
      <SEO
        title="Architectural Stone Gallery & Signature Stone Curation"
        description="Curators of the earth's most exquisite architectural statements. Discover our signature collection of Italian marble and exotic stones, crafted for the discerning visionary since 1980."
      />

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <CategoryMasks />
          <FeaturedProducts />

          {/* ── First Reserve Strip (no button — pure marquee teaser) ── */}
          <div ref={reserve1Container} className="reserve-section-1 min-h-[120vh] bg-[#C8A96E] text-[#0C0A08] relative flex flex-col items-center justify-center overflow-hidden selection:bg-background selection:text-[#C8A96E]">
            <div className="w-full max-w-none relative z-10 flex flex-col items-center py-32">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden h-full">
                <h2
                  ref={reserve1Text}
                  className="text-[35vw] font-serif italic font-light leading-none opacity-[0.07] whitespace-nowrap will-change-transform"
                >
                  Architect's Reserve &mdash; Architect's Reserve &mdash; Architect's Reserve
                </h2>
              </div>
              <div className="text-center px-6 relative z-20">
                <span className="text-[10px] sm:text-xs font-sans font-black uppercase tracking-[1em] mb-8 block">
                  Private Viewing
                </span>
                <h3 className="text-6xl sm:text-7xl md:text-9xl font-serif font-light tracking-tighter leading-[0.8] mb-12">
                  Beyond The <br />
                  <span className="italic">Public Gallery.</span>
                </h3>
                <p className="text-sm md:text-lg font-sans max-w-lg mx-auto mb-4 opacity-90 leading-relaxed font-medium">
                  Off-market slabs, hyper-rare chromas, and zero-defect monolithic blocks reserved
                  exclusively for master architects and visionaries.
                </p>
              </div>
            </div>
          </div>

          <WhyUs />
          <Reviews />

          {/* ── Second Reserve Strip (full CTA) ── */}
          <div ref={reserve2Container} className="reserve-section-2 min-h-[120vh] bg-[#C8A96E] text-[#0C0A08] relative flex flex-col items-center justify-center overflow-hidden selection:bg-background selection:text-[#C8A96E]">
            <div className="w-full max-w-none relative z-10 flex flex-col items-center py-32">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden h-full">
                <h2
                  ref={reserve2Text}
                  className="text-[35vw] font-serif italic font-light leading-none opacity-[0.07] whitespace-nowrap will-change-transform"
                >
                  Architect's Reserve &mdash; Architect's Reserve &mdash; Architect's Reserve
                </h2>
              </div>
              <div className="text-center px-6 relative z-20">
                <span className="text-[10px] sm:text-xs font-sans font-black uppercase tracking-[1em] mb-8 block">
                  Private Viewing
                </span>
                <h3 className="text-6xl sm:text-7xl md:text-9xl font-serif font-light tracking-tighter leading-[0.8] mb-12">
                  Beyond The <br />
                  <span className="italic">Public Gallery.</span>
                </h3>
                <p className="text-sm md:text-lg font-sans max-w-lg mx-auto mb-20 opacity-90 leading-relaxed font-medium">
                  Off-market slabs, hyper-rare chromas, and zero-defect monolithic blocks reserved
                  exclusively for master architects and visionaries.
                </p>
                <div className="flex flex-col items-center">
                  <a
                    ref={reserve2Btn}
                    href="/contact"
                    className="group inline-flex items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full bg-background text-[#C8A96E] text-[10px] font-sans font-black uppercase tracking-[0.4em] transition-all duration-700 hover:scale-105 shadow-2xl relative"
                  >
                    <div className="absolute inset-0 rounded-full border border-[#C8A96E]/20 scale-110 group-hover:scale-125 transition-transform duration-700" />
                    <span className="text-center px-4 leading-relaxed z-10">
                      Request
                      <br />
                      Access
                      <br />
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Contact />
          <CTA />
        </main>
        <Footer />
        <MobileSticky />
      </div>
    </>
  );
};

export default Index;
