
// ================ LIVE ===================

let liveArray = [...document.getElementsByClassName("arraw-btn-live")];

liveArray.forEach(el => {
    
    el.addEventListener("click", (e)=>{
        let href = e.target.getAttribute("data-href");
        location.href = href;
    });

});

// ================= GITHUB ==============

let githubArray = [...document.getElementsByClassName("arraw-btn-github")];

githubArray.forEach(el => {
    
    el.addEventListener("click", (e)=>{
        let href = e.target.getAttribute("data-href");
        location.href = href;
    });

});