import React, { useMemo, useState, useEffect } from 'react';
import DogImg from '@/assets/dog.png';
const DrawImage: React.FC = () => {
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
        const dogImg = new Image();
        dogImg.src = DogImg;
        // image's width/height: 643/500
        dogImg.onload = () => {
            if (canvasContext) {
                // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
                // img: 规定要使用的图像、画布或视频。
                // sx: 可选。开始剪切的 x 坐标位置。
                // sy: 可选。开始剪切的 y 坐标位置。
                // swidth: 可选。被剪切图像的宽度。
                // sheight: 可选。被剪切图像的高度。
                // x: 在画布上放置图像的 x 坐标位置。
                // y: 在画布上放置图像的 y 坐标位置。
                // width: 可选。要使用的图像的宽度。（伸展或缩小图像）
                // height: 可选。要使用的图像的高度。（伸展或缩小图像）
                canvasContext.drawImage(dogImg, 100, 100, 300, 300, 0, 0, 100, 100);
            }
        };
    };

    useEffect(() => {
        reset();
        render();
    }, [canvasContext]);

    return (
        <div>
            <h3 className="page-title">绘制图像</h3>
            <canvas id="DrawImage" width="700" height="500" ref={setCanvasRef}></canvas>
        </div>
    );
};
export default DrawImage;
