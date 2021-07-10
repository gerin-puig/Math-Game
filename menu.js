
document.querySelectorAll("button")[0].addEventListener("click",()=>{
    const playername = document.querySelector("input").value
    if(playername === ""){
        playername = "unknown"
    }
    window.location.href=`play.html?playername=${playername}`
})