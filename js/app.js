// Grab DOM elements
const gameBoard = document.querySelector('#game-board')
const reset = document.querySelector('#reset')

// Function to create game board that will generate 9 squares with the class 'square' and append them to the game-board div
const createBoard = () => {
    // reset moves


    // create 9 squares in 3x3 grid
    for (let i = 1; i <= 9; i++) {
        const square = document.createElement('div')
        square.classList.add("square")
        // append squares to game board div
        gameBoard.appendChild(square)
    }

    // listens for player move
    square.addEventListener('click', playerMove)

}

// Resets game board when user clicks reset button
reset.addEventListener("click", createBoard)

// Creates game board after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createBoard()
  })