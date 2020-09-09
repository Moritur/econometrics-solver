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
            else { this.DisplayInputError("R0", Solver.notVectorError); return; }
        }
        //#endregion
        //#region R & R0
        if (R.ColumnNumber != R0.ColumnNumber)
        {
            this.DisplayInputError("R", "R ma inną ilość kolumn niż R0");
            this.DisplayInputError("R0", "R0 ma inną ilość kolumn niż R");
            return;
        }
        //#endregion
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

        const combinations: MatrixRows = this.CalculateCombinations(R.RowNumber);
        const H_sj: Matrix = this.CalculateH_sj(R, R0, combinations);
        const H_s: Array<number> = this.CalculateH_s(H_sj);
        const bestH: number = CatalysisEffectSolver.GetGreatestNumberIndex(H_s);

        //#endregion
        //#region display results

        R.Draw(Solver.drawStartPos, "R");
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
                    const RijText: string = `R${Utils.NumberToSubscript(row + 1)} ${Utils.NumberToSubscript(col + 1)}`;
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

        //#region hellwig
        const hellwigLineY = R_reg.LastDrawPosition.y + R_reg.PixelHeight + 25;
        const hellwigStartPos: Vector2 = new Vector2(0, hellwigLineY);
        CanvasHelper.DrawLine(hellwigStartPos, new Vector2(CanvasHelper.sharedContext.canvas.width, hellwigLineY), Solver.separatingLineThickness);

        H_sj.Draw(Vector2.Add(hellwigStartPos, Solver.drawStartPos), "Hₛⱼ");

        let hellwigAnswerDraw: Vector2 = Vector2.Add(hellwigStartPos, new Vector2(H_sj.PixelWidth + Matrix.matrixPixelMargin + 10, 0))

        hellwigAnswerDraw = Vector2.Add(hellwigAnswerDraw, new Vector2(0, Solver.lineMargin));
        CanvasHelper.DrawText("Integralna pojemność informacyjna podzbiorów:", hellwigAnswerDraw, 18, "left");

        for (let i = 0; i < H_s.length; i++)
        {
            hellwigAnswerDraw = Vector2.Add(hellwigAnswerDraw, new Vector2(0, Solver.lineMargin));
            const Hi = this.Round(H_s[i]);
            const Ci: Array<number> = combinations[i];
            const iSubscript: string = Utils.NumberToSubscript(i + 1);
            let CiText: string = "{";

            for (let j = 0; j < Ci.length; j++)
            {
                CiText += 'X' + Utils.NumberToSubscript(Ci[j] + 1) + (j + 1 < Ci.length ? ',' : '}');
            }

            CanvasHelper.DrawText(`C${iSubscript}=${CiText} H${iSubscript}=${Hi}`, hellwigAnswerDraw, 18, "left");
        }

        let hellwigAnswerText: string = "Najlepszym w sensie Hellwiga podzbiorem zmiennych objaśniających jest {";

        for (let i = 0; i < H_sj.ColumnNumber - 1; i++)
        {
            hellwigAnswerText += ('X' + Utils.NumberToSubscript(combinations[bestH][i] + 1) + ((i + 1 < H_sj.ColumnNumber - 1) ? ", " : '}'));
        }

        hellwigAnswerDraw = Vector2.Add(hellwigAnswerDraw, new Vector2(0, Solver.lineMargin * 2));
        CanvasHelper.DrawText(hellwigAnswerText, hellwigAnswerDraw, 18, "left");
        //#endregion
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

        for (let i = 0; i < R_reg.RowNumber; i++)
        {
            Rij_arr[i] = new Array<number>(R_reg.ColumnNumber);
            Ri_Rj[i] = new Array<number>(R_reg.ColumnNumber);
            for (let j = i + 1; j < R_reg.ColumnNumber; j++)
            {
                const i_reg = Utils.GetElementIndex(xOrderInR0_reg, i);
                const j_reg = Utils.GetElementIndex(xOrderInR0_reg, j);
                const Rij: number = R_reg.numbers[i_reg][j_reg];
                const Ri = R0_reg.numbers[0][i_reg];
                const Rj = R0_reg.numbers[0][j_reg];
                Rij_arr[i][j] = Rij;
                Ri_Rj[i][j] = null;

                if (Rij < 0)
                {
                    catalysisPairs.push(new CatalysisPair(i, j, (Ri > Rj)));
                }
                else
                {
                    let testValue: number;

                    testValue = (Ri < Rj) ? Ri / Rj : Rj / Ri;
                    Ri_Rj[i][j] = testValue;
                    
                    if (Rij > testValue) catalysisPairs.push(new CatalysisPair(i, j, (Ri < Rj)));
                }
            }
        }

        return [catalysisPairs, Rij_arr, Ri_Rj];
    }

    private CalculateH_sj(R: Matrix, R0: Matrix, combinations: MatrixRows): Matrix
    {
        const rows: MatrixRows = new MatrixRows(R.RowNumber);
        for (let i = 0; i < rows.length; i++) rows[i] = new Array<number>(R.ColumnNumber - 1);

        for (let col = 0; col < R.ColumnNumber; col++)
        {
            for (let row = 0; row < R.RowNumber; row++)
            {
                const j: number = row;
                if (!Utils.IsElementInArray(combinations[col], row))
                {
                    rows[row][col] = 0;
                }
                else
                {
                    let Rij_sum = 0;
                    for (let i = 0; i < R.ColumnNumber; i++)
                    {
                        if (Utils.IsElementInArray(combinations[col], i))
                        {
                            Rij_sum += Math.abs(R.numbers[j][i]);
                        }
                    }

                    rows[row][col] = (R0.numbers[0][j] * R0.numbers[0][j]) / Rij_sum;
                }
            }
        }


        return new Matrix(rows);
    }

    private CalculateCombinations(numberOfXs: number): MatrixRows
    {
        const combinations: MatrixRows = new MatrixRows(numberOfXs);

        const first: Array<number> = new Array<number>(numberOfXs - 1);
        for (let i = 0; i < numberOfXs - 1; i++)
        {
            first[i] = i;
        }
        combinations[0] = first;

        for (let i = 1; i < numberOfXs; i++)
        {
            const next: Array<number> = Utils.CopyArray(combinations[i - 1]);
            next[next.length - i] += 1;
            combinations[i] = next;
        }

        return combinations;
    }

    private CalculateH_s(H_sj: Matrix): Array<number>
    {
        const result: Array<number> = new Array<number>(H_sj.ColumnNumber);

        for (let col = 0; col < H_sj.ColumnNumber; col++)
        {
            let H: number = 0;
            for (let row = 0; row < H_sj.RowNumber; row++)
            {
                H += H_sj.numbers[row][col];
            }

            result[col] = H;
        }

        return result;
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