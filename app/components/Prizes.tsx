"use client";

import React from "react";
import PageSection from "../hooks/PageSection";
import ArcadeHeader from "./ui/ArcadeHeader";
import PrizeCard from "./ui/PrizeCard";
import { Trophy, Medal, Award } from "lucide-react";

const Prizes: React.FC = () => {
  return (
    <PageSection id="prizes" className="overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Background Decorations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none select-none overflow-hidden">
          <div className="grid grid-cols-10 gap-x-12 opacity-40 font-mono text-green-500 text-[10px]">
            {Array.from({ length: 100 }).map((_, i) => (
              <span key={i}>{Math.random() > 0.5 ? "1" : "0"}</span>
            ))}
          </div>
        </div>

        <div className="mb-24">
          <ArcadeHeader text="Prizes" />
        </div>

        {/* Podium Layout - Vertical Column on Mobile, Flex Row on Desktop */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-12 md:gap-8 w-5/6 md:w-full mx-auto lg:gap-16">
          {/* 2nd Runner Up (3rd Place) */}
          <div className="order-3 md:order-1 w-full md:w-auto">
            <PrizeCard
              rank="2nd Runner Up"
              totalPrize="₹25,000"
              cashPrize="₹10,000"
              winner="Vibe Coders"
              icon={Medal}
              color="#CD7F32" // Bronze
              delay={0.4}
            />
          </div>

          {/* Winner (1st Place) */}
          <div className="order-1 md:order-2 w-full md:w-auto">
            <PrizeCard
              rank="Winner"
              totalPrize="₹50,000"
              cashPrize="₹25,000"
              winner="Nalayak"
              icon={Trophy}
              color="#FFD700" // Gold
              isMain={true}
              delay={0.2}
            />
          </div>

          {/* 1st Runner Up (2nd Place) */}
          <div className="order-2 md:order-3 w-full md:w-auto">
            <PrizeCard
              rank="1st Runner Up"
              totalPrize="₹35,000"
              cashPrize="₹15,000"
              winner="Rule Breakers"
              icon={Medal}
              color="#C0C0C0" // Silver
              delay={0.6}
            />
          </div>
        </div>

        {/* Section Footer */}
        <div className="mt-24 text-center">
          {/* Placeholder text removed as requested */}
        </div>
      </div>
    </PageSection>
  );
};

export default Prizes;
