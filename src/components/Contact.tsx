import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storeInfo = {
  name: 'MH Marbles Showroom',
  address: '123 Tile Street, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072',
  phone: '+91 98765 43210',
  email: 'curator@mhmarble.com',
  hours: [
    { day: 'Monday - Saturday', time: '09:00 — 20:00' },
    { day: 'Sunday', time: '10:00 — 18:00' },
  ],
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2965474657367!2d78.4177!3d17.4947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzQxLjAiTiA3OMKwMjUnMDMuNyJF!5e0!3m2!1sen!2sin!4v1234567890',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=17.4947,78.4177',
};

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        if (containerRef.current) {
            gsap.from(containerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%"
                }
            });
        }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="relative bg-background transition-colors duration-700 overflow-hidden min-h-[90vh] flex items-center justify-center py-24">
      
      {/* ── Full-Bleed Map Background ────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe
          src={storeInfo.mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'contrast(1.2) grayscale(1) opacity(0.6)' }}
          allowFullScreen
          loading="lazy"
          title="MH Marbles Location"
          className="scale-105" // prevent edges showing on bounce
        />
        {/* Gradients to blend map into content */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      </div>

      {/* ── Unified Concierge Desk Card ───────────────────── */}
      <div className="relative z-10 w-full max-w-4xl px-4 md:px-8">
        <div
          ref={containerRef}
          className="bg-background/80 backdrop-blur-xl border border-border p-10 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden"
        >
          {/* Internal architectural lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute top-0 left-[50%] w-[1px] h-full bg-border/20" />

          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-6 h-[1px] bg-[#C8A96E]" />
              <span className="text-[9px] font-sans font-black tracking-[0.8em] uppercase text-[#C8A96E]">
                Concierge
              </span>
              <div className="w-6 h-[1px] bg-[#C8A96E]" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-light text-foreground leading-tight tracking-tight">
              Personal <span className="italic text-foreground/40">Appointments.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            
            {/* Left Column: Location & Hours */}
            <div className="flex flex-col gap-12">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.5em] text-[#C8A96E]/50 mb-4">The Gallery</p>
                <p className="text-lg md:text-xl font-serif font-light text-foreground/60 leading-relaxed italic">
                  123 Tile Street, Kukatpally<br />
                  Housing Board Colony,<br />
                  Hyderabad, Telangana 500072
                </p>
              </div>

              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.5em] text-[#C8A96E]/50 mb-5">Gallery Hours</p>
                <div className="space-y-3">
                  {storeInfo.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-border pb-2 text-foreground">
                       <span className="text-xs font-sans font-bold uppercase tracking-widest opacity-30">{h.day}</span>
                       <span className="text-sm font-serif italic text-accent/60">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact & CTA */}
            <div className="flex flex-col gap-12 justify-between">
              <div className="space-y-12">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.5em] text-[#C8A96E]/50 mb-4">Direct Line</p>
                  <a href={`tel:${storeInfo.phone.replace(/\s+/g, '')}`} className="text-2xl font-serif font-light text-foreground hover:text-accent transition-colors italic block">
                    {storeInfo.phone}
                  </a>
                </div>

                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.5em] text-[#C8A96E]/50 mb-4">Electronic Mail</p>
                  <a href={`mailto:${storeInfo.email}`} className="text-xl lg:text-2xl font-serif font-light text-foreground hover:text-accent transition-colors italic block">
                    {storeInfo.email}
                  </a>
                </div>
              </div>

              <div>
                <a 
                  href={storeInfo.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between w-full border border-border hover:border-accent px-8 py-5 transition-colors duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.5em] text-foreground group-hover:text-background transition-colors duration-500">
                    Get Directions
                  </span>
                  <span className="relative z-10 text-foreground/50 group-hover:text-background transition-colors duration-500">↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
