import { fetchManager } from "./api.js"
import { Game, Cell } from "./game.js"

 const  CLOSE = 0,
        OPEN = 1,
        MARKED = 2;
// BASE_URL_API = "https://shadify.yurace.pro/api/minesweeper/generator?start=4-5";


class Minesweeper extends Game {

    constructor(name, fetchManager) {
        super(name);
        this.gameOver=false;
        this.initGame(fetchManager, fetchManager.gameTypes.Minesweeper);
    }

    initBoard() {
        //necesario para procesar las celdas
        this.width=this.data.width;
        this.height=this.data.height;

        //extraer coordenadas de la celda que debe aparecer abierta al inicio del juego.
        let initCoords = this.data.start;
        let index = initCoords.indexOf("-");
        this.startx = parseInt(initCoords.substring(0, index)) - 1; // posicion inicial desde 1 a width, restamos 1 para homogeneizar
        this.starty = parseInt(initCoords.substring(index + 1)) - 1;

        this.mines = this.data.mines;
        this.canvasFather = document.getElementById("playminesweeper");
    }

    generateGame() {
        let cellList = [];
        for (let col = 0; col < this.size; col++) {
            for (let row = 0; row < this.size; row++) {
                cellList.push(new Cell(
                    this.canvas, this.context,
                    this.boxSize, this.offset,
                    this.data.board[col][row], //TODO fila / columna ??
                    col, row,
                    this.boxColor, this.textColor
                ));
            }
        }
        this.initBoard();
        return cellList;
    }

    getRow() {
        return this.selectedCell[1];
    }

    getCol() {
        return this.selectedCell[0];
    }

    setRow(row) {
        this.selectedCell[1]=row;
    }

    setCol(col) {
        this.selectedCell[0]=col;
    }

    //dibujar tablero completo en su estado actual
    renderGrid() {
        this.context.font = "25px Arial";
        let aux = "";
        for (let cell of this.cellList) {

            //si la celda tiene bandera se considera aún cerrada
            if (cell.getState() == MARKED) {
                aux += cell.getState() + " ";
                cell.render("F");
            } else {

                //y si no es bandera se dibuja solo caja si esta cerrada o caja y contenido si ya abierta
                if (cell.getState() == CLOSE) {
                    cell.renderCell(); // dibujar solo la caja
                } else {
                    cell.render(); // dibuja caja y contenido de celda
                }
            }
        }
        console.log("Row: "+this.getRow()+" col: "+this.getCol());
    }

    //procesar pulsaciones de teclas
    updateInput(key) {
        // si el juego esta cargado y activo
        if (this.hasFinishCreatingGame && this.canvasFather.style.visibility != "hidden") {

            //mover cursor si es tecla de movimiento
            this.updateSelectedCell(key);

            //procesar resto de pulsaciones (teclas F y espacio)
            this.processKey(key);
        }
    }

    //mover cursor si es tecla de movimiento
    updateSelectedCell(key) {
        // console.log("Row: "+this.getRow()+" col: "+this.getRow());
        this.setCellColor(this.getRow(), this.getCol(), this.boxColor);
        switch (key) {
            case "ArrowUp":
                this.setRow(this.getRow()-1);
                if (this.getRow() < 0) {
                    this.setRow(this.size - 1);
                }
                break;
            case "ArrowDown":
                this.setRow(this.getRow()+1);
                if (this.getRow() >= this.size) {
                    this.setRow(0);
                }
                break;
            case "ArrowRight":
                this.setCol(this.getCol()+1); //[0] es para eje x
                if (this.getCol() >= this.size) {
                    this.setCol(0);
                }
                break;
            case "ArrowLeft":
                this.setCol(this.getCol()-1);
                if (this.getCol() < 0) {
                    this.setCol(this.size - 1);
                }
                break;
        }
        this.setCellColor(this.getRow(), this.getCol(), this.selectBoxColor);
        this.renderGrid();
    }

    //procesar resto de pulsaciones (teclas F y espacio)   
    processKey(key) {
        let state = this.getCellState(this.getRow(), this.getCol());
        if (state != OPEN) {
            if (key == " ") {
                if (state == CLOSE) {
                    //this.setCellState(this.getRow(), this.getCol(), OPEN);
                    const minesAround = this.countMinesAround(this.getRow(), this.getCol());
                    if (minesAround === 0) {
                        this.revealNeightborCells(this.getRow(), this.getCol());
                    } else {
                        this.revealAllMines();
                        alert('¡Game Over! Has pisado una mina.');
                        this.gameOver=true;
                    }
                    //this.openCell(this.getRow(), this.getCol());
                    this.renderGrid();
                }
            }
            if (key == "f" || key == "F") {
                this.switchCellMark(this.getRow(), this.getCol());
                this.renderGrid();
            }
        }
    }

    switchCellMark(y, x) {
        const state=this.getCellState(x, y);
        if (state == MARKED) {
            this.setCellState(x, y, CLOSE);
        } else {
            this.setCellState(x, y, MARKED);
        }
    }


    // Contar minas alrededor de una celda
    countMinesAround(row, col) {
        let mineCount = 0;

        //recorrer la cuadricula alrededor de row,col, incluida row,col
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {

                //calcula la fila y columna de la celda actual
                const r = row + dy;
                const c = col + dx;

                //comprobamos que no nos salimos del tablero y si es mina la contamos
                if (r >= 0 && r < this.height && c >= 0 && c < this.width && this.getCellText(r, c)=="x") {
                    mineCount++;
                }
            }
        }
        return mineCount;
    }

    revealAllMines() {
        //TODO revealAllMines()
    }

    // Revelar celdas vacías o con numeros adyacentes a row,col
    // Ojo: row,col ya se ha mirado antes de llamar a esta funcion y ya sabemos que no tiene mina.
    revealNeightborCells(row, col) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {

                //calcula la fila y columna de la celda
                const y = row + dy;
                const x = col + dx;

                //Si celda esta fuera del tablero no la comprueba
                if (y >= 0 && y < this.height && x >= 0 && x < this.width) {

                    //mirar estado de la celda
                    const state = this.getCellState(x, y);

                    //si ya está abierta no la procesa
                    if (state == this.CLOSE) { //TODO que pasa con las marcadas, se abren o se dejan marcadas?

                        //sino, la abre 
                        this.setCellState(x, y, this.OPEN);

                        //Al ser abierta mirar si su cuadricula tiene alguna mina
                        //si la tiene no hace nada ya que el proposito de esta funcion es solo revelar las vacias
                        if (countMinesAround(y, x) === 0) {

                            //si la cuadricula no tiene mina, abrir recursivamente cada celda alrededor de ella 
                            this.revealNeightborCells(y, x);
                        }
                    }
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
    /*openCell(x, y) {
        let bomb = false;
        if (this.getCellState(x, y) == CLOSE) {
            // this.setCellState(y, x, CELL_OPENED);
            for (let posy = y - 1; posy <= y + 1; posy++) {
                for (let posx = x - 1; posx <= x + 1; posx++) {
                    if (posx > -1 && posy > -1 && posx < this.width && posy < this.height) {
                        if (this.getCellState(posy, posx) == CLOSE) {
                            this.setCellState(posy, posx, OPEN);
                            if (this.getCellText(y, x) == "x") {
                                bomb = true;
                            }
                        }
                    }
                }
            }
        }
        return bomb;
    }*/

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
        minesweeper.updateInput(kd.key); //procesar pulsaciones de teclas
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


