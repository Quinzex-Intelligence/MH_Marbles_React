import React, { useState, useEffect } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { 
  Plus, Search, Filter, MoreVertical, Edit, 
  Trash2, Eye, LayoutGrid, List, CheckCircle2,
  AlertCircle, ArrowUpRight, Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getOptimizedImageUrl } from '@/lib/utils';
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
  const { 
    backendTiles, addTile, updateTile, deleteTile, brands, categories,
    nextPageUrl, loadMoreTiles 
  } = useGallery();
  const [search, setSearch] = useState('');
  const [isGrid, setIsGrid] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Tile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [isSavingCat, setIsSavingCat] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Debounce search input to prevent lag during typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const { addCategory } = useGallery();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand_id: '',
    category_id: '',
    size: '',
    finish: '',
    color: 'White',
    sku: '',
    image_key: ''
  });

  const filteredTiles = React.useMemo(() => {
    return backendTiles.filter(p => {
      // 1. Filter by Search Query
      const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                          String(p.brand).toLowerCase().includes(debouncedSearch.toLowerCase());
      
      // 2. Filter by Active Tab (Category)
      const matchesTab = activeTab === 'all' || String(p.category) === activeTab;
      
      return matchesSearch && matchesTab;
    });
  }, [backendTiles, debouncedSearch, activeTab]);

  const handleEdit = (tile: Tile) => {
    setSelectedProduct(tile);
    setFormData({
      name: tile.name,
      brand_id: String(tile.company || tile.brand || ''),
      category_id: String(tile.category || ''),
      size: tile.size,
      finish: tile.finish,
      color: tile.color || 'White',
      sku: tile.sku || '',
      image_key: tile.image_key || ''
    });
    setPreviewUrl(tile.image_url || tile.image || null);
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.brand_id || !formData.category_id) {
      toast.error('Required specifications missing (Name, Brand, Category)');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('company', formData.brand_id);
      data.append('category', formData.category_id);
      data.append('size', formData.size);
      data.append('finish', formData.finish);
      data.append('color', formData.color);
      data.append('sku', formData.sku || `SKU-${Date.now()}`);
      
      if (imageFile) {
        data.append('image', imageFile);
      } else if (formData.image_key) {
        data.append('image_key', formData.image_key);
      }

      if (selectedProduct) {
        await updateTile(selectedProduct.id, data);
        toast.success('Inventory Entry Synchronized');
      } else {
        await addTile(data);
        toast.success('New Tile Catalogued');
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to synchronize with vault');
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setFormData({ name: '', brand_id: '', category_id: '', size: '', finish: '', color: 'White', sku: '', image_key: '' });
    setImageFile(null);
    setPreviewUrl(null);
    setIsAddingCategory(false);
    setNewCatName('');
  };

  const handleQuickAddCategory = async () => {
    if (!newCatName.trim()) return;
    setIsSavingCat(true);
    try {
      const data = new FormData();
      data.append('name', newCatName);
      data.append('slug', newCatName.toLowerCase().replace(/\s+/g, '-'));
      
      await addCategory(data);
      toast.success('Category Vault Updated');
      setNewCatName('');
      setIsAddingCategory(false);
    } catch (error) {
      toast.error('Failed to update category vault');
    } finally {
      setIsSavingCat(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    setIsDeleting(id);
    try {
      await deleteTile(id);
      toast.success('Inventory record removed');
    } catch (error) {
      toast.error('Failed to remove record');
    }
    setIsDeleting(null);
  };

  // Infinite Scroll Trigger
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const isLoadingMoreRef = React.useRef(false);
  
  React.useEffect(() => {
    isLoadingMoreRef.current = isLoadingMore;
  }, [isLoadingMore]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMoreRef.current) {
          setIsLoadingMore(true);
          loadMoreTiles().finally(() => setIsLoadingMore(false));
        }
      },
      { threshold: 0.1 }
    );

    if (scrollRef.current && nextPageUrl) {
      observerRef.current.observe(scrollRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [nextPageUrl, loadMoreTiles]);

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Warehouse Inventory</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-foreground leading-none tracking-tighter">
            Product <span className="italic text-foreground/30 text-5xl md:text-6xl lg:text-7xl">Manager.</span>
          </h2>
          <p className="mt-10 text-[10px] sm:text-xs text-foreground/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
            Managing {backendTiles.length} products across the inventory.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="h-16 px-10 rounded-none bg-accent hover:bg-foreground text-background font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-700 group shadow-[0_0_30px_rgba(229,142,88,0.2)]">
                <Plus className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform duration-500" />
                Catalogue New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-sepia border-foreground/5 text-foreground max-w-2xl rounded-none p-10 font-sans shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <DialogHeader className="mb-10 text-center">
                <DialogTitle className="text-2xl font-serif font-light tracking-tighter lowercase italic">
                  {selectedProduct ? 'Update Masterpiece' : 'Catalogue New Specimen'}
                </DialogTitle>
                <div className="w-12 h-px bg-accent/30 mx-auto mt-4" />
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Nomenclature</Label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="Statuario White..."
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Provenance (Brand)</Label>
                  <select 
                    value={formData.brand_id} 
                    onChange={e => setFormData({...formData, brand_id: e.target.value})}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-none h-12 px-4 text-xs focus:border-accent transition-colors outline-none"
                  >
                    <option value="" className="bg-background">Select Brand Partner</option>
                    {brands.map(b => <option key={b.id} value={b.id} className="bg-background">{b.name}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Category</Label>
                    <button 
                      onClick={() => setIsAddingCategory(!isAddingCategory)}
                      className="text-[8px] font-black uppercase tracking-tighter text-accent hover:text-foreground transition-colors"
                    >
                      {isAddingCategory ? '[ Cancel ]' : '[ Add New ]'}
                    </button>
                  </div>
                  
                  {isAddingCategory ? (
                    <div className="flex gap-2">
                      <Input 
                        value={newCatName}
                        onChange={e => setNewCatName(e.target.value)}
                        placeholder="New Category Name..."
                        className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors text-xs flex-1"
                      />
                      <Button 
                        onClick={handleQuickAddCategory}
                        disabled={isSavingCat}
                        className="h-12 w-12 rounded-none bg-accent hover:bg-foreground text-background shrink-0"
                      >
                        {isSavingCat ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      </Button>
                    </div>
                  ) : (
                    <select 
                      value={formData.category_id} 
                      onChange={e => setFormData({...formData, category_id: e.target.value})}
                      className="w-full bg-foreground/5 border border-foreground/10 rounded-none h-12 px-4 text-xs focus:border-accent transition-colors outline-none"
                    >
                      <option value="" className="bg-background">Select Category</option>
                      {categories.map(c => <option key={c.id} value={c.id} className="bg-background">{c.name}</option>)}
                    </select>
                  )}
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">SKU Reference</Label>
                  <Input 
                    value={formData.sku} 
                    onChange={e => setFormData({...formData, sku: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="e.g. MH-MAR-001"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Dimensions</Label>
                  <Input 
                    value={formData.size} 
                    onChange={e => setFormData({...formData, size: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="1200x2400 mm"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Surface Finish</Label>
                  <Input 
                    value={formData.finish} 
                    onChange={e => setFormData({...formData, finish: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="High Gloss / Matte"
                  />
                </div>
                <div className="col-span-2 space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Product Image (Selection from Media)</Label>
                  <div className="flex gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="relative group cursor-pointer" onClick={() => document.getElementById('product-image-upload')?.click()}>
                        <div className="bg-foreground/5 border border-foreground/10 rounded-none h-32 flex flex-col items-center justify-center group-hover:bg-foreground/[0.08] transition-all border-dashed">
                          <ImageIcon className="w-8 h-8 text-foreground/20 mb-2 group-hover:text-accent transition-colors" />
                          <span className="text-[9px] font-black uppercase tracking-tighter text-foreground/40">{imageFile ? imageFile.name : 'Choose system file'}</span>
                        </div>
                        <input 
                          id="product-image-upload"
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setImageFile(file);
                              setPreviewUrl(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </div>
                      <Input 
                        value={formData.image_key}
                        onChange={e => setFormData({...formData, image_key: e.target.value})}
                        className="bg-foreground/5 border-foreground/10 rounded-none h-10 text-[10px] focus:border-accent transition-colors hidden"
                        placeholder="Or provide direct key/URL..."
                      />
                    </div>
                    
                    <div className="w-32 h-32 bg-foreground/5 border border-foreground/10 shrink-0 overflow-hidden relative group">
                      {previewUrl ? (
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover transition-all duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[8px] font-black uppercase tracking-widest">Preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="mt-16">
                <Button 
                  onClick={handleSave}
                  className="w-full h-16 bg-accent text-background hover:bg-foreground rounded-none font-black uppercase tracking-[0.4em] text-[10px] transition-all mt-6 shadow-[0_0_30px_rgba(229,142,88,0.2)]"
                >
                  Synchronize with Vault
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Category Tabs Architecture */}
      <div className="flex items-center gap-4 scrollbar-hide overflow-x-auto py-4 border-b border-foreground/5 sticky top-20 bg-background/80 backdrop-blur-md z-20">
        <button
          onClick={() => setActiveTab('all')}
          className={cn(
            "px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap border-b-2",
            activeTab === 'all' 
              ? "text-accent border-accent" 
              : "text-foreground/30 border-transparent hover:text-foreground"
          )}
        >
          All Collections
        </button>
        {categories.map((cat) => {
          const count = backendTiles.filter(t => String(t.category) === String(cat.id)).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(String(cat.id))}
              className={cn(
                "px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap border-b-2 flex items-center gap-3",
                activeTab === String(cat.id)
                  ? "text-accent border-accent" 
                  : "text-foreground/30 border-transparent hover:text-foreground"
              )}
            >
              {cat.name}
              <span className={cn(
                "text-[7px] px-1.5 py-0.5 rounded-full border",
                activeTab === String(cat.id) ? "border-accent text-accent" : "border-foreground/10 text-foreground/20"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Utility Bar - Redesigned for Compactness */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-3 border-b border-foreground/5 bg-foreground/[0.01]">
        <div className="relative w-full sm:max-w-md group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20 group-focus-within:text-accent transition-colors" />
          <Input 
            placeholder="Search the Archive..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent border-none pl-14 h-11 text-[10px] font-bold uppercase tracking-[0.2em] placeholder:text-foreground/10 focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-6 pr-6">
          <div className="flex bg-foreground/5 p-1">
            <button 
              onClick={() => setIsGrid(true)}
              className={cn("p-2 transition-all", isGrid ? "bg-accent text-background" : "text-foreground/30 hover:text-foreground")}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setIsGrid(false)}
              className={cn("p-2 transition-all", !isGrid ? "bg-accent text-background" : "text-foreground/30 hover:text-foreground")}
            >
              <List className="w-3.5 h-3.5" />
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
            {filteredTiles.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group relative bg-card border border-foreground/5 hover:border-accent/40 transition-all duration-1000 overflow-hidden shadow-2xl"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-foreground/5">
                   {product.image_url || product.image ? (
                     <img 
                       src={getOptimizedImageUrl(product.image_url || product.image, 400, 500)} 
                       alt={product.name} 
                       loading="lazy"
                       className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-out"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-foreground/10">
                       <ImageIcon className="w-12 h-12 opacity-20" />
                     </div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                   
                   {/* Actions Overlay */}
                   <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                     <button 
                       onClick={() => handleEdit(product)}
                       className="w-10 h-10 bg-foreground text-background items-center justify-center flex hover:bg-accent transition-colors"
                     >
                       <Edit className="w-4 h-4" />
                     </button>
                     <button 
                       onClick={() => handleDelete(product.id)}
                       disabled={isDeleting === product.id}
                       className="w-10 h-10 bg-background/80 text-red-500 items-center justify-center flex hover:bg-red-500 hover:text-foreground transition-colors border border-foreground/10"
                     >
                       {isDeleting === product.id ? <Loader2 className="w-4 h-4 animate-spin text-foreground" /> : <Trash2 className="w-4 h-4" />}
                     </button>
                   </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-accent uppercase tracking-widest">{product.brand}</span>
                    <span className="text-[8px] text-foreground/30 uppercase tracking-[0.2em]">Record #{String(product.id).slice(-4)}</span>
                  </div>
                  <h4 className="text-xl font-serif font-light text-foreground mb-6 group-hover:text-accent transition-colors tracking-tight italic">{product.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-foreground/5 pt-6 mt-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-foreground/20 uppercase tracking-widest mb-1">Scale</span>
                      <span className="text-[10px] text-foreground/60 font-bold tracking-wider">{product.size}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-foreground/20 uppercase tracking-widest mb-1">Finish</span>
                      <span className="text-[10px] text-foreground/60 font-bold tracking-wider">{product.finish}</span>
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
            <div className="grid grid-cols-12 gap-6 px-10 py-4 opacity-30 text-[9px] font-black uppercase tracking-widest bg-foreground/5">
              <div className="col-span-1">Preview</div>
              <div className="col-span-4">Nomenclature</div>
              <div className="col-span-2">Provenance</div>
              <div className="col-span-2">Dimensions</div>
              <div className="col-span-2">Finish</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            
            {filteredTiles.map((product) => (
              <div key={product.id} className="grid grid-cols-12 gap-6 items-center px-10 py-6 border border-foreground/5 hover:bg-foreground/[0.02] transition-colors group">
                <div className="col-span-1">
                    {product.image_url || product.image ? (
                      <img 
                        src={getOptimizedImageUrl(product.image_url || product.image, 100, 100)} 
                        className="w-12 h-12 object-cover" 
                        alt="" 
                      />
                   ) : (
                     <div className="w-12 h-12 bg-foreground/5 flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-10" /></div>
                   )}
                </div>
                <div className="col-span-4 flex flex-col">
                  <span className="text-sm font-serif font-light italic text-foreground group-hover:text-accent transition-colors">{product.name}</span>
                </div>
                <div className="col-span-2 text-[10px] font-bold text-foreground/60 uppercase tracking-widest">{product.brand}</div>
                <div className="col-span-2 text-[10px] text-foreground/40 uppercase tracking-[0.1em]">{product.size}</div>
                <div className="col-span-2 text-[10px] text-foreground/40 uppercase tracking-[0.1em]">{product.finish}</div>
                <div className="col-span-1 flex justify-end gap-5 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => handleEdit(product)} className="text-foreground/40 hover:text-foreground transition-colors"><Edit size={14} /></button>
                   <button onClick={() => handleDelete(product.id)} className="text-red-500/60 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Infinite Scroll Sentinel */}
      {nextPageUrl && (
        <div ref={scrollRef} className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent opacity-40" />
        </div>
      )}
    </div>
  );
};

export default ProductManager;
