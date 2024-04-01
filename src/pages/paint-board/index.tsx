import React, { useMemo, useState, MouseEvent, useEffect } from 'react';
import Board, { CANVAS_ELE_TYPE } from './board';
const PaintBoard: React.FC = () => {
    // 初始化画板
    const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
    const board = useMemo(() => {
        if (canvasRef) {
            return new Board(canvasRef);
        }
    }, [canvasRef]);

    const [optionType, setOptionType] = useState<CANVAS_ELE_TYPE>(CANVAS_ELE_TYPE.FREE_LINE);

    // 监听鼠标事件
    const mouseDown = (event: MouseEvent) => {
        const { clientX: x, clientY: y } = event;
        if (board) {
            board.down(x, y);
        }
    };
    const mouseMove = (event: MouseEvent) => {
        const { clientX: x, clientY: y } = event;
        if (board) {
            board.move(x, y);
        }
    };
    const mouseUp = () => {
        if (board) {
            board.up();
        }
    };

    const paint = () => {
        if (board) {
            setOptionType(CANVAS_ELE_TYPE.FREE_LINE);
            board.setType(CANVAS_ELE_TYPE.FREE_LINE);
        }
    };
    const clean = () => {
        if (board) {
            setOptionType(CANVAS_ELE_TYPE.CLEAN_LINE);
            board.setType(CANVAS_ELE_TYPE.CLEAN_LINE);
        }
    };

    useEffect(() => {
        board && board.reset();
    }, []);

    return (
        <div>
            <h3 className="page-title">canvas 画板</h3>
            <div className="btn-group">
                <div
                    className={optionType === CANVAS_ELE_TYPE.FREE_LINE ? 'btn active' : 'btn'}
                    onClick={paint}
                >
                    画笔
                </div>
                <div
                    className={optionType === CANVAS_ELE_TYPE.CLEAN_LINE ? 'btn active' : 'btn'}
                    onClick={clean}
                >
                    橡皮擦
                </div>
            </div>
            <canvas
                id="paintBoard"
                width="500"
                height="500"
                ref={setCanvasRef}
                onMouseDown={mouseDown}
                onMouseMove={mouseMove}
                onMouseUp={mouseUp}
            ></canvas>
        </div>
    );
};
export default PaintBoard;
