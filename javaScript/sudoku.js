import { fetchManager } from "./api.js"
import { Game } from "./game.js"
class Sudoku extends Game {
    constructor(name, fetchManager) {
        super(name);
        this.initGame(fetchManager, fetchManager.gameTypes.Sudoku);
    }

    generateGame() {
        this.context.font = "25px Arial";
        for (let width = 0; width < 9; width++) {
            for (let height = 0; height < 9; height++) {

                this.context.fillStyle = this.boxColor;
                this.context.fillRect((
                    this.boxSize + this.offset) * width + this.offset, 
                    (this.boxSize + this.offset) * height + this.offset, this.boxSize, this.boxSize);

                this.context.fillStyle = this.textColor;
                if (this.data.task[height][width] != 0) {
                    this.context.fillText(
                        this.data.task[height][width], 
                        (this.boxSize + this.offset) * width + (this.boxSize / 2), 
                        (this.boxSize + this.offset) * height + (this.boxSize));
                }
            }

        }
    }
}

let sudoku = new Sudoku("sudoku",fetchManager);
