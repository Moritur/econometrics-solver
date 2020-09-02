import { Solver } from "./Solver";
import { MatrixRows, Matrix, Side } from "../Matrix";
import { Utils } from "../Utils";
import { CanvasHelper } from "../CanvasHelper";
import { Vector2 } from "../Vector2";

export class MNKSolver extends Solver
{
    public constructor()
    {
        super(["alpha", "matrixYXX"]);
    }

    protected HandleInput(inputEvent: InputEvent): void
    {
        this.ClearInputErrors();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        let alpha: Matrix = Matrix.FromString(this.GetInputValue("alpha"));
        const YXX: Matrix = Matrix.FromString(this.GetInputValue("matrixYXX"));

        //#region validate input

        //#region A0mult
        if (alpha == null)
        {
            this.DisplayInputError("matrixYXX", Solver.notMatrixError);
            return;
        }
        else if(alpha.RowNumber > 1)
        {
            if (alpha.ColumnNumber == 1)
            {
                alpha = alpha.Transpose();
            }
            else
            {
                this.DisplayInputError("alpha", Solver.notVectorError);
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
        else if (YXX.RowNumber != alpha.ColumnNumber)
        {
            this.DisplayInputError("alpha", "ilość rzędów nie zgada się z ilością liczb stojących przed α");
            return;
        }
        //#endregion

        //#endregion
        //#region calculate

        const Y: Matrix = new Matrix([Utils.CopyArray(YXX.numbers[0])]).Transpose();
        const X: Matrix = this.CalculateX(YXX, alpha.numbers[0][0]);
        const Xt: Matrix = X.Transpose();
        const XtX: Matrix = Xt.MultiplyMatrix(X);
        const XtY: Matrix = Xt.MultiplyMatrix(Y);
        const XtXinv: Matrix = XtX.Invert();
        const a: Matrix = XtXinv.MultiplyMatrix(XtY);
        const y_hat: Matrix = this.CalculateY_hat(a, X);
        const e: Matrix = this.Calculate_e(Y, y_hat);
        const eTe: Matrix = e.Transpose().MultiplyMatrix(e);
        const n: number = X.RowNumber;
        const k: number = X.ColumnNumber - 1;
        const S_sqr: number = eTe.numbers[0][0] / (n - (k + 1));
        const D_sqr: Matrix = XtXinv.MultiplyScalar(S_sqr);

        const S_sqrForA: Matrix = this.CalculateSsqrForA(D_sqr);
        const S_forA: Matrix = this.CalcuakteSForA(S_sqrForA);
        const V_forA: Matrix = this.CalculateVForA(S_forA, a);

        //#endregion
        //#region display results

        //#region a)

        X.Draw(Solver.drawStartPos, "X");
        Y.DrawNextTo(X, Side.right, "Y");
        y_hat.DrawNextTo(Y, Side.right, "ŷ");
        e.DrawNextTo(y_hat, Side.right, "e");
        Xt.DrawNextTo(e, Side.right, "Xᵀ");
        XtX.DrawNextTo(Xt, Side.right, "XᵀX");
        XtY.DrawNextTo(X, Side.under, "XᵀY");
        XtXinv.DrawNextTo(XtY, Side.right, "(XᵀX)⁻¹")
        a.DrawNextTo(XtXinv, Side.right, "a");
        eTe.DrawNextTo(a, Side.right, "eᵀe");
        CanvasHelper.DrawText(`S²=${S_sqr}`, Vector2.Add(eTe.LastDrawPosition, new Vector2(Matrix.cellPixelSize + Matrix.matrixPixelMargin, Matrix.labelPixelMargin)), 16, "left", "sans-serif", "black", "bold");
        D_sqr.DrawNextTo(XtY, Side.under, "D²(a)");

        //#endregion

        //#region b)

        // const bLineX: number = XtX.LastDrawPosition.x + XtX.PixelWidth + Matrix.matrixPixelMargin;
        // CanvasHelper.DrawLine(new Vector2(bLineX, 0), new Vector2(bLineX, CanvasHelper.sharedContext.canvas.height), 5);
        // const bDrawStartPos: Vector2 = new Vector2(bLineX + Matrix.matrixPixelMargin, Solver.drawStartPos.y);

        const bDrawStartPos: Vector2 = this.DrawSeparatingVerticalLine(XtX);

        S_sqrForA.Draw(bDrawStartPos, "S²(a)");
        S_forA.DrawNextTo(S_sqrForA, Side.under, "S(a) (śr bł)");
        V_forA.DrawNextTo(S_forA, Side.under, "V(a) (śr wzg bł %)")

        const bbDrawStartPos: Vector2 = this.DrawSeparatingVerticalLine(S_sqrForA)

        //#endregion
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
    
    private CalculateY_hat(a: Matrix, X: Matrix): Matrix
    {
        const rows: MatrixRows = new MatrixRows(X.RowNumber);

        for (let row = 0; row < X.RowNumber; row++)
        {
            rows[row] = new Array<number>(1);
            let y_hat: number = a.numbers[0][0];
            for (let col = 1; col < X.ColumnNumber; col++)
            {
                y_hat += a.numbers[col][0] * X.numbers[row][col];
            }
            rows[row][0] = y_hat;
        }

        return new Matrix(rows);
    }

    private Calculate_e(Y: Matrix, Y_hat: Matrix): Matrix
    {
        const rows: MatrixRows = new MatrixRows(Y.RowNumber);

        for (let row = 0; row < Y.RowNumber; row++)
        {
            rows[row] = [Y.numbers[row][0] - Y_hat.numbers[row][0]];
        }

        return new Matrix(rows);
    }

    private CalculateSsqrForA(D_sqr: Matrix): Matrix
    {
        const rows: MatrixRows = new MatrixRows(1);
        rows[0] = new Array<number>(D_sqr.ColumnNumber);

        for (let i = 0; i < D_sqr.ColumnNumber; i++)
        {
            rows[0][i] = D_sqr.numbers[i][i];
        }

        return new Matrix(rows);
    }

    private CalcuakteSForA(S_sqrForA: Matrix): Matrix
    {
        const rows: MatrixRows = new MatrixRows(1);
        rows[0] = new Array(S_sqrForA.ColumnNumber);

        for (let i = 0; i < S_sqrForA.ColumnNumber; i++)
        {
            rows[0][i] = Math.sqrt(S_sqrForA.numbers[0][i]);
        }

        return new Matrix(rows);
    }

    private CalculateVForA(S_forA: Matrix, a: Matrix): Matrix
    {
        const rows: MatrixRows = new MatrixRows(1);
        rows[0] = new Array<number>(S_forA.ColumnNumber);

        for (let i = 0; i < S_forA.ColumnNumber; i++)
        {
            rows[0][i] = Math.abs(S_forA.numbers[0][i] / a.numbers[i][0]) * 100;
        }

        return new Matrix(rows);
    }
}