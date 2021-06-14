const buttonSearch = document.querySelector("#page-home main a")
const model = document.querySelector("#model")
const close = document.querySelector("#model .header a")

buttonSearch.addEventListener("click", ()=>{
    model.classList.remove("hide")
})

close.addEventListener("click", () =>{
    model.classList.add("hide")
})