import { useState, useEffect, useRef, useCallback } from 'react';
import { Entity, GameState, Bullet, Particle, Explosion, PixelTransition } from './types';
import { PLAYER_PATTERN, ENEMY_PATTERNS, BOSS_PATTERN } from './constants';

export const useSpaceInvaders = (
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    gameState: GameState,
    setGameState: (state: GameState) => void,
    onClose?: () => void
) => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const gameRef = useRef<{ cleanup: () => void; setTouchLeft?: (a: boolean) => void; setTouchRight?: (a: boolean) => void } | null>(null);
    const shootIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const initGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to responsive size
        const updateCanvasSize = () => {
            const isMobile = window.innerWidth < 768;
            const maxW = isMobile ? window.innerWidth - 32 : 800;
            const maxH = isMobile ? window.innerHeight * 0.6 : 600;

            canvas.width = maxW;
            canvas.height = maxH;
        };
        updateCanvasSize();

        ctx.imageSmoothingEnabled = false;
        const isAutoPlay = gameState === 'autoplay';

        const isNarrow = canvas.width < 600;
        const sizeMult = isNarrow ? 0.6 : 1;
        const enemySpeedMult = isNarrow ? 1.4 : 1;
        const playerSpeedMult = isNarrow ? 0.75 : 1;

        let animationId: number;
        let gameOver = false;

        const player: Entity = {
            x: canvas.width / 2 - (16 * sizeMult),
            y: canvas.height - (48 * sizeMult),
            width: 32 * sizeMult,
            height: 32 * sizeMult,
            speed: 4 * playerSpeedMult,
            dx: 0
        };

        const bullets: Bullet[] = [];
        const enemyBullets: any[] = [];
        const enemies: any[] = [];
        const particles: Particle[] = [];
        const explosions: Explosion[] = [];

        let currentScore = 0;
        let enemySpawnTimer = 0;
        let bossSpawned = false;
        let boss: Entity | null = null;
        let bossDefeated = false;
        let pixelTransition: PixelTransition[] = [];
        let transitionComplete = false;

        const createEnemies = () => {
            const numEnemies = isNarrow ? 6 : (Math.floor(Math.random() * 12) + 8);
            const enemySize = 32 * sizeMult;

            for (let i = 0; i < numEnemies; i++) {
                enemies.push({
                    x: Math.random() * (canvas.width - enemySize - 48) + 24,
                    y: Math.random() * (canvas.height * 0.3) + 24,
                    width: enemySize,
                    height: enemySize,
                    alive: true,
                    type: Math.floor(Math.random() * 3),
                    dx: (Math.random() - 0.5) * 1.5 * enemySpeedMult,
                    dy: (Math.random() * 0.4 + 0.2) * enemySpeedMult,
                    frame: 0
                });
            }
        };

        createEnemies();

        const spawnBoss = () => {
            boss = {
                x: canvas.width / 2 - (64 * sizeMult),
                y: -128,
                width: 128 * sizeMult,
                height: 96 * sizeMult,
                health: 50,
                maxHealth: 50,
                phase: 0,
                dx: 2 * enemySpeedMult,
                dy: 0.5 * enemySpeedMult,
                shootTimer: 0,
                frame: 0
            };
            bossSpawned = true;
        };

        const keys: { [key: string]: boolean } = {};
        const touchInput = { left: false, right: false };

        const keyDown = (e: KeyboardEvent) => { keys[e.key] = true; };
        const keyUp = (e: KeyboardEvent) => { keys[e.key] = false; };

        if (!isAutoPlay) {
            window.addEventListener('keydown', keyDown);
            window.addEventListener('keyup', keyUp);
        }

        shootIntervalRef.current = setInterval(() => {
            if (!bossDefeated) {
                bullets.push({
                    x: player.x + player.width / 2 - 2,
                    y: player.y,
                    width: 4 * sizeMult,
                    height: 12 * sizeMult,
                    speed: 6 * sizeMult
                });
            }
        }, 200);

        const enemyShoot = () => {
            const aliveEnemies = enemies.filter(e => e.alive);
            if (aliveEnemies.length > 0 && Math.random() < 0.015) {
                const enemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                enemyBullets.push({
                    x: enemy.x + enemy.width / 2 - 2,
                    y: enemy.y + enemy.height,
                    width: 4 * sizeMult,
                    height: 12 * sizeMult,
                    speed: 3 * enemySpeedMult
                });
            }
        };

        const bossShoot = () => {
            if (!boss || (boss.health !== undefined && boss.health <= 0)) return;

            if (boss.shootTimer !== undefined) boss.shootTimer++;
            if (boss.shootTimer !== undefined && boss.shootTimer > 40) {
                boss.shootTimer = 0;
                for (let i = -1; i <= 1; i++) {
                    enemyBullets.push({
                        x: boss.x + boss.width / 2 - 2 + i * 20,
                        y: boss.y + boss.height,
                        width: 4 * sizeMult,
                        height: 12 * sizeMult,
                        speed: 4 * enemySpeedMult,
                        dx: i * 0.5 * enemySpeedMult
                    });
                }
            }
        };

        const createParticles = (x: number, y: number, color: string, count = 12) => {
            for (let i = 0; i < count; i++) {
                particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    life: 30,
                    color,
                    size: Math.random() * 3 + 2
                });
            }
        };

        const createExplosion = (x: number, y: number, size = 32) => {
            explosions.push({
                x: x - size / 2,
                y: y - size / 2,
                size,
                frame: 0,
                maxFrames: 12
            });
        };

        const initPixelTransition = () => {
            pixelTransition = [];
            const pixelSize = 8;
            for (let y = 0; y < canvas.height; y += pixelSize) {
                for (let x = 0; x < canvas.width; x += pixelSize) {
                    pixelTransition.push({
                        x, y,
                        size: pixelSize,
                        delay: Math.random() * 60,
                        alpha: 0
                    });
                }
            }
        };

        const spawnNewEnemies = () => {
            if (bossSpawned) return;
            enemySpawnTimer++;
            const spawnThreshold = isNarrow ? 90 : 150;

            if (enemySpawnTimer > spawnThreshold) {
                enemySpawnTimer = 0;
                const numNew = Math.floor(Math.random() * 2) + 1;
                for (let i = 0; i < numNew; i++) {
                    enemies.push({
                        x: Math.random() * (canvas.width - 48) + 24,
                        y: -32,
                        width: 32 * sizeMult,
                        height: 32 * sizeMult,
                        alive: true,
                        type: Math.floor(Math.random() * 3),
                        dx: (Math.random() - 0.5) * 1.5 * enemySpeedMult,
                        dy: (Math.random() * 0.4 + 0.2) * enemySpeedMult,
                        frame: 0
                    });
                }
            }

            const bossThreshold = isAutoPlay ? 500 : 1000;
            if (currentScore >= bossThreshold && !bossSpawned) {
                enemies.length = 0;
                spawnBoss();
            }
        };

        const updateAutoPlay = () => {
            if (bossDefeated) {
                player.dx = 0;
                return;
            }

            const aliveEnemies = enemies.filter(e => e.alive);
            const target = boss && boss.health && boss.health > 0 ? boss : (aliveEnemies.length > 0 ? aliveEnemies[0] : null);

            if (target) {
                let nearest = target;
                if (!boss || (boss.health !== undefined && boss.health <= 0)) {
                    let minDist = Math.abs(player.x + player.width / 2 - (target.x + target.width / 2));
                    for (let enemy of aliveEnemies) {
                        const dist = Math.abs(player.x + player.width / 2 - (enemy.x + enemy.width / 2));
                        if (dist < minDist) {
                            minDist = dist;
                            nearest = enemy;
                        }
                    }
                }

                const targetX = nearest.x + nearest.width / 2 - player.width / 2;
                if (Math.abs(player.x - targetX) > 5) {
                    player.dx = player.x < targetX ? player.speed! : -player.speed!;
                } else {
                    player.dx = 0;
                }

                for (let eb of enemyBullets) {
                    if (eb.y > player.y - 80 && eb.x > player.x - 20 && eb.x < player.x + player.width + 20) {
                        player.dx = eb.x < player.x ? player.speed! : -player.speed!;
                    }
                }
            }
        };

        const update = () => {
            if (bossDefeated) {
                let allComplete = true;
                pixelTransition.forEach(p => {
                    if (p.delay > 0) {
                        p.delay--;
                        allComplete = false;
                    } else if (p.alpha < 1) {
                        p.alpha += 0.05;
                        if (p.alpha < 1) allComplete = false;
                    }
                });

                if (allComplete && !transitionComplete) {
                    transitionComplete = true;
                    setTimeout(() => {
                        if (gameRef.current) gameRef.current.cleanup();
                        setGameState('complete');
                    }, 500);
                }
                return;
            }

            if (isAutoPlay) {
                updateAutoPlay();
            } else {
                if (keys['ArrowLeft'] || touchInput.left) player.dx = -player.speed!;
                else if (keys['ArrowRight'] || touchInput.right) player.dx = player.speed!;
                else player.dx = 0;
            }

            player.x += player.dx!;
            player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

            bullets.forEach((b, i) => {
                b.y -= b.speed;
                if (b.y < -20) bullets.splice(i, 1);
            });

            enemyBullets.forEach((b, i) => {
                b.y += b.speed;
                if (b.dx) b.x += b.dx;
                if (b.y > canvas.height + 20) enemyBullets.splice(i, 1);
            });

            if (!bossSpawned) {
                enemyShoot();
                spawnNewEnemies();
            }

            enemies.forEach((e, i) => {
                if (!e.alive) {
                    enemies.splice(i, 1);
                    return;
                }
                e.x += e.dx;
                e.y += e.dy;
                e.frame = (e.frame + 0.1) % 2;
                if (e.x <= 0 || e.x + e.width >= canvas.width) e.dx *= -1;
                if (e.y > canvas.height) enemies.splice(i, 1);
            });

            if (boss) {
                if (boss.y < 40) boss.y += boss.dy!;
                else {
                    boss.x += boss.dx!;
                    if (boss.x <= 0 || boss.x + boss.width >= canvas.width) boss.dx! *= -1;
                }
                boss.frame = (boss.frame! + 0.05) % 2;
                bossShoot();
            }

            bullets.forEach((b, bi) => {
                if (boss && boss.health !== undefined && boss.health > 0 &&
                    b.x < boss.x + boss.width && b.x + b.width > boss.x &&
                    b.y < boss.y + boss.height && b.y + b.height > boss.y) {
                    boss.health--;
                    bullets.splice(bi, 1);
                    createParticles(b.x, b.y, '#0f0', 6);
                    if (boss.health <= 0) {
                        createExplosion(boss.x + boss.width / 2, boss.y + boss.height / 2, 96);
                        createParticles(boss.x + boss.width / 2, boss.y + boss.height / 2, '#0f0', 40);
                        currentScore += 1000;
                        bossDefeated = true;
                        initPixelTransition();
                    }
                    return;
                }

                enemies.forEach((e, ei) => {
                    if (e.alive && b.x < e.x + e.width && b.x + b.width > e.x &&
                        b.y < e.y + e.height && b.y + b.height > e.y) {
                        e.alive = false;
                        bullets.splice(bi, 1);
                        currentScore += (3 - (e.type || 0)) * 10 + 10;
                        createParticles(e.x + e.width / 2, e.y + e.height / 2, '#0f0', 8);
                        createExplosion(e.x + e.width / 2, e.y + e.height / 2, 24);
                    }
                });
            });

            enemyBullets.forEach((b, i) => {
                if (b.x < player.x + player.width && b.x + b.width > player.x &&
                    b.y < player.y + player.height && b.y + b.height > player.y) {
                    gameOver = true;
                    createExplosion(player.x + player.width / 2, player.y + player.height / 2, 32);
                    createParticles(player.x + player.width / 2, player.y + player.height / 2, '#f00', 20);
                }
            });

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1;
                p.life--;
                if (p.life <= 0) particles.splice(i, 1);
            });

            explosions.forEach((e, i) => {
                e.frame += 0.5;
                if (e.frame >= e.maxFrames) explosions.splice(i, 1);
            });

            setScore(currentScore);
        };

        const drawPixelSprite = (x: number, y: number, width: number, height: number, color: string, pattern: number[][]) => {
            ctx.fillStyle = color;
            const pSize = 4 * sizeMult;
            for (let py = 0; py < pattern.length; py++) {
                for (let px = 0; px < pattern[py].length; px++) {
                    if (pattern[py][px]) ctx.fillRect(x + px * pSize, y + py * pSize, pSize, pSize);
                }
            }
        };

        const drawPlayer = () => { drawPixelSprite(player.x, player.y, player.width, player.height, '#0f0', PLAYER_PATTERN); };
        const drawEnemies = () => {
            enemies.forEach(e => {
                if (!e.alive) return;
                const colors = ['#0f0', '#0d0', '#0b0'];
                drawPixelSprite(e.x, e.y, e.width, e.height, colors[e.type], ENEMY_PATTERNS[e.type]);
            });
        };
        const drawBoss = () => {
            if (!boss || (boss.health !== undefined && boss.health <= 0)) return;
            drawPixelSprite(boss.x, boss.y, boss.width, boss.height, '#0f0', BOSS_PATTERN);
            if (boss.health !== undefined && boss.maxHealth !== undefined) {
                const barWidth = boss.width;
                const barHeight = 6;
                const barX = boss.x;
                const barY = boss.y - 12;
                ctx.fillStyle = '#222';
                ctx.fillRect(barX, barY, barWidth, barHeight);
                ctx.fillStyle = '#0f0';
                ctx.fillRect(barX, barY, (boss.health / boss.maxHealth) * barWidth, barHeight);
                ctx.strokeStyle = '#0f0';
                ctx.lineWidth = 2;
                ctx.strokeRect(barX, barY, barWidth, barHeight);
            }
        };

        const drawBullets = () => {
            ctx.fillStyle = '#0f0';
            bullets.forEach(b => {
                ctx.fillRect(b.x, b.y, b.width, b.height);
                ctx.fillRect(b.x - 1, b.y + 2, b.width + 2, b.height - 4);
            });
            ctx.fillStyle = '#f00';
            enemyBullets.forEach(b => {
                ctx.fillRect(b.x, b.y, b.width, b.height);
                ctx.fillRect(b.x - 1, b.y + 2, b.width + 2, b.height - 4);
            });
        };

        const drawParticles = () => {
            particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / 30;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            });
            ctx.globalAlpha = 1;
        };

        const drawExplosions = () => {
            explosions.forEach(e => {
                const progress = e.frame / e.maxFrames;
                const size = e.size * (1 + progress * 0.5);
                ctx.globalAlpha = 1 - progress;
                ctx.fillStyle = '#0f0';
                ctx.fillRect(e.x - size / 4, e.y - size / 4, size / 2, size / 2);
                ctx.fillStyle = '#0a0';
                ctx.fillRect(e.x, e.y, size / 4, size / 4);
            });
            ctx.globalAlpha = 1;
        };

        const drawPixelTransition = () => {
            pixelTransition.forEach(p => {
                if (p.alpha > 0) {
                    ctx.globalAlpha = p.alpha;
                    ctx.fillStyle = '#0f0';
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                }
            });
            ctx.globalAlpha = 1;
        };

        const stars = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() < 0.5 ? 2 : 3,
            twinkleOffset: Math.random() * 100
        }));

        const draw = () => {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0f0';
            const time = Date.now() * 0.005;
            stars.forEach(star => {
                const opacity = 0.3 + 0.7 * Math.sin(time + star.twinkleOffset);
                if (opacity > 0) {
                    ctx.globalAlpha = opacity;
                    ctx.fillRect(star.x, star.y, star.size, star.size);
                }
            });
            ctx.globalAlpha = 1;
            drawEnemies(); drawBoss(); drawPlayer(); drawBullets(); drawExplosions(); drawParticles();
            if (bossDefeated) drawPixelTransition();
            if (boss && boss.health !== undefined && boss.health > 0) {
                ctx.font = 'bold 24px monospace';
                ctx.fillText('BOSS BATTLE!', canvas.width / 2 - 80, 30);
            }
        };

        const gameLoop = () => {
            if (gameOver && !isAutoPlay) {
                setHighScore(prev => Math.max(prev, currentScore));
                setGameState('gameOver');
                return;
            }
            update(); draw(); animationId = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        gameRef.current = {
            cleanup: () => {
                cancelAnimationFrame(animationId);
                if (shootIntervalRef.current) clearInterval(shootIntervalRef.current);
                if (!isAutoPlay) {
                    window.removeEventListener('keydown', keyDown);
                    window.removeEventListener('keyup', keyUp);
                }
            },
            setTouchLeft: (active: boolean) => { touchInput.left = active; },
            setTouchRight: (active: boolean) => { touchInput.right = active; }
        };
    }, [canvasRef, gameState, setGameState]);

    useEffect(() => {
        if (gameState === 'playing' || gameState === 'autoplay') {
            initGame();
        }
        return () => {
            if (gameRef.current) gameRef.current.cleanup();
            if (shootIntervalRef.current) clearInterval(shootIntervalRef.current);
        };
    }, [gameState, initGame]);

    return {
        score,
        highScore,
        gameRef
    };
};
