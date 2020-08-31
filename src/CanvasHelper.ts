import { Vector2 } from './Vector2';

export class CanvasHelper
{
    public static sharedContext: CanvasRenderingContext2D;

    public static DrawCircle(context: CanvasRenderingContext2D, position: Vector2, radious: number, color: string = "white"): void
    {
        let originalFillStyle = context.fillStyle;

        context.fillStyle = color;
        context.beginPath();
        context.arc(position.x, position.y, radious, 0, 2 * Math.PI);
        context.fill();
        context.stroke();

        context.fillStyle = originalFillStyle;
    }

    public static DrawLine(context: CanvasRenderingContext2D, from: Vector2, to: Vector2, thickness: number): void
    {
        let originalLineWidth = context.lineWidth;

        context.lineWidth = thickness;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();

        context.lineWidth = originalLineWidth;
    }

    public static DrawText(text: string, position: Vector2, size: number, textAlign: CanvasTextAlign = "left",  font: string = "sans-serif", color: string = "black", context: CanvasRenderingContext2D = this.sharedContext): void
    {
        const originalFillStyle = context.fillStyle;
        const originalFont = context.font;
        const originalTextAlign = context.textAlign;

        context.fillStyle = color;
        context.font = size.toString() + "px " + font;
        context.textAlign = textAlign;
        context.fillText(text, position.x, position.y);

        context.fillStyle = originalFillStyle;
        context.font = originalFont;
        context.textAlign = originalTextAlign;
    }
}