class Layer {
    constructor(chooseLayer,sudoku,minesweeper,flags,gameLayer,sudokuDifficulty, optionsSudoku, sudokuLayer,finishSudoku, checkSudoku, minesweeperifficulty,minesweeperLayer,flagsDifficulty,
                flagsLayer,replayLayer,scoreLayer,again,points,choose){
    this.chooseLayer = document.getElementById("choose_game");
        this.sudoku = document.getElementById("sudoku");
        this.minesweeper = document.getElementById("minesweeper");
        this.flags = document.getElementById("flags");
    this.gameLayer = document.getElementById("game");
        this.sudokuDifficulty = document.getElementById("difficultysudoku");
        this.optionsSudoku = document.getElementById("optionsSudoku");
        this.sudokuLayer = document.getElementById("playsudoku");
        this.finishSudoku = document.getElementById("finishSudoku");
        this.checkSudoku = document.getElementById("checkSudoku");
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
        this.chooseLayer.style.display = "none";
        this.gameLayer.style.display = "none";
        this.sudokuDifficulty.style.display = "none";
        this.optionsSudoku.style.display = "none";
        this.sudokuLayer.style.display = "none";
        this.minesweeperDifficulty.style.display = "none";
        this.minesweeperLayer.style.display = "none";
        this.flagsDifficulty.style.display = "none";
        this.flagsLayer.style.display = "none";
        this.replayLayer.style.display = "none";
        this.scoreLayer.style.display = "none";
    }

    begin(){
        this.chooseLayer.style.display = "block";
    }
    
    showLayer(layer){
        this.hideAll();
        this.gameLayer.style.display = "block";
        layer.style.display = "block";
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