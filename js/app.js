// Grab DOM elements
const gameBoard = document.querySelector('#game-board')
const reset = document.querySelector('#reset')
const displayTurn = document.querySelector('#turn')
const scoreBoard = document.querySelector('#scores')

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
let xWins = 0
let oWins = 0
let winner = null

const showScore = () => {
    scoreBoard.innerText = `X:${xWins} O:${oWins}`
}

// Function to check if there is a winner
const checkWinner = () => {
    if (moveOptions.length === 0) {
            displayTurn.innerText = 'Game over - Tie'
            alert(`It's a tie! Please reset game.`)
            winner = 'tie'
    } else if (moveOptions.length <= 4) {
        for (let i = 0; i < 8; i++) {
            let combo = winCombo[i]
            if ((playerSquares.includes(combo[0])) && (playerSquares.includes(combo[1])) && (playerSquares.includes(combo[2]))) {
                displayTurn.innerText = 'Game over - X Wins'
                xWins += 1
                winner = 'X'
                showScore()
                alert(`X wins!`)
            } else if ((computerSquares.includes(combo[0])) && (computerSquares.includes(combo[1])) && (computerSquares.includes(combo[2]))) {
                displayTurn.innerText = 'Game over - O Wins'
                oWins += 1
                winner = 'O'
                showScore()
                alert(`O wins!`)
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
    const o = document.createElement('div')
    o.classList.add('o')
    o.innerText = 'O'
    chosenSquare.appendChild(o)
    // remove square from move options
    moveOptions.splice(moveOptions.indexOf(chosenSquare.id), 1)
    // evaluate if there is a winner
    checkWinner()
    // prompt player to make move
    if (winner === 'tie' || winner === 'O') {
        return
    } else {
        displayTurn.innerText = 'X Turn'
    }
}

// Function to register player's move and trigger computer's move 
const playerMove = (event) => {
    if (winner === 'tie' || winner === 'X' || winner === 'O') {
        alert(`Game winner is: ${winner}. Please reset game to continue.`)
    } else {
        // if statement - if previously selected square is chosen, show alert
        if (playerSquares.length > computerSquares.length) {
            alert('O is playing. Please wait.')
        } else { 
            if (event.target.className === 'square open') {
                // log player's move
                playerSquares.push(event.target.id)
                // change selected square's class
                event.target.classList.toggle('open')
                // insert X in square
                const x = document.createElement('div')
                x.classList.add('x')
                x.innerText = 'X'
                event.target.appendChild(x)
                // remove square from move options
                moveOptions.splice(moveOptions.indexOf(event.target.id), 1)
                // evaluate if there is a winner
                checkWinner()
                if (winner === 'tie' || winner === 'X' || winner === 'O') {
                    return
                } else {
                    // change turn text
                    displayTurn.innerText = 'O Turn'
                    // trigger computer move after 3 second delay
                    setTimeout(computerMove, 3000)
                }
            } else {
                alert('Square has already been chosen. Please select another square.')
            }
        }
    }
}

// Function to create game board that will generate 9 squares with the class 'square' and append them to the game-board div
const createBoard = () => {
    showScore()
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
    // reset display turn
    displayTurn.innerText = 'Click on a square to play'
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