import { fetchManager } from "./api.js"

//Data that later will be taken from an API
fetchManager.getGameData(fetchManager.gameTypes.Sudoku).then((fetchData) => {
    const data = fetchData;
    //Get the canvas
    var canvas = document.getElementById('sudoku');
    //Change canvas background
    canvas.style.backgroundColor = "#000000";
    //Set canvas context to 2d
    var context = canvas.getContext('2d');

    //Set canvas width and height
    canvas.width = window.innerHeight / 2;
    canvas.height = window.innerHeight / 2;

    //Set size of the box
    const boxSize = canvas.width / 10;

    //Set the offset between boxes
    const offset = boxSize / 9;

    //Resize canvas width and height to have enough space for a correct offset
    canvas.width = (window.innerHeight / 2) + offset;
    canvas.height = (window.innerHeight / 2) + offset;

    //Set text font
    context.font = "25px Arial";
    //Create a matrix, creating the boxes first and then the text on top of it
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            context.fillStyle = "white";
            context.fillRect((boxSize + offset) * i + offset, (boxSize + offset) * j + offset, boxSize, boxSize);

            context.fillStyle = "black";
            if (data.task[j][i] != 0) {
                context.fillText(data.task[j][i], (boxSize + offset) * i + (boxSize / 2), (boxSize + offset) * j + (boxSize));
            }
        }

    }
});








