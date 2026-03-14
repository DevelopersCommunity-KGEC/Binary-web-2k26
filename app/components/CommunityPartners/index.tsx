"use client";

import React from "react";
import { communityPartnersItems } from "@/app/constants/communityPartners";
import Image from "next/image";
import PageSection from "@/app/hooks/PageSection";
import ArcadeHeader from "../ui/ArcadeHeader";
import styled from "styled-components";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import Marquee from "react-fast-marquee";

interface MemberComponentProps {
    url: string;
    imageUrl: string;
    isSmall?: boolean;
}

const Section = styled.section<{ theme: { body: string } }>`
  min-height: fit-content;
  width: full;
  background-color: ${(props) => props.theme.body};
  position: relative;
`;

const MemberComponent: React.FC<MemberComponentProps> = ({
    url = "",
    imageUrl = "",
    isSmall = false,
}) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center"
        >
            <Image
                src={imageUrl}
                alt="Community Partner"
                width={500}
                height={500}
                className={`w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 object-contain drop-shadow-[0_5px_10px_rgba(14,180,32,0.5)] transition-transform duration-300 ${isSmall ? 'scale-75' : ''}`}
            />
        </a>
    );
};

const CommunityPartners = () => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    // Split items into two rows for marquee
    const midpoint = Math.ceil(communityPartnersItems.length / 2);
    const row1 = communityPartnersItems.slice(0, midpoint);
    const row2 = communityPartnersItems.slice(midpoint);

    return (
        <PageSection id="community-partners" className={isMobile ? `min-h-fit` : ''}>
            <Section>
                <div className="flex flex-col h-full">
                    <div className="mb-12">
                        <ArcadeHeader text="Community Partners" />
                    </div>
                </div>

                {isMobile ? (
                    // Mobile: two marquee rows going opposite directions
                    <div className="w-full flex flex-col gap-6 pb-10">
                        <Marquee
                            gradient={false}
                            speed={40}
                            pauseOnHover={true}
                            direction="left"
                        >
                            <div className="flex flex-row gap-8 items-center px-4">
                                {row1.map((item, index) => (
                                    <div key={index} className="flex-shrink-0">
                                        <MemberComponent
                                            url={item.url}
                                            imageUrl={item.imageUrl}
                                            isSmall={(item as any).isSmall}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Marquee>
                        <Marquee
                            gradient={false}
                            speed={40}
                            pauseOnHover={true}
                            direction="right"
                        >
                            <div className="flex flex-row gap-8 items-center px-4">
                                {row2.map((item, index) => (
                                    <div key={index} className="flex-shrink-0">
                                        <MemberComponent
                                            url={item.url}
                                            imageUrl={item.imageUrl}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Marquee>
                    </div>
                ) : (
                    // Desktop: 4 logos in a row
                    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen grid grid-cols-4 gap-y-12 gap-x-6 px-12 pb-16">
                        {communityPartnersItems.map((item, index) => (
                            <div className="flex justify-center items-center" key={index}>
                                <MemberComponent
                                    url={item.url}
                                    imageUrl={item.imageUrl}
                                    isSmall={(item as any).isSmall}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </Section>
        </PageSection>
    );
};

export default CommunityPartners;
