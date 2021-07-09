
const player = document.querySelector(".player")
const playerTxt = document.querySelector(".playerTxt")

let userInput = ""
let playerLane = 0
let enemyDict = {}
let level = 1
let enemyLeft = 5
const timePerLevel = ["fluff", 5 * 60, 4 * 60, 3 * 60, 2 * 60, 1 * 60]

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

const generateNumber = (maxNum, minNum) => {
    return Math.floor(Math.random() * (maxNum - minNum) + minNum)
}

const generateNewEquation = (index) => {
    const elem = document.querySelectorAll(".text-block > span")[index]
    num1 = generateNumber(15, 1)
    num2 = generateNumber(10, 1)
    answer = num1 * num2
    enemyDict[index] = answer
    elem.innerText = `${num1} x ${num2} = ?`
}

const printUI = () => {
    document.querySelector("#level").innerText = `Level: ${level} of 5`
    document.querySelector("#timeleft").innerText = `Timeleft: ${time}s`
}

//ghost start at left 0
let ghosts = [0, 0, 0, 0, 0]

let moveGhost0 = setInterval(() => {
    moveGhosts(0)
    checkGhost(0)
}, generateNumber(3000, 500))

let moveGhost1 = setInterval(() => {
    moveGhosts(1)
    checkGhost(1)
}, generateNumber(3000, 500))

let moveGhost2 = setInterval(() => {
    moveGhosts(2)
    checkGhost(2)
}, generateNumber(3000, 500))

let moveGhost3 = setInterval(() => {
    moveGhosts(3)
    checkGhost(3)
}, generateNumber(3000, 500))

let moveGhost4 = setInterval(() => {
    moveGhosts(4)
    checkGhost(4)
}, generateNumber(3000, 500))

const movingGhosts = [moveGhost0, moveGhost1, moveGhost2, moveGhost3, moveGhost4]

let time = timePerLevel[level]

let timer = setInterval(() => {
    if (time > 0) {
        time -= 1

        printUI()
    }
    else {

    }

}, 1000);

const nextLevel = () => {
    level++
    enemyLeft = 5
    time = timePerLevel[level]
    for (let i = 0; i < 5; i++) {
        ghosts[i] = 0
        setInterval(movingGhosts[i], generateNumber(3000, 500))
        document.querySelectorAll(".ghost")[i].style.left = 0
        generateNewEquation(i)
    }
}


const moveGhosts = (ghostNum) => {
    if (enemyLeft > 0) {
        const elem = document.querySelectorAll(".ghost")[ghostNum]
        ghosts[ghostNum] += 100
        elem.style.left = `${ghosts[ghostNum]}px`
    }
}

const checkGhost = (ghostNum) => {
    if (enemyLeft > 0) {
        const elem = document.querySelectorAll(".ghost")[ghostNum]
        const px = elem.style.left
        let pxIndex = px.indexOf("px")
        let gLoc = parseInt(px.substring(0, pxIndex))
        //console.log(gLoc)
        if (gLoc >= 1900) {
            clearInterval(movingGhosts[ghostNum])
            //alert("A Ghost escaped! You lost!")
            //nextLevel()
        }
    }

}

for (let i = 0; i < 5; i++) {
    const num1 = generateNumber(15, 1)
    const num2 = generateNumber(10, 1)
    //save answer based on enemy lane number
    enemyDict[i] = num1 * num2
    document.querySelector(".container").innerHTML += createEnemy(num1, num2)
}

window.addEventListener("keydown", (e) => {
    //console.log(e.key)
    switch (e.key) {
        case "ArrowUp":
            if (playerLane === 0) {
                break
            }
            else if (playerLane > 0) {
                playerLane--
            }
            break
        case "ArrowDown":
            if (playerLane === 4) {
                break
            }
            playerLane++
            break
        case "Enter": case "Spacebar":
            const enemyAns = enemyDict[playerLane]

            if (enemyAns === parseInt(userInput)) {
                const elems = document.querySelectorAll(".ghost")[playerLane]
                //stop enemy from moving
                clearInterval(movingGhosts[playerLane])
                //replace '?' in enemy equatio with the answer
                let equation = document.querySelectorAll(".text-block > span")[playerLane].innerText
                equation = equation.replace("?", enemyDict[playerLane])
                document.querySelectorAll(".text-block > span")[playerLane].innerText = `${equation}`

                //
                enemyLeft--
                if (enemyLeft === 0) {
                    nextLevel()
                }
            }
            else {
                generateNewEquation(playerLane)
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

    switch (playerLane) {
        case 0:
            player.style.top = "0px"
            break
        case 1:
            player.style.top = "160px"
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

window.onload = () => {
    printUI()
}

