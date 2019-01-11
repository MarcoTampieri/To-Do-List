const addButton = document.querySelector(".addButton");
const closeButton = document.querySelector(".closeButton");
const confirmButton = document.querySelector(".confirmButton");
const modifyButton = document.querySelector("#modifyButton");
const removeButton = document.querySelector("#removeButton");
const archiveButton = document.querySelector("#archiveButton");


const modal = document.querySelector(".modal");


const openCreator= () => {
    modal.style.display = "initial";
}
const closeCreator = () => {
    modal.style.display = "none";
}

addButton.addEventListener("click", openCreator);
closeButton.addEventListener("click", closeCreator);