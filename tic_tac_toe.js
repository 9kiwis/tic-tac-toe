let header = document.getElementById('header')
let restart_btn = document.getElementById('restart_btn')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-boxes')

const O = "O"
const X = "X"
let currentPlayer = X
let spaces = Array(9).fill(null)
const winningRows = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const start = () => {
    boxes.forEach(box => box.addEventListener('click', clicked))
}

function clicked(a) {
    const id = a.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        a.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            header.innerHTML = `${currentPlayer} is the winner!`
            let winning_blocks = playerHasWon()
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X ? O : X
    }
}


function playerHasWon() {
    for (const condition of winningRows) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restart_btn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })
    header.innerHTML = 'Tic Tac Toe'
    currentPlayer = X
}

start()