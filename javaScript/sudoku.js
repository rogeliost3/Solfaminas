import { fetchManager } from "./api.js"
import { Game, Cell } from "./game.js"
class Sudoku extends Game {
    constructor(name, fetchManager) {
        super(name);
        this.initGame(fetchManager, fetchManager.gameTypes.Sudoku);
        this.canvasFather = document.getElementById("playsudoku");
    }

    generateGame() {
        let cellList = [];
        for (let width = 0; width < this.size; width++) {
            for (let height = 0; height < this.size; height++) {
                cellList.push(new Cell(
                    this.canvas, this.context,
                    this.boxSize, this.offset,
                    this.data.task[width][height] != 0 ? this.data.task[width][height] : "",
                    width, height,
                    this.boxColor, this.textColor
                ));
            }
        }
        return cellList;
    }

    update() {
        //Example test to showcase things
        if(this.hasFinishCreatingGame && this.canvasFather.style.visibility != "hidden") {

        }
    }
}

let sudoku = new Sudoku("sudokuCanvas", fetchManager);

function SudokuGameloop() {
    window.requestAnimationFrame(SudokuGameloop);
    sudoku.update();
}

SudokuGameloop();