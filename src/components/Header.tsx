import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '/curation', label: 'Exhibition' },
  { href: '/legacy', label: 'Legacy' },
  { href: '/atelier', label: 'Atelier' },
  { href: '/innovation', label: 'Innovation' },
];

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-foreground/5 py-4"
            : "bg-transparent py-8"
        )}
      >
        <div className="container mx-auto px-8 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="group flex flex-col items-center">
              <span className={cn(
                "text-2xl md:text-3xl font-light tracking-[0.4em] uppercase leading-tight transition-colors duration-700",
                isScrolled ? "text-foreground" : "text-white"
              )}>
                MH MARBLES
              </span>
              <span className="text-[9px] font-bold tracking-[0.6em] uppercase text-accent ml-2">
                VISIONARY GALLERY
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 relative py-2 group",
                    isScrolled ? "text-foreground/70 hover:text-accent" : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className={cn(
              "hidden lg:flex items-center gap-8 border-l pl-8 transition-colors duration-700",
              isScrolled ? "border-foreground/10" : "border-white/20"
            )}>
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className={cn(
                  "p-2 transition-all duration-500 rounded-full hover:bg-accent/10",
                  isScrolled ? "text-foreground" : "text-white"
                )}
                aria-label="Toggle theme"
              >
                {mounted && (resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
              </button>

              <Button
                variant="ghost"
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-500 p-0 h-auto hover:bg-transparent",
                  isScrolled ? "text-foreground hover:text-accent" : "text-white hover:text-accent"
                )}
                asChild
              >
                <a href="#contact">ENQUIRE</a>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 transition-colors duration-700",
                isScrolled ? "text-foreground" : "text-white"
              )}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={cn("block w-6 h-0.5 bg-current transition-all duration-500", isMobileMenuOpen && "translate-y-2 rotate-45")} />
                <span className={cn("block w-6 h-0.5 bg-current transition-all duration-500", isMobileMenuOpen && "opacity-0")} />
                <span className={cn("block w-6 h-0.5 bg-current transition-all duration-500", isMobileMenuOpen && "-translate-y-2 -rotate-45")} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-3xl"
          >
            <div className="flex flex-col h-full pt-40 pb-16 px-12">
              <nav className="flex flex-col space-y-10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-5xl font-light text-foreground uppercase tracking-widest hover:text-accent transition-colors block italic"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-12 border-t border-foreground/5">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-8 italic">The Private Gallery</p>
                <a href="tel:+919876543210" className="text-2xl font-light text-foreground tracking-widest block mb-6">+91 98765 43210</a>
                <Button className="w-full bg-primary hover:bg-black text-primary-foreground h-20 text-[11px] font-bold tracking-[0.5em] uppercase rounded-none transition-all duration-700">
                  START PROJECT
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;