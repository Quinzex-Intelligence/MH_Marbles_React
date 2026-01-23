import { motion } from 'framer-motion';
import { Phone, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-24 bg-gradient-dark text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            Ready to Transform
            <span className="block text-gradient-gold">Your Space?</span>
          </h2>
          
          <p className="text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
            Visit our showroom today and experience the finest collection of marble, granite, 
            and premium tiles in Hyderabad. Our experts are ready to help you find your perfect flooring.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="xl" asChild>
              <a href="tel:+919876543210">
                <Phone className="w-5 h-5 mr-2" />
                Call +91 98765 43210
              </a>
            </Button>
            <Button 
              variant="hero-outline" 
              size="xl" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a href="#contact">
                <MapPin className="w-5 h-5 mr-2" />
                Visit Our Showroom
              </a>
            </Button>
          </div>

          {/* Additional info */}
          <p className="mt-8 text-primary-foreground/50 text-sm">
            📍 Located in Kukatpally, Hyderabad • Open 7 days a week
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;