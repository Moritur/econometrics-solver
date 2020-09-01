import { Solver } from "./Solver";
import { MatrixRows, Matrix, Side } from "../Matrix";
import { Utils } from "../Utils";

export class MNKSolver extends Solver
{
    public constructor()
    {
        super(["A0mult", "matrixYXX"]);
    }

    protected HandleInput(inputEvent: InputEvent): void
    {
        this.ClearInputErrors();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        let a0mult: number = Number(this.GetInputValue("A0mult"));
        const YXX: Matrix = Matrix.FromString(this.GetInputValue("matrixYXX"));

        //#region validate input

        //#region A0mult
        if (this.GetInputValue("A0mult") == "")
        {
            this.DisplayInputError("A0mult", Solver.notNumberError);
            return;
        }

        if (isNaN(a0mult))
        {
            a0mult = Number(this.GetInputValue("A0mult").replace(',', '.'));
            if (isNaN(a0mult))
            {
                this.DisplayInputError("A0mult", Solver.notNumberError);
                return;
            }
        }
        //#endregion
        //#region YXX
        if (YXX == null)
        {
            this.DisplayInputError("matrixYXX", Solver.notMatrixError);
            return;
        }
        //#endregion

        //#endregion
        //#region calculate

        const Y: Matrix = new Matrix([Utils.CopyArray(YXX.numbers[0])]).Transpose();
        const X: Matrix = this.CalculateX(YXX, a0mult);
        const Xt: Matrix = X.Transpose();
        const XtX: Matrix = Xt.MultiplyMatrix(X);
        const XtY: Matrix = Xt.MultiplyMatrix(Y);
        const XtXinv: Matrix = XtX.Invert();

        //#endregion
        //#region display results

        X.Draw(Solver.drawStartPos, "X");
        Y.DrawNextTo(X, Side.right, "Y");
        Xt.DrawNextTo(X, Side.under, "Xᵀ");
        XtX.DrawNextTo(Xt, Side.right, "XᵀX");
        XtY.DrawNextTo(Xt, Side.under, "XᵀY");
        XtXinv.DrawNextTo(XtY, Side.right, "(XᵀX)⁻¹")

        //#endregion
    }

    private CalculateX(YXX: Matrix, a0mult: number): Matrix
    {
        const YXX_T: Matrix = YXX.Transpose();
        const rows: MatrixRows = new MatrixRows(YXX_T.RowNumber);

        for (let row = 0; row < YXX_T.RowNumber; row++)
        {
            rows[row] = new Array<number>(YXX_T.ColumnNumber);
            for (let col = 0; col < YXX_T.ColumnNumber; col++)
            {
                rows[row][col] = col == 0 ? a0mult : YXX_T.numbers[row][col];
            }
        }

        return new Matrix(rows);
    }
    
}