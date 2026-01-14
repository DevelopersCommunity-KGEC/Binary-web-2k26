import React from 'react';

interface GameCanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    highScore: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ canvasRef, highScore }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {/* Header */}
            <div className="relative z-60 mb-6 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-green-500 mb-2 tracking-widest text-shadow-glow animate-pulse">
                    SPACE INVADERS
                </h1>
                <p className="text-green-400 text-sm md:text-base tracking-widest">
                    HIGH SCORE: {highScore.toString().padStart(6, '0')}
                </p>
            </div>

            {/* Game Container */}
            <div className="relative z-60 p-1">
                {/* Arcade Bezel */}
                <div className="absolute inset-0 border-4 border-green-600 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.4),inset_0_0_20px_rgba(34,197,94,0.2)] pointer-events-none z-10" />

                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="bg-black rounded-lg max-w-[95vw] max-h-[70vh] w-auto h-auto block"
                    style={{ imageRendering: 'pixelated' }}
                />
            </div>
        </div>
    );
};

export default GameCanvas;
