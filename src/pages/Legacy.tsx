import { PageLayout } from '@/components/PageLayout';
import { WhyUs } from '@/components/WhyUs';

const LegacyPage = () => {
    return (
        <PageLayout
            title="The Legacy."
            subtitle="History & Soul"
        >
            <div className="space-y-16 md:space-y-32 lg:space-y-48">
                <WhyUs />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-center">
                    <div className="aspect-[4/5] bg-neutral-200 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1200" alt="Legacy" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-6 md:space-y-12">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-light italic">Generations of Craft.</h3>
                        <p className="text-base md:text-lg lg:text-xl text-primary/60 leading-relaxed italic">
                            Founded in 1980 by master stone-carvers, MH Marble has evolved into
                            an international destination for architectural visionaries. Our commitment
                            remains unchanged: Selecting the soul of the earth for your sanctuary.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default LegacyPage;
