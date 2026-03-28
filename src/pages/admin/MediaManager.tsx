import React, { useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { MediaEntry } from '@/types/gallery';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Video, Play, Edit, Trash2, Youtube, Link as LinkIcon } from 'lucide-react';
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

const MediaManager = () => {
  const { media, addMedia, updateMedia, deleteMedia } = useGallery();
  const [selectedMedia, setSelectedMedia] = useState<MediaEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    published: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      toast.error('Required fields missing');
      return;
    }

    const itemData: MediaEntry = {
      ...formData,
      id: selectedMedia ? selectedMedia.id : Math.random().toString(36).substr(2, 9),
    };

    if (selectedMedia) {
      updateMedia(selectedMedia.id, itemData);
      toast.success('Visual narrative updated');
    } else {
      addMedia(itemData);
      toast.success('New cinematic experience captured');
    }
    
    setIsDialogOpen(false);
    setSelectedMedia(null);
    setFormData({ title: '', description: '', url: '', published: true });
  };

  const handleEdit = (item: MediaEntry) => {
    setSelectedMedia(item);
    setFormData({
      title: item.title,
      description: item.description,
      url: item.url,
      published: item.published
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Cinematic Narrative</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-white leading-none tracking-tighter">
            Media <span className="italic text-white/30 text-5xl md:text-6xl lg:text-7xl">Studio.</span>
          </h2>
          <p className="mt-10 text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
            Curating visual poetry and cinematic architectural explorations.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setSelectedMedia(null);
                setFormData({ title: '', description: '', url: '', published: true });
              }}
              className="h-16 px-10 rounded-none bg-accent hover:bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-700 shadow-[0_0_30px_rgba(229,142,88,0.2)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Capture New Visual Story
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-sepia border-white/10 text-white rounded-none max-w-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-light tracking-tighter lowercase italic">
                {selectedMedia ? 'Refine Visual Story' : 'Record New Narrative'}
              </DialogTitle>
              <div className="w-12 h-px bg-accent/30 mx-auto mt-4" />
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-8 mt-8">
              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Story Title</Label>
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                  placeholder="Marble Selection Guide..."
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">YouTube / Video URL</Label>
                <div className="flex gap-4">
                  <Input 
                    value={formData.url} 
                    onChange={e => setFormData({...formData, url: e.target.value})}
                    className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="https://youtube.com/watch?v=..."
                    required
                  />
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Youtube className="w-5 h-5 text-accent/40" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Story Description</Label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-none p-4 h-32 focus:border-accent transition-colors outline-none text-sm"
                  placeholder="Describe the cinematic journey of this material..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input 
                   type="checkbox" 
                   id="published" 
                   checked={formData.published}
                   onChange={e => setFormData({...formData, published: e.target.checked})}
                   className="w-4 h-4 accent-accent bg-black border-white/10"
                />
                <Label htmlFor="published" className="text-[10px] font-black uppercase tracking-widest text-white/60 cursor-pointer">Broadcasting Live</Label>
              </div>

              <Button type="submit" className="w-full bg-accent text-black hover:bg-white rounded-none h-14 text-[10px] font-black uppercase tracking-widest transition-colors shadow-[0_0_30px_rgba(229,142,88,0.2)]">
                {selectedMedia ? 'Commit Refinement' : 'Begin Broadcast'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
        <AnimatePresence mode="popLayout">
          {media.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-card border border-white/5 overflow-hidden transition-all duration-1000 hover:border-accent/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
            >
              <div className="aspect-video bg-white/5 relative flex items-center justify-center overflow-hidden">
                 <Youtube className="w-16 h-16 text-white/5 group-hover:text-accent transition-colors duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white flex items-center justify-center text-black rotate-45 group-hover:rotate-0 transition-transform duration-700">
                       <Play className="w-6 h-6 fill-current" />
                    </a>
                 </div>
              </div>
              
              <div className="p-10">
                 <div className="flex justify-between items-start mb-6">
                    <span className={item.published ? "text-[8px] font-black uppercase text-accent tracking-[0.4em]" : "text-[8px] font-black uppercase text-white/20 tracking-[0.4em]"}>
                      {item.published ? 'Broadcasting' : 'Draft Narrative'}
                    </span>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleEdit(item)} className="text-white/40 hover:text-white transition-colors"><Edit size={14} /></button>
                       <button onClick={() => deleteMedia(item.id)} className="text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                 </div>
                 <h3 className="text-2xl font-serif font-light text-white mb-4 tracking-tight italic group-hover:text-accent transition-colors">{item.title}</h3>
                 <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-sans font-bold leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {media.length === 0 && (
          <div className="col-span-full py-40 text-center border border-dashed border-white/5">
            <Video className="w-8 h-8 text-white/10 mx-auto mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/10 italic">No Cinematic Stories Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManager;
