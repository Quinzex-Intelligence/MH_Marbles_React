import { PageLayout } from '@/components/PageLayout';
import { motion } from 'framer-motion';

const Atelier = () => {
    return (
        <PageLayout title="The Atelier." subtitle="The Craft of Precision">
            <section className="py-16 md:py-32 lg:py-48 bg-background">
                <div className="container mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <span className="text-[10px] font-bold text-accent tracking-[0.8em] uppercase mb-8 block">Phase 01</span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-foreground italic mb-6 md:mb-12">The Selection.</h2>
                            <p className="text-xl text-foreground/60 leading-loose italic max-w-lg">
                                Our master curators journey to the earth's deepest veins.
                                Only 1 in 1000 slabs meets the structural integrity and
                                chromatic purity required for the MH Marbles signature.
                            </p>
                        </motion.div>
                        <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200"
                                alt="Quarry Selection"
                                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-1000 scale-110"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center mt-16 md:mt-32 lg:mt-64">
                        <div className="aspect-[3/4] bg-muted relative overflow-hidden order-2 lg:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1200"
                                alt="Diamond Cutting"
                                className="w-full h-full object-cover opacity-60"
                            />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="order-1 lg:order-2"
                        >
                            <span className="text-[10px] font-bold text-accent tracking-[0.8em] uppercase mb-8 block">Phase 02</span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-foreground italic mb-6 md:mb-12 lg:text-right">The Geometry.</h2>
                            <p className="text-base md:text-lg lg:text-xl text-foreground/60 leading-loose italic max-w-lg ml-auto lg:text-right">
                                Using water-jet precision and diamond-tipped mastery,
                                we carve stone to within a fraction of a millimeter.
                                Architecture is the science of the precise.
                            </p>
                        </motion.div>
                    </div>

                    {/* Filling blank space with high-density content */}
                    <div className="mt-16 md:mt-32 lg:mt-64 border-t border-foreground/5 pt-12 md:pt-20 lg:pt-32">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
                            {[
                                { val: "0.01mm", label: "Precision Margin" },
                                { val: "12 Stage", label: "Polishing Process" },
                                { val: "100%", label: "Sustainable Sourcing" },
                                { val: "45 Yrs", label: "Master Craft" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center space-y-4">
                                    <p className="text-2xl md:text-3xl lg:text-4xl font-light italic text-accent">{stat.val}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default Atelier;
