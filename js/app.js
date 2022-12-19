// Grab DOM elements
const gameBoard = document.querySelector('#game-board')
const reset = document.querySelector('#reset')
// const squares = document.querySelectorAll('.square')
const displayTurn = document.querySelector('#turn')

// Variables to store moves
const playerSquares = []
const computerSquares = []
const moveOptions = ['1','2','3','4','5','6','7','8','9']

// Function to generate computer's move
const computerMove = () => {
    if (moveOptions.length === 0) {
        alert('No winner. Please reset game.')
    } else {
        // generate random move
        const randomMove = moveOptions[Math.floor(Math.random() * moveOptions.length)]
        const chosenSquare = document.getElementById(randomMove)
        // log computer's move
        console.log(`Square ID: ${chosenSquare.id}`)
        computerSquares.push(chosenSquare.id)
        console.log(`Computer's squares: ${computerSquares}`)
        // change selected square's class
        console.log(`Class List Before: ${chosenSquare.classList}`)
        chosenSquare.classList.toggle('open')
        console.log(`Class List After: ${chosenSquare.classList}`)
        // insert O in square
        chosenSquare.innerText = 'O'
        // remove square from move options
        console.log(`Move options before: ${moveOptions}`)
        moveOptions.splice(moveOptions.indexOf(chosenSquare.id), 1)
        console.log(`Move options after: ${moveOptions}`)
        // evaluate if there is a winner
        // prompt player to make move
        displayTurn.innerText = 'Your move'
    }
}

// Function to register player's move and trigger computer's move 
const playerMove = (event) => {
    // if statement - if previously selected square is chosen, show alert
    console.log(event.target.className)
    if (playerSquares.length > computerSquares.length) {
        alert('Computer is playing. Please wait.')
    } else {
        if (event.target.className === 'square open') {
            // log player's move
            console.log(`Square ID: ${event.target.id}`)
            playerSquares.push(event.target.id)
            console.log(`Player squares: ${playerSquares}`)
            // change selected square's class
            console.log(`Class List Before: ${event.target.classList}`)
            event.target.classList.toggle('open')
            console.log(`Class List After: ${event.target.classList}`)
            // insert X in square
            event.target.innerText = 'X'
            // remove square from move options
            console.log(`Move options before: ${moveOptions}`)
            moveOptions.splice(moveOptions.indexOf(event.target.id), 1)
            console.log(`Move options after: ${moveOptions}`)
            // evaluate if there is a winner
            // change turn text
            displayTurn.innerText = 'The computer is now playing...'
            // trigger computer move after 5 second delay
            setTimeout(computerMove, 5000)
        } else {
            alert('Square has already been chosen. Please select another square.')
        }
    }
}

// Function to create game board that will generate 9 squares with the class 'square' and append them to the game-board div
const createBoard = () => {
    // create 9 squares in 3x3 grid
    for (let i = 1; i <= 9; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.classList.add('open')
        square.id = [i]
        // append squares to game board div
        gameBoard.appendChild(square)
        // listens for player move
        square.addEventListener('click', playerMove)
    }
}

// Resets game board when user clicks reset button
const resetGame = () => {
    // reset player moves
    for (let i = playerSquares.length; i >= 0; i--) {
        playerSquares.pop()
    }
    console.log(`Player squares: ${playerSquares}`)
    // reset computer moves
    for (let i = computerSquares.length; i >= 0; i--) {
        computerSquares.pop()
    }
    console.log(`Computer squares: ${computerSquares}`)
    // reset game board
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild)
    }
    createBoard()
    console.log('Game board is reset')
}

// Event listener for reset button
reset.addEventListener('click', resetGame)

// Creates game board after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createBoard()
})