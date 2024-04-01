import React, { useMemo, useState, useEffect, useRef } from 'react';
import PlayerImg from '@/assets/player.png';

const spritePosition = [80, 120, 160, 200, 240, 280, 320, 360];

const playerImg = new Image();
playerImg.src = PlayerImg;

const Game: React.FC = () => {
    const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
    const canvasContext = useMemo(() => {
        if (canvasRef) {
            return canvasRef.getContext('2d');
        }
    }, [canvasRef]);

    const currentIndex = useRef<number>(0);
    const frame = useRef<number>(0);

    const reset = () => {
        const rect = canvasRef?.getBoundingClientRect();
        rect && canvasContext?.clearRect(0, 0, rect?.width, rect?.height);
    };

    const render = () => {
        frame.current += 1;
        window.requestAnimationFrame(render);
        if (frame.current % 3 !== 0) {
            return;
        }
        if (currentIndex.current > spritePosition.length - 1) {
            currentIndex.current = 0;
        } else {
            currentIndex.current += 1;
        }
        canvasContext?.clearRect(0, 0, 300, 200);
        canvasContext?.drawImage(
            playerImg,
            spritePosition[currentIndex.current],
            0,
            40,
            50,
            0,
            0,
            80,
            100
        );
    };

    useEffect(() => {
        reset();
        if (canvasContext) {
            window.requestAnimationFrame(render);
        }
    }, [canvasContext]);

    return (
        <div className="download-image-page">
            <h3 className="page-title">动画</h3>
            <canvas id="Basic" width="300" height="200" ref={setCanvasRef}></canvas>
        </div>
    );
};
export default Game;
