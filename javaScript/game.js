import { fetchManager } from "./api.js"

class Game {
    constructor(name, fetchManager,gameType) {
        //Set Canvas
        this.canvas = document.getElementById(name);
        this.canvas.style.backgroundColor = "#FF0000";
        //Set Context of Canvas
        this.context = this.canvas.getContext('2d');
        this.context.font = "25px Arial";

        this.canvas.width = window.innerHeight / 2;
        this.canvas.height = window.innerHeight / 2;

        this.boxSize = this.canvas.width / 10;

        //Set the offset between boxes
        this.offset = this.boxSize / 9;

        //Resize canvas width and height to have enough space for a correct offset
        this.canvas.width = (window.innerHeight / 2) + this.offset;
        this.canvas.height = (window.innerHeight / 2) + this.offset;

        fetchManager.getGameData(gameType).then((fetchData) => {
            this.data = fetchData;
            this.generateGame();
        });
    }


    generateGame() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {

                this.context.fillStyle = "white";
                this.context.fillRect(
                    (this.boxSize + this.offset) * i + this.offset,
                    (this.boxSize + this.offset) * j + this.offset,
                    this.boxSize, this.boxSize);
            }
        }
    }
}

//let sudoku = new Game("sudoku",fetchManager,fetchManager.gameTypes.Sudoku);