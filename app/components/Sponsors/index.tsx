"use client";

import PageSection from "@/app/hooks/PageSection";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import ArcadeHeader from "../ui/ArcadeHeader";
import Image, { StaticImageData } from "next/image";
import Marquee from "react-fast-marquee";
import styled from "styled-components";
import { sponsors } from "@/app/constants/sponsors";

interface Sponsor {
  logo: string | StaticImageData;
  link?: string;
  alt: string;
  description: string;
}

const Section = styled.section<{ theme: { body: string } }>`
  min-height: fit-content;
  width: 100%;
  background-color: ${(props) => props.theme.body};
  position: relative;
`;

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
            <Section>
                <div className="flex flex-col h-full">
                    <div className="mb-12">
                        <ArcadeHeader text="Sponsors" />
                    </div>
                </div>

                {isMobile ? (
                    // Mobile: two marquee rows moving in opposite directions
                    <div className="w-full flex flex-col gap-10 pb-10">
                        <Marquee
                            gradient={false}
                            speed={45}
                            pauseOnHover={true}
                            direction="left"
                        >
                            <div className="flex flex-row gap-12 items-center px-4">
                                {row1.map((sponsor, index) => (
                                    <div key={index} className="flex-shrink-0">
                                        <SponsorComponent {...sponsor} />
                                    </div>
                                ))}
                            </div>
                        </Marquee>
                        <Marquee
                            gradient={false}
                            speed={45}
                            pauseOnHover={true}
                            direction="right"
                        >
                            <div className="flex flex-row gap-12 items-center px-4">
                                {row2.map((sponsor, index) => (
                                    <div key={index} className="flex-shrink-0">
                                        <SponsorComponent {...sponsor} />
                                    </div>
                                ))}
                            </div>
                        </Marquee>
                    </div>
                ) : (
                    // Desktop: Tier-wise 4-column grid with robust full-width centering
                    <div className="flex flex-col gap-20 pb-16 w-full">
                        {sponsors.map((tier) => (
                            <div key={tier.title} className="flex flex-col items-center w-full">
                                <h3 className="mb-10 text-center text-2xl font-bold uppercase tracking-[0.3em] font-pixelate text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                                    {tier.title}
                                </h3>
                                <div className={`w-screen grid ${tier.title === 'Giga Sponsor' ? 'grid-cols-3' : 'grid-cols-4'} justify-items-center gap-y-16 gap-x-6 px-12`}>
                                    {tier.sponsors.map((sponsor, index) => (
                                        <div className="w-full flex justify-center items-center" key={index}>
                                            <SponsorComponent {...sponsor} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Section>
        </PageSection>
    );
};

export default Sponsors;
