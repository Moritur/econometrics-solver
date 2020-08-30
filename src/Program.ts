import { Matrix, Side } from "./Matrix";
import { Vector2 } from "./Vector2";
import { Solver } from "./Solvers/Solver";

export class Program extends Solver
{
    matrix: Matrix;

    constructor() 
    {
        super(["matrixInput"]);
    }

    protected HandleInput(inputEvent: InputEvent): void
    {
        const inputText: string = this.GetInputValue("matrixInput");

        console.log("InputEvent " + inputText);

        this.matrix = Matrix.FromString(inputText);

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.matrix?.Draw(new Vector2(150, 200), "X");
        this.matrix?.Transpose()?.Draw(new Vector2(560, 200), "Xᵀ");
        this.matrix?.MultiplyScalar(2)?.DrawNextTo(this.matrix, Side.above, "X*2");
        this.matrix?.MultiplyMatrix(this.matrix)?.DrawNextTo(this.matrix, Side.right, "X*X");
        this.matrix?.Add(this.matrix)?.DrawNextTo(this.matrix, Side.under, "X+X");
        this.context.fillText("|X|: " + this.matrix?.Determinant, 560, 90);
        this.matrix?.Invert()?.DrawNextTo(this.matrix, Side.left, "X⁻¹");
    }
}