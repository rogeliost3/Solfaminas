import { fetchManager } from "./api.js"
import { Game } from "./game.js"

const CELL_CLOSED = 0,
    CELL_OPENED = 1,
    CELL_MARKED = 2;
// BASE_URL_API = "https://shadify.yurace.pro/api/minesweeper/generator?start=4-5";


class Minesweeper extends Game {

    // array de estado de las casillas del tablero 
    #boardState; 

    constructor(name, fetchManager) {
        super(name);
        this.initGame(fetchManager, fetchManager.gameTypes.Minesweeper);
    }

    generateGame() {
        let initCoords = this.data.start;
        let index = initCoords.indexOf("-");
        this.startx = parseInt(initCoords.substring(0, index))-1; // posicion inicial desde 1 a width, restamos 1 para homogeneizar
        this.starty = parseInt(initCoords.substring(index + 1))-1; // posicion inicial desde 1 a height, restamos 1 para homogeneizar
        this.width = this.data.width;
        this.height = this.data.height;
        this.mines = this.data.mines;
        this.board = this.data.board;
        this.#initMinesweeperBoard();
        this.drawBoard();
    }

    // Inicia el estado del tablero a todos cerrados
    async #initMinesweeperBoard() { 
        this.#boardState = new Array(this.height);
        for (let y = 0; y < this.height; y++) {
            this.#boardState[y] = new Array(this.width).fill(CELL_CLOSED);
        }
        this.openCell(this.starty, this.startx); //abrir la celda inicial
    }

    getCellContent(y, x) {
        return this.board[y][x];
    }

    getStateCell(y, x) {
        return this.#boardState[y][x];
    }

    setStateCell(y, x, state) {
        this.#boardState[y][x] = state;
    }

    // abrir y procesar celdas alrededor de x,y, devolver true si hay bomba, false si no
    openCell(y, x) { 
        let bomb = false;
        if (this.getStateCell(y, x) == CELL_CLOSED) {
            // this.setStateCell(y, x, CELL_OPENED);
            for (let posy = y - 1; posy <= y + 1; posy++) {
                for (let posx = x - 1; posx <= x + 1; posx++) {
                    if (posx > -1 && posy > -1 && posx < this.width && posy < this.height) {
                        if (this.getStateCell(posy, posx) == CELL_CLOSED) {
                            this.setStateCell(posy, posx, CELL_OPENED);
                            if (this.getCellContent(y, x) == "x") {
                                bomb = true;
                            }
                        }
                    }
                }
            }
        }
        return bomb;
    }

    switchCellMark(y, x) {
        if (this.getStateCell(y, x)==CELL_MARKED) {
            this.setStateCell(CELL_CLOSED)
        } else {
            this.setStateCell(CELL_MARKED);
        }
    }

    drawCell(y, x) {
        this.context.font = "25px Arial";
        let color=this.boxColor;
        if (y==this.starty && x==this.startx) {
            color="green";
            console.log("posicion inicial green");
        }
        this.context.fillStyle = color;

        // dibuja el fondo de la celda
        this.context.fillRect((
            this.boxSize + this.offset) * x + this.offset, 
            (this.boxSize + this.offset) * y + this.offset, this.boxSize, this.boxSize);

        // dibuja el contenido de la celda
        this.context.fillStyle = this.textColor;
        let content="";
        let state = this.getStateCell(y, x);
        switch (state) {
            case CELL_CLOSED: 
                content="";
                break;
            case CELL_MARKED: 
                content="F";
                break;
            case CELL_OPENED: 
                content = this.getCellContent(y, x);
                break;
        }
        this.context.fillText(
            content, 
            (this.boxSize + this.offset) * x + (this.boxSize / 2), 
            (this.boxSize + this.offset) * y + (this.boxSize));
    }

    drawBoard() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.drawCell(y, x); 
            }
        }
    }

}

let minesweeper = new Minesweeper("minesweeperCanvas",fetchManager);