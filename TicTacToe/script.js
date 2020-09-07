//board creation


const container = document.getElementById("container");
const cells = [];

for (let i = 0; i < 9; ) {
    cells[i] = document.createElement('div');
    container.appendChild(cells[i]);
    cells[i].addEventListener("click", RelayInput);
    i++;
}

//Relaying Input
function RelayInput() {
    let box = this;
    let indexNum = cells.indexOf(box);
    console.log(indexNum);

    doTurn(box, indexNum);
}


const firstPlayerRed = true;
let currentColor = "red";
if (firstPlayerRed != true) {
    currentColor = "blue";
}

const redOwnedSpaces = [];
const blueOwnedSpaces = [];

let turnNumber = 0;
let gameOver = false;

function doTurn(box, indexNum) {
    //check if game is over
    if (gameOver == false) {
        //check for taken spot
        if (redOwnedSpaces.includes(indexNum) || 
        blueOwnedSpaces.includes(indexNum)) {
            
            console.log("box is taken");
        }
        else {
            //style box
            box.style.backgroundColor = currentColor;
            //addIndexnum to array
            if (currentColor == "red") {
                redOwnedSpaces.push(indexNum);
                currentColor = "blue";
            }
            else {
                blueOwnedSpaces.push(indexNum);
                currentColor = "red";

            }
            //check for win
            if (turnNumber >= 8) {
                //draw condition
                gameOver = true;
                console.log("DRAW!");
                turnColor("green");
            }
            else if (checkWin(redOwnedSpaces) == true) {
                //red win condition
                gameOver = true;
                console.log("RED WINS!");
                turnColor("red");
            }
            else if (checkWin(blueOwnedSpaces) == true) {
                //blue win condition
                gameOver = true;
                console.log("BLUE WINS!");
                turnColor("blue");
            }
            //continue else condition
            turnNumber++;
        }
    }
    else {
        console.log("game is over");
    }
    
    console.log("Turn: " + turnNumber);
}

function checkWin(ownedArray) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    let ConditionalIndex = 0;

    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 3; x++) {
            if (ownedArray.includes(winConditions[i][x])) {
                ConditionalIndex++;
            }

            if (ConditionalIndex == 3) {
                return true;
            }
        }
        ConditionalIndex = 0;
    }
    return false;
}

function turnColor(color) {
    for (let i = 0; i < 9; i++) {
        cells[i].style.backgroundColor = color;
    }
}


