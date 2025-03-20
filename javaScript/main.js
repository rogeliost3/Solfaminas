//CAPTAMOS LAS CAPAS POR ID
const chooseLayer = document.getElementById("choose_game");
    const sudoku = document.getElementById("sudoku");
    const minesweeper = document.getElementById("minesweeper");
    const flags = document.getElementById("flags");
const gameLayer = document.getElementById("game");
    const sudokuDifficulty = document.getElementById("difficultysudoku");
    const sudokuLayer = document.getElementById("playsudoku");
    const minesweeperifficulty = document.getElementById("difficultyminesweeper");
    const minesweeperLayer = document.getElementById("playminesweeper");
    const flagsDifficulty = document.getElementById("difficultyflags");
    const flagsLayer = document.getElementById("playflags");
const replayLayer = document.getElementById("replay");
const scoreLayer = document.getElementById("score");

//ESTABLECEMOS LA VISIBILIDAD INICIAL DE LAS CAPAS
chooseLayer.style.visibility = "visible";
gameLayer.style.visibility = "hidden";
sudokuDifficulty.style.visibility = "hidden";
sudokuLayer.style.visibility = "hidden";
minesweeperifficulty.style.visibility = "hidden";
minesweeperLayer.style.visibility = "hidden";
flagsDifficulty.style.visibility = "hidden";
flagsLayer.style.visibility = "hidden";
replayLayer.style.visibility = "hidden";
scoreLayer.style.visibility = "hidden";

//CREAMOS EL FLUJO DE CAPAS
//Cuando elegimos el sudoku
sudoku.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "visible";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "hidden";
});

sudokuselector.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.setAttribute = ("disabled",true);
    sudokuLayer.style.visibility = "visible";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "hidden";
});

sudokuLayer.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "visible";
    scoreLayer.style.visibility = "hidden";
})

//Cuando elegimos el buscaminas
minesweeper.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "visible";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "hidden";
});

mineselector.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.setAttribute = ("disabled",true);
    minesweeperLayer.style.visibility = "visible";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "hidden";
});

minesweeperLayer.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "visible";
    scoreLayer.style.visibility = "hidden";
})

//Cuando elegimos las banderas
flags.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "visible";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "hidden";
});

flagsselector.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.setAttribute = ("disabled",true);
    flagsLayer.style.visibility = "visible";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "hidden";
});

flagsLayer.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "visible";
    scoreLayer.style.visibility = "hidden";
})

//Cuando se acaba el juego
const finjuego = document.getElementById('otravez');
finjuego.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "visible";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "hidden";
});

const puntuacion = document.getElementById('puntuacion');
puntuacion.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "visible";
});

const volver = document.getElementById('volver');
volver.addEventListener('click',function() {
    chooseLayer.style.visibility = "visible";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "hidden";
})

const home = document.getElementById('home');
home.addEventListener('click', function() {
    chooseLayer.style.visibility = "visible";
    gameLayer.style.visibility = "hidden";
    sudokuDifficulty.style.visibility = "hidden";
    sudokuLayer.style.visibility = "hidden";
    minesweeperifficulty.style.visibility = "hidden";
    minesweeperLayer.style.visibility = "hidden";
    flagsDifficulty.style.visibility = "hidden";
    flagsLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
    scoreLayer.style.visibility = "hidden";
});

