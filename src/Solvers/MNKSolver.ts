import { Solver } from "./Solver";
import { MatrixRows, Matrix, Side } from "../Matrix";
import { Utils } from "../Utils";
import { CanvasHelper } from "../CanvasHelper";
import { Vector2 } from "../Vector2";

var { jStat } = require('jstat')

export class MNKSolver extends Solver
{
    public constructor()
    {
        super(["alpha", "matrixYXX", "probability"]);

        // console.log(jStat.studentt.inv(0.995, 27));
        // console.log(jStat.centralF.inv(0.95, 5, 1));
    }

    protected HandleInput(inputEvent: InputEvent): void
    {
        this.ClearInputErrors();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        let alpha: Matrix = Matrix.FromString(this.GetInputValue("alpha"));
        const YXX: Matrix = Matrix.FromString(this.GetInputValue("matrixYXX"));
        let probabilityPercent: number = this.GetInputValueAsNumber("probability");

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
        //#region probability
        if (probabilityPercent == null || isNaN(probabilityPercent))
        {
            this.DisplayInputError("probability", Solver.notNumberError);
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
        if (XtXinv == null)
        {
            this.DisplayInputError("matrixYXX", "Macierzy XᵀX nie można odwrócić, pewnie błąd w przepisywaniu danych");
            return;
        }
        const a: Matrix = XtXinv.MultiplyMatrix(XtY);
        const y_hat: Matrix = this.CalculateY_hat(a, X);
        const e: Matrix = this.Calculate_e(Y, y_hat);
        const eTe: Matrix = e.Transpose().MultiplyMatrix(e);
        const n: number = X.RowNumber;
        const k: number = X.ColumnNumber - 1;
        const df = n - (k + 1);
        const S_sqr: number = eTe.numbers[0][0] / df;
        const D_sqr: Matrix = XtXinv.MultiplyScalar(S_sqr);

        const S_sqrForA: Matrix = this.CalculateSsqrForA(D_sqr);
        const S_forA: Matrix = this.CalcuakteSForA(S_sqrForA);
        const V_forA: Matrix = this.CalculateVForA(S_forA, a);

        const probability: number = probabilityPercent / 100;
        const t_forA: Matrix = this.CalculateTForA(S_forA, a);
        const t_stud: number = jStat.studentt.inv(1 - (probability / 2), df);

        const Yt: Matrix = Y.Transpose();
        const YtY: Matrix = Yt.MultiplyMatrix(Y);
        const y_avg: number = Y.Average;
        const R_sqr: number = this.CalculateR_sqr(eTe, YtY, y_avg, n);
        const F: number = this.CalculateF(R_sqr, n, k);
        const F_dist: number = jStat.centralF.inv(1 - probability, k, df);

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
        CanvasHelper.DrawText(`S²=${Number(S_sqr.toFixed(3))}`, Vector2.Add(eTe.LastDrawPosition, new Vector2(Matrix.cellPixelSize + Matrix.matrixPixelMargin, Matrix.labelPixelMargin)), 16, "left", "sans-serif", "black", "bold");
        D_sqr.DrawNextTo(XtY, Side.under, "D²(a)");

        //#endregion

        //#region b)
        //#region b
        const bDrawStartPos: Vector2 = this.DrawSeparatingVerticalLine(XtX);

        S_sqrForA.Draw(bDrawStartPos, "S²(a)");
        S_forA.DrawNextTo(S_sqrForA, Side.under, "S(a) (śr bł)");
        V_forA.DrawNextTo(S_forA, Side.under, "V(a) (śr wzg bł %)")

        {
            let drawPos: Vector2 = Vector2.Add(V_forA.LastDrawPosition, new Vector2(0, V_forA.PixelHeight + Matrix.matrixPixelMargin));
            for (let i = 0; i < V_forA.ColumnNumber; i++)
            {
                if (!isFinite(V_forA.numbers[0][i]) || isNaN(V_forA.numbers[0][i]))
                {
                    CanvasHelper.DrawText(`nie ma V(a) dla a${Utils.NumberToSubscript(i)}`, drawPos, 16, "left");
                    drawPos = Vector2.Add(drawPos, new Vector2(0, Solver.lineMargin));
                }
            }
        }

        //#endregion
        //#region bb

        const bbDrawStartPos: Vector2 = this.DrawSeparatingVerticalLine(S_sqrForA)
        S_sqrForA.Draw(bbDrawStartPos, "S²(a)");
        S_forA.DrawNextTo(S_sqrForA, Side.under, "S(a) (śr bł)");
        t_forA.DrawNextTo(S_forA, Side.under, "t(a)");
        const t_studDrawPos: Vector2 = Vector2.Add(t_forA.LastDrawPosition, new Vector2(0, (Matrix.cellPixelSize * 2)));
        CanvasHelper.DrawText(`t*=${this.Round(t_stud)}`, t_studDrawPos, 16, "left", "sans-serif", "black", "bold");
        
        let bbAnswerDraw: Vector2 = Vector2.Add(S_sqrForA.LastDrawPosition, new Vector2(S_sqrForA.PixelWidth + Matrix.matrixPixelMargin, 0));

        CanvasHelper.DrawText("H0: zmienna Xi jest nieistotna", bbAnswerDraw, 18, "left");
        bbAnswerDraw = Vector2.Add(bbAnswerDraw, new Vector2(0, Solver.lineMargin));;
        CanvasHelper.DrawText("H1: zmienna Xi ma statystycznie istotny wpływ na zmienną objaśnianą", bbAnswerDraw, 18, "left");

        for (let i = 0; i < t_forA.ColumnNumber; i++)
        {
            const acceptH0 = t_forA.numbers[0][i] < t_stud;
            const text: string = `t${Utils.NumberToSubscript(i)} ${acceptH0 ? '<' : '>'} t* `
                + `Z prawdopodobieństwem ${probabilityPercent}% ${acceptH0 ? "brak podstaw by odrzucić H0" : "należy odrzucić H0 na rzecz H1"}`;
            
            bbAnswerDraw = Vector2.Add(bbAnswerDraw, new Vector2(0, Solver.lineMargin));
            CanvasHelper.DrawText(text, bbAnswerDraw, 18, "left");
        }

        //#endregion
        //#region bbb

        const bbbLineY = t_studDrawPos.y + 25;
        const bbbLineStart = new Vector2(bbDrawStartPos.x - Matrix.matrixPixelMargin, bbbLineY);
        CanvasHelper.DrawLine(bbbLineStart, new Vector2(CanvasHelper.sharedContext.canvas.width, bbbLineY), Solver.separatingLineThickness);

        let bbbAnswerDraw: Vector2 = Vector2.Add(bbbLineStart, Solver.drawStartPos);
        CanvasHelper.DrawText("H0: nie ma takiej zmiennej Xi, któa ma statystycznie istotny wpływ na Y", bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2.Add(bbbAnswerDraw, new Vector2(0, Solver.lineMargin));
        CanvasHelper.DrawText("H1: jest taka zmienna Xi, któa ma statystycznie istotny wpływ na Y", bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2.Add(bbbAnswerDraw, new Vector2(0, Solver.lineMargin));
        CanvasHelper.DrawText(`ȳ=${this.Round(y_avg)}`, bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2.Add(bbbAnswerDraw, new Vector2(0, Solver.lineMargin));
        CanvasHelper.DrawText(`R²=${this.Round(R_sqr)}`, bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2.Add(bbbAnswerDraw, new Vector2(0, Solver.lineMargin));
        CanvasHelper.DrawText(`F=${this.Round(F)}`, bbbAnswerDraw, 18, "left");
        bbbAnswerDraw = Vector2.Add(bbbAnswerDraw, new Vector2(0, Solver.lineMargin));
        CanvasHelper.DrawText(`F*=${this.Round(F_dist)}`, bbbAnswerDraw, 18, "left");
        
        bbbAnswerDraw = Vector2.Add(bbbAnswerDraw, new Vector2(0, Solver.lineMargin));
        Yt.Draw(bbbAnswerDraw, "Yᵀ");
        YtY.DrawNextTo(Yt, Side.right, "YᵀY")
        bbbAnswerDraw = Vector2.Add(Yt.LastDrawPosition, new Vector2(0, YtY.PixelHeight + (Matrix.matrixPixelMargin * 2)));
        const acceptH0: boolean = F < F_dist;
        const bbbAnswerText: string = `Z prawdopodobieństwem ${probabilityPercent}% ${acceptH0 ? "brak podstaw by odrzucić H0" : "należy odrzucić H0 na rzecz H1"}`;
        CanvasHelper.DrawText(bbbAnswerText, bbbAnswerDraw, 18, "left");

        //#endregion
        //#region bbbb

        const bbbbLineY = bbbAnswerDraw.y + 25;
        const bbbbLineStart = new Vector2(bbDrawStartPos.x - Matrix.matrixPixelMargin, bbbbLineY);
        CanvasHelper.DrawLine(bbbbLineStart, new Vector2(CanvasHelper.sharedContext.canvas.width, bbbbLineY), Solver.separatingLineThickness);

        let bbbbAnswerDraw: Vector2 = Vector2.Add(bbbbLineStart, Solver.drawStartPos);
        CanvasHelper.DrawText("Wpółczynnik determinancji", bbbbAnswerDraw, 18, "left");
        bbbbAnswerDraw = Vector2.Add(bbbbAnswerDraw, new Vector2(0, Solver.lineMargin));
        const roundR_sqr = this.Round(R_sqr);
        CanvasHelper.DrawText(`R²=${roundR_sqr}   ${roundR_sqr * 100}% zmienności y jest objaśniane przez model`, bbbbAnswerDraw, 18, "left");

        //#endregion
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

    private CalculateTForA(S_forA: Matrix, a: Matrix): Matrix
    {
        const rows: MatrixRows = new MatrixRows(0);
        rows[0] = new Array<number>(S_forA.ColumnNumber);

        for (let i = 0; i < S_forA.ColumnNumber; i++)
        {
            rows[0][i] = Math.abs(a.numbers[i][0]) / S_forA.numbers[0][i];
        }

        return new Matrix(rows);
    }

    private CalculateR_sqr(eTe: Matrix, YtY: Matrix, y_avg: number, n: number): number
    {
        return 1 - (eTe.numbers[0][0] / (YtY.numbers[0][0] - (n * (y_avg * y_avg))));
    }

    private CalculateF(R_sqr: number, n: number, k: number): number
    {
        return ((R_sqr / (1 - R_sqr)) * ((n - k - 1) / k));
    }
}