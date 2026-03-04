import { PageLayout } from '@/components/PageLayout';
import { Contact } from '@/components/Contact';

const ConciergePage = () => {
    return (
        <PageLayout
            title="Personal Concierge."
            subtitle="Bespoke Consultation"
        >
            <div className="space-y-48">
                <Contact />
                <div className="bg-[#0A0A0A] text-white p-32 text-center rounded-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-5xl font-light italic mb-8 relative z-10">Experience the Extraordinary.</h3>
                    <p className="text-white/40 max-w-2xl mx-auto italic mb-12 relative z-10">
                        Our master stone curators are available for private consultations
                        at our Hyderabad gallery or via digital video concierge.
                    </p>
                    <button className="bg-accent text-white h-20 px-16 font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-700 relative z-10">
                        SCHEDULE CONSULTATION
                    </button>
                </div>
            </div>
        </PageLayout>
    );
};

export default ConciergePage;
