"use client";

import PageSection from "@/app/hooks/PageSection";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import ArcadeHeader from "../ui/ArcadeHeader";
import Image, { StaticImageData } from "next/image";
import { sponsors } from "@/app/constants/sponsors";

interface Sponsor {
  logo: string | StaticImageData;
  link?: string;
  alt: string;
  description: string;
}


const SponsorComponent: React.FC<Sponsor> = ({
  logo,
  link = "",
  alt,
  description,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col justify-center items-center group gap-2"
    >
      <Image
        src={logo}
        alt={alt}
        width={500}
        height={500}
        className="w-32 h-16 sm:w-48 sm:h-24 md:w-56 md:h-28 object-contain drop-shadow-[0_5px_10px_rgba(14,180,32,0.5)] transition-transform duration-300 group-hover:scale-105"
      />
      <span className='text-white font-pixelate text-xs md:text-sm opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-wider text-center'>
        {description}
      </span>
    </a>
  );
};

const Sponsors = () => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    // Flatten all sponsors from all tiers for mobile marquee
    const allSponsors = sponsors.flatMap(tier => tier.sponsors);
    const midpoint = Math.ceil(allSponsors.length / 2);
    const row1 = allSponsors.slice(0, midpoint);
    const row2 = allSponsors.slice(midpoint);

    return (
        <PageSection id="sponsors" className={isMobile ? `min-h-fit mt-20` : 'mt-28'}>
            <section className="min-h-fit w-full relative">
                <div className="flex flex-col h-full">
                    <div className="mb-12">
                        <ArcadeHeader text="Sponsors" />
                    </div>
                </div>

                <div className="flex flex-col gap-20 pb-16 w-full">
                    {sponsors.map((tier) => (
                        <div key={tier.title} className="flex flex-col items-center w-full">
                            <h3 className="mb-10 text-center text-xl md:text-2xl font-bold uppercase tracking-[0.3em] font-pixelate text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] px-4">
                                {tier.title}
                            </h3>
                            <div className={`w-full max-w-7xl mx-auto px-4 sm:px-12 grid grid-cols-2 ${!isMobile ? (tier.title === 'Giga Sponsor' ? 'md:grid-cols-3' : 'md:grid-cols-4') : ''} gap-y-16 gap-x-6 justify-items-center`}>
                                {tier.sponsors.map((sponsor, index) => {
                                    const isLastOdd = isMobile && tier.sponsors.length % 2 !== 0 && index === tier.sponsors.length - 1;
                                    return (
                                        <div 
                                            key={index} 
                                            className={`w-full flex justify-center items-center ${isLastOdd ? 'col-span-2' : ''}`}
                                        >
                                            <SponsorComponent {...sponsor} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PageSection>
    );
};

export default Sponsors;
