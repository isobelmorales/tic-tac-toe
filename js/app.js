// Grab DOM elements
const gameBoard = document.querySelector('#game-board')
const reset = document.querySelector('#reset')

// Function to create game board that will generate 9 squares with the class 'square' and append them to the game-board div
const createBoard = () => {

}

// Resets game board when user clicks reset button
reset.addEventListener("click", createBoard)

// Creates game board after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createBoard()
  })