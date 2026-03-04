import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';
import { Cpu, Eye, Zap, ShieldCheck } from 'lucide-react';

const Innovation = () => {
    return (
        <PageLayout title="Innovation." subtitle="The Digital Masterpiece">
            <section className="py-16 md:py-32 lg:py-48 bg-background relative overflow-hidden">
                {/* Background Tech pattern to fill space */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="grid grid-cols-12 h-full">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="border-r border-foreground h-full" />
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-8 md:px-12">
                    <div className="max-w-4xl mb-16 md:mb-32 lg:mb-48">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[10px] font-bold text-accent tracking-[0.8em] uppercase mb-8 block"
                        >
                            Visionary Technology
                        </motion.span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-light text-foreground italic leading-none mb-8 md:mb-16">
                            Beyond <br />
                            <span className="not-italic font-medium">Physicality.</span>
                        </h2>
                        <p className="text-base md:text-xl lg:text-2xl text-foreground/60 leading-relaxed font-light italic">
                            We don't just sell stone. We provide the technology to witness
                            its integration before a single brick is laid.
                            Experience architectural precognition.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-24">
                        {[
                            {
                                icon: Eye,
                                title: "Digital Twin Mapping",
                                desc: "Every slab in our gallery is 8K laser-scanned to create a pixel-perfect digital twin for CAD integration."
                            },
                            {
                                icon: Cpu,
                                title: "Interactive VR",
                                desc: "Walk through your residence in full virtual reality, experiencing the grain and light reflection of individual tiles."
                            },
                            {
                                icon: Zap,
                                title: "Structural Analysis",
                                desc: "Using ultrasonic mapping, we reveal internal mineral density to ensure structural longevity for centuries."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Blockchain Legacy",
                                desc: "Each piece comes with an NFT-backed certificate of origin, ensuring provenance and sustainable sourcing trail."
                            }
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-6 md:p-8 lg:p-12 bg-foreground/5 border border-foreground/5 hover:border-accent/30 transition-all duration-700"
                            >
                                <tech.icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-accent mb-6 md:mb-12 stroke-[1px]" />
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-light italic text-foreground mb-3 md:mb-6">{tech.title}</h3>
                                <p className="text-sm md:text-base lg:text-lg text-foreground/40 leading-relaxed font-light italic">{tech.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default Innovation;
