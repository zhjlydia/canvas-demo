import React, { useMemo, useState, useEffect } from 'react';
const Clip: React.FC = () => {
    const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
    const canvasContext = useMemo(() => {
        if (canvasRef) {
            return canvasRef.getContext('2d');
        }
    }, [canvasRef]);

    const reset = () => {
        const rect = canvasRef?.getBoundingClientRect();
        rect && canvasContext?.clearRect(0, 0, rect?.width, rect?.height);
    };

    const render = () => {
        if (canvasContext) {
            canvasContext.fillStyle = 'green';
            canvasContext.fillRect(0, 0, 500, 500);
            canvasContext.arc(250, 250, 100, 0, 2 * Math.PI);
            canvasContext.clip();
            canvasContext.clearRect(0, 0, 500, 500);
        }
    };

    useEffect(() => {
        reset();
        render();
    }, [canvasContext]);

    return (
        <div>
            <h3 className="page-title">clip</h3>
            <canvas id="Basic" width="500" height="500" ref={setCanvasRef}></canvas>
        </div>
    );
};
export default Clip;
