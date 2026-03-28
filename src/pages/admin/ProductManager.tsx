import React, { useState, useEffect } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { 
  Plus, Search, Filter, MoreVertical, Edit, 
  Trash2, Eye, LayoutGrid, List, CheckCircle2,
  AlertCircle, ArrowUpRight, Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tile } from '@/data/tiles';

const ProductManager = () => {
  const { tiles, addTile, updateTile, deleteTile } = useGallery();
  const [search, setSearch] = useState('');
  const [isGrid, setIsGrid] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Tile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    size: '',
    finish: '',
    image: '',
    category: 'marble' as Tile['category']
  });

  const filteredTiles = tiles.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (tile: Tile) => {
    setSelectedProduct(tile);
    setFormData({
      name: tile.name,
      brand: tile.brand,
      size: tile.size,
      finish: tile.finish,
      image: tile.image || '',
      category: tile.category
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.brand) {
      toast.error('Required specifications missing');
      return;
    }

    if (selectedProduct) {
      updateTile(selectedProduct.id, { ...selectedProduct, ...formData } as Tile);
      toast.success('Inventory Entry Updated');
    } else {
      addTile({
        id: Date.now().toString(),
        ...formData,
        usage: [],
        textureColor: '#ffffff',
        roughness: 0.5,
        metalness: 0
      } as Tile);
      toast.success('New Tile Added to Inventory');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setFormData({ name: '', brand: '', size: '', finish: '', image: '', category: 'marble' });
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    await new Promise(r => setTimeout(r, 400));
    deleteTile(id);
    setIsDeleting(null);
    toast.success('Inventory record removed');
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Warehouse Inventory</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-white leading-none tracking-tighter">
            Product <span className="italic text-white/30 text-5xl md:text-6xl lg:text-7xl">Manager.</span>
          </h2>
          <p className="mt-10 text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
            Managing {tiles.length} products across the inventory.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="h-16 px-10 rounded-none bg-accent hover:bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-700 group shadow-[0_0_30px_rgba(229,142,88,0.2)]">
                <Plus className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform duration-500" />
                Catalogue New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-sepia border-white/5 text-white max-w-2xl rounded-none p-10 font-sans shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <DialogHeader className="mb-10 text-center">
                <DialogTitle className="text-2xl font-serif font-light tracking-tighter lowercase italic">
                  {selectedProduct ? 'Update Masterpiece' : 'Catalogue New Specimen'}
                </DialogTitle>
                <div className="w-12 h-px bg-accent/30 mx-auto mt-4" />
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Nomenclature</Label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="Statuario White..."
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Provenance (Brand)</Label>
                  <Input 
                    value={formData.brand} 
                    onChange={e => setFormData({...formData, brand: e.target.value})}
                    className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="Kajaria / Elite..."
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Dimensions</Label>
                  <Input 
                    value={formData.size} 
                    onChange={e => setFormData({...formData, size: e.target.value})}
                    className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="1200x2400 mm"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Surface Finish</Label>
                  <Input 
                    value={formData.finish} 
                    onChange={e => setFormData({...formData, finish: e.target.value})}
                    className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="High Gloss / Matte"
                  />
                </div>
                <div className="col-span-2 space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Digital Vision (Image URL)</Label>
                  <Input 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-16">
                <Button 
                  onClick={handleSave}
                  className="w-full h-16 bg-accent text-black hover:bg-white rounded-none font-black uppercase tracking-[0.4em] text-[10px] transition-all mt-6 shadow-[0_0_30px_rgba(229,142,88,0.2)]"
                >
                  Synchronize with Vault
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Utility Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-6 border-y border-white/5 bg-white/[0.01]">
        <div className="relative w-full sm:max-w-md group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent transition-colors" />
          <Input 
            placeholder="Search the Archive..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent border-none pl-16 h-14 text-xs font-bold uppercase tracking-[0.2em] placeholder:text-white/10 focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-8 pr-6">
          <div className="flex bg-white/5 p-1">
            <button 
              onClick={() => setIsGrid(true)}
              className={cn("p-3 rounded-none transition-all", isGrid ? "bg-white text-black" : "text-white/30 hover:text-white")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsGrid(false)}
              className={cn("p-3 rounded-none transition-all", !isGrid ? "bg-white text-black" : "text-white/30 hover:text-white")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid/List */}
      <AnimatePresence mode="wait">
        {isGrid ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10"
          >
            {filteredTiles.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative bg-card border border-white/5 hover:border-accent/40 transition-all duration-1000 overflow-hidden shadow-2xl"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-white/5">
                   {product.image ? (
                     <img 
                       src={product.image} 
                       alt={product.name} 
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-white/10">
                       <ImageIcon className="w-12 h-12 opacity-20" />
                     </div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                   
                   {/* Actions Overlay */}
                   <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                     <button 
                       onClick={() => handleEdit(product)}
                       className="w-10 h-10 bg-white text-black items-center justify-center flex hover:bg-accent transition-colors"
                     >
                       <Edit className="w-4 h-4" />
                     </button>
                     <button 
                       onClick={() => handleDelete(product.id)}
                       disabled={isDeleting === product.id}
                       className="w-10 h-10 bg-black/80 text-red-500 items-center justify-center flex hover:bg-red-500 hover:text-white transition-colors border border-white/10"
                     >
                       {isDeleting === product.id ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Trash2 className="w-4 h-4" />}
                     </button>
                   </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-accent uppercase tracking-widest">{product.brand}</span>
                    <span className="text-[8px] text-white/30 uppercase tracking-[0.2em]">Record #{product.id.slice(-4)}</span>
                  </div>
                  <h4 className="text-xl font-serif font-light text-white mb-6 group-hover:text-accent transition-colors tracking-tight italic">{product.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 mt-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Scale</span>
                      <span className="text-[10px] text-white/60 font-bold tracking-wider">{product.size}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-white/20 uppercase tracking-widest mb-1">Finish</span>
                      <span className="text-[10px] text-white/60 font-bold tracking-wider">{product.finish}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* List Header */}
            <div className="grid grid-cols-12 gap-6 px-10 py-4 opacity-30 text-[9px] font-black uppercase tracking-widest bg-white/5">
              <div className="col-span-1">Preview</div>
              <div className="col-span-4">Nomenclature</div>
              <div className="col-span-2">Provenance</div>
              <div className="col-span-2">Dimensions</div>
              <div className="col-span-2">Finish</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            
            {filteredTiles.map((product) => (
              <div key={product.id} className="grid grid-cols-12 gap-6 items-center px-10 py-6 border border-white/5 hover:bg-white/[0.02] transition-colors group">
                <div className="col-span-1">
                   {product.image ? (
                     <img src={product.image} className="w-12 h-12 object-cover grayscale" alt="" />
                   ) : (
                     <div className="w-12 h-12 bg-white/5 flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-10" /></div>
                   )}
                </div>
                <div className="col-span-4 flex flex-col">
                  <span className="text-sm font-serif font-light italic text-white group-hover:text-accent transition-colors">{product.name}</span>
                </div>
                <div className="col-span-2 text-[10px] font-bold text-white/60 uppercase tracking-widest">{product.brand}</div>
                <div className="col-span-2 text-[10px] text-white/40 uppercase tracking-[0.1em]">{product.size}</div>
                <div className="col-span-2 text-[10px] text-white/40 uppercase tracking-[0.1em]">{product.finish}</div>
                <div className="col-span-1 flex justify-end gap-5 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleEdit(product)} className="text-white/40 hover:text-white transition-colors"><Edit size={14} /></button>
                   <button onClick={() => handleDelete(product.id)} className="text-red-500/60 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManager;
