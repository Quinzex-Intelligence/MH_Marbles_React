import React, { useEffect, useRef } from 'react';
import SEO from '@/components/SEO';
import { PageLayout } from '@/components/PageLayout';
import { ProductCollection } from '@/components/ProductCollection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { ArchitectsReserve } from '@/components/ArchitectsReserve';

const Collection = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Massive overlay text parallax that breaks normal section bounds
            gsap.to(textRef.current, {
                yPercent: 40,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <SEO 
                title="The Collection: Masterpiece Marbles" 
                description="Explore our curated selection of ultra-premium, high-density marbles sourced from the world's most exclusive quarries."
            />
            
            <PageLayout title="The Archive." subtitle="Curated Rarity">
                
                {/* Massive Floating Hero that breaks bounds */}
                <div ref={heroRef} className="h-screen w-full relative bg-[#0C0A08] flex items-center justify-center overflow-hidden border-t border-white/5">
                    {/* Architectural noise */}
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    
                    {/* Floating Imagery */}
                    <div className="absolute top-[10%] left-[5%] w-[30%] aspect-[3/4] border border-white/5 overflow-hidden z-0 hidden md:block opacity-40 mix-blend-screen grayscale">
                        <img src="https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&q=80&w=1200" alt="Marble Slab Detail" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-[10%] right-[5%] w-[40%] aspect-video border border-white/5 overflow-hidden z-0 opacity-30 mix-blend-screen sepia-[0.3]">
                        <img src="https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&q=80&w=1200" alt="Interior Application" className="w-full h-full object-cover" />
                    </div>

                    {/* Massive Central Typography */}
                    <h1 ref={textRef} className="relative z-10 text-[15vw] md:text-[18vw] font-serif font-light text-white leading-[0.7] tracking-tighter mix-blend-difference select-none text-center pointer-events-none">
                        Earth's <br/>
                        <span className="italic text-[#C8A96E]">Archive.</span>
                    </h1>
                </div>

                {/* The Grid Component */}
                <div className="relative z-20 bg-[#0A0806] pt-24 pb-48 border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
                    <ProductCollection />
                </div>

                {/* Highly Creative Footer CTA Section */}
                <ArchitectsReserve />

            </PageLayout>
        </>
    );
};

export default Collection;
