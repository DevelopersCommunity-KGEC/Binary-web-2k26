import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { GameState } from './types';
import { useSpaceInvaders } from './useSpaceInvaders';
import GameCanvas from './GameCanvas';
import MenuOverlay from './MenuOverlay';
import GameOverOverlay from './GameOverOverlay';
import CompleteOverlay from './CompleteOverlay';

interface SpaceInvadersProps {
    onClose: () => void;
    onBack?: () => void;
}

const SpaceInvaders: React.FC<SpaceInvadersProps> = ({ onClose, onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<GameState>('menu');
    const { score, highScore, gameRef } = useSpaceInvaders(canvasRef, gameState, setGameState, onClose);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleReset = () => {
        setGameState('menu');
    };

    return (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black font-press-start overflow-hidden">
            {/* CRT Overlay */}
            <div className="pointer-events-none fixed inset-0 z-120 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.4)_100%)]" />
                <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none" />
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-6 right-6 z-[200] flex gap-4">
                {onBack && (
                    <button
                        onClick={onBack}
                        className="text-green-500 hover:text-green-300 transition-colors p-2 hover:bg-green-900/20 rounded-full"
                        title="Back to Menu"
                    >
                        <ChevronLeft size={32} strokeWidth={3} />
                    </button>
                )}
                <button
                    onClick={onClose}
                    className="text-green-500 hover:text-green-300 transition-colors p-2 hover:bg-green-900/20 rounded-full"
                    title="Close Game"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <GameCanvas canvasRef={canvasRef} highScore={highScore} />

            {/* Controls for Mobile */}
            <div className="mt-8 flex gap-8 md:hidden relative z-130">
                <button
                    onTouchStart={() => gameRef.current?.setTouchLeft?.(true)}
                    onTouchEnd={() => gameRef.current?.setTouchLeft?.(false)}
                    className="p-6 bg-green-500/20 border-2 border-green-500 text-green-500 rounded-xl active:bg-green-500 active:text-black transition-colors"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onTouchStart={() => gameRef.current?.setTouchRight?.(true)}
                    onTouchEnd={() => gameRef.current?.setTouchRight?.(false)}
                    className="p-6 bg-green-500/20 border-2 border-green-500 text-green-500 rounded-xl active:bg-green-500 active:text-black transition-colors"
                >
                    <ChevronLeft size={32} className="rotate-180" />
                </button>
            </div>

            {/* Overlays */}
            <MenuOverlay gameState={gameState} setGameState={setGameState} onBack={onBack} />
            <GameOverOverlay gameState={gameState} score={score} highScore={highScore} onReset={handleReset} />
            <CompleteOverlay gameState={gameState} onClose={onClose} />

            <style>{`
                .crt-scanlines {
                    background: linear-gradient(
                        to bottom,
                        rgba(18, 16, 16, 0) 50%,
                        rgba(0, 0, 0, 0.25) 50%,
                        rgba(0, 0, 0, 0.25)
                    );
                    background-size: 100% 4px;
                }
                .text-shadow-glow {
                    text-shadow: 0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.4);
                }
            `}</style>
        </div>
    );
};

export default SpaceInvaders;
