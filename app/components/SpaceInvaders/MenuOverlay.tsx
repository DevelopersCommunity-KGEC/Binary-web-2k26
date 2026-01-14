import React from 'react';
import { Play, Zap } from 'lucide-react';
import { GameState } from './types';

interface MenuOverlayProps {
    gameState: GameState;
    setGameState: (state: GameState) => void;
    onBack?: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ gameState, setGameState, onBack }) => {
    if (gameState !== 'menu' && gameState !== 'autoplay') return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[140] rounded-lg">
            <div className="text-center space-y-8">
                <div className="space-y-6 flex flex-col items-center">
                    <button
                        onClick={() => setGameState('playing')}
                        className="group relative px-8 py-4 bg-transparent border-4 border-green-500 text-green-500 font-bold text-lg md:text-xl tracking-widest hover:bg-green-500 hover:text-black transition-all duration-200 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] flex items-center gap-4"
                    >
                        <Play size={24} className="fill-current" />
                        INSERT COIN
                    </button>
                    <button
                        onClick={() => setGameState('autoplay')}
                        className="group relative px-6 py-3 bg-transparent border-2 border-green-700 text-green-700 font-bold text-sm md:text-lg tracking-widest hover:bg-green-700 hover:text-green-100 transition-all duration-200 hover:shadow-[0_0_20px_rgba(21,128,61,0.6)] flex items-center gap-3"
                    >
                        <Zap size={20} className="fill-current" />
                        DEMO MODE
                    </button>

                    {onBack && (
                        <button
                            onClick={onBack}
                            className="mt-4 text-green-600 hover:text-green-400 font-mono text-sm underline underline-offset-4 tracking-widest transition-colors"
                        >
                            BACK TO MENU
                        </button>
                    )}
                </div>
                <div className="mt-8 text-green-600 space-y-2 text-xs md:text-sm tracking-wider">
                    <p>← → MOVE • SPACE FIRE</p>
                    <p className="animate-pulse">CREDIT 00</p>
                </div>
            </div>
        </div>
    );
};

export default MenuOverlay;
