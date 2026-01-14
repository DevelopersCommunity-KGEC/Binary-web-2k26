"use client";

import React, { useEffect, useRef } from 'react';

const TetrisBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const BLOCK_SIZE = 30;
        const STEP_DELAY = 50;

        const COLORS = [
            null,
            '#22c55e', '#16a34a', '#15803d', '#4ade80', 
            '#86efac', '#059669', '#10b981',
        ];

        const PIECES = [
            [],
            [[0, 1, 0], [1, 1, 1]], 
            [[2, 2], [2, 2]],       
            [[0, 3, 3], [3, 3, 0]], 
            [[4, 4, 0], [0, 4, 4]], 
            [[0, 0, 5], [5, 5, 5]], 
            [[6, 0, 0], [6, 6, 6]], 
            [[0, 0, 0, 0], [7, 7, 7, 7], [0, 0, 0, 0]], 
        ];

        let grid: number[][] = [];
        let cols = 0;
        let rows = 0;
        let activePiece: any = null;
        let lastTime = 0;
        let dropCounter = 0;

        const createMatrix = (w: number, h: number) => 
            Array.from({ length: h }, () => new Array(w).fill(0));

        const collide = (arena: number[][], player: any) => {
            const [m, o] = [player.matrix, player.pos];
            for (let y = 0; y < m.length; ++y) {
                for (let x = 0; x < m[y].length; ++x) {
                    if (m[y][x] !== 0 &&
                       (arena[y + o.y] === undefined || arena[y + o.y][x + o.x] !== 0)) {
                        return true;
                    }
                }
            }
            return false;
        };

        const merge = (arena: number[][], player: any) => {
            player.matrix.forEach((row: any, y: number) => {
                row.forEach((value: number, x: number) => {
                    if (value !== 0 && arena[y + player.pos.y]) {
                        arena[y + player.pos.y][x + player.pos.x] = value;
                    }
                });
            });
        };

        const resize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent?.clientWidth || window.innerWidth;
            canvas.height = parent?.clientHeight || window.innerHeight;
            cols = Math.ceil(canvas.width / BLOCK_SIZE);
            // Adding +2 rows ensures the "floor" is below the visible seam
            rows = Math.ceil(canvas.height / BLOCK_SIZE) -2; 
            grid = createMatrix(cols, rows);
            activePiece = null;
        };

        const drawMatrix = (matrix: number[][], offset: { x: number, y: number }) => {
            matrix.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        ctx.fillStyle = COLORS[value] || '#fff';
                        ctx.fillRect((x + offset.x) * BLOCK_SIZE, (y + offset.y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        ctx.strokeStyle = '#000';
                        ctx.strokeRect((x + offset.x) * BLOCK_SIZE, (y + offset.y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                });
            });
        };

        const update = (time = 0) => {
            const dt = time - lastTime;
            lastTime = time;
            dropCounter += dt;
            if (dropCounter > STEP_DELAY) {
                if (!activePiece) {
                    const type = Math.floor(Math.random() * 7) + 1;
                    activePiece = { matrix: PIECES[type], pos: { x: Math.floor(Math.random() * (cols - 2)), y: 0 }};
                    if (collide(grid, activePiece)) grid.forEach(row => row.fill(0));
                } else {
                    activePiece.pos.y++;
                    if (collide(grid, activePiece)) {
                        activePiece.pos.y--;
                        merge(grid, activePiece);
                        activePiece = null;
                        // Fast line sweep
                        outer: for (let y = grid.length - 1; y >= 0; --y) {
                            for (let x = 0; x < grid[y].length; ++x) if (grid[y][x] === 0) continue outer;
                            grid.splice(y, 1);
                            grid.unshift(new Array(cols).fill(0));
                            ++y;
                        }
                    }
                }
                dropCounter = 0;
            }
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawMatrix(grid, { x: 0, y: 0 });
            if (activePiece) drawMatrix(activePiece.matrix, activePiece.pos);
            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener('resize', resize);
        resize();
        update();
        return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', resize); };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 -z-10 opacity-40 bg-black pointer-events-none" />;
};

export default TetrisBackground;