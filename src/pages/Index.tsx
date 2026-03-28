import SEO from '@/components/SEO';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryMasks } from '@/components/CategoryMasks';
import { ProductCollection } from '@/components/ProductCollection';
import { WhyUs } from '@/components/WhyUs';
import { Reviews } from '@/components/Reviews';
import { Contact } from '@/components/Contact';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { MobileSticky } from '@/components/MobileSticky';

import { ArchitectsReserve } from '@/components/ArchitectsReserve';

const Index = () => {
  return (
    <>
      <SEO 
        title="Architectural Stone Gallery & Signature Stone Curation"
        description="Curators of the earth's most exquisite architectural statements. Discover our signature collection of Italian marble and exotic stones, crafted for the discerning visionary since 1980."
      />

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <CategoryMasks />
          <ProductCollection />
          <WhyUs />
          <Reviews />
          <ArchitectsReserve />
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
