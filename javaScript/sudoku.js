import { fetchManager } from "./api.js"
import { Game, Cell } from "./game.js"
class Sudoku extends Game {
    constructor(name, fetchManager) {
        super(name);
        this.initGame(fetchManager, fetchManager.gameTypes.Sudoku);
        this.canvasFather = document.getElementById("playsudoku");
        this.xTest = 0;
        this.yTest = 0;
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
            console.log(this.xTest);
            this.setCellColor(this.xTest,this.yTest,"green");
            this.setCellText(this.xTest,this.yTest,"🏱︎");
            this.setCellTextColor(this.xTest,this.yTest,"red");
            this.xTest++;
            if(this.xTest >= 9) this.xTest = 0;
            this.yTest++;
            if(this.yTest >= 9) this.yTest = 0;
        }
    }
}

let sudoku = new Sudoku("sudokuCanvas", fetchManager);

function SudokuGameloop() {
    window.requestAnimationFrame(SudokuGameloop);
    sudoku.update();
}

SudokuGameloop();

