
class PlayerScore {
    constructor(name, score) {
        this.pname = name
        this.pscore = score
    }
}

let count = 0
const getScores = () => {
    let topscores = []
    let max = 5
    if ("Scores" in localStorage) {
        const sList = JSON.parse(localStorage.getItem("Scores"))
        if(sList.length < 5){
            max = sList.length
        }
        for (i = 0; i < max; i++) {
            topscores[i] = new PlayerScore(sList[i].pname, sList[i].pscore)
        }
        count = max
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

document.querySelector("button").addEventListener("click", ()=>{
    window.location.href=`menu.html`
})


