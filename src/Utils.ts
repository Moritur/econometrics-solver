export namespace Utils
{
    export function TryRemoveFromArray<T>(array: T[], element: T): boolean
    {
        let foundElement: boolean = false;

        for (let i = 0; i < array.length; i++) 
        {
            if (array[i] === element)
            {
                foundElement = true;
                array.splice(i, 1);
                break;
            }
        }

        return foundElement;
    }

    /**Removes first occurrence of given object in an array */
    export function RemoveFromArray<T>(array: T[], element: T): void
    {
        if (!TryRemoveFromArray(array, element)) throw Error("Couldn't find specified element in the provided array");
    }

    /**Checks whether object is in an array and returns true if it is */
    export function IsElementInArray<T>(array: T[], element: T): boolean
    {
        let foundElement: boolean = false;
        for (let i = 0; i < array.length; i++) 
        {
            if (array[i] === element)
            {
                foundElement = true;
                break;
            }
        }

        return foundElement;
    }

    /**Removes object from an array at specified index */
    export function RemoveFromArrayAtIndex<T>(array: T[], index: number)
    {
        array.splice(index, 1);
    }

    /** Returns index of first ocurrence of given element in array. 
     * If element is not present in the array -1 is returned */
    export function GetElementIndex<T>(array: T[], element: T): number
    {
        for (let i = 0; i < array.length; i++)
        {
            if (array[i] == element) return i;
        }

        return -1;
    }

    /** Returns provided number as string in subscript */
    export function NumberToSubscript(value: number): string
    {
        if (value > 9 || value < 0 || !Number.isInteger(value)) throw new Error("Value must be integral number from range <0;9>");
        else return ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'][value]
    }
}