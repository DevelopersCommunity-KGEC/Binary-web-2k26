"use client";
import ArcadeHeader from './ui/ArcadeHeader';
import PageSection from '../hooks/PageSection';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { pixelifySans } from '@/app/utils/pixelifySans.utils';

const Judges = () => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <PageSection
            id="judges"
            className={isMobile ? `min-h-fit` : ""}
        >
            <section className="relative overflow-hidden bg-black text-white">
                <div className="absolute inset-0 pointer-events-none"></div>

                {/* Header */}
                <div className="mx-auto max-w-2xl text-center filter select-none pointer-events-none">
                    <div className="mb-12">
                        <ArcadeHeader text="Judges" />
                    </div>
                </div>

                <div className="w-full flex items-center justify-center py-20 md:py-32">
                    <p className={`text-center text-4xl md:text-4xl font-bold text-white uppercase tracking-widest ${pixelifySans.className}`}>
                        Coming Soon!
                    </p>
                </div>
            </section>
        </PageSection>
    );
};

export default Judges;
