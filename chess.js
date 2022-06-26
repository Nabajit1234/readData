// Consider the ChessBoard as a 8x8 matrix and input the Knight's position
// Only input two-digit numbers with digits from 1 to 8
// Function that returns the possible positions that Knight can move to
const findPos = (currPos) => {
    var x = parseInt(currPos[0]);
    var y = parseInt(currPos[1]);
    const movesX = [1, 1, 2, 2, -1, -1, -2, -2];
    const movesY = [2, -2, 1, -1, 2, -2, 1, -1]
    const possiblePositions = [];

    if (x>=1 && x<=8 && y>=1 && y<=8) {

        for (let i = 0; i < movesX.length; i++) {
            let posX = x + movesX[i];
            let posY = y + movesY[i];

            if (posX>0 && posX<=8) {
                if (posY>0 && posY<=8) {
                    let pos = posX.toString() + posY.toString();
                    possiblePositions.push(pos);
                }
            }
        }
        return possiblePositions;
    } else {
        return 'Not a valid Chessboard position'
    }
}
console.log(findPos("19"))


// Reading inputs from the command line
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('What the position of the Knight? \nOnly enter two-digit numbers (digits 1 to 8):', (pos) => {
    const positions = findPos(pos); // Calling the findPos function
    console.log(positions);
    readline.close();
})