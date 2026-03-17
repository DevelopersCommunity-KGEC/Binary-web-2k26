"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface PrizeCardProps {
  rank: string;
  totalPrize: string;
  cashPrize: string;
  winner: string;
  icon: LucideIcon;
  color?: string;
  isMain?: boolean;
  delay?: number;
}

const PrizeCard: React.FC<PrizeCardProps> = ({
  rank,
  totalPrize,
  cashPrize,
  winner,
  icon: Icon,
  color = "#00ff41",
  isMain = false,
  delay = 0,
}) => {
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        delay: delay,
      },
    },
    hover: {
      y: -15,
      scale: 1.02,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 20,
      },
    },
    tap: { scale: 0.98 },
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3 } },
  };

  const scanlineVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 0.1, transition: { duration: 0.3 } },
  };

  const innerIconVariants = {
    initial: { rotate: -45 },
    animate: { rotate: -45 },
    hover: {
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 15 },
    },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 45 },
    animate: { scale: 1, rotate: 45 },
    hover: {
      scale: 1.1,
      rotate: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 15 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      whileTap="tap"
      viewport={{ once: true }}
      className={cn(
        "relative group flex flex-col items-center shrink-0 w-full mx-auto md:w-72 lg:w-72",
        isMain && "md:w-80 lg:w-80",
      )}
    >
      {/* Medal Icon Container - Elevated Z-index */}
      <div className="relative z-30 -mb-8">
        <motion.div
          variants={iconVariants}
          className="p-4 bg-black border-2 rounded-sm"
          style={{
            borderColor: color,
            boxShadow: `0 0 20px ${color}44`,
          }}
        >
          <motion.div
            variants={innerIconVariants}
            className="flex items-center justify-center"
          >
            <Icon size={isMain ? 48 : 36} style={{ color }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Main Card Body */}
      <div
        className={cn(
          "w-full bg-black/90 border-2 pt-14 pb-10 px-6 flex flex-col gap-6 relative overflow-hidden transition-colors duration-300",
          isMain ? "h-[460px]" : "h-[420px]",
        )}
        style={{
          borderColor: color,
          boxShadow: `inset 0 0 30px ${color}11`,
        }}
      >
        {/* Arcade Rivets / Corner Brackets */}
        <div
          className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 z-20"
          style={{ borderColor: color }}
        />
        <div
          className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 z-20"
          style={{ borderColor: color }}
        />
        <div
          className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 z-20"
          style={{ borderColor: color }}
        />
        <div
          className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 z-20"
          style={{ borderColor: color }}
        />

        {/* Scanline / CRT Effect Overlay - Synchronized with variants */}
        <motion.div
          variants={scanlineVariants}
          className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] transform translateZ(0)"
        />

        {/* Decorative Binary/Code elements */}
        <div
          className="absolute top-6 right-6 opacity-30 font-mono text-xs select-none pointer-events-none"
          style={{ color }}
        >
          {"{1 0}"}
        </div>

        {/* Sub-header Banner */}
        <div className="absolute top-12 -right-2 w-4/5 z-20">
          <div
            className="py-1.5 px-6 skew-x-[-20deg] flex justify-center items-center relative overflow-hidden"
            style={{ backgroundColor: color }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
            <span className="relative skew-x-[20deg] text-black font-press-start text-[10px] md:text-xs uppercase font-black tracking-wider">
              {rank}
            </span>
          </div>
        </div>

        {/* Prize Info */}
        <div className="mt-10 flex flex-col gap-8 flex-grow relative z-10">
          <div className="flex flex-col gap-2">
            <p
              className="text-[11px] uppercase font-black tracking-[0.3em] opacity-80"
              style={{ color }}
            >
              Total Prize
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-press-start text-xl md:text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                {totalPrize}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p
              className="text-[11px] uppercase font-black tracking-[0.3em] opacity-80"
              style={{ color }}
            >
              Cash Prize
            </p>
            <p
              className="font-press-start text-lg md:text-xl"
              style={{ color }}
            >
              {cashPrize}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: color }}
              />
              <p className="text-[12px] md:text-[13px] uppercase font-black tracking-widest text-white/90">
                Swags & Benefits
              </p>
            </div>
            <p
              className="text-[10px] font-mono opacity-50 uppercase"
              style={{ color }}
            >
              + Sponsor Benefits included
            </p>
          </div>
        </div>

        {/* Bottom Intentifier Glow - Synchronized */}
        <motion.div
          variants={glowVariants}
          className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${color}22 0%, transparent 100%)`,
          }}
        />

        {/* Glowing Border effect - Synchronized */}
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 border-2 pointer-events-none blur-[1px] z-10"
          style={{
            borderColor: color,
            boxShadow: `0 0 25px ${color}33, inset 0 0 15px ${color}22`,
          }}
        />
      </div>
    </motion.div>
  );
};

export default PrizeCard;
