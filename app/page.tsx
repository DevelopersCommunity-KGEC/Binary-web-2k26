"use client";

import { useState } from "react";
import SpaceInvadersLoading from "./components/preloader/SpaceInvadersLoading";
import PixelTransition from "./components/preloader/PixelTransition";

import Gallary from "./components/gallary";
import ScrollFlipCard from "./components/ScrollFlipCard";
import Tracks from "./components/Tracks";
import Mentors from "./components/Mentors";
import Timeline from "./components/Timeline";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import FAQs from "./components/Faq";
import Footer from "./components/Footer";
import CommunityPartners from "./components/CommunityPartners";
import Sponsors from "./components/Sponsors";
import Hero from './components/Hero';
import TetrisInterface from "./components/TetrisInterface";
import GlobalGameButton from "./components/GlobalGameButton";
import { useInView } from 'react-intersection-observer';


export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transitionActive, setTransitionActive] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false); // New State

  const [heroTopRef] = useInView({
    threshold: 0.5,
    triggerOnce: true,
    initialInView: true,
  });

  const handleLoadingComplete = () => {
    // 1. The loading bar finishes.
    // 2. We wait 200ms as requested.
    setTimeout(() => {
      // 3. Switch from Loading Screen to the Transition Overlay
      setIsLoading(false);
      setShowContent(true); 

      // 4. At this point, transitionActive is still TRUE.
      // The pixels are fully covering the screen.
      // We wait for the pixels to start their "closed" animation (reveal).
      setTimeout(() => {
        setTransitionActive(false);
      }, 100); // Small buffer to ensure content is mounted before reveal starts
    }, 200);
  };

  return (
    <>
      <div className="min-h-screen text-white relative overflow-x-hidden">
        {/* The transition overlay always stays on top while active */}
        <PixelTransition isActive={transitionActive} />

        {isLoading ? (
          <SpaceInvadersLoading
            onLoadingComplete={handleLoadingComplete}
            onTransitionChange={setTransitionActive}
          />
        ) : (
          /* Wrap content in a div that handles its own entry if needed */
          <div className={`transition-opacity duration-500 ${transitionActive ? 'opacity-0' : 'opacity-100'}`}>
            <Navbar />
            <Hero heroTopRef={heroTopRef} />
            <AboutSection />
            <Timeline />
            <Tracks />
            <Gallary />
            <Mentors />
            <Sponsors />
            <CommunityPartners />
            <FAQs />
            <Footer />
            <GlobalGameButton />
          </div>
        )}
      </div>
    </>
  );
}
