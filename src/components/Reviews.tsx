import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

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
    <section id="reviews" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            Customer Reviews
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.9</span>
            <span className="text-muted-foreground">• 500+ Reviews on Google</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-soft hover:shadow-medium transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-accent/30 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground/90 leading-relaxed mb-6">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://g.page/mh-marble-hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
          >
            View All Reviews on Google
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Reviews;