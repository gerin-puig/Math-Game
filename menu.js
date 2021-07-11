
document.querySelectorAll("button")[0].addEventListener("click",()=>{
    const playername = document.querySelector("input").value
    if(playername === ""){
        playername = "unknown"
    }
    window.location.href=`play.html?playername=${playername}`
})

document.querySelectorAll("button")[1].addEventListener("click",()=>{
})

document.querySelectorAll("button")[2].addEventListener("click",()=>{
    window.location.href=`scores.html`
})

document.querySelector(".audio").addEventListener("click", (e) => {
    document.querySelector(".volume").classList.toggle("high")
    if(e.target.classList.contains("high")){
        document.querySelector(".volume").src= "images/audio-high.png" 
    }
    else{
        document.querySelector(".volume").src= "images/audio-low.png" 
    }
    
})