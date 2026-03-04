import { PageLayout } from '@/components/PageLayout';
import { ProductCollection } from '@/components/ProductCollection';

const CurationPage = () => {
    return (
        <PageLayout
            title="The Curation."
            subtitle="Architectural Series"
        >
            <div className="space-y-48">
                <ProductCollection />
                <div className="bg-foreground text-background p-24 text-center transition-colors duration-700">
                    <h3 className="text-4xl font-light italic mb-8">Exclusive Architectural Access</h3>
                    <p className="text-background/40 max-w-2xl mx-auto italic">
                        Our curation spans across the most prestigious quarries of the world.
                        Register for private viewings of limited edition slabs.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
};

export default CurationPage;
