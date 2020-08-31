import { Solver } from "./Solver";
import { Matrix, Side, MatrixRows } from "../Matrix";
import { Vector2 } from "../Vector2";
import { Utils } from "../Utils";
import { CanvasHelper } from "../CanvasHelper";

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
        //#region  calculate

        const tmpR0_reg_out: [Matrix, Array<number>] = this.CalculateR0_reg(R0);
        const R0_reg: Matrix = tmpR0_reg_out[0];
        const xOrderInR0_reg: Array<number> = tmpR0_reg_out[1];

        const R_reg: Matrix = this.CalculateR_reg(R, R0, R0_reg, xOrderInR0_reg);

        const tmpCatPar_out: [Array<CatalysisPair>, MatrixRows, MatrixRows] = this.FindCatalysisPairs(R_reg, R0_reg, xOrderInR0_reg);
        const catalysisPairs: Array<CatalysisPair> = tmpCatPar_out[0];
        const Rij: MatrixRows = tmpCatPar_out[1];
        const Ri_Rj: MatrixRows = tmpCatPar_out[2];

        //#endregion
        //#region display results

        R.Draw(new Vector2(10, 30), "R");
        // transpose R0 to draw it vertically, because that's how Dr Zając writes that
        const R0T = R0.Transpose();
        R0T.DrawNextTo(R, Side.right, "R0");
        R0_reg.Transpose().DrawNextTo(R0T, Side.under, "R0_reg");
        R_reg.DrawNextTo(R, Side.under, "R_reg");

        const topMargin = 50;
        const lineMargin = 25;
        const RijDrawX = R0T.LastDrawPosition.x + R0T.PixelWidth + 50;
        const RijCommentDrawX = RijDrawX + 100;
        const Ri_RjDrawX = RijCommentDrawX + 80;
        const Ri_RjCommentDrawX = Ri_RjDrawX + 110;

        {
            let iterations = 0;
            for (let row = 0; row < R.RowNumber; row++)
            {
                for (let col = row + 1; col < R.ColumnNumber; col++) 
                {
                    const RijValue: number = Rij[row][col];
                    const RijText: string = `R${Utils.NumberToSubscript(col + 1)} ${Utils.NumberToSubscript(row + 1)}`;
                    const drawY: number = topMargin + (iterations * lineMargin);
                
                    CanvasHelper.DrawText(`${RijText}= ${RijValue}`, new Vector2(RijDrawX, drawY), 18, "left");

                    if (RijValue < 0)
                    {
                        const text: string = `${RijText} < 0   W parze x${Utils.NumberToSubscript(row)} x${Utils.NumberToSubscript(col)} występuje efekt katalizy`;
                        CanvasHelper.DrawText(text, new Vector2(RijCommentDrawX, drawY), 18, "left");
                    }
                    else
                    {
                        CanvasHelper.DrawText(`${RijText} > 0`, new Vector2(RijCommentDrawX, drawY), 18, "left");

                        const Ri_RjValue: number = Ri_Rj[row][col];
                        const Ri_RjText: string = `R${Utils.NumberToSubscript(col + 1)}/R${Utils.NumberToSubscript(row + 1)}`;
                        const text: string = `${Ri_RjText}= ${Number(Ri_RjValue.toFixed(2))}`;
                        CanvasHelper.DrawText(text, new Vector2(Ri_RjDrawX, drawY), 18, "left");

                        const hasCatalysis: boolean = RijValue < Ri_RjValue;
                        let commentText: string = `${RijText} ${hasCatalysis ? '<' : '>'} ${Ri_RjText}     W parze x${Utils.NumberToSubscript(row)} `
                            + `x${Utils.NumberToSubscript(col)} ${hasCatalysis ? "" : "nie "}występuje efekt katalizy`;
                        CanvasHelper.DrawText(commentText, new Vector2(Ri_RjCommentDrawX, drawY), 18, "left");
                    }

                    iterations++;
                }
            }

            for (let i = 0; i < catalysisPairs.length; i++)
            {
                const drawY = (topMargin * 2) + ((iterations + i) * lineMargin);
                const catPair: CatalysisPair = catalysisPairs[i];
                const subI = Utils.NumberToSubscript(catPair.i + 1);
                const subJ = Utils.NumberToSubscript(catPair.j + 1);
                const text = `Katalizatorem w parze x${subI} x${subJ} jest x${catPair.isICatalyst ? subI : subJ}`;
                CanvasHelper.DrawText(text, new Vector2(RijDrawX, drawY), 18, "left");
            }
        }

        //#endregion
    }

    private CalculateR0_reg(R0: Matrix): [Matrix, Array<number>]
    {
        const absR0: Array<number> = new Array<number>(R0.ColumnNumber);
        const sortedR0: Array<number> = new Array<number>(R0.ColumnNumber);
        const R0ids: Array<number> = new Array<number>(R0.ColumnNumber);

        for (let i = 0; i < R0.ColumnNumber; i++)
        {
            absR0[i] = Math.abs(R0.numbers[0][i]);
        }
        
        const iterations = absR0.length;
        for (let i = 0; i < iterations; i++)
        {
            let index: number = CatalysisEffectSolver.GetGreatestNumberIndex(absR0);
            R0ids[i] = index;
            sortedR0[i] = absR0[index];
            absR0[index] = -1;
        }
        
        return [new Matrix([sortedR0]), R0ids];
    }

    private CalculateR_reg(R: Matrix, R0: Matrix, R0_reg: Matrix, xOrderInR0_reg: Array<number>): Matrix
    {
        const rows: MatrixRows = new MatrixRows(R.RowNumber);

        for (let row = 0; row < R.RowNumber; row++)
        {
            rows[row] = new Array<number>(R.ColumnNumber);
        }

        for (let row = 0; row < R.RowNumber; row++)
        {
            for (let col = row; col < R.ColumnNumber; col++)
            {
                if (col == row)
                {
                    rows[row][col] = 1;
                }
                else
                {
                    let value: number = R.numbers[xOrderInR0_reg[row]][xOrderInR0_reg[col]]

                    if (R0.numbers[0][xOrderInR0_reg[row]] < 0) value = -value; 
                    if (R0.numbers[0][xOrderInR0_reg[col]] < 0) value = -value; 

                    rows[row][col] = value;
                    rows[col][row] = value;
                }
            }
        }

        return new Matrix(rows);
    }

    /** Returns index of greatest number in provided array.
     * If same number appears multiple times returns index of its first occurrence
     */
    private static GetGreatestNumberIndex(array: ReadonlyArray<number>): number
    {
        let index: number = 0;
        for (let i = 0; i < array.length; i++)
        {
            if (array[i] > array[index]) index = i;
        }

        return index;
    }

    private FindCatalysisPairs(R_reg: Matrix, R0_reg: Matrix, xOrderInR0_reg: Array<number>): [Array<CatalysisPair>, MatrixRows, MatrixRows]
    {
        const catalysisPairs: Array<CatalysisPair> = new Array<CatalysisPair>();
        const Rij_arr: MatrixRows = new MatrixRows(R_reg.RowNumber);
        const Ri_Rj: MatrixRows = new MatrixRows(R_reg.RowNumber);

        for (let row = 0; row < R_reg.RowNumber; row++)
        {
            Rij_arr[row] = new Array<number>(R_reg.ColumnNumber);
            Ri_Rj[row] = new Array<number>(R_reg.ColumnNumber);
            for (let col = row + 1; col < R_reg.ColumnNumber; col++)
            {
                const Rij: number = R_reg.numbers[col][row];
                const Ri = R0_reg.numbers[0][Utils.GetElementIndex(xOrderInR0_reg, row)];
                const Rj = R0_reg.numbers[0][Utils.GetElementIndex(xOrderInR0_reg, col)];
                Rij_arr[row][col] = Rij;
                Ri_Rj[row][col] = null;

                if (Rij < 0)
                {
                    catalysisPairs.push(new CatalysisPair(row, col, (Ri > Rj)));
                }
                else
                {
                    let testValue: number;

                    testValue = (Ri < Rj) ? Ri / Rj : Rj / Ri;
                    Ri_Rj[row][col] = testValue;
                    
                    if (Rij > testValue) catalysisPairs.push(new CatalysisPair(row, col, (Ri < Rj)));
                }
            }
        }

        return [catalysisPairs, Rij_arr, Ri_Rj];
    }
}

class CatalysisPair
{
    public readonly i: number;
    public readonly j: number;
    public readonly isICatalyst: boolean;

    public constructor(i: number, j: number, isICatalyst: boolean)
    {
        this.i = i;
        this.j = j;
        this.isICatalyst = isICatalyst;
    }
}