
class PlayerScore {
    constructor(name, score) {
        this.pname = name
        this.pscore = score
    }
}

let count = 0
const getScores = () => {
    let topscores = []
    if ("Scores" in localStorage) {
        const sList = JSON.parse(localStorage.getItem("Scores"))

        for (i = 0; i < sList.length; i++) {
            topscores[i] = new PlayerScore(sList[i].pname, sList[i].pscore)
        }
        count = sList.length
    }
    
    return topscores
}

window.onload = () => {
    const playerscores = getScores()
    let scoreHTML = ""
    if(playerscores.length === 0){
        scoreHTML += `<span>No Scores Yet</span>`
    }
    for (i = 0; i < count; i++) {
        scoreHTML += `<span>${i+1}. ${playerscores[i].pname} - Level ${playerscores[i].pscore} </span>`
    }
    document.querySelector(".scores").innerHTML += `
        ${scoreHTML}
    `
}


