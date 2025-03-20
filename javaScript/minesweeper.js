const   CELL_CLOSED = 0,
        CELL_OPENED = 1,
        CELL_MARKED = 2;
        BASE_URL_API="https://shadify.yurace.pro/api/minesweeper/generator?start=4-5";

// const dataAPI = { // Estructura que devuelve la API, se hara a traves de una funcion
//     "start": "3-5",
//     "width": 9,
//     "height": 9,
//     "board": [
//         ["o", "o", "1", "x", "3", "x", "2", "x", "2"],
//         ["1", "1", "1", "2", "x", "2", "2", "2", "x"],
//         ["x", "1", "o", "1", "1", "1", "o", "1", "1"],
//         ["1", "1", "o", "o", "o", "o", "o", "o", "o"],
//         ["o", "o", "o", "1", "1", "1", "o", "o", "o"],
//         ["2", "2", "1", "1", "x", "1", "o", "o", "o"],
//         ["x", "x", "2", "2", "1", "1", "o", "1", "1"],
//         ["x", "4", "x", "1", "o", "o", "o", "1", "x"],
//         ["1", "2", "1", "1", "o", "o", "o", "1", "1"]
//     ],
//     "mines": 12
// }


class Minesweeper {
    #boardState; // array de estado de las casillas del tablero 

    constructor() {
        this.startx = 0;
        this.starty = 0;
        this.width = 0;
        this.height = 0;
        this.mines = 0;
        this.board = [];
    }

    async createNewGame() {
        console.log("--Creando nuevo juego");
        const dataAPI = await this.#callNewGameAPI();//llamada a la API por un nuevo juego  
        let initCoords=dataAPI["start"];   
        let index=initCoords.indexOf("-");
        this.startx = initCoords.substring(0,index);
        this.starty = initCoords.substring(index+1);
        this.width = dataAPI["width"];
        this.height = dataAPI["height"];
        this.mines = dataAPI["mines"];
        this.board = dataAPI["board"];
        // console.log(this.startx+" "+this.starty+" "+this.width+" "+this.height+" "+this.board);
        this.#initBoardState();
    }

    async #initBoardState() { // Inicia el estado del tablero a todos cerrados
        console.log("--Inicializando estado del tablero");
        console.log("tamaño: "+this.width+"/"+this.height);
        this.#boardState = new Array(this.height);
        for (let y = 0; y < this.height; y++) {
            this.#boardState[y] = new Array(this.width).fill(CELL_OPENED);
        }
        this.openCell(this.starty, this.startx); //abrir la celda inicial
    }

    openCell(y, x) { // abrir y procesar celdas alrededor de x,y, devolver true si hay bomba, false si no
        return false;
    }

    async #callNewGameAPI() {
        /*let data = { // Estructura que devuelve la API, se hara a traves de una funcion
            "start": "3-5",
            "width": 9,
            "height": 9,
            "board": [
                ["o", "o", "1", "x", "3", "x", "2", "x", "2"],
                ["1", "1", "1", "2", "x", "2", "2", "2", "x"],
                ["x", "1", "o", "1", "1", "1", "o", "1", "1"],
                ["1", "1", "o", "o", "o", "o", "o", "o", "o"],
                ["o", "o", "o", "1", "1", "1", "o", "o", "o"],
                ["2", "2", "1", "1", "x", "1", "o", "o", "o"],
                ["x", "x", "2", "2", "1", "1", "o", "1", "1"],
                ["x", "4", "x", "1", "o", "o", "o", "1", "x"],
                ["1", "2", "1", "1", "o", "o", "o", "1", "1"]
            ],
            "mines": 12
        }*/
        
        // construir url de busqueda
        const finalUrl=new URL(BASE_URL_API);

        // console.log("url: "+finalUrl.toString()); 

        try {
            const response = await fetch(finalUrl.toString());
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("error: "+error);
            return null;
        }
    }

    drawCell(y, x) { //de momento no dibuja nada, solo devuelve una string para consola
        let content = this.board[y][x];
        let state = this.#boardState[y][x];
        let temp = ""; // temporalmente modo texto
        //posicionarse en y,x
        switch (state) {
            case CELL_CLOSED: temp = "   "; //dibujar la celda cerrada
                break;
            case CELL_MARKED: temp = " F "; //dibujar la bandera  
                break;
            case CELL_OPENED: temp = " " + content + " "; //dibujar el numero         
        }
        return temp;
    }

    drawBoard() {
        for (let y = 0; y < this.height; y++) {
            let temp = "";
            for (let x = 0; x < this.width; x++) {
                //this.drawCell(x,y); Se hara cuando se pueda, de momento modo texto
                temp += this.drawCell(y,x);
                console.log(temp); //de momento lo mostramos en modo texto
            }
        }
    }

}

async function main () {
    const ms = new Minesweeper();
    await ms.createNewGame();
    ms.drawBoard();
}

main();
