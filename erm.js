var button = document.getElementById("createButton");

button.addEventListener("click", createAnotherElement)

function createAnotherElement(){
    document.createElement("img")
}