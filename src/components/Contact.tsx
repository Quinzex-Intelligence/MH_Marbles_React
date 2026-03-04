import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const storeInfo = {
  name: 'MH Marbles Showroom',
  address: '123 Tile Street, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072',
  phone: '+91 98765 43210',
  email: 'info@mhmarble.com',
  hours: [
    { day: 'Monday - Saturday', time: '9:00 AM - 8:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 6:00 PM' },
  ],
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2965474657367!2d78.4177!3d17.4947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzQxLjAiTiA3OMKwMjUnMDMuNyJF!5e0!3m2!1sen!2sin!4v1234567890',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=17.4947,78.4177',
};

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-32 lg:py-48 bg-background transition-colors duration-700 overflow-hidden">
      <div className="container mx-auto px-8 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 lg:gap-32 items-start">
          {/* Concierge Details */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-accent mb-8 block">Inquiries</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-foreground leading-tight tracking-tight italic mb-8 md:mb-16">
                Personal <br />
                <span className="not-italic font-medium">Concierge.</span>
              </h2>

              <div className="space-y-8 md:space-y-16">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">The Gallery</p>
                  <p className="text-lg md:text-2xl font-light text-foreground/80 leading-relaxed italic">
                    123 Tile Street, Kukatpally Housing Board Colony, <br />
                    Kukatpally, Hyderabad, Telangana 500072
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">Direct Line</p>
                    <a href="tel:+919876543210" className="text-lg md:text-2xl font-light text-foreground/80 hover:text-accent transition-colors italic">
                      +91 98765 43210
                    </a>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">Electronic Mail</p>
                    <a href="mailto:curator@mhmarble.com" className="text-lg md:text-2xl font-light text-foreground/80 hover:text-accent transition-colors italic break-all">
                      curator@mhmarble.com
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">Gallery Hours</p>
                  <div className="space-y-2">
                    <p className="text-lg font-light text-foreground/60 italic flex justify-between max-w-sm">
                      <span>Monday — Saturday</span>
                      <span>9:00 — 20:00</span>
                    </p>
                    <p className="text-lg font-light text-foreground/60 italic flex justify-between max-w-sm">
                      <span>Sunday</span>
                      <span>10:00 — 18:00</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-20">
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-white rounded-none h-16 px-12 text-[11px] font-bold tracking-[0.4em] uppercase transition-all duration-700"
                  asChild
                >
                  <a href={storeInfo.directionsUrl}>GET DIRECTIONS</a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Minimalist Visual / Map Placeholder */}
          <div className="flex-1 w-full aspect-video md:aspect-square bg-black grayscale-[40%] hover:grayscale-0 transition-all duration-1000 overflow-hidden relative group">
            <iframe
              src={storeInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.2) grayscale(1)' }}
              allowFullScreen
              loading="lazy"
              title="MH Marbles Location"
            />
            <div className="absolute inset-0 pointer-events-none border-[10px] md:border-[30px] border-white/5 group-hover:border-white/0 transition-all duration-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;