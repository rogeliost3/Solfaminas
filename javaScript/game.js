import { fetchManager } from "./api.js"

class Cell {
    constructor(canvas,context,size,offset,text = "",x = 0,y = 0, color = "white", textColor = "black") {
        this.x = x;
        this.y = y;
        this.color = color;
        this.firstColor = color;
        this.textColor = textColor;

        this.canvas = canvas;
        this.context = context;

        this.size = size;
        this.offset = offset;

        this.text = text;

        this.cellStates = {
            Close : 0,
            Open : 1,
            Marked : 2
        }

        this.cellState = this.cellStates.Close;
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

    setState(state) {
        this.cellState = state;
    }

    getState() {
        return this.cellState;
    }

    

    renderCell() {
        this.context.fillStyle = this.color;
                this.context.fillRect(
                    (this.size + this.offset) * this.x + this.offset,
                    (this.size + this.offset) * this.y + this.offset,
                    this.size, this.size);
    }

    renderText(flag) {
        this.context.fillStyle = this.textColor;
                    this.context.fillText(
                        flag=="" ? this.text : "F",
                        (this.size + this.offset) * this.x + (this.size / 2), 
                        (this.size + this.offset) * this.y + (this.size));
                
    }

    render(flag="") {
        this.renderCell();
        this.renderText(flag);
    }
}

class Game {
    constructor(name, boxColor = "#D0CEBF", textColor = "black", selectColor = "#F76F53") {
        this.boxColor = boxColor;
        this.selectBoxColor = selectColor;
        this.textColor = textColor;
        //Set Canvas
        this.name = name;
        this.canvas = document.getElementById(name);
        this.canvas.style.backgroundColor = "#1F1F1F";
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

        this.selectedCell = [0,0];

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

    updateInput(key) {
        this.updateSelectedCell(key);
    }

    updateSelectedCell(key) {
        if (this.hasFinishCreatingGame && this.canvasFather.style.display != "none") {
            this.setCellColor(this.selectedCell[1], this.selectedCell[0],this.getCell(this.selectedCell[1],this.selectedCell[0]).firstColor);
            switch (key) {
                case "ArrowUp":
                    this.selectedCell[1]--; 
                    if (this.selectedCell[1] < 0) { 
                        this.selectedCell[1] = this.size - 1; 
                    }
                    break;
                case "ArrowDown":
                    this.selectedCell[1]++;
                    if (this.selectedCell[1] >= this.size) {
                        this.selectedCell[1] = 0;
                    }
                    break;
                case "ArrowRight":
                    this.selectedCell[0]++; 
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
        }
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
        this.context.font = "25px Arial";
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

    setCellState(x,y,state) {
        this.cellList[x + this.size * y].setState(state);
    }

    getCellState(x,y) {
        return this.cellList[x + this.size * y].cellState;
    }

    getCellText(x,y) {
        return this.cellList[x + this.size * y].text;
    }

    getCell(x,y) {
        return this.cellList[x + this.size * y];
    }
    
}

export { Game,Cell };