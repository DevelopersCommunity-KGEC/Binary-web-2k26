"use client";
import { useState } from 'react';
import { Marquee } from "./magicui/marquee";
import ArcadeHeader from './ui/ArcadeHeader';
import PageSection from '../hooks/PageSection';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { pixelifySans } from '@/app/utils/pixelifySans.utils';
import { judges } from '../constants/judges';

import './TeamCard.css';

const TeamMemberCard = ({ imageUrl, name, position, linkedinUrl }: any) => {
    return (
        <div className="team-card group">
            <div className="team-card-corner top-left"></div>
            <div className="team-card-corner bottom-right"></div>
            <img src={imageUrl || "/placeholder.svg"} alt={name} />

            <div className="team-card-content">
                <h3>{name}</h3>
                <p>{position}</p>

                <ul className="team-socials">
                    {linkedinUrl && (
                        <li>
                            <a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.738-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

const Judges = () => {
    const isMobile = useMediaQuery("(max-width: 767px)");

    // Split for marquee lines
    const third = Math.ceil(judges.length / 3);
    const firstColumn = judges.slice(0, third);
    const secondColumn = judges.slice(third, third * 2);
    const thirdColumn = judges.slice(third * 2);

    return (
        <PageSection
            id="judges"
            className={isMobile ? `min-h-fit` : ""}
        >
            <section className="relative overflow-hidden bg-black text-white pt-10 pb-20">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center filter select-none pointer-events-none mb-16">
                    <ArcadeHeader text="Judges" />
                </div>

                {/* Team marquee - Slower animations */}
                {/* Desktop Layout - Vertical Columns */}
                <div className="mt-0 hidden md:flex justify-center gap-6 lg:gap-10 xl:gap-20 max-h-[800px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                    <div className="hidden lg:block">
                        <Marquee pauseOnHover vertical className="[--duration:45s]">
                            {firstColumn.map((member) => (
                                <div key={member.name} className="py-4">
                                    <TeamMemberCard
                                        {...member}
                                        highlightDirection="tr-bl"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    </div>

                    <div className="hidden md:block">
                        <Marquee reverse pauseOnHover vertical className="[--duration:45s]">
                            {secondColumn.map((member) => (
                                <div key={member.name} className="py-4">
                                    <TeamMemberCard
                                        {...member}
                                        highlightDirection="tl-br"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    </div>

                    <div>
                        <Marquee pauseOnHover vertical className="[--duration:45s]">
                            {thirdColumn.map((member) => (
                                <div key={member.name} className="py-4">
                                    <TeamMemberCard
                                        {...member}
                                        highlightDirection="tr-bl"
                                    />
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>

                {/* Mobile Layout - Horizontal Marquee */}
                <div className="mt-10 md:hidden block overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <Marquee pauseOnHover className="[--duration:45s]">
                        {judges.map((member) => (
                            <div key={member.name} className="px-4">
                                <TeamMemberCard
                                    {...member}
                                    highlightDirection="tr-bl"
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </section>
        </PageSection>
    );
};

export default Judges;
