// Grab DOM elements
const gameBoard = document.querySelector('#game-board')
const reset = document.querySelector('#reset')
const displayTurn = document.querySelector('#turn')

// Variables to store moves
const playerSquares = []
const computerSquares = []
const moveOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const winCombo = {
    0: ['1', '2', '3'],
    1: ['4', '5', '6'],
    2: ['7', '8', '9'],
    3: ['1', '4', '7'],
    4: ['2', '5', '8'],
    5: ['3', '6', '9'],
    6: ['1', '5', '9'],
    7: ['3', '5', '7']
}
let winner = null

// Function to check if there is a winner
const checkWinner = () => {
    if (moveOptions.length === 0) {
            alert(`It's a tie! Please reset game.`)
            winner = 'tie'
    } else if (moveOptions.length <= 4) {
        for (let i = 0; i < 8; i++) {
            let combo = winCombo[i]
            if ((playerSquares.includes(combo[0])) && (playerSquares.includes(combo[1])) && (playerSquares.includes(combo[2]))) {
                winner = 'player'
                alert(`Player wins!`)
            } else if ((computerSquares.includes(combo[0])) && (computerSquares.includes(combo[1])) && (computerSquares.includes(combo[2]))) {
                winner = 'computer'
                alert(`Computer wins!`)
            }
        }
    } else {
        return
    }
}

// Function to generate computer's move
function computerMove() {
    // generate random move
    const randomMove = moveOptions[Math.floor(Math.random() * moveOptions.length)]
    const chosenSquare = document.getElementById(randomMove)
    // log computer's move
    computerSquares.push(chosenSquare.id)
    // change selected square's class
    chosenSquare.classList.toggle('open')
    // insert O in square
    chosenSquare.innerText = 'O'
    // remove square from move options
    moveOptions.splice(moveOptions.indexOf(chosenSquare.id), 1)
    // evaluate if there is a winner
    checkWinner()
    // prompt player to make move
    displayTurn.innerText = 'Your move'
}

// Function to register player's move and trigger computer's move 
const playerMove = (event) => {
    if (winner === 'tie' || winner === 'player' || winner === 'computer') {
        alert(`Game winner is: ${winner}. Please reset game to continue.`)
    } else {
        // if statement - if previously selected square is chosen, show alert
        if (playerSquares.length > computerSquares.length) {
            alert('Computer is playing. Please wait.')
        } else { 
            if (event.target.className === 'square open') {
                // log player's move
                playerSquares.push(event.target.id)
                // change selected square's class
                event.target.classList.toggle('open')
                // insert X in square
                event.target.innerText = 'X'
                // remove square from move options
                moveOptions.splice(moveOptions.indexOf(event.target.id), 1)
                // evaluate if there is a winner
                checkWinner()
                if (winner === 'tie' || winner === 'player' || winner === 'computer') {
                    return
                } else {
                    // change turn text
                    displayTurn.innerText = 'The computer is now playing...'
                    // trigger computer move after 4 second delay
                    setTimeout(computerMove, 4000)
                }
            } else {
                alert('Square has already been chosen. Please select another square.')
            }
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
    // reset player moves array
    for (let i = playerSquares.length; i >= 0; i--) {
        playerSquares.pop()
    }
    // reset computer moves array
    for (let i = computerSquares.length; i >= 0; i--) {
        computerSquares.pop()
    }
    // reset move options array
    for (let i = 0; i < 9; i++) {
        moveOptions[i] = `${i + 1}`
    }
    // reset winner
    winner = null
    // reset game board
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild)
    }
    createBoard()
}

// Event listener for reset button
reset.addEventListener('click', resetGame)

// Creates game board after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createBoard()
})