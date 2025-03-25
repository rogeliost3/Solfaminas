import{Layer} from "./layerClass.js";
import{sudoku} from "./sudoku.js"

const layer = new Layer(); 
let gameChoosed = "";
let level = "";

function main(){
    const layer = new Layer();
    layer.hideAll();
    layer.begin();
}
main();


//FUNCIONAMIENTO DE LA PARTE DEL SUDOKU
layer.sudoku.addEventListener('click', (e) => {
    layer.showLayer(layer.sudokuDifficulty);
    layer.optionsSudoku.removeChild(layer.difficulty);
});
layer.sudokueasy.addEventListener('click', (e) => {
    layer.showLayer(layer.sudokuLayer);
    layer.optionsSudoku.style.display = "block";
    gameChoosed = "sudoku";
    level = "easy";
    layer.showDifficulty(level,gameChoosed);
});
layer.sudokunormal.addEventListener('click', (e) => {
    layer.showLayer(layer.sudokuLayer);
    layer.optionsSudoku.style.display = "block";
    gameChoosed = "sudoku";
    level = "normal";
    layer.showDifficulty(level,gameChoosed);
});
layer.sudokuhard.addEventListener('click', (e) => {
    layer.showLayer(layer.sudokuLayer);
    layer.optionsSudoku.style.display = "block";
    gameChoosed = "sudoku";
    level = "hard";
    layer.showDifficulty(level,gameChoosed);
});

layer.finishSudoku.addEventListener('click', (e) => {
    layer.showLayer(layer.replayLayer);
});
layer.checkSudoku.addEventListener('click',(e)=> {
    sudoku.checkIfCorrect();
});


//FUNCIONAMIENTO DE LA PARTE DEL MINESWEEPER
layer.minesweeper.addEventListener('click', (e) => {
    layer.showLayer(layer.minesweeperDifficulty);
    layer.optionsMinesweeper.removeChild(layer.difficulty); 
});

layer.mineeasy.addEventListener('click', (e) => {
    layer.showLayer(layer.minesweeperLayer);
    layer.optionsMinesweeper.style.display = "block";
    gameChoosed = "minesweeper";
    level = "easy";
    layer.showDifficulty(level,gameChoosed);
});
layer.minenormal.addEventListener('click', (e) => {
    layer.showLayer(layer.minesweeperLayer);
    layer.optionsMinesweeper.style.display = "block";
    gameChoosed = "minesweeper";
    level = "normal";
    layer.showDifficulty(level,gameChoosed);
});
layer.minehard.addEventListener('click', (e) => {
    layer.showLayer(layer.minesweeperLayer);
    layer.optionsMinesweeper.style.display = "block";
    gameChoosed = "minesweeper";
    level = "hard";
    layer.showDifficulty(level,gameChoosed);
});
layer.finishMinesweeper.addEventListener('click', (e) => {
    layer.showLayer(layer.replayLayer);
});
layer.checkMinesweeper.addEventListener('click',(e)=> {
    minesweeper.checkIfCorrect();
});

//FUNCIONAMIENTO DE LA PARTE DE LAS FLAGS
layer.flags.addEventListener('click', (e) => {
    layer.showLayer(layer.flagsDifficulty);
    layer.optionsFlags.removeChild(layer.difficulty); 
});
layer.flagseasy.addEventListener('click', (e) => {
    layer.showLayer(layer.flagsLayer);
    layer.optionsFlags.style.display = "block";
    gameChoosed = "flags";
    level = "easy";
    layer.showDifficulty(level,gameChoosed);
});
layer.flagsnormal.addEventListener('click', (e) => {
    layer.showLayer(layer.flagsLayer);
    layer.optionsFlags.style.display = "block";
    gameChoosed = "flags";
    level = "normal";
    layer.showDifficulty(level,gameChoosed);
});
layer.flagshard.addEventListener('click', (e) => {
    layer.showLayer(layer.flagsLayer);
    layer.optionsFlags.style.display = "block";
    gameChoosed = "flags";
    level = "hard";
    layer.showDifficulty(level,gameChoosed);
});
layer.flagsLayer.addEventListener('click', (e) => {
    layer.showLayer(layer.replayLayer);
});

//FUNCIONAMIENTO DE LA CAPA REPLAY
layer.again.addEventListener('click', (e) => {
    layer.replayChoosenGame(gameChoosed);
});

//FUNCIONAMIENTO DE LA CAPA PUNTUACION
layer.points.addEventListener('click', (e) => {
    layer.showLayer(layer.scoreLayer);
});

//FUNCIONAMIENTO DE LA CAPA ELEGIR
layer.choose.addEventListener('click', (e) => {

    layer.showLayer(layer.chooseLayer);
});

