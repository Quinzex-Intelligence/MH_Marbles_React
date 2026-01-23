import { Phone, Navigation } from 'lucide-react';

export function MobileSticky() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-3 shadow-luxury">
      <div className="flex gap-3">
        <a
          href="tel:+919876543210"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-medium shadow-soft"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=17.4947,78.4177"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-xl font-medium shadow-gold"
        >
          <Navigation className="w-5 h-5" />
          Directions
        </a>
      </div>
    </div>
  );
}

export default MobileSticky;