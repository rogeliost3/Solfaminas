import { fetchManager } from "./api.js"

class Cell {
    constructor(canvas,context,size,offset,text = "",x = 0,y = 0, color = "white", textColor = "black") {
        this.x = x;
        this.y = y;
        this.color = color;
        this.textColor = textColor;

        this.canvas = canvas;
        this.context = context;

        this.size = size;
        this.offset = offset;

        this.text = text;

        
    }

    setColor(color) {
        this.color = color;
        this.render();
    }

    setTextColor(color) {
        this.textColor = color;
        this.render();
    }

    setText(text) {
        this.text = text;
        this.render();
    }

    renderCell() {
        this.context.fillStyle = this.color;
                this.context.fillRect(
                    (this.size + this.offset) * this.x + this.offset,
                    (this.size + this.offset) * this.y + this.offset,
                    this.size, this.size);
    }

    renderText() {
        this.context.fillStyle = this.textColor;
                    this.context.fillText(
                        this.text, 
                        (this.size + this.offset) * this.x + (this.size / 2), 
                        (this.size + this.offset) * this.y + (this.size));
                
    }

    render() {
        this.renderCell();
        this.renderText();
    }
}

class Game {
    constructor(name, boxColor = "white", textColor = "black") {
        this.boxColor = boxColor;
        this.textColor = textColor;
        //Set Canvas
        this.canvas = document.getElementById(name);
        this.canvas.style.backgroundColor = "red";
        //Set Context of Canvas
        this.context = this.canvas.getContext('2d');

        this.canvas.width = window.innerHeight / 2;
        this.canvas.height = window.innerHeight / 2;

        this.size = 9;

        this.boxSize = this.canvas.width / (this.size + 1);

        //Set the offset between boxes
        this.offset = this.boxSize / this.size;

        //Resize canvas width and height to have enough space for a correct offset
        this.canvas.width = (window.innerHeight / 2) + this.offset;
        this.canvas.height = (window.innerHeight / 2) + this.offset;

        this.cellList = [];

        this.hasFinishCreatingGame = false;
    }

    initGame(fetchManager, gameType) {
        fetchManager.getGameData(gameType).then((fetchData) => {
            this.data = fetchData;
            this.cellList = this.generateGame();
            this.renderGrid();
            this.hasFinishCreatingGame = true;
        });
    }

    generateGame() {
        let cellList = [];
        for(let width = 0; width < this.size; width++) {
            for(let height = 0; height < this.size; height++) {
                cellList.push(new Cell(
                    this.canvas, this.context,
                    this.boxSize, this.offset,
                    "", width, height,
                    this.boxColor,this.textColor
                ));
            }
        }
        return cellList;
    }

    renderGrid() {
        this.context.font = "25px Wingdings";
        for(let cell of this.cellList) {
            cell.render();
        }
    }

    renderCell(x,y) {
        this.cellList[x + this.size * y].render();
    }

    setCellText(x,y,text) {
        this.cellList[x + this.size * y].setText(text);
    }

    setCellTextColor(x,y,color) {
        this.cellList[x + this.size * y].setTextColor(color);
    }

    setCellColor(x,y,color) {
        this.cellList[x + this.size * y].setColor(color);
    }


    
}

export { Game,Cell };