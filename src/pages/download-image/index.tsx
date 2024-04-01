import React, { useMemo, useState, useEffect } from 'react';
import DogImg from '@/assets/dog2.png';
import CodeImg from '@/assets/qrCode.png';

const DownloadImage: React.FC = () => {
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
            canvasContext.fillStyle = '#fff';
            canvasContext.fillRect(0, 0, 375, 504);

            canvasContext.fillStyle = '#333';
            canvasContext.font = '16px Verdana';
            canvasContext.fillText('昨天是段历史，明天是个谜团，而今天是天赐的', 10, 280);
            canvasContext.fillText('礼物，像珍惜礼物那样珍惜今天。', 10, 320);

            canvasContext.font = '30px Verdana';
            canvasContext.fillText('04', 10, 400);

            canvasContext.font = '12px Verdana';
            canvasContext.fillText('2022/11  星期五', 10, 420);
        }
        const dogImg = new Image();
        dogImg.src = DogImg;
        dogImg.onload = () => {
            canvasContext?.drawImage(dogImg, 0, 0, 984, 645, 5, 5, 365, 240);
        };

        const codeImg = new Image();
        codeImg.src = CodeImg;
        codeImg.onload = () => {
            canvasContext?.drawImage(codeImg, 0, 0, 500, 500, 240, 350, 100, 100);
        };
    };

    /**
     * 保存为图片
     */
    const saveImage = () => {
        if (canvasRef && canvasContext) {
            const imageUrl = canvasRef.toDataURL('image/png');
            const elink = document.createElement('a');
            elink.download = 'image';
            elink.style.display = 'none';
            elink.href = imageUrl;
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
        }
    };

    useEffect(() => {
        reset();
        render();
    }, [canvasContext]);

    return (
        <div className="download-image-page">
            <h3 className="page-title">保存canvas为图片</h3>
            <canvas id="Basic" width="375" height="504" ref={setCanvasRef}></canvas>
            <div className="btn" onClick={saveImage}>
                保存
            </div>
        </div>
    );
};
export default DownloadImage;
