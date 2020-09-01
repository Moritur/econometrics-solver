import { CanvasHelper } from "../CanvasHelper";
import { Vector2 } from "../Vector2";

/** Base class for classes solving econometric problems */
export abstract class Solver
{
    //#region error messages
    protected static readonly notMatrixError: string = "podana wartość nie jest macierzą";
    protected static readonly matrixNotSquareError: string = "podana macierz nie jest kwadratowa (tyle wierszy co kolumn)";
    protected static readonly notNumberError: string = "podana wartość nie jest liczbą";
    //#endregion

    protected static readonly drawStartPos: Vector2 = new Vector2(10, 30);

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
}