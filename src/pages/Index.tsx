import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FloorVisualizer } from '@/components/FloorVisualizer';
import { ProductCollection } from '@/components/ProductCollection';
import { WhyUs } from '@/components/WhyUs';
import { Reviews } from '@/components/Reviews';
import { Contact } from '@/components/Contact';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { MobileSticky } from '@/components/MobileSticky';

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MH Marble",
    "image": "https://mhmarble.com/logo.png",
    "description": "Telangana's premier destination for premium marble, granite, and tiles. Experience our 3D floor visualizer to see tiles in your space before buying.",
    "@id": "https://mhmarble.com",
    "url": "https://mhmarble.com",
    "telephone": "+919876543210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tile Street, Kukatpally Housing Board Colony",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500072",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4947,
      "longitude": 78.4177
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500"
    },
    "priceRange": "₹₹"
  };

  return (
    <>
      <Helmet>
        <title>MH Marble Hyderabad | Premium Tiles & Marble Showroom | 3D Floor Visualizer</title>
        <meta name="description" content="Telangana's premier marble, granite & tiles showroom. Visualize your dream flooring with our interactive 3D room visualizer. 500+ varieties, same-day delivery. Visit our Hyderabad showroom!" />
        <meta name="keywords" content="tiles showroom Hyderabad, marble store Telangana, floor tiles shop near me, premium marble Hyderabad, Italian marble Hyderabad, granite tiles, vitrified tiles, wooden flooring" />
        
        {/* Open Graph */}
        <meta property="og:title" content="MH Marble Hyderabad | Premium Tiles & Marble Showroom" />
        <meta property="og:description" content="Visualize your dream flooring with our 3D room visualizer. 500+ varieties of marble, granite & tiles." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#d4af37" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://mhmarble.com" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <FloorVisualizer />
          <ProductCollection />
          <WhyUs />
          <Reviews />
          <Contact />
          <CTA />
        </main>
        <Footer />
        <MobileSticky />
      </div>
    </>
  );
};

export default Index;