import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const reviews = [
  {
    name: 'Rajesh Kumar',
    location: 'Jubilee Hills, Hyderabad',
    rating: 5,
    text: 'Exceptional quality marble! The 3D visualizer helped us choose the perfect flooring for our new villa. The team was professional and delivery was prompt.',
    date: '2 weeks ago',
  },
  {
    name: 'Priya Sharma',
    location: 'Gachibowli, Hyderabad',
    rating: 5,
    text: 'Best tiles showroom in Hyderabad! The variety is amazing and prices are competitive. Highly recommend their Italian marble collection.',
    date: '1 month ago',
  },
  {
    name: 'Mohammed Aziz',
    location: 'Banjara Hills, Hyderabad',
    rating: 5,
    text: 'Used MH Marble for our commercial project. Their expertise and same-day delivery service made our tight deadline possible. Will definitely use again!',
    date: '3 weeks ago',
  },
  {
    name: 'Sunitha Reddy',
    location: 'Madhapur, Hyderabad',
    rating: 5,
    text: 'The floor visualizer feature is brilliant! Could see exactly how the tiles would look in my living room before purchasing. Great customer service too.',
    date: '1 month ago',
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-48 bg-background transition-colors duration-700 border-y border-foreground/5">
      <div className="container mx-auto px-8 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl text-left mb-32"
        >
          <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-accent mb-8 block">Reflections</span>
          <h2 className="text-6xl md:text-8xl font-light text-foreground leading-tight tracking-tight italic mb-12">
            The <span className="not-italic font-medium">Journal.</span>
          </h2>
          <div className="flex items-center gap-6 mt-12 grayscale opacity-40">
            <span className="text-5xl font-light tracking-tighter italic text-foreground">4.9</span>
            <div className="h-12 w-px bg-foreground/20" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] leading-relaxed text-foreground">
              Consistently recognized for <br /> unparalleled stone carving
            </p>
          </div>
        </motion.div>

        {/* Reviews List - Minimalist Architectural Style */}
        <div className="space-y-32 max-w-6xl">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1 }}
              className={cn(
                "flex flex-col md:flex-row gap-16 items-baseline",
                index % 2 === 0 ? "md:text-left" : "md:flex-row-reverse md:text-right"
              )}
            >
              <div className="md:w-1/3">
                <span className="text-4xl md:text-5xl font-light text-foreground tracking-tighter italic block mb-2">"{review.name}"</span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">{review.location}</span>
              </div>

              <div className="flex-1 space-y-6">
                <p className="text-2xl md:text-3xl font-light text-foreground/70 leading-relaxed italic border-l md:border-l-0 md:border-x-0 border-accent/30 pl-8 md:pl-0">
                  "{review.text}"
                </p>
                <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-[0.6em]">Signed — {review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimalist Archive Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-48 text-center"
        >
          <a
            href="https://g.page/mh-marble-hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent hover:text-foreground transition-colors border-b border-accent pb-2"
          >
            DISCOVER ALL TESTIMONIALS
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Reviews;