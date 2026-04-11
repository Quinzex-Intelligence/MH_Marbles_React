import React, { useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { Category } from '@/services/CategoryService';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Layers, Shield, Image as ImageIcon } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/utils';
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

const CategoryManager = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Category name required');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    // Simple slug generator for the frontend if backend doesn't handle it
    data.append('slug', formData.name.toLowerCase().replace(/\s+/g, '-'));
    
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, data);
        toast.success('Category refined');
      } else {
        await addCategory(data);
        toast.success('New category established');
      }
      setIsDialogOpen(false);
      setSelectedCategory(null);
      setImageFile(null);
      setFormData({ name: '' });
    } catch (error) {
      toast.error('Failed to synchronize category');
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Classification Registry</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-foreground leading-none tracking-tighter">
            Category <span className="italic text-foreground/30 text-5xl md:text-6xl lg:text-7xl">Manager.</span>
          </h2>
          <p className="mt-10 text-[10px] sm:text-xs text-foreground/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
            Organizing the inventory into logical segments and spaces.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setSelectedCategory(null);
                setFormData({ name: '' });
                setImageFile(null);
              }}
              className="h-16 px-10 rounded-none bg-accent hover:bg-foreground text-background font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-700 shadow-[0_0_30px_rgba(229,142,88,0.2)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Catalogue New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-sepia border-foreground/10 text-foreground rounded-none max-w-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-light tracking-tighter lowercase italic">
                {selectedCategory ? 'Refine Classification' : 'New Classification Entry'}
              </DialogTitle>
              <div className="w-12 h-px bg-accent/30 mx-auto mt-4" />
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-8 mt-8">
              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Category Name</Label>
                <Input 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                  placeholder="e.g. Kitchen, Luxury Living..."
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Reference Image (Optional)</Label>
                <div className="flex gap-4">
                  <Input 
                    type="file"
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files?.[0] || null)}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors pt-2"
                  />
                  <div className="w-12 h-12 bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
                    <ImageIcon className="w-5 h-5 text-accent/40" />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-accent text-background hover:bg-foreground rounded-none h-14 text-[10px] font-black uppercase tracking-widest transition-colors shadow-[0_0_30px_rgba(229,142,88,0.2)]">
                {selectedCategory ? 'Commit Refinement' : 'Finalize Classification'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
        <AnimatePresence mode="popLayout">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative bg-card border border-foreground/5 p-10 hover:border-accent/40 transition-all duration-1000 hover:bg-foreground/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-foreground/5 flex items-center justify-center border border-foreground/5 group-hover:border-accent/30 transition-colors overflow-hidden">
                   {cat.image_url ? (
                     <img 
                       src={getOptimizedImageUrl(cat.image_url, 100, 100)} 
                       alt={cat.name} 
                       className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" 
                     />
                   ) : (
                     <Layers className="w-6 h-6 text-foreground/20 group-hover:text-accent transition-colors" />
                   )}
                </div>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleEdit(cat)} className="text-foreground/40 hover:text-foreground transition-colors"><Edit size={14} /></button>
                   <button onClick={() => deleteCategory(cat.id)} className="text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              
              <h3 className="text-2xl font-serif font-light text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors italic">{cat.name}</h3>
              <p className="text-[8px] text-foreground/20 uppercase tracking-[0.3em] font-black">Path: /archive/{cat.slug}</p>
              
              <div className="flex items-center gap-3 pt-6 mt-8 border-t border-foreground/5">
                 <Shield className="w-3 h-3 text-accent/40" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-foreground/20">Operational Taxonomy</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {categories.length === 0 && (
          <div className="col-span-full py-40 text-center border border-dashed border-foreground/5">
             <Layers className="w-8 h-8 text-foreground/10 mx-auto mb-4" />
             <p className="text-[10px] font-black uppercase tracking-widest text-foreground/10 italic">Zero Taxonomic Classes Registered</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
