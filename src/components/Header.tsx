import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';

const navLinks = [
  { href: '/collection', label: 'Collection' },
  { href: '/sanitary', label: 'Sanitary' },
  { href: '/heritage', label: 'Heritage' },
  { href: '/showroom', label: 'Showroom' },
  { href: '/process', label: 'Our Process' },
  { href: '/journal', label: 'Journal' },
  { href: '/test', label: 'Test' },
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
            ? "glass-sepia border-b border-border py-3 shadow-luxury"
            : "bg-transparent py-6"
        )}
      >
        <div className="w-full max-w-none px-6 md:px-[4%]">
          <div className="flex items-center justify-between">
            {/* Logo - Architectural Refinement */}
            <a href="/" className="group flex flex-col items-center">
              <span className="text-xl md:text-2xl font-serif tracking-[0.4em] uppercase leading-tight transition-colors duration-700 text-foreground group-hover:text-accent">
                MH MARBLES
              </span>
              <span className="text-[8px] font-sans font-black tracking-[0.8em] uppercase text-accent/60 mt-1">
                Visionary Gallery
              </span>
            </a>

            {/* Desktop Navigation - Subtle Gold Underline */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-[11px] font-sans font-black uppercase tracking-[0.4em] transition-all duration-500 relative py-2 group whitespace-nowrap",
                    isScrolled ? "text-foreground/80 hover:text-foreground" : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA - Luxury Gold Button */}
            <div className="hidden lg:flex items-center gap-8 border-l pl-8 border-border transition-colors duration-700">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 transition-all duration-500 rounded-full hover:bg-foreground/5 text-foreground/40 hover:text-foreground"
                aria-label="Toggle theme"
              >
                {mounted && (resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
              </button>

              <Button
                variant="outline"
                className="text-[10px] font-sans font-black uppercase tracking-[0.5em] transition-all duration-700 h-10 px-8 rounded-none border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E] hover:text-black shadow-gold bg-white/[0.02] backdrop-blur-md"
                asChild
              >
                <a href="#contact">ENQUIRE</a>
              </Button>
            </div>

            {/* Mobile Menu Toggle - Refined typography */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 transition-colors duration-700 text-foreground flex items-center gap-4 relative z-[60]"
              aria-label="Toggle menu"
            >
              <span className="text-[8px] font-black uppercase tracking-[0.6em] text-foreground/40">{isMobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
              <div className="space-y-1.5 w-6">
                <span className={cn("block w-full h-[1px] bg-foreground transition-all duration-500", isMobileMenuOpen && "translate-y-[7px] rotate-45")} />
                <span className={cn("block w-full h-[1px] bg-foreground transition-all duration-500", isMobileMenuOpen && "opacity-0")} />
                <span className={cn("block w-full h-[1px] bg-foreground transition-all duration-500", isMobileMenuOpen && "-translate-y-[7px] -rotate-45")} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', ease: [0.76, 0, 0.24, 1], duration: 0.8 }}
            className="fixed inset-0 z-40 lg:hidden bg-background"
          >
            <div className="flex flex-col h-full pt-32 pb-12 px-8">
               <div className="flex justify-between items-center mb-16 border-b border-border pb-8">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Navigation</span>
                  <button
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    className="p-2 transition-all duration-500 rounded-full hover:bg-accent/10 text-foreground"
                    aria-label="Toggle theme"
                  >
                    {mounted && (resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
                  </button>
               </div>
               
              <nav className="flex flex-col space-y-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.8, ease: "easeOut" }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-4xl xs:text-5xl font-serif text-foreground hover:text-accent transition-colors block tracking-tighter"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-12 border-t border-border">
                <p className="text-[9px] font-sans font-bold uppercase tracking-[0.4em] text-accent mb-4">The Private Gallery</p>
                <a href="tel:+919876543210" className="text-xl font-serif text-foreground block mb-6">+91 98765 43210</a>
                <Button className="w-full bg-foreground hover:bg-accent text-background hover:text-accent-foreground h-14 text-[10px] font-sans font-bold tracking-[0.4em] uppercase rounded-none transition-all duration-700">
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
