import React, { useState } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, FileText, Calendar, Youtube, ArrowUpRight } from 'lucide-react';
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
  const { journal: entries, addJournal, deleteJournal } = useGallery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ytUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Required fields missing');
      return;
    }
    if (entries.length >= 5) {
      toast.error('Maximum of 5 journals reached.');
      return;
    }
    try {
      setIsSubmitting(true);
      await addJournal({
        title: formData.title,
        description: formData.description,
        ytUrl: formData.ytUrl || undefined
      });
      toast.success('New narrative established');
      setIsDialogOpen(false);
      setFormData({ title: '', description: '', ytUrl: '' });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to establish narrative';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteJournal(id);
      toast.success('Narrative deleted');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to delete narrative';
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-12">

      {/* ── Header + Add Button ─────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Editorial Content</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-foreground leading-none tracking-tighter">
            Journal <span className="italic text-foreground/30 text-5xl md:text-6xl lg:text-7xl">Manager.</span>
          </h2>
          <p className="mt-10 text-[10px] sm:text-xs text-foreground/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
            Curating architectural narratives and client reflections.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={entries.length >= 5}
              onClick={() => setFormData({ title: '', description: '', ytUrl: '' })}
              className="h-16 px-10 rounded-none bg-accent hover:bg-foreground text-background font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-700 shadow-[0_0_30px_rgba(229,142,88,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-2" />
              {entries.length >= 5 ? 'Limit Reached (5/5)' : 'New Journal Entry'}
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-sepia border-foreground/10 text-foreground rounded-none max-w-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif font-light tracking-tighter lowercase italic">
                Draft New Entry
              </DialogTitle>
              <div className="w-12 h-px bg-accent/30 mx-auto mt-4" />
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8 mt-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Entry Title</Label>
                  <Input
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors"
                    placeholder="The Tuscon Journey..."
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">YouTube URL (Optional)</Label>
                  <div className="relative">
                    <Input
                      type="url"
                      value={formData.ytUrl}
                      onChange={e => setFormData({...formData, ytUrl: e.target.value})}
                      className="bg-foreground/5 border-foreground/10 rounded-none h-12 focus:border-accent transition-colors pl-10"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                    <Youtube className="w-4 h-4 text-foreground/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[9px] font-black uppercase tracking-widest text-foreground/40">Narrative Description</Label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-none p-4 h-32 focus:border-accent transition-colors outline-none text-sm"
                  placeholder="Summarize the architectural philosophy or client story..."
                  required
                />
              </div>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-accent text-background hover:bg-foreground rounded-none h-14 text-[10px] font-black uppercase tracking-widest transition-colors shadow-[0_0_30px_rgba(229,142,88,0.2)] disabled:opacity-50"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Narrative'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ── Creative Editorial Strip Cards ──────────────── */}
      <div className="mt-20 space-y-4">
        <AnimatePresence mode="popLayout">
          {entries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60, scale: 0.97 }}
              transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
              className="group relative overflow-hidden"
            >
              {/* Card shell */}
              <div className="relative flex items-stretch min-h-[170px] bg-gradient-to-r from-[#0e0c09] to-[#0b0906] border border-foreground/[0.04] group-hover:border-accent/25 transition-all duration-600 shadow-[0_4px_40px_rgba(0,0,0,0.55)] group-hover:shadow-[0_12px_60px_rgba(229,142,88,0.06)]">

                {/* Giant number watermark */}
                <span
                  className="absolute right-0 top-1/2 -translate-y-1/2 font-serif italic font-black leading-none select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(120px, 15vw, 200px)',
                    color: 'rgba(229,142,88,0.035)',
                    letterSpacing: '-0.06em',
                    lineHeight: 1,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Left accent stripe */}
                <div className="w-[2px] flex-shrink-0 bg-gradient-to-b from-accent/70 via-accent/30 to-transparent group-hover:from-white group-hover:via-accent/60 group-hover:to-accent/10 transition-all duration-700" />

                {/* Rotated vertical label */}
                <div className="flex-shrink-0 w-12 flex items-center justify-center border-r border-foreground/[0.03] group-hover:border-accent/10 transition-colors duration-500">
                  <span
                    className="text-[7px] font-black uppercase tracking-[0.6em] text-accent/25 group-hover:text-accent/60 transition-colors duration-500 select-none whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Vol.{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Main content block */}
                <div className="flex-1 relative z-10 flex flex-col justify-between px-10 py-7">

                  {/* Top meta row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="text-[7px] font-black uppercase tracking-[0.7em] text-foreground/12 flex items-center gap-1.5">
                        <Calendar className="w-2 h-2" />
                        {entry.instant
                          ? new Date(entry.instant).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                          : 'Unknown Date'}
                      </span>
                      <span className="w-12 h-px bg-foreground/[0.06]" />
                      <span className="text-[7px] font-black uppercase tracking-[0.6em] text-accent/30">
                        Narrative
                      </span>
                    </div>

                    {/* Delete — appears on hover */}
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="opacity-0 group-hover:opacity-100 w-7 h-7 border border-foreground/8 hover:border-red-500/40 hover:bg-red-500/8 flex items-center justify-center transition-all duration-300"
                      aria-label="Delete"
                    >
                      <Trash2 size={10} className="text-red-400/60 hover:text-red-400 transition-colors" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-[2rem] md:text-[2.6rem] font-serif italic font-light text-foreground/80 group-hover:text-foreground transition-colors duration-500 leading-[1.05] tracking-tight my-4">
                    {entry.title}
                  </h3>

                  {/* Bottom: description + watch button */}
                  <div className="flex items-end justify-between gap-10">
                    <p className="text-[10px] text-foreground/25 leading-loose tracking-wide max-w-2xl line-clamp-2 font-sans group-hover:text-foreground/40 transition-colors duration-500">
                      {entry.description}
                    </p>

                    {entry.ytUrl ? (
                      <a
                        href={entry.ytUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-shrink-0 group/yt inline-flex items-center gap-2.5 border border-accent/15 hover:border-accent hover:bg-accent px-6 h-10 transition-all duration-500"
                        onClick={e => e.stopPropagation()}
                      >
                        <Youtube size={12} className="text-accent group-hover/yt:text-background transition-colors duration-300" />
                        <span className="text-[8px] font-black uppercase tracking-[0.45em] text-accent group-hover/yt:text-background transition-colors duration-300 whitespace-nowrap">
                          Watch
                        </span>
                        <ArrowUpRight size={10} className="text-accent/60 group-hover/yt:text-background transition-colors duration-300" />
                      </a>
                    ) : (
                      <div className="flex-shrink-0 border border-foreground/[0.03] px-6 h-10 flex items-center">
                        <span className="text-[7px] font-black uppercase tracking-[0.5em] text-foreground/10">No Video</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Warm wash overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* Glowing underline on hover */}
              <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {entries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-52 flex flex-col items-center gap-6 border border-dashed border-foreground/[0.04] mt-8"
        >
          <FileText className="w-7 h-7 text-foreground/[0.05]" />
          <p className="text-[9px] font-black uppercase tracking-[0.8em] text-foreground/[0.07] italic">
            Zero Transmissions Captured
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default JournalManager;
