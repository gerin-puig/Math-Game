
const player = document.querySelector(".player")
const playerTxt = document.querySelector(".playerTxt")

let userInput = ""
let playerLane = 0
let enemyDict = {}
let level = 1
let enemyLeft = 5
let scoresList = new Array();
const queryStr = location.search
const playername = queryStr.substring(queryStr.indexOf("=") + 1)
console.log(playername)
const timePerLevel = ["level0", 5 * 60, 4 * 60, 3 * 60, 2 * 60, 1 * 60]

class PlayerScore{
    constructor(name, score){
        this.pname = name
        this.pscore = score
    }
}

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

const changePage = () => {
    window.location.replace("scores.html")
}

const playerLose = () => {
    setTimeout(changePage, 3000)
    document.querySelector(".gameover").hidden = false
}

const playerWin = () =>{
    setTimeout(changePage, 3000)
    document.querySelector(".winner").hidden = false
}

const writeToScore = () =>{
    const ps = PlayerScore(playername, level)
    if("Scores" in localStorage){
        const sList = JSON.parse(localStorage.getItem("Scores"))

        if(sList.some(elem => elem.pscore === ps.pscore)){
            var indexOfScore = sList.findIndex(elem => elem.pscore === ps.pscore)
            if(indexOfScore !== -1){
                sList.splice(indexOfScore,0,ps)
                localStorage.setItem("Scores", JSON.stringify(sList))
            }
        }
        else{
            sList.push(ps)
            localStorage.setItem("Scores", JSON.stringify(sList))
        }
    }
    else{
        scoresList.push(ps)
        localStorage.setItem("Scores", JSON.stringify(scoresList))
    }
}

//ghost start at left -100 as default cause onload starts with +100
let ghosts = [-100, -100, -100, -100, -100]
const ghostTop = [0, 160, 350, 520, 680]

const moveAndCheckGhosts = (num) =>{
    moveGhosts(num)
    checkGhost(num)
}

let moveGhost0 = setInterval(moveAndCheckGhosts, generateNumber(3000, 500), 0)

let moveGhost1 = setInterval(moveAndCheckGhosts, generateNumber(3000, 500), 1)

let moveGhost2 = setInterval(moveAndCheckGhosts, generateNumber(3000, 500), 2)

let moveGhost3 = setInterval(moveAndCheckGhosts, generateNumber(3000, 500), 3)

let moveGhost4 = setInterval(moveAndCheckGhosts, generateNumber(3000, 500), 4)

const movingGhosts = [moveGhost0, moveGhost1, moveGhost2, moveGhost3, moveGhost4]

let time = timePerLevel[level]

let timer = setInterval(() => {
    if (time > 0) {
        time -= 1

        printUI()
    }
    else {
        playerLose()
    }
}, 1000);

const nextLevel = () => {
    level++
    if(level > 5){
        playerWin()
    }
    enemyLeft = 5
    time = timePerLevel[level]
    for (let i = 0; i < 5; i++) {
        ghosts[i] = -100
        movingGhosts[i] = setInterval(moveAndCheckGhosts, generateNumber(3000, 500), i)
        document.querySelectorAll(".ghost")[i].style.left = 0
        document.querySelectorAll(".ghost")[i].style.display = "block"
        generateNewEquation(i)
    }
}

const moveGhosts = (ghostNum) => {
    if (enemyLeft > 0) {
        const elem = document.querySelectorAll(".ghost")[ghostNum]
        ghosts[ghostNum] += 100
        elem.style.left = `${ghosts[ghostNum]}px`
        elem.style.top = `${ghostTop[ghostNum]}px`
    }
}

const checkGhost = (ghostNum) => {
    if (enemyLeft > 0) {
        const elem = document.querySelectorAll(".ghost")[ghostNum]
        const px = elem.style.left
        let pxIndex = px.indexOf("px")
        let gLoc = parseInt(px.substring(0, pxIndex))
        if (gLoc >= 1900) {
            clearInterval(movingGhosts[ghostNum])
            playerLose()
        }
    }

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
                elems.style.display = "none"

                //stop enemy from moving
                clearInterval(movingGhosts[playerLane])

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
    for (i = 0; i < 5; i++) {
        const num1 = generateNumber(15, 1)
        const num2 = generateNumber(10, 1)
        //save answer based on enemy lane number
        enemyDict[i] = num1 * num2
        document.querySelector(".container").innerHTML += createEnemy(num1, num2)

        moveGhosts(i)
    }
}

