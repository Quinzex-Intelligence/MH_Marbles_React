import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const storeInfo = {
  name: 'MH Marble Showroom',
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
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            Visit Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-4">
            Our Showroom
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience our extensive collection in person. Our expert team is ready to help you 
            find the perfect flooring solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-luxury border border-border h-[400px] lg:h-full min-h-[400px]"
          >
            <iframe
              src={storeInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MH Marble Location"
            />
          </motion.div>

          {/* Store Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Address</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {storeInfo.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Phone</h3>
                <a 
                  href={`tel:${storeInfo.phone}`}
                  className="text-lg text-accent hover:underline font-medium"
                >
                  {storeInfo.phone}
                </a>
                <p className="text-sm text-muted-foreground mt-1">Click to call</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Email</h3>
                <a 
                  href={`mailto:${storeInfo.email}`}
                  className="text-lg text-accent hover:underline font-medium"
                >
                  {storeInfo.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Business Hours</h3>
                <div className="space-y-1">
                  {storeInfo.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-8">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button variant="hero" size="xl" className="flex-1" asChild>
                <a href={`tel:${storeInfo.phone}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button variant="gold" size="xl" className="flex-1" asChild>
                <a href={storeInfo.directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-5 h-5 mr-2" />
                  Get Directions
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;