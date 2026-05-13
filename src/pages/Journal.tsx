import React, { useEffect, useRef, useState } from 'react';
import SEO from '@/components/SEO';
import { PageLayout } from '@/components/PageLayout';
import { Reviews } from '@/components/Reviews';
import { useGallery } from '@/contexts/GalleryContext';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Image as ImageIcon, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ─── Component: ImageMagnifier ────────────────────────────────────────────────
const ImageMagnifier = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    const [showLens, setShowLens] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Dynamic motion values for smooth tracking
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);

    // Spring physics for buttery smooth damping
    const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Map motion values to background position percentages (TOP LEVEL HOOKS)
    const bgPosX = useTransform(smoothX, v => `${v}%`);
    const bgPosY = useTransform(smoothY, v => `${v}%`);
    const lensX = useTransform(smoothX, v => `${v}%`);
    const lensY = useTransform(smoothY, v => `${v}%`);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        
        // Calculate percentage across the container
        const xPercent = ((e.clientX - left) / width) * 100;
        const yPercent = ((e.clientY - top) / height) * 100;
        
        mouseX.set(xPercent);
        mouseY.set(yPercent);
    };

    return (
        <div 
            ref={containerRef}
            className={cn("relative overflow-hidden cursor-none h-full w-full bg-foreground/5", className)}
            onMouseEnter={() => setShowLens(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setShowLens(false)}
        >
            <img src={src} alt={alt} className="w-full h-full object-cover transition-opacity duration-500" />
            
            <AnimatePresence>
                {showLens && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 pointer-events-none z-20"
                    >
                        <motion.div 
                            className="absolute inset-0 border border-[#C8A96E]/20"
                            style={{
                                backgroundImage: `url(${src})`,
                                backgroundPositionX: bgPosX,
                                backgroundPositionY: bgPosY,
                                backgroundSize: '220%', // Slightly reduced for better clarity
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                        
                        {/* Custom Lens UI (Follower) */}
                        <motion.div 
                            className="absolute w-40 h-40 rounded-full border border-[#C8A96E] shadow-2xl pointer-events-none z-30 flex items-center justify-center bg-[#C8A96E]/5 backdrop-blur-[2px]"
                            style={{
                                left: lensX,
                                top: lensY,
                                x: "-50%",
                                y: "-50%",
                            }}
                        >
                             <div className="w-1 h-1 bg-[#C8A96E] rounded-full opacity-50" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {!showLens && (
                <div className="absolute top-8 right-8 mix-blend-difference pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">Exploration Lens</span>
                </div>
            )}
        </div>
    );
};

// ─── YouTube Helpers ────────────────────────────────────────────────────────
const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/|live\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

const extractYoutubeUrl = (text: string) => {
    if (!text) return null;
    const ytRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))/;
    const match = text.match(ytRegex);
    return match ? match[0] : null;
};

// ─── Component: YouTubePlayer ──────────────────────────────────────────────
const YouTubePlayer = ({ videoId, entryId }: { videoId: string; entryId: string | number }) => {
    const [player, setPlayer] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {
        let internalPlayer: any = null;
        
        const initPlayer = () => {
            if (!(window as any).YT || !(window as any).YT.Player) return;
            
            internalPlayer = new (window as any).YT.Player(`player-${entryId}`, {
                videoId: videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    mute: 1,
                    modestbranding: 1,
                    rel: 0,
                    iv_load_policy: 3,
                    playsinline: 1,
                    enablejsapi: 1
                },
                events: {
                    onReady: (event: any) => {
                        setPlayer(event.target);
                        playerRef.current = event.target;
                        event.target.mute();
                    },
                    onStateChange: (event: any) => {
                        setIsPlaying(event.data === (window as any).YT.PlayerState.PLAYING);
                    }
                }
            });
        };

        if (!(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            (window as any).onYouTubeIframeAPIReady = initPlayer;
        } else {
            initPlayer();
        }

        return () => {
            if (internalPlayer && internalPlayer.destroy) internalPlayer.destroy();
        };
    }, [videoId, entryId]);

    // Intersection Observer for Autoplay
    useEffect(() => {
        if (!player) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                player.playVideo();
            } else {
                player.pauseVideo();
            }
        }, { threshold: 0.5 });

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [player]);

    // Progress Tracking
    useEffect(() => {
        let interval: any;
        if (isPlaying && player) {
            interval = setInterval(() => {
                if (player.getCurrentTime && player.getDuration) {
                    const current = player.getCurrentTime();
                    const total = player.getDuration();
                    if (total > 0) setProgress((current / total) * 100);
                }
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isPlaying, player]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!player) return;
        if (isPlaying) player.pauseVideo();
        else player.playVideo();
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!player) return;
        if (isMuted) {
            player.unMute();
            setIsMuted(false);
        } else {
            player.mute();
            setIsMuted(true);
        }
    };

    return (
        <div ref={containerRef} className="relative w-full h-full group bg-black overflow-hidden">
            {/* Scaled Player to hide YouTube UI edges (Share, Logo, etc) */}
            <div 
                id={`player-${entryId}`} 
                className="absolute inset-0 w-full h-full pointer-events-none scale-[1.35] origin-center" 
            />
            
            {/* Interaction Shield - prevents clicking hidden YT elements */}
            <div className="absolute inset-0 z-[5] cursor-default" onClick={togglePlay} />

            {/* Custom Premium Controls Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none">
                <div className="flex items-center gap-8 pointer-events-auto">
                    <button 
                        onClick={togglePlay} 
                        className="text-white hover:text-[#C8A96E] transition-colors duration-300"
                    >
                        {isPlaying ? <Pause size={28} strokeWidth={1.5} /> : <Play size={28} strokeWidth={1.5} fill="currentColor" />}
                    </button>
                    
                    <div 
                        className="flex-1 h-[2px] bg-white/10 relative overflow-hidden rounded-full backdrop-blur-sm cursor-pointer group/progress"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!player || !player.getDuration) return;
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const percentage = x / rect.width;
                            const newTime = player.getDuration() * percentage;
                            player.seekTo(newTime, true);
                            setProgress(percentage * 100);
                        }}
                    >
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-[#C8A96E] group-hover/progress:h-full transition-all" 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        />
                        {/* Hover Glow Effect */}
                        <div className="absolute top-0 left-0 h-full bg-white/20 opacity-0 group-hover/progress:opacity-100 transition-opacity" style={{ width: `${progress}%` }} />
                    </div>
                    
                    <button 
                        onClick={toggleMute} 
                        className="text-white hover:text-[#C8A96E] transition-colors duration-300"
                    >
                        {isMuted ? <VolumeX size={24} strokeWidth={1.5} /> : <Volume2 size={24} strokeWidth={1.5} />}
                    </button>
                </div>
                
                {/* Visual Accent */}
                <div className="mt-4 flex justify-between items-center opacity-40">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Interactive Archive</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">MH Marble Tour</span>
                </div>
            </div>

            {/* Hint Overlay when not hovered */}
            <div className="absolute top-8 left-8 opacity-40 group-hover:opacity-0 transition-opacity duration-500 z-0">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/60">Cinematic Broadcast</span>
            </div>
        </div>
    );
};

// ─── Component: JournalEntryCard ──────────────────────────────────────────────
const JournalEntryCard = ({ entry, index }: { entry: any; index: number }) => {
    const initialImage = entry.image_urls && entry.image_urls.length > 0 ? entry.image_urls[0] : '';
    const [activeImage, setActiveImage] = useState(initialImage);

    // Robust Video Detection
    const detectedYtUrl = entry.ytUrl || extractYoutubeUrl(entry.description);
    const videoId = detectedYtUrl ? getYouTubeId(detectedYtUrl) : null;

    useEffect(() => {
        if (entry.image_urls?.length) {
            setActiveImage(entry.image_urls[0]);
        }
    }, [entry]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center group">
            {/* Media Side */}
            <div className={`col-span-1 lg:col-span-8 overflow-hidden bg-foreground/5 shadow-2xl ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="flex flex-col gap-1">
                    {/* Primary Media */}
                    <div className="aspect-video w-full relative">
                        {videoId ? (
                            <YouTubePlayer videoId={videoId} entryId={entry.id} />
                        ) : activeImage ? (
                            <ImageMagnifier 
                                src={activeImage} 
                                alt={entry.title} 
                                className="absolute inset-0 w-full h-full"
                            />
                        ) : (
                            <div className="absolute inset-0 w-full h-full bg-foreground/[0.03] flex items-center justify-center">
                                <span className="text-[10px] uppercase font-black tracking-widest text-foreground/20">Visual record synchronizing...</span>
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    {entry.image_urls && entry.image_urls.length > 1 && (
                        <div className="grid grid-cols-5 gap-1">
                            {entry.image_urls.slice(0, 10).map((url: string, i: number) => (
                                <div 
                                    key={i} 
                                    onClick={() => setActiveImage(url)}
                                    className={cn(
                                        "aspect-square relative overflow-hidden bg-foreground/5 cursor-pointer transition-all duration-500",
                                        activeImage === url ? "ring-1 ring-inset ring-[#C8A96E]/60 opacity-100" : "opacity-40 hover:opacity-100 grayscale-[60%] hover:grayscale-0"
                                    )}
                                >
                                    <img 
                                        src={url} 
                                        alt={`Thumbnail ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Text Side */}
            <div className={`col-span-1 lg:col-span-4 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-1 lg:text-right md:items-end' : ''}`}>
                <div className="flex flex-col space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#C8A96E] block">
                        Case Study // {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight leading-[1.1] text-foreground group-hover:text-[#C8A96E] transition-colors duration-500 italic">
                        {entry.title}
                    </h3>
                    <div className="w-12 h-px bg-accent/30 hidden lg:block" />
                    <p className="text-sm md:text-base font-sans font-light text-foreground/50 leading-relaxed max-w-lg">
                        {entry.description}
                    </p>

                </div>
            </div>
        </div>
    );
};

const JournalPage: React.FC = () => {
    const { journal } = useGallery();
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const quotesRef = useRef<(HTMLHeadingElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Editorial Parallax
            imagesRef.current.forEach((img, i) => {
                if (!img) return;
                gsap.to(img, {
                    yPercent: -20 * (i + 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // Entry Entrance
            const entries = document.querySelectorAll('.journal-entry');
            entries.forEach((entry) => {
                gsap.fromTo(entry,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0,
                        duration: 1.5,
                        scrollTrigger: {
                            trigger: entry,
                            start: "top 85%"
                        }
                    }
                );
            });
        });

        return () => ctx.revert();
    }, [journal]);

    return (
        <>
            <SEO 
                title="Journal — MH MARBLE | Stones Through Time"

                description="Explore our architectural journal, documenting the transformation of raw stone into timeless spaces. A narrative of craftsmanship and modern vision."
                breadcrumbs={[
                    { name: 'Home', item: '/' },
                    { name: 'Journal', item: '/journal' }
                ]}
            />

            <PageLayout>
                <div className="min-h-screen bg-background text-foreground">

                    {/* Experimental Hero Section */}
                    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden border-b border-foreground/5">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-repeat" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")` }} />
                        </div>
                        
                        <div className="w-full max-w-none px-6 md:px-[8%] relative z-10">
                            <div className="flex flex-col items-center justify-center text-center space-y-8 mb-40 md:mb-64">
                                <span className="text-[10px] md:text-xs font-sans font-black tracking-[1em] uppercase text-[#C8A96E]">Chronicle</span>
                                <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-light leading-[0.8] tracking-tighter text-foreground">
                                    Stone <span className="italic text-foreground/30">&</span> <br />
                                    Time.
                                </h1>
                            </div>

                            <div className="relative w-full h-[150vh] md:h-[200vh]">
                                <div className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[90%] md:w-[40%] aspect-square z-10 p-4 border border-foreground/5">
                                    <div className="w-full h-full overflow-hidden">
                                        <img 
                                            ref={el => imagesRef.current[0] = el}
                                            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200" 
                                            alt="Architectural space" 
                                            className="w-full h-full object-cover grayscale opacity-80"
                                        />
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 bg-[#C8A96E] text-background p-8 md:p-12 z-20">
                                        <span className="text-[9px] font-black uppercase tracking-[0.5em] block">Volume XXI</span>
                                        <span className="text-3xl font-serif italic mt-2 block">Heritage.</span>
                                    </div>
                                </div>
                                <div className="absolute top-[35%] left-[5%] md:left-[10%] z-30 mix-blend-difference pointer-events-none">
                                    <h2 className="text-6xl md:text-[8rem] font-serif font-light text-[#C8A96E] leading-[0.8] mix-blend-difference">
                                        Beyond<br/>
                                        <span className="text-foreground italic">Form.</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Dynamic Journal Entries */}
                    <section className="py-24 bg-background">
                        <div className="max-w-[1800px] mx-auto px-6 md:px-[8%]">
                            {journal.length > 0 ? (
                                <div className="space-y-32">
                                    {journal.map((entry, index) => (
                                        <div key={entry.id} className="journal-entry">
                                            <JournalEntryCard entry={entry} index={index} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 border-t border-b border-foreground/5">
                                    <span className="text-[10px] uppercase font-black tracking-[0.5em] text-foreground/30 italic">Archives currently synchronizing with the vision...</span>
                                </div>
                            )}
                        </div>
                    </section>



                </div>
            </PageLayout>
        </>
    );
};

export default JournalPage;
