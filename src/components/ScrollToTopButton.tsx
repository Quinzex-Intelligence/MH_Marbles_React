import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50 p-4 transition-all duration-300 group",
            "bg-background/80 backdrop-blur-xl border border-border shadow-luxury rounded-none",
            "hover:border-accent hover:bg-background"
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-accent transition-transform duration-500 group-hover:-translate-y-1" />
          
          {/* Subtle architectural rule */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-accent/40" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTopButton;
