import { motion } from 'framer-motion';
import { Award, Truck, Palette, Shield, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Handpicked marble and tiles sourced from the finest quarries worldwide. Every piece meets our strict quality standards.',
  },
  {
    icon: Palette,
    title: 'Trending Designs',
    description: 'Stay ahead with the latest design trends. From classic elegance to contemporary minimalism, we have it all.',
  },
  {
    icon: Truck,
    title: 'Same-Day Delivery',
    description: 'Need it fast? Our express delivery ensures your materials arrive the same day within Hyderabad.',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: '100% authentic products with manufacturer warranty. We stand behind every tile we sell.',
  },
  {
    icon: Clock,
    title: '15+ Years Experience',
    description: 'Trusted by thousands of homeowners and builders across Telangana for over 15 years.',
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    description: 'Our design consultants help you choose the perfect flooring for your space, style, and budget.',
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="py-48 bg-background transition-colors duration-700 overflow-hidden">
      <div className="container mx-auto px-8 md:px-12">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          {/* Narrative Content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-accent mb-8 block">Architecture & Soul</span>
              <h2 className="text-6xl md:text-7xl font-light text-foreground leading-[0.9] mb-12 italic">
                The Mark <br />
                <span className="not-italic font-medium">of Legacy.</span>
              </h2>

              <div className="space-y-8 text-lg font-light text-foreground/60 leading-relaxed italic">
                <p>
                  For nearly half a century, we have curated a sanctuary of the earth's most
                  exquisite stones. Our journey is not merely about surfaces, but about
                  the enduring legacy of architectural masterpieces.
                </p>
                <p>
                  Each slab in our gallery is hand-selected from the most ancient quarries
                  of Italy, Spain, and beyond, ensuring that every project we touch
                  becomes a testament to timeless elegance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 mt-20">
                <div className="space-y-2">
                  <p className="text-4xl font-light text-foreground tracking-tighter italic">45+</p>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Years of Craft</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-light text-foreground tracking-tighter italic">500+</p>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Signature Textures</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual Presentation */}
          <div className="flex-1 relative w-full aspect-[4/5] bg-black">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
              alt="Marble Workshop"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 border-[20px] border-white/5" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-accent flex items-center justify-center p-12 text-center text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] leading-loose">
                Mastering the Art of Natural Selection
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Affiliations */}
        <div className="mt-48 pt-24 border-t border-foreground/5">
          <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-foreground/20 text-center mb-16 italic font-inter">Distinguished Partners</p>
          <div className="flex flex-wrap justify-center gap-x-24 gap-y-12 items-center opacity-30 grayscale hover:grayscale-0 dark:invert transition-all duration-700">
            {['KAJARIA', 'SOMANY', 'JOHNSON', 'RAK', 'NITCO', 'ASIAN GRANITO'].map((brand) => (
              <span key={brand} className="text-2xl font-light tracking-[0.4em] text-foreground italic">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;