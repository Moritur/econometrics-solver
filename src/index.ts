import { Program } from './Program';
import { CatalysisEffectSolver } from './Solvers/CatalysisEffectSolver';
import { MNKSolver } from './Solvers/MNKSolver';

let program;

switch (document.title) 
{
    case "Strona główna":
        // program = new Program();
        break;
    case "Efekt katalizy":
        program = new CatalysisEffectSolver();
        break;
    case "MNK":
        program = new MNKSolver();
        break;
    default:
        console.log("document title " + document.title + " doesn't match any case!");
        break;
}