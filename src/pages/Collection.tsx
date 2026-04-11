import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import SEO from '@/components/SEO';
import { PageLayout } from '@/components/PageLayout';
import { GalleryCard } from '@/components/CollectionViews';
import { useGallery } from '@/contexts/GalleryContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, Search, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from '@/services/CategoryService';
import { Brand } from '@/types/gallery';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

// ─── Filter Types ───────────────────────────────────────────────────────────
interface SidebarProps {
  availableSizes: string[];
  categories: Category[];
  brands: Brand[];
  availableFinishes: string[];
  selectedSizes: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedFinishes: string[];
  activeFiltersCount: number;
  onCheckbox: (value: string, state: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => void;
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedFinishes: React.Dispatch<React.SetStateAction<string[]>>;
  onClear: () => void;
}

// ─── Sidebar Content ────────────────────────────────────────────────────────
const SidebarContent = ({
  availableSizes, categories, brands, availableFinishes,
  selectedSizes, selectedCategories, selectedBrands, selectedFinishes,
  activeFiltersCount, onCheckbox,
  setSelectedSizes, setSelectedCategories, setSelectedBrands, setSelectedFinishes,
  onClear,
}: SidebarProps) => (
  <div className="flex flex-col h-full">
    <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
      <div className="flex items-center gap-3">
        <SlidersHorizontal className="w-3.5 h-3.5 text-[#C8A96E]" />
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
          Curation {activeFiltersCount > 0 && `· ${activeFiltersCount}`}
        </span>
      </div>
      {activeFiltersCount > 0 && (
        <button 
          onClick={onClear} 
          className="text-[9px] font-black uppercase tracking-widest text-[#C8A96E]/60 hover:text-[#C8A96E] transition-colors"
        >
          Reset
        </button>
      )}
    </div>

    <div className="flex-1">
      <Accordion type="multiple" defaultValue={['material', 'brands', 'dimensions', 'finish']} className="w-full">
        
        <AccordionItem value="material" className="border-b border-white/5 last:border-0 border-t-0">
          <AccordionTrigger className="hover:no-underline py-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C8A96E]">Material Type</h4>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-3">
              {categories.map((cat: Category) => (
                <div key={cat.id} className="flex items-center group cursor-pointer py-1" onClick={() => onCheckbox(String(cat.id), selectedCategories, setSelectedCategories)}>
                  <Checkbox
                    id={`cat-${cat.id}`}
                    checked={selectedCategories.includes(String(cat.id))}
                    className="w-3.5 h-3.5 border-white/20 data-[state=checked]:bg-[#C8A96E] data-[state=checked]:border-[#C8A96E]"
                  />
                  <label className="ml-3 text-[11px] font-sans font-medium uppercase tracking-widest text-white/40 group-hover:text-white transition-colors cursor-pointer select-none">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands" className="border-b border-white/5 last:border-0 border-t-0">
          <AccordionTrigger className="hover:no-underline py-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C8A96E]">Origin / Quarry</h4>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-3">
              {brands.map((brand: Brand) => (
                <div key={brand.id} className="flex items-center group cursor-pointer py-1" onClick={() => onCheckbox(String(brand.id), selectedBrands, setSelectedBrands)}>
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(String(brand.id))}
                    className="w-3.5 h-3.5 border-white/20 data-[state=checked]:bg-[#C8A96E] data-[state=checked]:border-[#C8A96E]"
                  />
                  <label className="ml-3 text-[11px] font-sans font-medium uppercase tracking-widest text-white/40 group-hover:text-white transition-colors cursor-pointer select-none">
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dimensions" className="border-b border-white/5 last:border-0 border-t-0">
          <AccordionTrigger className="hover:no-underline py-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C8A96E]">Dimensions</h4>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="space-y-3">
              {availableSizes.map((size: string) => (
                <div key={size} className="flex items-center group cursor-pointer py-1" onClick={() => onCheckbox(size, selectedSizes, setSelectedSizes)}>
                  <Checkbox
                    id={`size-${size}`}
                    checked={selectedSizes.includes(size)}
                    className="w-3.5 h-3.5 border-white/20 data-[state=checked]:bg-[#C8A96E] data-[state=checked]:border-[#C8A96E]"
                  />
                  <label className="ml-3 text-[11px] font-sans font-medium uppercase tracking-widest text-white/40 group-hover:text-white transition-colors cursor-pointer select-none">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {availableFinishes.length > 0 && (
          <AccordionItem value="finish" className="border-b border-white/5 last:border-0 border-t-0">
            <AccordionTrigger className="hover:no-underline py-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C8A96E]">Finish</h4>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="space-y-3">
                {availableFinishes.map((finish: string) => (
                  <div key={finish} className="flex items-center group cursor-pointer py-1" onClick={() => onCheckbox(finish, selectedFinishes, setSelectedFinishes)}>
                    <Checkbox
                      id={`finish-${finish}`}
                      checked={selectedFinishes.includes(finish)}
                      className="w-3.5 h-3.5 border-white/20 data-[state=checked]:bg-[#C8A96E] data-[state=checked]:border-[#C8A96E]"
                    />
                    <label className="ml-3 text-[11px] font-sans font-medium uppercase tracking-widest text-white/40 group-hover:text-white transition-colors cursor-pointer select-none">
                      {finish}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  </div>
);

// ─── Main Page Component ─────────────────────────────────────────────────────
const Collection = () => {
  const { backendTiles, nextPageUrl, loadMoreTiles, categories, brands } = useGallery();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // Infinite Scroll States
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Sidebar Filtering State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);

  // Derive available finishes
  const availableFinishes = useMemo(
    () => Array.from(new Set(backendTiles.map(t => t.finish).filter(Boolean))).sort() as string[],
    [backendTiles]
  );


  // Derive available applications dynamically (No hardcoding)
  const availableSizes = useMemo(() => {
    const sizesSet = new Set<string>();
    backendTiles.forEach(tile => {
      if (tile.size) sizesSet.add(tile.size);
    });
    return Array.from(sizesSet).sort();
  }, [backendTiles]);

  // Filter Logic
  const filteredTiles = useMemo(() => {
    return backendTiles.filter(tile => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(String(tile.category ?? ''))) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(String(tile.company ?? tile.brand ?? ''))) return false;
      if (selectedSizes.length > 0 && !selectedSizes.includes(tile.size ?? '')) return false;
      if (selectedFinishes.length > 0 && !selectedFinishes.includes(tile.finish ?? '')) return false;
      return true;
    });
  }, [backendTiles, selectedCategories, selectedBrands, selectedSizes, selectedFinishes]);

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + selectedSizes.length + selectedFinishes.length;

  const handleCheckbox = useCallback((value: string, _state: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedFinishes([]);
  }, []);

  // Infinite Scroll Logic
  const isLoadingMoreRef = useRef(false);
  useEffect(() => {
    isLoadingMoreRef.current = isLoadingMore;
  }, [isLoadingMore]);

  // Sidebar Scroll Focus Lock - Definitive solution
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sidebarContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // ALWAYS stop propagation so the main page never sees this event
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        // Sidebar has no scroll → block the event entirely so page doesn't scroll
        e.preventDefault();
        return;
      }

      const atTop = scrollTop === 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      // Block propagation when hitting scroll boundaries
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        e.preventDefault();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    return () => el.removeEventListener('wheel', handleWheel, { capture: true });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current && nextPageUrl) {
          setIsLoadingMore(true);
          loadMoreTiles().finally(() => setIsLoadingMore(false));
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    if (loadMoreRef.current && nextPageUrl) {
      observerRef.current.observe(loadMoreRef.current);
    }
    return () => observerRef.current?.disconnect();
  }, [nextPageUrl, loadMoreTiles]);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current && heroRef.current) {
        gsap.to(textRef.current, {
          yPercent: 40,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const sidebarProps = {
    availableSizes,
    categories,
    brands,
    availableFinishes,
    selectedSizes,
    selectedCategories,
    selectedBrands,
    selectedFinishes,
    activeFiltersCount,
    onCheckbox: handleCheckbox,
    setSelectedSizes,
    setSelectedCategories,
    setSelectedBrands,
    setSelectedFinishes,
    onClear: clearFilters,
  };

  return (
    <>
      <SEO
        title="The Collection | MH Marbles"
        description="Explore our curated archive of masterpiece marbles. Sourced worldwide, selected for rarity."
      />

      <PageLayout title="The Archive." subtitle="Curatory selection">
        {/* Hero Section */}
        <div ref={heroRef} className="h-[75vh] w-full relative bg-[#090807] flex items-center justify-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          {/* Decorative Background Elements */}
          <div className="absolute top-[12%] left-[8%] w-[25%] aspect-[3/4] border border-white/5 overflow-hidden z-0 hidden md:block opacity-[0.08] grayscale hover:opacity-20 transition-opacity duration-1000">
            <img
              src="https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&q=80&w=1200"
              alt="Marble Slab Detail"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="absolute bottom-[15%] right-[10%] w-[35%] aspect-video border border-white/5 overflow-hidden z-0 opacity-[0.08] sepia-[0.4] hidden md:block hover:opacity-20 transition-opacity duration-1000">
            <img
              src="https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&q=80&w=1400"
              alt="Interior Application"
              className="w-full h-full object-cover scale-110"
            />
          </div>

          <h1 ref={textRef} className="relative z-10 text-[16vw] md:text-[14vw] font-serif font-light text-white leading-[0.7] tracking-tighter select-none text-center pointer-events-none drop-shadow-sm">
            Earth's <br />
            <span className="italic text-[#C8A96E]">Archive.</span>
          </h1>
        </div>

        {/* Gallery Section with Sidebar */}
        <div className="bg-[#0A0806] min-h-screen relative z-30">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Mobile Header (Filters toggle) */}
            <div className="lg:hidden flex justify-between items-center pb-8 border-b border-white/5 mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                {filteredTiles.length} matches
              </span>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-[#C8A96E]">
                    <SlidersHorizontal className="w-4 h-4" />
                    Archive Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-[#0A0806] border-r border-white/5 p-8 pt-20">
                  <SidebarContent {...sidebarProps} />
                </SheetContent>
              </Sheet>
            </div>

            <aside className="hidden lg:block w-72 shrink-0 sticky top-36 xl:top-40 self-start z-40">
               <div 
                 ref={sidebarContainerRef}
                 className="bg-[#0A0806] border border-white/5 p-10 backdrop-blur-md shadow-2xl max-h-[80vh] overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-hide"
               >
                  <SidebarContent {...sidebarProps} />
               </div>
            </aside>

            {/* Product Grid Area */}
            <div className="flex-1">
              <div className="hidden lg:flex justify-between items-center mb-16 pb-6 border-b border-white/5">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
                  Technical Selection (02) — {filteredTiles.length} Specimens found
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C8A96E]">
                   PRO-LEVEL GALLERY VIEW
                </span>
              </div>

              {/* The Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-10 md:gap-14">
                {filteredTiles.map((tile, i) => (
                  <GalleryCard key={tile.id} tile={tile} i={i} />
                ))}
              </div>

              {/* Infinite Scroll Sentinel */}
              {nextPageUrl && (
                <div ref={loadMoreRef} className="py-24 flex justify-center items-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-6 h-6 border-2 border-[#C8A96E]/20 border-t-[#C8A96E] rounded-full animate-spin" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#C8A96E]">Fetching Archive...</span>
                  </div>
                </div>
              )}

              {/* Zero State */}
              {filteredTiles.length === 0 && !isLoadingMore && (
                <div className="py-60 flex flex-col items-center text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10 mb-6">Archive Empty for this selection</span>
                  <button 
                    onClick={clearFilters} 
                    className="text-[#C8A96E] hover:text-white uppercase text-[9px] tracking-widest font-black transition-colors"
                  >
                    Clear All Refinements
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Reserve CTA */}
        <div className="min-h-[100vh] bg-[#C8A96E] text-[#0C0A08] relative flex flex-col items-center justify-center overflow-hidden">
           <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
           <div className="text-center px-6 relative z-20">
              <span className="text-[10px] font-sans font-black uppercase tracking-[1em] mb-12 block">Architect's Private Vault</span>
              <h3 className="text-6xl md:text-9xl font-serif font-light tracking-tighter leading-[0.8] mb-16">
                Rare <br />
                <span className="italic text-black/40">Specimens.</span>
              </h3>
              <a 
                href="/contact" 
                className="group relative inline-flex items-center justify-center w-48 h-48 rounded-full border border-black/20 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 hover:bg-black hover:text-[#C8A96E] hover:border-black"
              >
                <div className="absolute inset-[-10px] rounded-full border border-black/10 scale-90 group-hover:scale-110 transition-transform duration-700" />
                <span className="z-10">Request Access</span>
              </a>
           </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Collection;
