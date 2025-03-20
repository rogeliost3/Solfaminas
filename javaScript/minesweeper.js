import { fetchManager } from "./api.js"
import { Game } from "./game.js"

const CELL_CLOSED = 0,
    CELL_OPENED = 1,
    CELL_MARKED = 2;
// BASE_URL_API = "https://shadify.yurace.pro/api/minesweeper/generator?start=4-5";


class Minesweeper extends Game {
    #boardState; // array de estado de las casillas del tablero 
    constructor(name, fetchManager) {
        super(name);
        this.initGame(fetchManager, fetchManager.gameTypes.Minesweeper);
    }

    generateGame() {
        console.log("--Creando nuevo juego");
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
        console.log("--Inicializando estado del tablero");
        console.log("tamaño: " + this.width + "/" + this.height);
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
            this.setStateCell(y, x, CELL_OPENED);
            for (let posy = y - 1; posy < y + 2; posy++) {
                for (let posx = x - 1; posx < x + 2; posx++) {
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

    /*async #callNewGameAPI() {

    // construir url de busqueda
    const finalUrl = new URL(BASE_URL_API);

    // console.log("url: "+finalUrl.toString()); 

    try {
        const response = await fetch(finalUrl.toString());
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error: " + error);
        return null;
    }
}*/

    drawCell(y, x) { //de momento no dibuja nada, solo devuelve una string para consola
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

    /*drawBoardFromApi() {
        this.context.font = "25px Arial";
        for (let width = 0; width < 9; width++) {
            for (let height = 0; height < 9; height++) {

                this.context.fillStyle = this.boxColor;
                this.context.fillRect((
                    this.boxSize + this.offset) * width + this.offset, 
                    (this.boxSize + this.offset) * height + this.offset, this.boxSize, this.boxSize);

                this.context.fillStyle = this.textColor;
                if (this.board[height][width] != 0) {
                    this.context.fillText(
                        this.board[height][width], 
                        (this.boxSize + this.offset) * width + (this.boxSize / 2), 
                        (this.boxSize + this.offset) * height + (this.boxSize));
                }
            }
        }
    }*/

}
let minesweeper = new Minesweeper("minesweeperCanvas",fetchManager);
// async function main() {
//     const ms = new Minesweeper();
//     await ms.createNewMinesweeper();
//     ms.drawBoard();

//     setTimeout(() => {

//         if (ms.openCell(2, 3)) {
//             console.log("BOMBA!");
//         } else
//             console.log("VACIO");
//         ms.drawBoard();

//     }, 3000);
// }

// main();
