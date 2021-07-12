
let webLink = `play.html?sound=0`

document.querySelectorAll("button")[0].addEventListener("click",()=>{
    const playername = document.querySelector("input").value
    if(playername === ""){
        playername = "unknown"
    }
    webLink +=`|playername=${playername}`
    window.location.href = webLink
})

document.querySelectorAll("button")[1].addEventListener("click",()=>{
    window.location.href=`rules.html`
})

document.querySelectorAll("button")[2].addEventListener("click",()=>{
    window.location.href=`scores.html`
})

document.querySelector(".audio").addEventListener("click", (e) => {
    document.querySelector(".volume").classList.toggle("high")
    if(e.target.classList.contains("high")){
        document.querySelector(".volume").src = "images/audio-high.png" 
        document.querySelector("audio").play()
        document.querySelector("audio").volume = 0.6
        webLink = `play.html?sound=1`
    }
    else{
        document.querySelector(".volume").src = "images/audio-low.png" 
        document.querySelector("audio").pause()
        webLink = `play.html?sound=0`
    }
    
})

