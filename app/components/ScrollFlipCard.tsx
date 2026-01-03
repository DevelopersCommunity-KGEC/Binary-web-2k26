"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export default function ScrollFlipCard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop =
        sectionRef.current.offsetTop;
      const sectionHeight =
        sectionRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const start = sectionTop;
      const end = sectionTop + sectionHeight - windowHeight;

      const raw = (scrollY - start) / (end - start);
      setProgress(clamp(raw, 0, 1));
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scale = 1 + progress * 4;     
  const rotateY = progress * 180;     
  const radius = 16 - progress * 16;  

  const textOpacity = clamp((progress - 0.5) * 2, 0, 1);
  const textY = 12 - textOpacity * 12;

  const showFront = progress < 0.5;
  const showBack = progress >= 0.5;

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="perspective">
          <div
            style={{
              transform: `
                scale(${scale})
                rotateY(${rotateY}deg)
              `,
              borderRadius: `${radius}px`,
            }}
            className="relative w-[20vw] h-[20vh]
                       transition-transform duration-75 ease-out
                       preserve-3d"
          >
            {/* FRONT FACE */}
            <div
  style={{ opacity: showFront ? 1 : 0 }}
  className="absolute inset-0 flex items-center justify-center face-hidden
             transition-opacity duration-200"
>
  {/* Character Card */}
  <div className="w-full h-full rounded-2xl bg-white p-2">
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <img
        src="/character.png"   
        alt="First Section"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

            {/* BACK FACE (NEXT COMPONENT) */}
            <div
  style={{ opacity: showBack ? 1 : 0 }}
  className="absolute inset-0 bg-white flex items-center justify-center
             rotate-y-180 face-hidden"
>
<h2
  style={{
    opacity: textOpacity,
    transform: `translateY(${textY}px)`
  }}
  className="text-2xl font-bold text-black"
>
  Next Section
</h2>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}
