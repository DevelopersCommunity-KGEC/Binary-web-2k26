"use client";

import React from 'react';
import PixelTransition from './PixelTransition';
import ArcadeHeader from './ui/ArcadeHeader';
import PageSection from '../hooks/PageSection';
import { tracks } from './trackData';

const Tracks = () => {
    return (
        <PageSection id="tracks">
            <section className="py-10 md:py-20 text-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-fit">
                    <div className="mb-12">
                        <ArcadeHeader text="Tracks" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center w-5/6 md:w-full mx-auto">
                        {tracks.map((track, index) => (
                            <PixelTransition
                                key={index}
                                firstContent={
                                    <div className="flex flex-col items-center justify-center h-full w-full p-6 group">
                                        <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                                            {track.icon}
                                        </div>
                                        <h3 className="text-xl text-center font-bold text-gray-100">{track.title}</h3>
                                    </div>
                                }
                                secondContent={
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: track.color,
                                            padding: "1.5rem",
                                            gap: "0.5rem"
                                        }}
                                    >
                                        <p className="text-center font-bold text-sm text-black leading-tight">
                                            {track.description}
                                        </p>
                                        {(track.totalPrice || track.cashPrice) && (
                                            <div className="mt-2 text-center">
                                                <p className="text-[10px] uppercase font-black text-black/60 leading-none">Prizes</p>
                                                <p className="font-bold text-lg text-black">
                                                    {track.totalPrice} {track.cashPrice ? `($${track.cashPrice} Cash)` : ''}
                                                </p>
                                            </div>
                                        )}
                                        {/* {track.winnerName && (
                                            <div className="mt-1 text-center border-t border-black/20 pt-1 w-full">
                                                <p className="text-[10px] uppercase font-black text-black/60 leading-none">Winner</p>
                                                <p className="font-bold text-md text-black uppercase">
                                                    {track.winnerName}
                                                </p>
                                            </div>
                                        )} */}
                                    </div>
                                }
                                gridSize={12}
                                pixelColor={track.color}
                                once={false}
                                animationStepDuration={0.4}
                                className="w-full h-80 md:h-64 border border-neutral-800 bg-neutral-900/50 hover:border-green-500/50 transition-colors group"
                                aspectRatio="100%"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </PageSection>
    );
};

export default Tracks;
