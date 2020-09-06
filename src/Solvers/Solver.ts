import { CanvasHelper } from "../CanvasHelper";
import { Vector2 } from "../Vector2";
import { Matrix } from "../Matrix";
import { Utils } from "../Utils";

/** Base class for classes solving econometric problems */
export abstract class Solver
{
    //#region error messages
    protected static readonly notMatrixError: string = "podana wartość nie jest macierzą";
    protected static readonly matrixNotSquareError: string = "podana macierz nie jest kwadratowa (tyle wierszy co kolumn)";
    protected static readonly notNumberError: string = "podana wartość nie jest liczbą";
    protected static readonly notVectorError: string = "podana macierz nie jest wektorem (jeden wiersz albo jedna kolumna)";
    //#endregion

    protected static readonly drawStartPos: Vector2 = new Vector2(10, 30);
    protected static readonly separatingLineThickness: number = 5;
    protected static readonly lineMargin: number = 25;


    /** Number of decimal places to which all displayed numbers should be rounde */
    protected static readonly rounding: number = 3;
    

    protected readonly inputs: Map<string, HTMLInputElement> = new Map<string, HTMLInputElement>();
    protected readonly errorLabels: Map<string, HTMLLabelElement> = new Map<string, HTMLLabelElement>();
    protected readonly context: CanvasRenderingContext2D;

    protected constructor(inputs: ReadonlyArray<string>)
    {
        this.context = (<HTMLCanvasElement>document.getElementById("myCanvas")).getContext("2d");
        CanvasHelper.sharedContext = this.context;

        inputs.forEach(inputId =>
        {
            const inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById(inputId);
            inputElement.oninput = this.HandleInput.bind(this);
            this.inputs.set(inputId, inputElement);
            this.errorLabels.set(inputId, <HTMLLabelElement>document.getElementById(inputId + "_error"));
        });
    }

    /** Called whenever any of input fields from this.inputs is updated 
     * @param inputEvent InputEvent raised by input filed which was modified by user
    */
    protected abstract HandleInput(inputEvent: InputEvent): void;

    /** Displays error label next to input field */
    protected DisplayInputError(inputId: string, message: string): void
    {
        this.errorLabels.get(inputId).innerHTML = message;
    }

    /** Hides all error labels displayed using this.DisplayInputError */
    protected ClearInputErrors(): void
    {
        this.errorLabels.forEach((label, id) => label.innerHTML = "");
    }

    protected GetInputValue(inputId: string): string
    {
        return this.inputs.get(inputId).value;
    }

    protected GetInputValueAsNumber(inputId: string): number
    {
        const stringValue: string = this.GetInputValue(inputId);
        
        if (stringValue == null || stringValue == "") return NaN;

        let value: number = Number(stringValue);

        if (isNaN(value)) value = Number(stringValue.replace(',', '.'));

        return value;
    }

    /** Draws vertical line to separate two parts of problem's solution.
     * Returns Vector2 representing position where drawing of the next part should start
     * @param rightmostMatrix Rightmost matrix from finished part of solution. Line will be drawn next to it.
     */
    protected DrawSeparatingVerticalLine(rightmostMatrix: Matrix): Vector2
    {
        const lineX: number = rightmostMatrix.LastDrawPosition.x + rightmostMatrix.PixelWidth + Matrix.matrixPixelMargin;
        CanvasHelper.DrawLine(new Vector2(lineX, 0), new Vector2(lineX, CanvasHelper.sharedContext.canvas.height), Solver.separatingLineThickness);
        return new Vector2(lineX + Matrix.matrixPixelMargin, Solver.drawStartPos.y);
    }

    /** Rounds number to default number of decimal places */
    protected Round(value: number): number
    {
        return Utils.RoundNumber(value, Solver.rounding);
    }
}