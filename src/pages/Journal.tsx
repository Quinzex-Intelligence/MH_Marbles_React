import React, { useEffect, useRef } from 'react';
import SEO from '@/components/SEO';
import { PageLayout } from '@/components/PageLayout';
import { Reviews } from '@/components/Reviews';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JournalPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const quotesRef = useRef<(HTMLHeadingElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Deep Y-Axis Parallax for Editorial Floating Images
            imagesRef.current.forEach((img, i) => {
                if (!img) return;
                const speed = 1 + (i * 0.5); // Varying speeds for depth
                
                gsap.to(img, {
                    yPercent: -40 * speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                });
            });

            // Parallax for huge pull quotes
            quotesRef.current.forEach((quote, i) => {
                if (!quote) return;
                
                gsap.to(quote, {
                    yPercent: 30, // Moves slightly opposite to scroll
                    ease: "none",
                    scrollTrigger: {
                        trigger: quote.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <SEO 
                title="The Journal: Architectural Insights" 
                description="Read about our latest journeys to Italian quarries, new showroom openings, and architectural transformations."
            />
            <PageLayout
                title="The Journal."
                subtitle="Voices of Vision"
            >
                <div ref={containerRef} className="bg-background w-full text-foreground relative">
                    
                    {/* The Horizontal Marquee (Existing component, acts as our opening chronicle) */}
                    <div className="relative z-20">
                        <Reviews />
                    </div>
                    
                    {/* Avant-Garde Editorial Collage Section */}
                    <section className="py-32 md:py-64 relative overflow-hidden bg-gradient-to-b from-[#0C0A08] to-[#0A0806] border-t border-foreground/5">
                        <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        
                        <div className="w-full max-w-none px-6 md:px-[8%] relative z-10">
                            
                            {/* Massive Editorial Header */}
                            <div className="flex flex-col items-center justify-center text-center space-y-8 mb-40 md:mb-64">
                                <span className="text-[10px] md:text-xs font-sans font-black tracking-[1em] uppercase text-[#C8A96E]">Chronicle</span>
                                <h3 
                                    ref={el => quotesRef.current[0] = el}
                                    className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-light leading-[0.8] tracking-tighter"
                                >
                                    Stone <span className="italic text-foreground/30">&</span> <br />
                                    Time.
                                </h3>
                            </div>

                            {/* Floating Collage Grid (Asymmetric, overlapping) */}
                            <div className="relative w-full h-[150vh] md:h-[200vh]">
                                
                                {/* Central Architect Detail */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[90%] md:w-[40%] aspect-square z-10 p-4 border border-foreground/5 bg-foreground/[0.01]">
                                    <div className="w-full h-full overflow-hidden">
                                        <img 
                                            ref={el => imagesRef.current[0] = el}
                                            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200" 
                                            alt="Architectural space" 
                                            className="w-full h-[140%] object-cover grayscale opacity-80"
                                        />
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 bg-[#C8A96E] text-[#0C0A08] p-8 md:p-12 z-20 shadow-2xl">
                                        <span className="text-[9px] font-black uppercase tracking-[0.5em] block">Volume I</span>
                                        <span className="text-3xl font-serif italic mt-2 block">Space.</span>
                                    </div>
                                </div>

                                {/* Floating Typography Overlay */}
                                <div className="absolute top-[35%] left-[5%] md:left-[10%] z-30 mix-blend-difference pointer-events-none">
                                    <h4 
                                        ref={el => quotesRef.current[1] = el}
                                        className="text-6xl md:text-[8rem] font-serif font-light text-[#C8A96E] leading-[0.8] mix-blend-screen"
                                    >
                                        Beyond<br/>
                                        <span className="text-foreground italic">Form.</span>
                                    </h4>
                                </div>

                                {/* Asymmetric Right Image */}
                                <div className="absolute right-[5%] top-[45%] w-[60%] md:w-[35%] aspect-[3/4] z-0 overflow-hidden border border-foreground/10">
                                    <img 
                                        ref={el => imagesRef.current[1] = el}
                                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                                        alt="Modern architecture" 
                                        className="w-full h-[160%] object-cover sepia-[0.3] contrast-125 opacity-60"
                                    />
                                </div>

                                {/* Asymmetric Left Low Image */}
                                <div className="absolute left-[5%] bottom-[10%] w-[50%] md:w-[25%] aspect-square z-20 overflow-hidden ring-1 ring-foreground/20 p-2">
                                    <img 
                                        ref={el => imagesRef.current[2] = el}
                                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
                                        alt="Minimalist design" 
                                        className="w-full h-[150%] object-cover grayscale-[80%] opacity-90"
                                    />
                                </div>
                                
                                {/* Deep Background Watermark */}
                                <div className="absolute right-0 bottom-0 text-[30vw] font-serif italic font-light text-foreground/[0.02] leading-none z-0 pointer-events-none select-none">
                                    XXI
                                </div>

                            </div>
                        </div>
                    </section>
                    
                    {/* Dark Minimalist CTA */}
                    <section className="py-32 md:py-48 bg-[#050403] relative border-t border-foreground/5">
                        <div className="w-full max-w-none px-6 md:px-[8%] relative z-10 text-center">
                            <div className="max-w-4xl mx-auto">
                                <span className="text-[10px] font-sans font-black tracking-[0.8em] uppercase text-[#C8A96E] mb-10 block">Submit Your Narrative</span>
                                
                                <h3 className="text-5xl sm:text-6xl md:text-8xl font-serif font-light leading-[0.9] tracking-tighter mb-10 md:mb-16">
                                    Become part <br />
                                    <span className="italic text-foreground/50">of the story.</span>
                                </h3>
                                
                                <p className="text-base md:text-xl font-sans font-light text-foreground/40 leading-relaxed mb-16 max-w-2xl mx-auto">
                                    We are continually seeking to share the extraordinary ways our stones have transformed architectural spaces. Contact us to have your project featured.
                                </p>
     
                                <a href="/contact" className="inline-flex items-center justify-center border border-foreground/20 hover:border-[#C8A96E] hover:bg-[#C8A96E]/10 h-16 md:h-20 px-12 md:px-16 text-[9px] md:text-[10px] font-sans font-black uppercase tracking-[0.5em] transition-all duration-700 text-foreground">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </section>

                </div>
            </PageLayout>
        </>
    );
};

export default JournalPage;
