import { Vector2 } from "./Vector2";
import { CanvasHelper } from "./CanvasHelper";

type offset = { value: number; };
export type MatrixRows = Array<Array<number>>;
export const MatrixRows = class extends Array<Array<number>> { };

export enum Side { above, under, left, right }

/** Class representing a matrix */
export class Matrix
{
    //#region config
    private static readonly cellPixelSize: number = 40;
    private static readonly labelPixelMargin: number = 6;
    private static readonly matrixPixelMargin: number = 12;
    private static readonly cellContentFont: string = "11px sans-serif";
    private static readonly labelFont: string = "bold 14px sans-serif";
    //#endregion

    /** Numbers contained in matrix. Access them like numbers[row][column] */
    public readonly numbers: ReadonlyArray<ReadonlyArray<number>>;
    /* like this:
    [0,0][0,1][0,2]
    [1,0][1,1][1,2]
    [2,0][2,1][2,2]
    */
    
    //#region properties

    /** Number of rows in this matrix */
    public get RowNumber(): number { return this.numbers.length; }
    
    /** Number of columns in this matrix */
    public get ColumnNumber(): number { return this.numbers[0].length; }

    /** Is this matrix square? */
    public get IsSquare(): boolean { return this.RowNumber == this.ColumnNumber; }

    /** Number of pixels this matrix takes on y axis of canvas when drawn using this.Draw */
    public get PixelWidth(): number { return this.ColumnNumber * Matrix.cellPixelSize; }

    /** Number of pixels this matrix takes on x axis of canvas when drawn using this.Draw */
    public get PixelHeight(): number { return (this.RowNumber * Matrix.cellPixelSize) +  Matrix.labelPixelMargin}

    //#endregion

    private _lastDrawPosition: Vector2 = null;
    
    /** Last position on which this Matrix was drawn. Null if it wasnt drawn yet */
    public get LastDrawPosition(): Vector2 { return this._lastDrawPosition; }

    public constructor(rows: MatrixRows)
    {
        const columnNumber: number = rows[0].length;
        const rowsCopy: MatrixRows = new MatrixRows(rows.length);

        for (let row = 0; row < rows.length; row++)
        {
            rowsCopy[row] = new Array<number>(columnNumber);
            if (rows[row].length != columnNumber) throw Error("Inconsistent column number between rows in a matrix");

            for (let col = 0; col < columnNumber; col++)
            {
                rowsCopy[row][col] = rows[row][col];
                if (rows[row][col] == undefined || rows[row][col] == null) throw new Error("Cell content in matrix can't be null/undefined")
            }
        }

        this.numbers = rowsCopy;
    }

    /** Draws this matrix on HTML canvas using provided rendering context and position
     * @param position position where drawing starts (upper left corner)
     * @param label optional label displayed above this matrix
     * @param context canvas context used to draw this matrix
    */
    public Draw(position: Vector2, label: string = "", context: CanvasRenderingContext2D = CanvasHelper.sharedContext): void
    {
        const originalTextAlign: CanvasTextAlign = context.textAlign;
        const originalFont: string = context.font;
        context.textAlign = "center";
        context.font = Matrix.cellContentFont;

        for (let rowNum = 0; rowNum < this.numbers.length; rowNum++) 
        {
            const row: ReadonlyArray<number> = this.numbers[rowNum];
            for (let colNum = 0; colNum < row.length; colNum++) 
            {
                const cell: number = row[colNum];
                const cellPosition: Vector2 = new Vector2(position.x + (Matrix.cellPixelSize * colNum), position.y + (Matrix.cellPixelSize * rowNum));

                context.beginPath();
                context.rect(cellPosition.x, cellPosition.y, Matrix.cellPixelSize, Matrix.cellPixelSize);
                context.stroke();
                context.fillText(parseFloat(cell.toFixed(3)).toString(), cellPosition.x + (Matrix.cellPixelSize / 2), cellPosition.y + (Matrix.cellPixelSize / 2));

            }
        }

        if (label !== "")
        {
            context.textAlign = "left";
            context.font = Matrix.labelFont;
            context.fillText(label, position.x, position.y - Matrix.labelPixelMargin);
        }

        context.textAlign = originalTextAlign;
        context.font = originalFont;
        this._lastDrawPosition = position;
    }

    /** Draws this matrix next to where other matrix was last drawn, making sure that they won't overlap
     * @param matrix matrix next to which this matrix will be drawn
     * @param side on which side of provided matrix this matric should be drawn
     * @param label optional label displayed above this matrix
     * @param context canvas context used to draw this matrix
     */
    public DrawNextTo(matrix: Matrix, side: Side, label: string = "", context: CanvasRenderingContext2D = CanvasHelper.sharedContext)
    {
        if (matrix.LastDrawPosition == null) throw Error("Can't draw next to matrix that wasn't drawn yet");

        let position: Vector2;

        switch (side) 
        {
            case Side.above:
                position = new Vector2(matrix.LastDrawPosition.x, matrix.LastDrawPosition.y - this.PixelHeight - (Matrix.matrixPixelMargin * 1.5));
                break;
            case Side.under:
                position = new Vector2(matrix.LastDrawPosition.x, matrix.LastDrawPosition.y + matrix.PixelHeight + (Matrix.matrixPixelMargin * 1.5));
                break;
            case Side.left:
                position = new Vector2(matrix.LastDrawPosition.x - this.PixelWidth - Matrix.matrixPixelMargin, matrix.LastDrawPosition.y);
                break;
            case Side.right:
                position = new Vector2(matrix.LastDrawPosition.x + matrix.PixelWidth + Matrix.matrixPixelMargin, matrix.LastDrawPosition.y);
                break;
        
            default:
                throw new Error("Unexpected side value");
                break;
        }

        this.Draw(position, label, context);
    }

    public toString(): string
    {
        let result: string = "";
        for (let i = 0; i < this.RowNumber; i++)
        {
            result += '[';
            for (let j = 0; j < this.ColumnNumber; j++)
            {
                result += this.numbers[i][j] + ((j +1 < this.ColumnNumber) ? ';' : '');
            }
            result += ']'
        }

        return result;
    }

    //#region from string

    /** Returns Matrix created from string fromated like "[1,2,3][4,5,6][7,8,9]" or null if string is not a valid matrix */
    public static FromString(input: string): Matrix
    {
        if (input.length <= 0) return null;

        const rows: MatrixRows = new MatrixRows();

        const offset: offset = { value: 0 };

        while (offset.value < input.length)
        {
            rows.push(this.ReadRow(input, offset));
        }

        let isValid: boolean = true;
        const columnNumber: number = rows[0].length;

        if (columnNumber <= 0) isValid = false;
        else
        {
            rows.forEach(row =>
            {
                if (row.length != columnNumber) isValid = false;
                row.forEach(value => { if (isNaN(value)) isValid = false; });
            });   
        }

        return isValid ? new Matrix(rows) : null;
    }

    private static ReadRow(input: string, offset: offset): Array<number>
    {
        const row: Array<number> = new Array<number>();
        if (input[offset.value] == '[') offset.value++;

        while (offset.value < input.length)
        {
            const currentChar: string = input[offset.value];

            if (currentChar == ']')
            {
                offset.value++;
                break;
            }
            else
            {
                row.push(this.ReadNumber(input, offset));
            }
        }

        return row;
    }

    private static ReadNumber(input: string, offset: offset): number
    {
        let value: string = '';

        while (offset.value < input.length)
        {
            const currentChar: string = input[offset.value];
            
            if (currentChar == ']') break;
            
            offset.value++;
            
            if (currentChar == ' ' || currentChar == ';') break;
            else value += currentChar == ',' ? '.' : currentChar;
        }

        return Number(value);
    }

    //#endregion

    //#region math

    /** Returns new matrix which is the result of transpose operation on this matrix */
    public Transpose(): Matrix
    {
        const newNumbers: MatrixRows = new MatrixRows(this.numbers[0].length);

        for (let i = 0; i < newNumbers.length; i++)
        {
            newNumbers[i] = new Array<number>(this.numbers.length);
        }

        for (let row = 0; row < this.numbers.length; row++)
        {
            for (let column = 0; column < this.numbers[0].length; column++)
            {
                newNumbers[column][row] = this.numbers[row][column];
            }
        }

        return new Matrix(newNumbers);
    }

    /** Returns new matrix which is the result of this matrix x matrix passed as an argument */
    public MultiplyMatrix(matrix: Matrix): Matrix
    {
        if (matrix.RowNumber != this.ColumnNumber) throw new Error("To multiply matrices first matrix must have number of columns equal to number of rows in second matrix");

        const rows = new MatrixRows(this.RowNumber);

        for (let i = 0; i < this.RowNumber; i++)
        {
            rows[i] = new Array<number>(matrix.ColumnNumber);
            for (let j = 0; j < matrix.ColumnNumber; j++)
            {
                let result: number = 0;
                for (let k = 0; k < this.ColumnNumber; k++)
                {
                    result += this.numbers[i][k] * matrix.numbers[k][j];
                }

                rows[i][j] = result;
            }
        }
        
        return new Matrix(rows);
    }

    /** Returns new matrix which is result of this matrix being multiplied by passed number */
    public MultiplyScalar(num: number): Matrix
    {
        const rows: MatrixRows = new MatrixRows(this.RowNumber);

        for (let i = 0; i < this.RowNumber; i++)
        {
            rows[i] = new Array<number>(this.ColumnNumber);
            for (let j = 0; j < this.ColumnNumber; j++)
            {
                rows[i][j] = this.numbers[i][j] * num;
            }
        }

        return new Matrix(rows);
    }

    /** Returns new matrix which is result of adding passed matrix to this Matrix */
    public Add(matrix: Matrix): Matrix
    {
        if (this.RowNumber != matrix.RowNumber || this.ColumnNumber != matrix.ColumnNumber) throw new Error("Only matrices of the same size can be added");

        const rows: MatrixRows = new MatrixRows(this.RowNumber)

        for (let rowNum = 0; rowNum < this.RowNumber; rowNum++)
        {
            rows[rowNum] = new Array<number>(this.ColumnNumber);
            for (let colNum = 0; colNum < this.ColumnNumber; colNum++)
            {
                rows[rowNum][colNum] = this.numbers[rowNum][colNum] + matrix.numbers[rowNum][colNum];
            }
        }

        return new Matrix(rows);
    }

    /** Calculates and returns determinant of this matrix. Throws error when called on matrix which is not square */
    public get Determinant(): number
    {
        if (!this.IsSquare) throw new Error("Only square matrices have determinant");

        if (this.ColumnNumber == 1)
        {
            return this.numbers[0][0];
        }
        else if (this.ColumnNumber == 2)
        {
            return (this.numbers[0][0] * this.numbers[1][1]) - (this.numbers[1][0] * this.numbers[0][1]);
        }
        else
        {
            let result: number = 0;
            let negate: boolean = false;
            
            for (let colNum = 0; colNum < this.ColumnNumber; colNum++)
            {
                const matrix: Matrix = this.GetPart(0, colNum);

                result += (negate ? -matrix.Determinant : matrix.Determinant) * this.numbers[0][colNum];
                negate = !negate;
            }

            return result;
        }
    }

    /** Returns new matrix which is this matrix but without selected row and column*/
    public GetPart(rowNum: number, colNum: number): Matrix
    {
        const rows: MatrixRows = new MatrixRows(this.RowNumber - 1);

        let copyRow: number = 0;
        for (let newRow = 0; newRow < rows.length; newRow++)
        {
            if (copyRow == rowNum) copyRow++;

            rows[newRow] = new Array<number>(this.ColumnNumber - 1);
            let copyCol: number = 0;
            for (let newCol = 0; newCol < rows[newRow].length; newCol++)
            {
                if (copyCol == colNum) copyCol++;

                rows[newRow][newCol] = this.numbers[copyRow][copyCol];
                copyCol++;
            }

            copyRow++;
        }

        return new Matrix(rows);
    }

    /** Calculates and returns inverse of this matrix or null if it is not invertible*/
    public Invert(): Matrix
    {
        if (!this.IsSquare) return null;
        else if (this.Determinant == 0) return null;
        else if (this.ColumnNumber == 1) return new Matrix([[1 / this.numbers[0][0]]]);
        else if (this.ColumnNumber == 2) return new Matrix([[this.numbers[1][1], -this.numbers[0][1]], [-this.numbers[1][0], this.numbers[0][0]]]).MultiplyScalar(1 / this.Determinant);
        else
        {
            const cofactorsRows: MatrixRows = new MatrixRows(this.RowNumber);

            {
                let negate: boolean = false;
                for (let rowNum = 0; rowNum < cofactorsRows.length; rowNum++)
                {
                    cofactorsRows[rowNum] = new Array<number>(this.ColumnNumber);

                    for (let colNum = 0; colNum < cofactorsRows[rowNum].length; colNum++)
                    {
                        const determiant = this.GetPart(rowNum, colNum).Determinant;
                        cofactorsRows[rowNum][colNum] = negate ? -determiant : determiant;

                        negate = !negate;
                    }
                }
            }

            const adjugate: Matrix = new Matrix(cofactorsRows).Transpose();

            return adjugate.MultiplyScalar(1 / this.Determinant);
        }
    }

    //#endregion
}