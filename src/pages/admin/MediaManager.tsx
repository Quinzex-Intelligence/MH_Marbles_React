import React, { useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { MediaEntry } from '@/types/gallery';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Video, Play, Edit, Trash2, Youtube, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    heading: '',
    subtext: '',
    cta_text: '',
    cta_link: '',
    order: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.heading) {
      toast.error('Heading required');
      return;
    }

    const data = new FormData();
    data.append('heading', formData.heading);
    data.append('subtext', formData.subtext);
    data.append('cta_text', formData.cta_text);
    data.append('cta_link', formData.cta_link);
    data.append('order', formData.order.toString());
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (selectedMedia) {
        await updateMedia(selectedMedia.id, data);
        toast.success('Visual narrative updated');
      } else {
        await addMedia(data);
        toast.success('New cinematic experience captured');
      }
      setIsDialogOpen(false);
      setSelectedMedia(null);
      setImageFile(null);
      setFormData({ heading: '', subtext: '', cta_text: '', cta_link: '', order: 1 });
    } catch (error) {
      toast.error('Failed to save visual story');
    }
  };

  const handleEdit = (item: MediaEntry) => {
    setSelectedMedia(item);
    setFormData({
      heading: item.heading,
      subtext: item.subtext,
      cta_text: item.cta_text,
      cta_link: item.cta_link,
      order: item.order
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
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-foreground leading-none tracking-tighter">
            Media <span className="italic text-foreground/30 text-5xl md:text-6xl lg:text-7xl">Studio.</span>
          </h2>
          <p className="mt-10 text-[10px] sm:text-xs text-foreground/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
            Curating visual poetry and cinematic architectural explorations.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setSelectedMedia(null);
                setFormData({ heading: '', subtext: '', cta_text: '', cta_link: '', order: 1 });
                setImageFile(null);
              }}
              className="h-16 px-10 rounded-none bg-accent hover:bg-foreground text-background font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-700 shadow-[0_0_30px_rgba(229,142,88,0.2)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Capture New Visual Story
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-sepia border-foreground/10 text-foreground rounded-none max-w-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-light tracking-tighter lowercase italic">
                {selectedMedia ? 'Refine Visual Story' : 'Record New Narrative'}
              </DialogTitle>
              <div className="w-12 h-px bg-accent/30 mx-auto mt-4" />
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Story Heading</Label>
                  <Input 
                    value={formData.heading} 
                    onChange={e => setFormData({...formData, heading: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="Premium Tiles..."
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Display Order</Label>
                  <Input 
                    type="number"
                    value={formData.order} 
                    onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 1})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Cinematic Image</Label>
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
                {selectedMedia?.image && !imageFile && (
                  <p className="text-[8px] text-foreground/20 italic">Current: {selectedMedia.image.split('/').pop()}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Subtext / Narrative</Label>
                <textarea 
                  value={formData.subtext} 
                  onChange={e => setFormData({...formData, subtext: e.target.value})}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-none p-4 h-24 focus:border-accent transition-colors outline-none text-sm"
                  placeholder="Describe the cinematic journey..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">CTA Text</Label>
                  <Input 
                    value={formData.cta_text} 
                    onChange={e => setFormData({...formData, cta_text: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="Explore Gallery"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">CTA Link</Label>
                  <Input 
                    value={formData.cta_link} 
                    onChange={e => setFormData({...formData, cta_link: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="/gallery"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-accent text-background hover:bg-foreground rounded-none h-14 text-[10px] font-black uppercase tracking-widest transition-colors shadow-[0_0_30px_rgba(229,142,88,0.2)]">
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
              className="group relative bg-card border border-foreground/5 overflow-hidden transition-all duration-1000 hover:border-accent/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
            >
              <div className="aspect-video bg-foreground/5 relative flex items-center justify-center overflow-hidden">
                 {item.image ? (
                   <img src={item.image} alt={item.heading} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                 ) : (
                   <Video className="w-16 h-16 text-foreground/5 group-hover:text-accent transition-colors duration-700 group-hover:scale-110" />
                 )}
                 <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all duration-700" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <a href={item.cta_link} className="w-16 h-16 bg-foreground flex items-center justify-center text-background rotate-45 group-hover:rotate-0 transition-transform duration-700">
                       <Play className="w-6 h-6 fill-current" />
                    </a>
                 </div>
              </div>
              
              <div className="p-10">
                 <div className="flex justify-between items-start mb-6">
                    <span className="text-[8px] font-black uppercase text-accent tracking-[0.4em]">
                      Order #{item.order}
                    </span>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleEdit(item)} className="text-foreground/40 hover:text-foreground transition-colors"><Edit size={14} /></button>
                       <button onClick={() => deleteMedia(item.id)} className="text-red-500/40 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                 </div>
                 <h3 className="text-2xl font-serif font-light text-foreground mb-4 tracking-tight italic group-hover:text-accent transition-colors">{item.heading}</h3>
                 <p className="text-[10px] text-foreground/30 uppercase tracking-[0.3em] font-sans font-bold leading-relaxed">{item.subtext}</p>
                 {item.cta_text && (
                   <div className="mt-6 pt-6 border-t border-foreground/5">
                     <span className="text-[8px] font-black uppercase tracking-widest text-foreground/20 whitespace-nowrap">CTA: {item.cta_text} &rarr; {item.cta_link}</span>
                   </div>
                 )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {media.length === 0 && (
          <div className="col-span-full py-40 text-center border border-dashed border-foreground/5">
            <Video className="w-8 h-8 text-foreground/10 mx-auto mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/10 italic">No Cinematic Stories Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManager;
