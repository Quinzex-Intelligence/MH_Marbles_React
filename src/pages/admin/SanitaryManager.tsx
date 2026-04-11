import React, { useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { SanitaryItem } from '@/data/tiles';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Droplets, Image as ImageIcon } from 'lucide-react';
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

const SanitaryManager = () => {
  const { sanitary, addSanitary, updateSanitary, deleteSanitary, sanitaryCategories } = useGallery();
  const [selectedItem, setSelectedItem] = useState<SanitaryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    if (formData.price) data.append('price', formData.price);
    if (formData.category) data.append('category', formData.category);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (selectedItem) {
        await updateSanitary(selectedItem.id, data);
        toast.success('Equipment refined');
      } else {
        await addSanitary(data);
        toast.success('New equipment sourced');
      }
      
      setIsDialogOpen(false);
      setSelectedItem(null);
      setImageFile(null);
      setFormData({ name: '', description: '', price: '', category: '' });
    } catch (error) {
      toast.error('Failed to save equipment');
    }
  };

  const handleEdit = (item: SanitaryItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price || '',
      category: item.category ? String(item.category) : ''
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Bath & Wellness</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-foreground leading-none tracking-tighter">
            Sanitary <span className="italic text-foreground/30 text-5xl md:text-6xl lg:text-7xl">Manager.</span>
          </h2>
          <p className="mt-10 text-[10px] sm:text-xs text-foreground/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
            Curating premium fixtures and wellness equipment for high-end projects.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setSelectedItem(null);
                setFormData({ name: '', description: '', price: '', category: '' });
                setImageFile(null);
              }}
              className="bg-accent hover:bg-foreground text-background rounded-none px-8 py-6 h-auto text-[10px] font-black uppercase tracking-widest transition-all duration-700 shadow-[0_0_15px_rgba(229,142,88,0.2)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Source New Equipment
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-sepia border-foreground/10 text-foreground rounded-none max-w-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-light tracking-tighter lowercase italic">
                {selectedItem ? 'Update Equipment' : 'Register New Fixture'}
              </DialogTitle>
              <div className="w-12 h-px bg-accent/30 mx-auto mt-4" />
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-8 mt-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Item Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="Matte Black Basin..."
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Valuation (Optional)</Label>
                  <Input 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="e.g. ₹12,500..."
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Equipment Image</Label>
                <div className="flex gap-4">
                  <Input 
                    type="file"
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files?.[0] || null)}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors pt-2"
                  />
                  <div className="w-12 h-12 bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
                    <ImageIcon className="w-4 h-4 text-foreground/20" />
                  </div>
                </div>
                {selectedItem?.image && !imageFile && (
                  <p className="text-[8px] text-foreground/20 italic">Current image: {selectedItem.image.split('/').pop()}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Category</Label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-none h-12 px-4 focus:border-accent transition-colors outline-none text-sm appearance-none"
                >
                  <option value="" className="bg-background text-foreground">Select Category (Optional)</option>
                  {sanitaryCategories.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-background text-foreground">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Technical Description</Label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-none p-4 h-32 focus:border-accent transition-colors outline-none text-sm"
                  placeholder="Details about finish, material, warranty..."
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-accent text-background hover:bg-foreground rounded-none h-14 text-[10px] font-black uppercase tracking-widest transition-colors shadow-[0_0_30px_rgba(229,142,88,0.2)]">
                {selectedItem ? 'Commit Changes' : 'Finalize Registration'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence mode="wait">
        {sanitary.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center border border-dashed border-foreground/5"
          >
            <Droplets className="w-8 h-8 text-foreground/10 mx-auto mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/20">No equipment registered in the current inventory</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5"
          >
            {sanitary.map((item) => (
              <div key={item.id} className="bg-card p-8 group relative overflow-hidden transition-all duration-1000 hover:border-accent/40 shadow-2xl">
                <div className="aspect-square mb-8 overflow-hidden bg-foreground/5">
                  <img src={item.image_url || item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                </div>
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="text-xl font-serif font-light text-foreground italic">{item.name}</h3>
                     {item.category && (
                       <span className="text-[9px] font-black text-accent/60 tracking-widest uppercase">
                         {sanitaryCategories.find(c => c.id === Number(item.category))?.name || `Category ${item.category}`}
                       </span>
                     )}
                   </div>
                   {item.price && <span className="text-[10px] font-black text-accent tracking-widest">{item.price}</span>}
                </div>
                <p className="text-[10px] text-foreground/40 leading-relaxed uppercase tracking-widest line-clamp-2 mb-8">{item.description}</p>
                
                <div className="flex gap-4 pt-6 border-t border-foreground/5">
                   <button onClick={() => handleEdit(item)} className="text-foreground/40 hover:text-foreground transition-colors"><Edit size={14} /></button>
                   <button onClick={() => deleteSanitary(item.id)} className="text-red-500/60 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SanitaryManager;
