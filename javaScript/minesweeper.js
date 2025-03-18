const FLAG = "x",
    BOMB = "o",
    ONE = "1",
    TWO = "2",
    THREE = "3";

const game = {
    "start": "3-5",
    "width": 9,
    "height": 9,
    "board": [
        ["o", "o", "1", "x", "3", "x", "2", "x", "2"],
        ["1", "1", "1", "2", "x", "2", "2", "2", "x"],
        ["x", "1", "o", "1", "1", "1", "o", "1", "1"],
        ["1", "1", "o", "o", "o", "o", "o", "o", "o"],
        ["o", "o", "o", "1", "1", "1", "o", "o", "o"],
        ["2", "2", "1", "1", "x", "1", "o", "o", "o"],
        ["x", "x", "2", "2", "1", "1", "o", "1", "1"],
        ["x", "4", "x", "1", "o", "o", "o", "1", "x"],
        ["1", "2", "1", "1", "o", "o", "o", "1", "1"]
    ],
    "mines": 12
}

class Minesweeper {
    constructor(board) {
        this.start = board["start"];
        this.width = board["width"];
        this.height = board["height"];
        this.mines = board["mines"];
        this.board = board["board"];
    }

    drawFlag() {
        return "x";
    }

    drawOne() {
        return "1";
    }

    drawTwo() {
        return "2";
    }

    drawThree() {
        return "3";
    }

    drawBomb() {
        return "o";
    }

    drawBoard() {
        for (let r = 0; r < this.height; r++) {
            let rowSt = "";
            for (let c = 0; c < this.width; c++) {
                let elem = this.board[r][c];
                switch (elem) {
                    case FLAG: rowSt += this.drawFlag();
                        break;
                    case BOMB: rowSt += this.drawBomb();
                        break;
                    case ONE: rowSt += this.drawOne();
                        break;
                    case TWO: rowSt += this.drawTwo();
                        break;
                    case THREE: rowSt += this.drawThree();
                        break;
                }
            }
            console.log(rowSt); //draw the row!
        }
    }
}

const ms = new Minesweeper(game);
ms.drawBoard();