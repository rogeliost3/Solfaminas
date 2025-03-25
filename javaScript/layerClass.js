class Layer {
    constructor(chooseLayer,sudoku,minesweeper,flags,gameLayer,sudokuDifficulty, optionsSudoku, sudokuLayer,finishSudoku, checkSudoku, minesweeperifficulty,minesweeperLayer,flagsDifficulty,
                flagsLayer,replayLayer,scoreLayer,again,points,choose){
    this.chooseLayer = document.getElementById("choose_game");
        this.sudoku = document.getElementById("sudoku");
        this.minesweeper = document.getElementById("minesweeper");
        this.flags = document.getElementById("flags");
    this.gameLayer = document.getElementById("game");
        this.sudokuDifficulty = document.getElementById("difficultysudoku");
            this.sudokueasy = document.getElementById("sudokueasy");
            this.sudokunormal = document.getElementById("sudokunormal");
            this.sudokuhard = document.getElementById("sudokuhard");
        this.minesweeperDifficulty = document.getElementById("difficultyminesweeper");
            this.mineeasy = document.getElementById("mineeasy");
            this.minenormal = document.getElementById("minenormal");
            this.minehard = document.getElementById("minehard");
        this.flagsDifficulty = document.getElementById("difficultyflags");
            this.flagseasy = document.getElementById("flagseasy");
            this.flagsnormal = document.getElementById("flagsnormal");
            this.flagshard = document.getElementById("flagshard");

        this.optionsSudoku = document.getElementById("optionsSudoku");
        this.optionsMinesweeper = document.getElementById("optionsMinesweeper");
        this.optionsFlags = document.getElementById("optionsFlags");

        this.sudokuLayer = document.getElementById("playsudoku");
        this.minesweeperLayer = document.getElementById("playminesweeper");
        this.flagsLayer = document.getElementById("playflags");

        this.finishSudoku = document.getElementById("finishSudoku");
        this.finishMinesweeper = document.getElementById("finishMinesweeper");
        this.finishFlags = document.getElementById("finishFlags");
        this.checkSudoku = document.getElementById("checkSudoku");
        this.checkMinesweeper = document.getElementById("checkMinesweeper");
        this.checkFlags = document.getElementById("checkFlags");

    this.replayLayer = document.getElementById("replay");
        this.again = document.getElementById("again");
        this.points = document.getElementById("points");
        this.choose = document.getElementById("choose");
    this.scoreLayer = document.getElementById("score");
    this.difficulty = "";
    }

    hideAll(){
        this.chooseLayer.style.display = "none";
        this.gameLayer.style.display = "none";
        this.sudokuDifficulty.style.display = "none";
        this.optionsSudoku.style.display = "none";
        this.sudokuLayer.style.display = "none";
        this.minesweeperDifficulty.style.display = "none";
        this.optionsMinesweeper.style.display = "none";
        this.minesweeperLayer.style.display = "none";
        this.flagsDifficulty.style.display = "none";
        this.optionsFlags.style.display = "none";
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

    showDifficulty(level,gameChoosed){
        sessionStorage.setItem('level', level.toUpperCase());
        this.difficulty = document.createElement('h1');
        this.difficulty.textContent = sessionStorage.getItem('level');
        switch(gameChoosed){
            case "sudoku":
                this.optionsSudoku.appendChild(this.difficulty);
                break;
            case "minesweeper":
                this.optionsMinesweeper.appendChild(this.difficulty);
                break;
            case "flags":
                this.optionsFlags.appendChild(this.difficulty);
                break;
            default:
                break;
        }
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