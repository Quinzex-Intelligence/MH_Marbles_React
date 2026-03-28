import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Globe, Cpu, Zap, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SystemConfig = () => {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">System Configuration</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-white leading-none tracking-tighter">
          System <span className="italic text-white/30 text-5xl md:text-6xl lg:text-7xl">Settings.</span>
        </h2>
        <p className="mt-10 text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.3em] font-sans font-bold leading-loose">
          Configure site-wide parameters and platform settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-white/5 p-12 space-y-10 shadow-2xl"
        >
          <div className="flex items-center gap-4 border-b border-white/5 pb-8 mb-8">
             <Cpu className="w-5 h-5 text-accent" />
             <h3 className="text-xs font-black uppercase tracking-[0.4em]">Core Platform</h3>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Site Name</Label>
              <Input className="bg-white/5 border-white/10 rounded-none h-14" defaultValue="MH MARBLE" />
            </div>
            <div className="space-y-3">
              <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Site Tagline</Label>
              <Input className="bg-white/5 border-white/10 rounded-none h-14" defaultValue="QUALITY TILE FOR STYLISH LIVING" />
            </div>
            <div className="space-y-3">
              <Label className="text-[9px] font-black uppercase tracking-widest text-white/40">Business Address</Label>
              <Input className="bg-white/5 border-white/10 rounded-none h-14" defaultValue="PLOT NO : 5/A, DOMMARA POCHAMPALLY, HYDERABAD" />
            </div>
          </div>
          
          <Button className="w-full h-16 bg-accent text-black hover:bg-white rounded-none font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-700 shadow-[0_0_30px_rgba(229,142,88,0.2)]">
             Save Changes
          </Button>
        </motion.div>

        <div className="space-y-6">
           <div className="bg-card border border-white/5 p-10 flex items-center justify-between group cursor-pointer hover:border-accent/30 transition-all duration-700 shadow-xl">
              <div className="flex items-center gap-6">
                 <Shield className="w-6 h-6 text-white/20 group-hover:text-accent transition-colors" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Platform Security</h4>
                    <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] mt-1">SSL and Protocol Encryption Active</p>
                  </div>
              </div>
              <Zap className="w-4 h-4 text-accent animate-pulse" />
           </div>
           
           <div className="bg-card border border-white/5 p-10 flex items-center justify-between group cursor-pointer hover:border-accent/30 transition-all duration-700 shadow-xl">
              <div className="flex items-center gap-6">
                 <Cloud className="w-6 h-6 text-white/20 group-hover:text-accent transition-colors" />
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Asset Management</h4>
                    <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] mt-1">CDN Synchronization Active</p>
                  </div>
              </div>
              <Globe className="w-4 h-4 text-white/10" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;
