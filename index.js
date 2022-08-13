let ticTacToe = false
let lastInput = ""
let playerXPoints = 0
let playerOPoints = 0
const winCons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const drawCon = 8
let drawBin = []

const boxEl = document.querySelectorAll(".box")
const restartBtn = document.querySelector("#restart-btn")
const resetBtn = document.querySelector("#reset-score")
const messageEl = document.querySelector("#message-el")
const playerOScore = document.querySelector("#player-o-points")
const playerXScore = document.querySelector("#player-x-points")

playerOScore.textContent = playerOPoints
playerXScore.textContent = playerXPoints

playGame()

restartBtn.onclick = function () {
    restartGame()
}

resetBtn.onclick = function () {
    restartGame()
    playerOScore.textContent = playerOPoints
    playerXScore.textContent = playerXPoints
}

function playGame() {
    for (let i = 0; i < boxEl.length; i++) {
        boxEl[i].onclick = function () {
            new Audio("audio/tick.mp3").play()
            if (boxEl[i].textContent === "") {
                if ((lastInput === "") || (lastInput === "O")) {
                    boxEl[i].textContent = "X"
                    lastInput = "X"
                    drawBin.push(boxEl[i])
                }
                else if (lastInput === "X") {
                    boxEl[i].textContent = "O"
                    lastInput = "O"
                    drawBin.push(boxEl[i])
                }
                checkWinner()
                drawGame()
            }
        }
    }
}

function restartGame() {
    for (let i = 0; i < boxEl.length; i++) {
        boxEl[i].textContent = ""
    }
    lastInput = "O"
    ticTacToe = false
    messageEl.textContent = ""
    drawBin = []
    playGame()

}

function checkWinner() {
    for (let con of winCons) {
        let a = boxEl[con[0]].textContent
        let b = boxEl[con[1]].textContent
        let c = boxEl[con[2]].textContent

        if (!a || !b || !c) { continue }

        if ((a === b) && (a === c)) {
            for (let box of boxEl) {
                box.onclick = null
                ticTacToe = true
            }
        }
    }
    pickWinner()
}

function pickWinner() {
    if (ticTacToe === true) {
        if (lastInput === "O") {
            playerOScore.textContent++
        } else if (lastInput === "X") {
            playerXScore.textContent++
        }
        messageEl.textContent = `Winner: Player ${lastInput}`
    }
}

function drawGame() {
    if (ticTacToe === false) {
        if (drawBin.length === 9) {
            messageEl.textContent = "DRAW!"
        }
    }
}