export interface Entity {
    x: number;
    y: number;
    width: number;
    height: number;
    dx?: number;
    dy?: number;
    speed?: number;
    alive?: boolean;
    type?: number;
    frame?: number;
    health?: number;
    maxHealth?: number;
    shootTimer?: number;
    phase?: number;
}

export interface Bullet extends Entity {
    speed: number;
}

export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

export interface Explosion {
    x: number;
    y: number;
    size: number;
    frame: number;
    maxFrames: number;
}

export interface PixelTransition {
    x: number;
    y: number;
    size: number;
    delay: number;
    alpha: number;
}

export type GameState = 'menu' | 'playing' | 'autoplay' | 'gameOver' | 'complete';
