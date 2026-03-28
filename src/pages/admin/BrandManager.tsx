import React, { useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { Brand } from '@/types/gallery';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Globe, Shield, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

const BrandManager = () => {
  const { brands, addBrand, updateBrand, deleteBrand } = useGallery();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Brand identity name required');
      return;
    }

    const brandData: Brand = {
      ...formData,
      id: selectedBrand ? selectedBrand.id : Math.random().toString(36).substr(2, 9),
    };

    if (selectedBrand) {
      updateBrand(selectedBrand.id, brandData);
      toast.success('Brand partnership refined');
    } else {
      addBrand(brandData);
      toast.success('New brand partner established');
    }
    
    setIsDialogOpen(false);
    setSelectedBrand(null);
    setFormData({ name: '', description: '', image: '' });
  };

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setFormData({
      name: brand.name,
      description: brand.description,
      image: brand.image
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Partners & Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-white leading-none tracking-tighter">
            Brand <span className="italic text-white/30 text-5xl md:text-6xl lg:text-7xl">Manager.</span>
          </h2>
          <p className="mt-10 text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
            Managing brand partnerships and material sources.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setSelectedBrand(null);
                setFormData({ name: '', description: '', image: '' });
              }}
              className="h-16 px-10 rounded-none bg-accent hover:bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-700 shadow-[0_0_30px_rgba(229,142,88,0.2)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Brand Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-sepia border-white/10 text-white rounded-none max-w-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-light tracking-tighter lowercase italic">
                {selectedBrand ? 'Refine Partnership' : 'Establish New Brand'}
              </DialogTitle>
              <div className="w-12 h-px bg-accent/30 mx-auto mt-4" />
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-8 mt-8">
              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Brand Name</Label>
                <Input 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                  placeholder="e.g. Italian Heritage..."
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Logo / Representation URL</Label>
                <div className="flex gap-4">
                  <Input 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="https://..."
                  />
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <ImageIcon className="w-5 h-5 text-accent/40" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Brand Vision / Description</Label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-none p-4 h-32 focus:border-accent transition-colors outline-none text-sm"
                  placeholder="Define the brand's position in the premium market..."
                />
              </div>

              <Button type="submit" className="w-full bg-accent text-black hover:bg-white rounded-none h-14 text-[10px] font-black uppercase tracking-widest transition-colors shadow-[0_0_30px_rgba(229,142,88,0.2)]">
                {selectedBrand ? 'Commit Refinement' : 'Finalize Partnership'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
        <AnimatePresence mode="popLayout">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-card border border-white/5 p-10 hover:border-accent/40 transition-all duration-1000 hover:bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-accent/30 transition-colors overflow-hidden">
                   {brand.image ? (
                     <img src={brand.image} alt={brand.name} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                   ) : (
                     <Globe className="w-6 h-6 text-white/20 group-hover:text-accent transition-colors" />
                   )}
                </div>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleEdit(brand)} className="text-white/40 hover:text-white transition-colors"><Edit size={14} /></button>
                   <button onClick={() => deleteBrand(brand.id)} className="text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-light text-white mb-4 tracking-tight group-hover:text-accent transition-colors italic">{brand.name}</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed mb-8 line-clamp-3">{brand.description}</p>
              
              <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                 <Shield className="w-3 h-3 text-accent/40" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Verified Source</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {brands.length === 0 && (
          <div className="col-span-full py-40 text-center border border-dashed border-white/5">
             <Globe className="w-8 h-8 text-white/10 mx-auto mb-4" />
             <p className="text-[10px] font-black uppercase tracking-widest text-white/10 italic">Zero Brand Partners Registered</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandManager;
