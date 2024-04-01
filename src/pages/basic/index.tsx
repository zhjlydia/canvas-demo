import React, { useMemo, useState, useEffect } from 'react';
const Basic: React.FC = () => {
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
        line();
        arc();
        clearRect();
    };
    const line = () => {
        if (canvasContext) {
            canvasContext.font = '20px Verdana';
            canvasContext.fillText('绘制直线', 10, 30);
            canvasContext.lineWidth = 5;
            canvasContext.strokeStyle = '#0000ff';
            canvasContext.lineCap = 'round';
            canvasContext.lineJoin = 'round';
            canvasContext.moveTo(10, 50);
            canvasContext.lineTo(150, 150);
            canvasContext.stroke();

            canvasContext.font = '20px Verdana';
            canvasContext.fillText('绘制多条线', 250, 30);
            canvasContext.moveTo(250, 150);
            canvasContext.lineTo(300, 50);
            canvasContext.lineTo(400, 150);
            canvasContext.lineTo(450, 50);
            canvasContext.stroke();
        }
    };

    const arc = () => {
        if (canvasContext) {
            canvasContext.font = '20px Verdana';
            canvasContext.fillText('绘制圆', 10, 200);
            canvasContext.beginPath();
            // context.arc(x,y,r,sAngle,eAngle,counterclockwise);
            // x: 圆的中心X坐标
            // y: 圆的中心Y坐标
            // r: 圆的半径
            // sAngle: 起始角，弧度
            // eAngle: 结束角，弧度
            // counterclockwise: 绘制圆的方向（false=顺时针，true=逆时针）
            canvasContext.arc(60, 270, 50, 0, 2 * Math.PI);
            canvasContext.stroke();

            canvasContext.font = '20px Verdana';
            canvasContext.fillText('绘制弧线', 250, 200);
            canvasContext.beginPath();
            canvasContext.arc(310, 270, 50, 0, 1 * Math.PI);
            // canvasContext.closePath();
            canvasContext.stroke();
        }
    };

    const clearRect = () => {
        if (canvasContext) {
            canvasContext.font = '20px Verdana';
            canvasContext.fillText('清除像素', 10, 370);
            canvasContext.beginPath();
            canvasContext.arc(60, 440, 50, 0, 2 * Math.PI);
            canvasContext.fill();
            // context.clearRect(x,y,width,height);
            // x: 清除矩形的左上角X坐标
            // y: 清除矩形的左上角Y坐标
            // width: 清除的矩形的宽度
            // height: 清除掉的矩形的高度
            canvasContext.clearRect(30, 410, 50, 50);
        }
    };

    useEffect(() => {
        reset();
        render();
    }, [canvasContext]);

    return (
        <div>
            <h3 className="page-title">canvas 路径、形状</h3>
            <canvas id="Basic" width="500" height="500" ref={setCanvasRef}></canvas>
        </div>
    );
};
export default Basic;
