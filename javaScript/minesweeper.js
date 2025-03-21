import { fetchManager } from "./api.js"
import { Game, Cell } from "./game.js"

// const CELL_CLOSED = 0,
//     CELL_OPENED = 1,
//     CELL_MARKED = 2;
// BASE_URL_API = "https://shadify.yurace.pro/api/minesweeper/generator?start=4-5";


class Minesweeper extends Game {

    constructor(name, fetchManager) {
        super(name);
        this.initGame(fetchManager, fetchManager.gameTypes.Minesweeper);
    }

    initBoard() {
        let initCoords = this.data.start;
        let index = initCoords.indexOf("-");
        this.startx = parseInt(initCoords.substring(0, index)) - 1; // posicion inicial desde 1 a width, restamos 1 para homogeneizar
        this.starty = parseInt(initCoords.substring(index + 1)) - 1;
        this.mines = this.data.mines;
        this.canvasFather = document.getElementById("playminesweeper");
    }

    generateGame() {
        let cellList = [];
        for (let width = 0; width < this.size; width++) {
            for (let height = 0; height < this.size; height++) {
                cellList.push(new Cell(
                    this.canvas, this.context,
                    this.boxSize, this.offset,
                    this.data.board[width][height], //TODO fila / columna ??
                    width, height,
                    this.boxColor, this.textColor
                ));
            }
        }
        this.initBoard();
        return cellList;
    }

    //dibujar tablero completo en su estado actual
    renderGrid() {
        this.context.font = "25px Arial";
        let aux = "";
        for (let cell of this.cellList) {
            if (cell.getState() == cell.cellStates.Marked) {
                aux += cell.getState() + " ";
                cell.render("F"); //dibuja la bandera
            } else {
                if (cell.getState() == cell.cellStates.Close) {
                    cell.renderCell(); // dibujar solo la caja
                } else {
                    cell.render(); // dibuja caja y contenido
                }
            }
        }
        console.log("cell.getState(): " + aux);
    }

    updateInput(key) {
        //actualizar cursor si es tecla de movimiento
        this.updateSelectedCell(key);

        //procesar resto de pulsaciones (teclas F y espacio)
        this.processKey(key);
    }

    //actualizar cursor si es tecla de movimiento
    updateSelectedCell(key) {
        // si el juego esta cargado y activo
        if (this.hasFinishCreatingGame && this.canvasFather.style.visibility != "hidden") {
            this.setCellColor(this.selectedCell[1], this.selectedCell[0], this.boxColor);
            switch (key) {
                case "ArrowUp":
                    this.selectedCell[1]--; //[1] es para arriba y abajo
                    if (this.selectedCell[1] < 0) { //si se pasa de los bordes
                        this.selectedCell[1] = this.size - 1; //que aparezca por el otro lado
                    }
                    break;
                case "ArrowDown":
                    this.selectedCell[1]++;
                    if (this.selectedCell[1] >= this.size) {
                        this.selectedCell[1] = 0;
                    }
                    break;
                case "ArrowRight":
                    this.selectedCell[0]++; //[0] es para izquierda y derecha
                    if (this.selectedCell[0] >= this.size) {
                        this.selectedCell[0] = 0;
                    }
                    break;
                case "ArrowLeft":
                    this.selectedCell[0]--;
                    if (this.selectedCell[0] < 0) {
                        this.selectedCell[0] = this.size - 1;
                    }
                    break;
            }
            this.setCellColor(this.selectedCell[1], this.selectedCell[0], this.selectBoxColor);
            this.renderGrid();
        }
    }

    //procesar resto de pulsaciones (teclas F y espacio)
    processKey(key) {
        let state = this.getCellState(this.selectedCell[1], this.selectedCell[0]);
        if (state != this.cellList[0].cellStates.Open) {
            if (key == " ") {
                if (state == this.cellList[0].cellStates.Close) {
                    this.setCellState(this.selectedCell[1], this.selectedCell[0], this.cellList[0].cellStates.Open);
                    this.openCell(this.selectedCell[1], this.selectedCell[0]);
                    this.renderGrid();
                }
            }
            if (key == "f" || key == "F") {
                console.log("state: " + state);
                if (state == this.cellList[0].cellStates.Marked) {
                    this.setCellState(this.selectedCell[1], this.selectedCell[0], this.cellList[0].cellStates.Close);
                    this.renderGrid();
                } else {
                    this.setCellState(this.selectedCell[1], this.selectedCell[0], this.cellList[0].cellStates.Marked);
                    this.renderGrid();
                }
            }
        }
    }


    // Inicia el estado del tablero a todos cerrados
    // async #initMinesweeperBoard() { 
    //     this.#boardState = new Array(this.size);
    //     for (let y = 0; y < this.height; y++) {
    //         this.#boardState[y] = new Array(this.width).fill(CELL_CLOSED);
    //     }
    //     this.openCell(this.starty, this.startx); //abrir la celda inicial
    // }

    // getCellText(y, x) {
    //     return this.board[y][x];
    // }

    // getCellState(y, x) {
    //     return this.#boardState[y][x];
    // }

    // setCellState(y, x, state) {
    //     this.#boardState[y][x] = state;
    // }

    // abrir y procesar celdas alrededor de x,y, devolver true si hay bomba, false si no
    openCell(x, y) {
        let bomb = false;
        if (this.getCellState(x, y) == this.cellList[0].cellStates.Close) {
            // this.setCellState(y, x, CELL_OPENED);
            for (let posy = y - 1; posy <= y + 1; posy++) {
                for (let posx = x - 1; posx <= x + 1; posx++) {
                    if (posx > -1 && posy > -1 && posx < this.width && posy < this.height) {
                        if (this.getCellState(posy, posx) == this.cellList[0].cellStates.Close) {
                            this.setCellState(posy, posx, this.cellList[0].cellStates.Open);
                            if (this.getCellText(y, x) == "x") {
                                bomb = true;
                            }
                        }
                    }
                }
            }
        }
        return bomb;
    }

    contarCeldasPendientes() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                //si esta cerrada y tiene bomb no se cuenta
            }
        }
    }

    // Contar minas alrededor de una celda
    countMinesAround(x, y) {
        let mineCount = 0;

        //recorremos la cuadricula completa de la celda en cuestion
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const r = x + i;
                const c = y + j;

                //comprobamos que no nos salimos del tablero
                if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c].classList.contains('mine')) {
                    mineCount++;
                }
            }
        }
        return mineCount;
    }

    switchCellMark(x, y) {
        if (this.getCellState(y, x) == CELL_MARKED) {
            this.setCellState(CELL_CLOSED)
        } else {
            this.setCellState(CELL_MARKED);
        }
    }

    // drawCell(y, x) {
    //     this.context.font = "25px Arial";
    //     let color=this.boxColor;
    //     if (y==this.starty && x==this.startx) {
    //         color="green";
    //         console.log("posicion inicial green");
    //     }
    //     this.context.fillStyle = color;

    //     // dibuja el fondo de la celda
    //     this.context.fillRect((
    //         this.boxSize + this.offset) * x + this.offset, 
    //         (this.boxSize + this.offset) * y + this.offset, this.boxSize, this.boxSize);

    //     // dibuja el contenido de la celda
    //     this.context.fillStyle = this.textColor;
    //     let content="";
    //     let state = this.getCellState(y, x);
    //     switch (state) {
    //         case CELL_CLOSED: 
    //             content="";
    //             break;
    //         case CELL_MARKED: 
    //             content="F";
    //             break;
    //         case CELL_OPENED: 
    //             content = this.getCellText(y, x);
    //             break;
    //     }
    //     this.context.fillText(
    //         content, 
    //         (this.boxSize + this.offset) * x + (this.boxSize / 2), 
    //         (this.boxSize + this.offset) * y + (this.boxSize));
    // }

    // drawBoard() {
    //     for (let y = 0; y < this.height; y++) {
    //         for (let x = 0; x < this.width; x++) {
    //             this.drawCell(y, x); 
    //         }
    //     }
    // }

}

let minesweeper = new Minesweeper("minesweeperCanvas", fetchManager);
document.addEventListener("keydown",
    function (kd) {
        minesweeper.updateInput(kd.key);
    });

/* que deberia tener el loop
gameover =enjuego
mientras gameover=enjuego
    si click
        calcular posicion x,y de celda
        si leftclick 
            si abrirCelda(x,y)==bomb
                gameover=perdedor
            sino 
                si CeldasRestantes=0
                    gameover=ganador
        si rightclick
            marcarCelda(x,y)
fin mientras
*/


