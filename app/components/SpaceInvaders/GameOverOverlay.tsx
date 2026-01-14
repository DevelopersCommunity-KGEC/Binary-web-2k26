import React from 'react';
import { Play } from 'lucide-react';
import { GameState } from './types';

interface GameOverOverlayProps {
    gameState: GameState;
    score: number;
    highScore: number;
    onReset: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ gameState, score, highScore, onReset }) => {
    if (gameState !== 'gameOver') return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md z-[140] rounded-lg">
            <div className="text-center space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold text-red-500 tracking-tighter animate-bounce text-shadow-glow">
                    GAME OVER
                </h2>
                <div className="space-y-2">
                    <p className="text-green-500 text-xl md:text-2xl">SCORE: {score.toString().padStart(6, '0')}</p>
                    <p className="text-green-700 text-sm">BEST: {highScore.toString().padStart(6, '0')}</p>
                </div>
                <button
                    onClick={onReset}
                    className="group relative px-8 py-4 bg-transparent border-4 border-green-500 text-green-500 font-bold text-lg md:text-xl tracking-widest hover:bg-green-500 hover:text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] flex items-center gap-4"
                >
                    <Play size={24} className="fill-current rotate-180" />
                    TRY AGAIN
                </button>
            </div>
        </div>
    );
};

export default GameOverOverlay;
