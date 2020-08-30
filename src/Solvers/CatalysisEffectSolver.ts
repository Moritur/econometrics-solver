import { Solver } from "./Solver";
import { Matrix, Side, MatrixRows } from "../Matrix";
import { Vector2 } from "../Vector2";

/** I can't find english name for "efekt katalizy" */
export class CatalysisEffectSolver extends Solver
{
    public constructor()
    {
        super(["R", "R0"]);
    }

    protected HandleInput(inputEvent: InputEvent): void
    {
        this.ClearInputErrors();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        let R: Matrix = Matrix.FromString(this.GetInputValue("R"));
        let R0: Matrix = Matrix.FromString(this.GetInputValue("R0"));

        //#region validate input
        //#region R
        if (R === null) { this.DisplayInputError("R", CatalysisEffectSolver.notMatrixError); return; }
        else if (!R.IsSquare) { this.DisplayInputError("R", CatalysisEffectSolver.matrixNotSquareError); return; }
        else if (R.ColumnNumber < 2) { this.DisplayInputError("R", CatalysisEffectSolver.matrixNotSquareError); return; }
        else
        {
            for (let i = 0; i < R.ColumnNumber; i++)
            {
                if (R.numbers[i][i] != 1)
                {
                    this.DisplayInputError("R", `R musi mieć same 1 po przekątnej. W rzędzie ${i} kolumnie ${i} jest ${R.numbers[i][i]} zamiast 1`);
                    return;
                }
            }

            let fixR: boolean = false;
            const newRows: MatrixRows = new MatrixRows(R.RowNumber);

            for (let row = 0; row < R.RowNumber; row++) newRows[row] = new Array<number>(R.ColumnNumber);

            for (let row = 0; row < R.RowNumber; row++)
            {
                for (let col = row; col < R.ColumnNumber; col++)
                {
                    newRows[row][col] = R.numbers[row][col];
                    newRows[col][row] = R.numbers[row][col];

                    if (R.numbers[row][col] != R.numbers[col][row])
                    {
                        if (R.numbers[col][row] == 0)
                        {
                            fixR = true;
                        }
                        else
                        {
                            this.DisplayInputError("R", `R musi być symetryczne względnem przekątnej z 1. ` +
                                `Liczby w komórkach [${row}][${col}] i [${col}][${row}], czyli ${R.numbers[row][col]} i ${R.numbers[col][row]} nie są równe`);
                            return;
                        }
                    }
                }
            }

            if (fixR) R = new Matrix(newRows);
        }
        //#endregion
        //#region R0
        if (R0 === null) { this.DisplayInputError("R0", CatalysisEffectSolver.notMatrixError); return; }
        else if (R0.RowNumber > 1)
        {
            if (R0.ColumnNumber == 1) R0 = R0.Transpose();
            else { this.DisplayInputError("R0", "podana macierz nie jest wektorem (jeden wiersz albo jedna kolumna)"); return; }
        }
        //#endregion

        if (R.ColumnNumber != R0.ColumnNumber)
        {
            this.DisplayInputError("R", "R ma inną ilość kolumn niż R0");
            this.DisplayInputError("R0", "R0 ma inną ilość kolumn niż R");
            return
        }
        //#endregion

        const R0_reg: Matrix = this.CalculateR0_reg(R0);

        //#region display results

        R.Draw(new Vector2(10, 30), "R");
        // transpose R0 to draw it vertically, because that's how Dr Zając writes that
        const R0T = R0.Transpose();
        R0T.DrawNextTo(R, Side.right, "R0");
        R0_reg.Transpose().DrawNextTo(R0T, Side.under, "R0_reg");

        //#endregion

        // throw new Error("Method not implemented.");
    }

    private CalculateR0_reg(R0: Matrix): Matrix
    {
        let result: Array<number> = new Array<number>(R0.ColumnNumber);

        for (let i = 0; i < R0.ColumnNumber; i++)
        {
            result[i] = Math.abs(R0.numbers[0][i]);
        }

        result = result.sort();

        return new Matrix([result]);
    }
}