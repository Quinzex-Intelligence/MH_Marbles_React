import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

interface PageLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function PageLayout({ children, title, subtitle }: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-[#FAFAF5]">
            <Header />
            <main className="pt-48 pb-32">
                <div className="container mx-auto px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-32 max-w-4xl"
                    >
                        <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-accent mb-6 block">{subtitle}</span>
                        <h1 className="text-7xl md:text-9xl font-light text-primary leading-tight tracking-tight italic">
                            {title.split(' ')[0]} <br />
                            <span className="not-italic font-medium">{title.split(' ').slice(1).join(' ')}</span>
                        </h1>
                    </motion.div>
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
