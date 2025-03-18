//CAPTAMOS LAS CAPAS POR ID
const chooseLayer = document.getElementById("choose_game");
const difficultyLayer = document.getElementById("difficulty");
const gameLayer = document.getElementById("game");
const replayLayer = document.getElementById("replay");

//ESTABLECEMOS LA VISIBILIDAD INICIAL DE LAS CAPAS
chooseLayer.style.visibility = "visible";
difficultyLayer.style.visibility = "hidden";
gameLayer.style.visibility = "hidden";
replayLayer.style.visibility = "hidden";

//CREAMOS EL FLUJO DE CAPAS
const juego = document.getElementById('gameList');
juego.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    difficultyLayer.style.visibility = "visible";
    gameLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
});

const dificultad = document.getElementById('selector');
dificultad.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    difficultyLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "visible";
    replayLayer.style.visibility = "hidden";
});

const sudoku = document.getElementById('sudoku');
sudoku.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    difficultyLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "visible";
});

const finjuego = document.getElementById('otravez');
finjuego.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    difficultyLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "visible";
    replayLayer.style.visibility = "hidden";
});

const puntuacion = document.getElementById('puntuacion');
puntuacion.addEventListener('click', function() {
    chooseLayer.style.visibility = "hidden";
    difficultyLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
});

const home = document.getElementById('home');
home.addEventListener('click', function() {
    chooseLayer.style.visibility = "visible";
    difficultyLayer.style.visibility = "hidden";
    gameLayer.style.visibility = "hidden";
    replayLayer.style.visibility = "hidden";
});
