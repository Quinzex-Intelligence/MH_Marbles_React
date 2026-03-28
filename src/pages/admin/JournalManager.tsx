import React, { useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Bookmark, Edit, Trash2, FileText, Calendar } from 'lucide-react';
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
import { JournalEntry } from '@/types/gallery';
import { toast } from 'sonner';

const JournalManager = () => {
  const { journal: entries, addJournal, updateJournal, deleteJournal } = useGallery();
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt) {
      toast.error('Required fields missing');
      return;
    }

    const entryData = {
      ...formData,
      id: selectedEntry ? selectedEntry.id : Math.random().toString(36).substr(2, 9),
    };

    if (selectedEntry) {
      updateJournal(selectedEntry.id, entryData);
      toast.success('Journal entry refined');
    } else {
      addJournal(entryData);
      toast.success('New narrative established');
    }
    
    setIsDialogOpen(false);
    setSelectedEntry(null);
    setFormData({ title: '', excerpt: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleEdit = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setFormData({
      title: entry.title,
      excerpt: entry.excerpt,
      date: entry.date
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Editorial Content</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-white leading-none tracking-tighter">
            Journal <span className="italic text-white/30 text-5xl md:text-6xl lg:text-7xl">Manager.</span>
          </h2>
          <p className="mt-10 text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
            Curating architectural narratives and client reflections.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setSelectedEntry(null);
                setFormData({ title: '', excerpt: '', date: new Date().toISOString().split('T')[0] });
              }}
              className="h-16 px-10 rounded-none bg-accent hover:bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-700 shadow-[0_0_30px_rgba(229,142,88,0.2)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Journal Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-sepia border-white/10 text-white rounded-none max-w-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-light tracking-tighter lowercase italic">
                {selectedEntry ? 'Refine Narrative' : 'Draft New Entry'}
              </DialogTitle>
              <div className="w-12 h-px bg-accent/30 mx-auto mt-4" />
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-8 mt-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Entry Title</Label>
                  <Input 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="The Tuscon Journey..."
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Publication Date</Label>
                  <div className="relative">
                    <Input 
                      type="date"
                      value={formData.date} 
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="bg-white/5 border-white/10 rounded-none h-12 focus:border-accent transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Narrative Excerpt</Label>
                <textarea 
                  value={formData.excerpt} 
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-none p-4 h-32 focus:border-accent transition-colors outline-none text-sm"
                  placeholder="Summarize the architectural philosophy or client story..."
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-accent text-black hover:bg-white rounded-none h-14 text-[10px] font-black uppercase tracking-widest transition-colors shadow-[0_0_30px_rgba(229,142,88,0.2)]">
                {selectedEntry ? 'Commit Refinement' : 'Publish Narrative'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-6 mt-20">
        <AnimatePresence mode="popLayout">
          {entries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.05 }}
              className="group grid grid-cols-12 gap-10 items-center p-10 bg-card border border-white/5 hover:border-accent/40 transition-all duration-1000 hover:bg-white/[0.02] shadow-2xl"
            >
              <div className="col-span-1 flex items-center justify-center">
                 <Bookmark className="w-6 h-6 text-white/10 group-hover:text-accent transition-colors duration-500" />
              </div>
              <div className="col-span-7">
                 <h3 className="text-xl font-serif font-light text-white mb-2 tracking-tight group-hover:text-white transition-colors italic">{entry.title}</h3>
                 <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{entry.excerpt}</p>
              </div>
              <div className="col-span-2 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center gap-2">
                 <Calendar className="w-3 h-3" />
                 {entry.date}
              </div>
              <div className="col-span-2 flex justify-end gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => handleEdit(entry)} className="text-white/40 hover:text-white transition-colors">
                    <Edit size={14} />
                 </button>
                 <button onClick={() => deleteJournal(entry.id)} className="text-red-500/40 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {entries.length === 0 && (
          <div className="py-40 text-center border border-dashed border-white/5">
             <FileText className="w-8 h-8 text-white/10 mx-auto mb-4" />
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 italic">Zero Transmissions Captured</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalManager;
