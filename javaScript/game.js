import { fetchManager } from "./api.js"

class Game {
    constructor(name,boxColor = "white", textColor = "black") {
        this.boxColor = boxColor;
        this.textColor = textColor;
        //Set Canvas
        this.canvas = document.getElementById(name);

        //Set Context of Canvas
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerHeight / 2;
        this.canvas.height = window.innerHeight / 2;

        this.boxSize = this.canvas.width / 10;

        //Set the offset between boxes
        this.offset = this.boxSize / 9;

        //Resize canvas width and height to have enough space for a correct offset
        this.canvas.width = (window.innerHeight / 2) + this.offset;
        this.canvas.height = (window.innerHeight / 2) + this.offset;

        
    }

    initGame(fetchManager,gameType) {
        fetchManager.getGameData(gameType).then((fetchData) => {
            this.data = fetchData;
            this.generateGame();
        });
    }

    generateGame() {
        for (let width = 0; width < 9; width++) {
            for (let height = 0; height < 9; height++) {

                this.context.fillStyle = this.boxColor;
                this.context.fillRect(
                    (this.boxSize + this.offset) * width + this.offset,
                    (this.boxSize + this.offset) * height + this.offset,
                    this.boxSize, this.boxSize);
            }
        }
    }
}

export {Game};

//let sudoku = new Game("sudoku",fetchManager,fetchManager.gameTypes.Sudoku);