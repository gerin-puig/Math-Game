
const player = document.querySelector(".player")
const playerTxt = document.querySelector(".playerTxt")

let userInput = ""
let playerLane = 0
let enemyDict = {}

const createEnemy = (num1, num2) => {
    enemyHTML = `
    <div class="ghost">
        <img src="images/ghost.png"/>
        <div class="text-block">
            <span>${num1} x ${num2} = ?</span>
        </div>
    </div>
    `
    return enemyHTML
}

const generateNumber = (maxNum, minNum) =>{
    return Math.floor(Math.random() * (maxNum - minNum) + minNum)
}

let ghosts = [0,0,0,0,0]

let moveGhost0 = setInterval(() =>{
    moveGhosts(0)
    checkGhost()
}, generateNumber(3000,500))

let moveGhost1 = setInterval(() =>{
    moveGhosts(1)
}, generateNumber(3000,500))

let moveGhost2 = setInterval(() =>{
    moveGhosts(2)
}, generateNumber(3000,500))

let moveGhost3 = setInterval(() =>{
    moveGhosts(3)
}, generateNumber(3000,500))

let moveGhost4 = setInterval(() =>{
    moveGhosts(4)
}, generateNumber(3000,500))


const moveGhosts = (ghostNum) =>{
    const elem = document.querySelectorAll(".ghost")[ghostNum]
    ghosts[ghostNum] += 100
    elem.style.left = `${ghosts[ghostNum]}px`
}

const checkGhost = () => {
    const elem = document.querySelectorAll(".ghost")[0]
    //if(elem.style.left)
    console.log(elem.style.left)
}




for (let i = 0; i < 5; i++) {
    const num1 = generateNumber(15,1)
    const num2 = generateNumber(10,1)
    //save answer based on enemy lane number
    enemyDict[i] = num1 * num2
    document.querySelector(".container").innerHTML += createEnemy(num1, num2)
}

window.addEventListener("keydown", (e) => {
    //console.log(e.key)
    switch (e.key) {
        case "ArrowUp":
            if(playerLane === 0){
                break
            }
            else if(playerLane > 0){
                playerLane--
            }
            break
        case "ArrowDown":
            if(playerLane === 4){
                break
            }
            playerLane++
            break
        case "Enter":
            const enemyAns = enemyDict[playerLane]
            console.log(enemyAns)
            if(enemyAns === parseInt(userInput)){
                const elems = document.querySelectorAll(".ghost")[playerLane]
                //elems.remove()
                //maybe just move it back to start
                console.log(elems)
            }

            userInput = ""
            playerTxt.innerText = userInput
            break
        case "Backspace":
            if (userInput.length > 0) {
                userInput = userInput.slice(0, -1)
                playerTxt.innerText = userInput
            }
            break
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            if (userInput.length > 5) {
                break
            }
            userInput += e.key
            playerTxt.innerText = userInput
            break
    }

    //console.log(playerLane)
    switch(playerLane){
        case 0:
            player.style.top = "0px"
        break
        case 1:
            player.style.top = "150px"
        break
        case 2:
            player.style.top = "350px"
        break
        case 3:
            player.style.top = "520px"
        break
        case 4:
            player.style.top = "680px"
        break
    }

})

