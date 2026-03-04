import { PageLayout } from '@/components/PageLayout';
import { Reviews } from '@/components/Reviews';

const JournalPage = () => {
    return (
        <PageLayout
            title="The Journal."
            subtitle="Voices of Vision"
        >
            <div className="space-y-48">
                <Reviews />
                <div className="max-w-4xl mx-auto text-center border-t border-black/5 pt-32">
                    <span className="text-[10px] font-bold tracking-[0.6em] text-accent uppercase mb-8 block">Be Part of the Story</span>
                    <h3 className="text-5xl font-light italic mb-12">Submit Your Architectural Narrative.</h3>
                    <p className="text-primary/40 italic mb-16 px-12">
                        We are always looking to feature the extraordinary ways our stones have transformed
                        living spaces. Connect with our concierge to share your project.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
};

export default JournalPage;
