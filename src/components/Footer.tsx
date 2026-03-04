import { Link } from 'react-router-dom';

const footerLinks = {
  curation: [
    { label: 'Italian Marble', href: '/curation' },
    { label: 'Exotic Granite', href: '/curation' },
    { label: 'Antique Texture', href: '/curation' },
    { label: 'Signature Series', href: '/curation' },
  ],
  legacy: [
    { label: 'Our Story', href: '/legacy' },
    { label: 'The Journal', href: '/journal' },
    { label: 'Private Gallery', href: '/concierge' },
    { label: 'Concierge', href: '/concierge' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-white/5 py-12 md:py-20 lg:py-32 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 lg:gap-24">
          {/* Brand Signature */}
          <div className="lg:col-span-2 space-y-6 md:space-y-12">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] md:tracking-[0.5em] text-white uppercase leading-tight">MH MARBLES</span>
              <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-accent ml-2">VISIONARY GALLERY</span>
            </div>

            <p className="text-base md:text-xl font-light text-white/40 leading-relaxed italic max-w-sm">
              Curating the earth&apos;s most exquisite architectural statements
              for the discerning visionary since 1980.
            </p>

            <div className="space-y-6 pt-4">
              <a href="tel:+919876543210" className="text-sm font-bold tracking-[0.4em] text-white hover:text-accent transition-colors block uppercase">
                +91 98765 43210
              </a>
              <a href="mailto:curator@mhmarble.com" className="text-sm font-bold tracking-[0.4em] text-white hover:text-accent transition-colors block uppercase">
                CURATOR@MHMARBLE.COM
              </a>
            </div>
          </div>

          {/* Nav groups */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">The Curation</h4>
            <ul className="space-y-6">
              {footerLinks.curation.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm font-light text-white/50 hover:text-white transition-colors italic tracking-widest">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent">The Legacy</h4>
            <ul className="space-y-6">
              {footerLinks.legacy.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm font-light text-white/50 hover:text-white transition-colors italic tracking-widest">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Signature */}
        <div className="mt-12 md:mt-20 lg:mt-32 pt-8 md:pt-16 border-t border-white/5 flex flex-col items-center gap-6 md:gap-12 md:flex-row md:justify-between">
          <div className="flex items-center gap-12 opacity-20 grayscale">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Milan</span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Madrid</span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Hyderabad</span>
          </div>

          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.6em]">
            © {new Date().getFullYear()} MH MARBLES. CRAFTED FOR ETERNITY.
          </p>

          <div className="flex gap-10 opacity-30">
            {['Facebook', 'Instagram', 'Pinterest'].map(social => (
              <a key={social} href="#" className="text-[10px] font-bold tracking-[0.3em] uppercase hover:text-accent transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;