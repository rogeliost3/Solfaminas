
//Data that later will be taken from an API
const data = {
    "grid": [
        [9, 8, 7, 3, 2, 1, 5, 6, 4],
        [6, 5, 4, 9, 8, 7, 2, 3, 1],
        [3, 2, 1, 6, 5, 4, 8, 9, 7],
        [7, 6, 5, 1, 9, 8, 3, 4, 2],
        [1, 9, 8, 4, 3, 2, 6, 7, 5],
        [4, 3, 2, 7, 6, 5, 9, 1, 8],
        [8, 7, 6, 2, 1, 9, 4, 5, 3],
        [5, 4, 3, 8, 7, 6, 1, 2, 9],
        [2, 1, 9, 5, 4, 3, 7, 8, 6]
    ],
    "task": [
        [0, 8, 7, 0, 0, 0, 0, 0, 4],
        [0, 0, 0, 9, 0, 0, 2, 0, 0],
        [0, 2, 1, 6, 5, 4, 0, 0, 7],
        [0, 0, 0, 1, 0, 8, 0, 4, 2],
        [0, 9, 8, 4, 3, 0, 0, 0, 0],
        [4, 0, 2, 0, 0, 0, 0, 0, 0],
        [8, 0, 6, 2, 0, 0, 0, 0, 0],
        [5, 0, 3, 0, 0, 6, 0, 2, 9],
        [0, 0, 0, 0, 4, 0, 0, 0, 0]
    ]
}
//Get the canvas
var canvas = document.getElementById('suodku');
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






