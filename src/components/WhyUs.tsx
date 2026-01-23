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
    <section id="why-us" className="py-24 bg-gradient-dark text-primary-foreground overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-4">
            The MH Marble Difference
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            For over 15 years, we've been Hyderabad's trusted destination for premium flooring solutions. 
            Here's why thousands choose us.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 hover:border-accent/30 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-primary-foreground/50 text-sm uppercase tracking-wider mb-6">
            Trusted Brands We Partner With
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {['Kajaria', 'Somany', 'Johnson', 'RAK', 'Nitco', 'Asian Granito'].map((brand) => (
              <span key={brand} className="text-lg font-medium tracking-wide">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyUs;