import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Tag, 
  Video, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Bell,
  Search,
  Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useGallery } from '@/contexts/GalleryContext';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { userInfo: user, logout } = useAuth();
  const { messages } = useGallery();
  const location = useLocation();
  const navigate = useNavigate();
  const unreadCount = messages.filter(m => !m.read).length;

  const navigation = [
    { name: 'Products', href: '/admin/products', icon: Layers },
    { name: 'Brands', href: '/admin/brands', icon: Tag },
    { name: 'Sanitary', href: '/admin/sanitary', icon: Droplets },
    { name: 'Media', href: '/admin/media', icon: Video },
    { name: 'Journal', href: '/admin/journal', icon: FileText },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare, badge: unreadCount },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <div className="flex min-h-screen">
      {/* Cinematic Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-card flex flex-col sticky top-0 h-screen overflow-hidden">
        {/* Brand Identity */}
        <div className="p-10 border-b border-white/5 group bg-gradient-to-b from-white/[0.02] to-transparent">
          <Link to="/" className="flex items-center gap-4 group-hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-none rotate-45 group-hover:rotate-90 transition-transform duration-700">
              <span className="text-black text-xl font-serif font-bold -rotate-45 group-hover:-rotate-90 transition-transform duration-700">M</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-[0.3em] uppercase text-white leading-none mb-1">MH Marble</h1>
              <p className="text-[9px] text-accent tracking-[0.2em] uppercase font-sans font-bold opacity-60">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Navigation Registry */}
        <nav className="flex-1 px-6 py-12 space-y-2 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center justify-between px-6 py-4 transition-all duration-500 rounded-none relative overflow-hidden",
                  isActive 
                    ? "text-white bg-white/[0.03] border-l-2 border-accent" 
                    : "text-white/40 hover:text-white hover:bg-white/[0.01]"
                )}
              >
                <div className="flex items-center gap-5 z-10">
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors duration-500",
                    isActive ? "text-accent" : "text-white/20 group-hover:text-white/40"
                  )} />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase">{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-accent text-black text-[9px] font-black px-2 py-0.5 rounded-none z-10">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Curator Profile */}
        <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative group">
               {user?.picture ? (
                 <img src={user.picture} alt="" className="w-12 h-12 rounded-none border border-white/10 group-hover:border-accent transition-colors grayscale" />
               ) : (
                 <div className="w-12 h-12 bg-white/5 text-white/40 flex items-center justify-center text-xs font-bold border border-white/10 group-hover:border-accent transition-all">
                   {user?.name?.[0] || 'C'}
                 </div>
               )}
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent border-2 border-[#080808] flex items-center justify-center">
                 <ShieldCheck className="w-2.5 h-2.5 text-black" />
               </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-bold text-white uppercase tracking-wider truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[9px] text-white/30 truncate uppercase tracking-widest">{user?.email || 'System Management'}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 py-4 text-[9px] font-black uppercase tracking-[0.4em] border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 transition-all duration-500 group"
          >
            <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Exit Admin Session
          </button>
        </div>
      </aside>

      {/* Primary Workspace */}
      <main className="flex-1 flex flex-col bg-background relative overflow-hidden">
        {/* Perspective Background - Organic Glow */}
        <div className="absolute inset-0 bg-gradient-sepia pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,142,88,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

        {/* Workspace Utility Bar */}
        <header className="h-24 border-b border-white/5 px-12 flex items-center justify-between bg-background/40 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-4 text-white/30 group cursor-pointer hover:text-white transition-colors duration-500">
               <Search className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Command Center</span>
             </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em]">Vault Status</span>
                <span className="text-[8px] text-white/40 uppercase tracking-[0.2em]">Operational · Secure</span>
              </div>
              <div className="w-2 h-2 bg-accent animate-pulse shadow-[0_0_10px_rgba(229,142,88,0.5)]" />
            </div>
            <div className="w-px h-8 bg-white/5" />
            <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
              <Bell className="w-5 h-5 text-white/40" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500" />
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-12 lg:p-20 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      </div>
    </div>
  );
};

export default AdminLayout;
