import React from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, User, Clock, CheckCircle2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const MessageManager = () => {
  const { messages, markMessageRead, deleteMessage } = useGallery();

  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Communications</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-white leading-none tracking-tighter">
          Message <span className="italic text-white/30 text-5xl md:text-6xl lg:text-7xl">Manager.</span>
        </h2>
        <p className="mt-10 text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
          Engaging with architects and customers through direct messaging.
        </p>
      </div>

      <div className="space-y-6 mt-20">
        {messages.map((message, idx) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={cn(
              "group p-10 border transition-all duration-700",
              message.read 
                ? "bg-[#0a0a0a] border-white/5 opacity-60" 
                : "bg-white/[0.02] border-accent/20 border-l-4 border-l-accent"
            )}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              <div className="flex-1">
                 <div className="flex items-center gap-6 mb-8">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-accent uppercase tracking-widest">{message.subject}</span>
                       <h3 className="text-lg font-serif font-light text-white italic tracking-tight">{message.name}</h3>
                    </div>
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">{message.date}</span>
                 </div>
                 
                 <p className="text-base font-serif font-light text-white/80 leading-relaxed italic mb-10 max-w-4xl">
                   "{message.message}"
                 </p>
                 
                 <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-white/30">
                    <div className="flex items-center gap-3">
                       <Mail className="w-3.5 h-3.5 text-accent/40" />
                       {message.email}
                    </div>
                 </div>
              </div>

              <div className="flex lg:flex-col justify-end gap-6 pt-6 lg:pt-0">
                 {!message.read && (
                    <button 
                      onClick={() => markMessageRead(message.id)}
                      className="p-4 bg-white text-black hover:bg-accent transition-colors flex items-center justify-center"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                 )}
                 <button 
                   onClick={() => deleteMessage(message.id)}
                   className="p-4 border border-white/5 hover:border-red-500/40 hover:text-red-500 transition-all flex items-center justify-center text-white/30"
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
        {messages.length === 0 && (
          <div className="py-40 text-center border border-dashed border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 italic">Zero Transmissions Captured</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageManager;
