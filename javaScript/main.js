import{Layer} from "./layerClass.js";

const layer = new Layer(); 
let gameChoosed = "";

function main(){
    const layer = new Layer();
    layer.hideAll();
    layer.begin();
}
main();


//FUNCIONAMIENTO DE LA PARTE DEL SUDOKU
layer.sudoku.addEventListener('click', (e) => {
    layer.showLayer(layer.sudokuDifficulty);
});
layer.sudokuDifficulty.addEventListener('click', (e) => {
    layer.showLayer(layer.sudokuLayer);
    gameChoosed = "sudoku";
});
layer.sudokuLayer.addEventListener('click', (e) => {
    layer.showLayer(layer.replayLayer);
});

//FUNCIONAMIENTO DE LA PARTE DEL MINESWEEPER
layer.minesweeper.addEventListener('click', (e) => {
    layer.showLayer(layer.minesweeperDifficulty);
});
layer.minesweeperDifficulty.addEventListener('click', (e) => {
    layer.showLayer(layer.minesweeperLayer);
    gameChoosed = "minesweeper";
});
layer.minesweeperLayer.addEventListener('click', (e) => {
    layer.showLayer(layer.replayLayer);
});

//FUNCIONAMIENTO DE LA PARTE DE LAS FLAGS
layer.flags.addEventListener('click', (e) => {
    layer.showLayer(layer.flagsDifficulty);
});
layer.flagsDifficulty.addEventListener('click', (e) => {
    layer.showLayer(layer.flagsLayer);
    gameChoosed = "flags";
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

