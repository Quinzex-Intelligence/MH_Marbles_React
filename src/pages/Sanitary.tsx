import React, { useEffect, useRef } from 'react';
import SEO from '@/components/SEO';
import { useGallery } from '@/contexts/GalleryContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Droplets, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Sanitary = () => {
    const { sanitary } = useGallery();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            
            // For each full-screen item, create a curtain reveal effect
            gsap.utils.toArray('.sanitary-item-section').forEach((section: unknown) => {
                const el = section as HTMLElement;
                const imageContainer = el.querySelector('.curtain-image-container');
                const image = el.querySelector('.curtain-image');
                const textBlock = el.querySelector('.curtain-text');

                // 1. The Image Container slowly grows its clip-path (curtain opens)
                gsap.fromTo(imageContainer, 
                    { clipPath: 'inset(100% 0% 0% 0%)' }, 
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start: "top bottom",
                            end: "center center",
                            scrub: true
                        }
                    }
                );

                // 2. The Image itself scales down slightly as the curtain opens for depth
                gsap.fromTo(image,
                    { scale: 1.2 },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: el,
                            start: "top bottom",
                            end: "center center",
                            scrub: true
                        }
                    }
                );

                // 3. The Text sweeps up
                gsap.fromTo(textBlock,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "20% bottom",
                            end: "center center",
                            scrub: 1
                        }
                    }
                );
            });

        });

        return () => ctx.revert();
    }, [sanitary]);

    return (
        <>
            <SEO 
                title="Bath & Wellness: Luxury Sanitary Ware" 
                description="Explore our curated collection of world-class sanitary fixtures. Transform your private sanctuaries into masterpieces of design and engineering."
            />
            <div className="min-h-screen bg-background text-foreground selection:bg-accent/30/30 selection:text-foreground">
                <Header />
                
                <main ref={containerRef} className="pb-0 bg-background">
                    
                    {/* Intro Hero - Ultra minimal */}
                    <div className="pt-40 md:pt-56 pb-32 px-6 md:px-[8%] relative z-10 border-b border-foreground/5">
                        <div className="max-w-4xl text-left">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-px bg-[#C8A96E]" />
                                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-[#C8A96E]">Bath & Wellness</span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-light leading-[0.8] tracking-tighter mb-12">
                                Private <br />
                                <span className="italic text-foreground/40">Sanctuary.</span>
                            </h1>
                            
                            <p className="text-lg md:text-2xl text-foreground/40 font-light max-w-2xl leading-relaxed">
                                Beyond utility. We curate world-class fixtures that transform intimate spaces into masterclasses of water engineering and fluid sculpture.
                            </p>
                        </div>
                    </div>

                    {/* Collection - Curtain Revealed Sections */}
                    {sanitary.length === 0 ? (
                        <div className="py-64 text-center border-b border-foreground/5 bg-background relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#C8A96E]/5 blur-[100px] rounded-full w-[80vw] h-[80vw] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <div className="relative z-10">
                                <Droplets className="w-16 h-16 text-[#C8A96E] mx-auto mb-10 stroke-[1px]" />
                                <h2 className="text-4xl font-serif italic text-foreground mb-6">Curating Collection</h2>
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40">The Private Sanctuary is being prepared</p>
                                <Link to="/contact" className="inline-flex items-center gap-4 mt-12 text-[#C8A96E] text-xs font-black uppercase tracking-[0.3em] hover:text-foreground transition-colors duration-500">
                                    Inquire for specialized sourcing <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            {sanitary.map((item, index) => (
                                <section key={item.id} className="sanitary-item-section h-[120vh] w-full relative group overflow-hidden bg-background">
                                    
                                    {/* Full bleed image container with clip-path animated via GSAP */}
                                    <div className="curtain-image-container absolute top-0 left-0 w-full h-[100vh]" style={{ clipPath: 'inset(100% 0 0 0)' }}>
                                        <img 
                                            src={item.image_url || item.image} 
                                            alt={item.name} 
                                            className="curtain-image w-full h-full object-cover grayscale-[30%] opacity-60 mix-blend-screen"
                                        />
                                        {/* Overlay gradient to ensure text legibility */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-transparent to-[#0C0A08]/50" />
                                    </div>
                                    
                                    {/* Massive foreground content structured over the image */}
                                    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-[8%] pointer-events-none z-10">
                                        <div className="max-w-5xl curtain-text pointer-events-auto">
                                            
                                            {/* Top Index Line */}
                                            <div className="flex items-center gap-6 mb-8 lg:mb-16">
                                                <span className="text-[10px] md:text-xs font-sans font-black tracking-[0.5em] text-[#C8A96E]">0{index + 1}</span>
                                                <div className="h-[1px] w-24 bg-foreground/20" />
                                            </div>
                                            
                                            {/* Massive Typography */}
                                            <h3 className="text-5xl sm:text-7xl md:text-[8rem] font-serif font-light text-foreground leading-[0.8] tracking-tighter mb-8 md:mb-12">
                                                {item.name}
                                            </h3>
                                            
                                            {/* Details & Action */}
                                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                                                <div className="space-y-6 max-w-lg">
                                                    <p className="text-base md:text-lg text-foreground/50 leading-relaxed font-sans font-light">
                                                        {item.description}
                                                    </p>
                                                    {item.price && (
                                                        <span className="block text-[10px] font-black text-[#C8A96E] tracking-[0.4em] uppercase">{item.price}</span>
                                                    )}
                                                </div>
                                                
                                                <Link 
                                                    to="/contact" 
                                                    className="inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-foreground/20 hover:border-[#C8A96E] hover:bg-[#C8A96E]/5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-foreground transition-all duration-700 bg-background/50 backdrop-blur-sm"
                                                >
                                                    <span className="text-center px-4">Inquire<br/>&rarr;</span>
                                                </Link>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                    {/* Architectural Side Line */}
                                    <div className="absolute top-0 right-[8%] w-[1px] h-full bg-foreground/5 pointer-events-none" />
                                    
                                </section>
                            ))}
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Sanitary;
