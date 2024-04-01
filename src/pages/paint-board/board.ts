/**
 * PaintBoard
 */
type Point = {
    x: number;
    y: number;
} | null;
export enum CANVAS_ELE_TYPE {
    FREE_LINE = 'freeLine',
    CLEAN_LINE = 'cleanLine',
}

export default class PaintBoard {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    // 起始位置
    startPoint: Point = null;
    // 结束位置
    endPoint: Point = null;

    type: CANVAS_ELE_TYPE = CANVAS_ELE_TYPE.FREE_LINE;

    canvasRect = {
        top: 0,
        left: 0,
    };

    isDown = false;

    constructor(canvas: HTMLCanvasElement) {
        // 初始化配置
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;

        const { top, left } = canvas.getBoundingClientRect();
        this.canvasRect = {
            top,
            left,
        };
        this.setLineStyle();
    }

    setLineStyle() {
        this.context.strokeStyle = '#333';
        this.context.lineWidth = 5;
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
    }

    setType(type: CANVAS_ELE_TYPE) {
        this.type = type;
    }

    down(x: number, y: number) {
        this.isDown = true;
        this.startPoint = {
            x: x - this.canvasRect.left,
            y: y - this.canvasRect.top,
        };
    }

    move(x: number, y: number) {
        if (!this.isDown) {
            return;
        }
        this.endPoint = {
            x: x - this.canvasRect.left,
            y: y - this.canvasRect.top,
        };
        if (this.type === CANVAS_ELE_TYPE.FREE_LINE) {
            this.drawLine();
        } else {
            this.cleanLine();
        }

        this.startPoint = this.endPoint;
    }

    drawLine() {
        if (!this.startPoint || !this.endPoint) {
            return;
        }
        this.context.beginPath();
        this.context.moveTo(this.startPoint.x, this.startPoint.y);
        this.context.lineTo(this.endPoint.x, this.endPoint.y);
        this.context.stroke();
    }
    cleanLine() {
        if (!this.startPoint || !this.endPoint) {
            return;
        }
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.endPoint.x, this.endPoint.y, 10, 0, 2 * Math.PI);
        this.context.clip();
        this.context.clearRect(0, 0, 500, 500);
        this.context.restore();
    }
    up() {
        this.startPoint = null;
        this.endPoint = null;
        this.isDown = false;
    }

    reset() {
        this.context.clearRect(0, 0, 500, 500);
    }
}
