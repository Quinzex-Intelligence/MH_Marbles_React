import { Header } from '@/components/Header';
import { DiagonalHero } from '@/components/DiagonalHero';
import { Footer } from '@/components/Footer';
import { Reviews } from '@/components/Reviews';
import { WhyUs } from '@/components/WhyUs';

export function TestPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full">
        <DiagonalHero />
        
        <div className="relative z-10 pt-20">
           <WhyUs />
           <Reviews />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TestPage;
