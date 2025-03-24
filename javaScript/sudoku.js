import { fetchManager } from "./api.js"
import { Game, Cell } from "./game.js"
class Sudoku extends Game {
    constructor(name, fetchManager) {
        super(name);
        this.initGame(fetchManager, fetchManager.gameTypes.Sudoku);
        this.canvasFather = document.getElementById("playsudoku");
        this.numbers = "123456789";

        this.correctCellList = [];
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
                    this.data.task[width][height] == 0 ? this.boxColor : "gray", this.textColor
                ));

                this.correctCellList.push(new Cell(
                    this.canvas, this.context,
                    this.boxSize, this.offset,
                    this.data.grid[width][height],
                    width, height,
                    "blue", this.textColor
                ));
            }
        }
        return cellList;
    }

    printYourMama() {
        console.log("Your mama");
    }
    updateInput(key) {
        this.updateSelectedCell(key);
        this.changeNumber(key);
    }

    changeNumber(key) {
        if (this.numbers.includes(key) && this.getCell(this.selectedCell[1], this.selectedCell[0]).firstColor != "gray") {
            this.setCellText(this.selectedCell[1], this.selectedCell[0], key);
        }
    }

    checkIfCorrect() {
        if (this.compareGrids()) {
            return ("Sudoku is correctly Finished");
        } else {
            return ("There is an error in the sudoku");
        }

    }

    compareGrids() {
        for(let index = 0; index < this.cellList.length; index++) {
            if(this.cellList[index].text != this.correctCellList[index].text) {
                console.log(index);
                console.log(this.cellList[index].text );
                console.log(this.correctCellList[index].text );
                return false;
            }
        }
        return true;
    }
}

let sudoku = new Sudoku("sudokuCanvas", fetchManager);
document.addEventListener(
    "keydown", function (kd) {
        sudoku.updateInput(kd.key);
    });

export { sudoku }
