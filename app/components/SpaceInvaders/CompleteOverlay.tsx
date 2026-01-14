import React from 'react';
import { GameState } from './types';

interface CompleteOverlayProps {
    gameState: GameState;
    onClose?: () => void;
}

const CompleteOverlay: React.FC<CompleteOverlayProps> = ({ gameState, onClose }) => {
    if (gameState !== 'complete') return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-green-900/20 font-press-start backdrop-blur-sm">
            <div className="text-center p-8 border-4 border-green-500 rounded-xl bg-black shadow-[0_0_50px_rgba(34,197,94,0.6)] relative overflow-hidden">
                <div className="absolute inset-0 crt-scanlines opacity-10 pointer-events-none" />
                <h2 className="text-4xl md:text-6xl font-bold text-green-500 mb-8 animate-pulse text-shadow-glow">LOADING COMPLETE</h2>
                <p className="text-xl text-green-400 mb-8">SYSTEMS READY</p>
                <button
                    onClick={onClose}
                    className="bg-transparent border-2 border-green-500 hover:bg-green-500 hover:text-black text-green-500 font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                >
                    INITIALIZE
                </button>
            </div>
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

export default CompleteOverlay;
