import { Phone, Navigation } from 'lucide-react';

export function MobileSticky() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-3 shadow-luxury">
      <div className="flex gap-3">
        <a
          href="tel:+919876543210"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-none font-bold uppercase text-[10px] tracking-[0.2em] transition-transform active:scale-95"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=17.4947,78.4177"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-none font-bold uppercase text-[10px] tracking-[0.2em] shadow-gold transition-transform active:scale-95"
        >
          <Navigation className="w-4 h-4" />
          Directions
        </a>
      </div>
    </div>
  );
}

export default MobileSticky;