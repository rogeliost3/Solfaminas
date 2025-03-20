class Layer {
    constructor(chooseLayer,sudoku,minesweeper,flags,gameLayer,sudokuDifficulty,sudokuLayer,minesweeperifficulty,minesweeperLayer,flagsDifficulty,
                flagsLayer,replayLayer,scoreLayer,again,points,choose){
    this.chooseLayer = document.getElementById("choose_game");
        this.sudoku = document.getElementById("sudoku");
        this.minesweeper = document.getElementById("minesweeper");
        this.flags = document.getElementById("flags");
    this.gameLayer = document.getElementById("game");
        this.sudokuDifficulty = document.getElementById("difficultysudoku");
        this.sudokuLayer = document.getElementById("playsudoku");
        this.minesweeperDifficulty = document.getElementById("difficultyminesweeper");
        this.minesweeperLayer = document.getElementById("playminesweeper");
        this.flagsDifficulty = document.getElementById("difficultyflags");
        this.flagsLayer = document.getElementById("playflags");
    this.replayLayer = document.getElementById("replay");
        this.again = document.getElementById("again");
        this.points = document.getElementById("points");
        this.choose = document.getElementById("choose");
    this.scoreLayer = document.getElementById("score");
    }

    hideAll(){
        this.chooseLayer.style.visibility = "hidden";
        this.gameLayer.style.visibility = "hidden";
        this.sudokuDifficulty.style.visibility = "hidden";
        this.sudokuLayer.style.visibility = "hidden";
        this.minesweeperDifficulty.style.visibility = "hidden";
        this.minesweeperLayer.style.visibility = "hidden";
        this.flagsDifficulty.style.visibility = "hidden";
        this.flagsLayer.style.visibility = "hidden";
        this.replayLayer.style.visibility = "hidden";
        this.scoreLayer.style.visibility = "hidden";
    }

    begin(){
        this.chooseLayer.style.visibility = "visible";
    }
    
    showLayer(layer){
        this.hideAll();
        layer.style.visibility = "visible";
    }

    replayChoosenGame(gameChoosed){
        switch(gameChoosed){
            case "sudoku":
                this.showLayer(this.sudokuDifficulty);
                break;
            case "minesweeper":
                this.showLayer(this.minesweeperDifficulty);
                break;
            case "flags":
                this.showLayer(this.flagsDifficulty);
                break;
            default:
                break;
        }
    }
}

export{Layer};