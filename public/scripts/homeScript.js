let token = sessionStorage.getItem("token");
let userId = sessionStorage.getItem("userId");


if (!token) {
    alert('You do not have acces to this page.');
    window.location = "/index.html";
}

const body = document.querySelector("body");
body.style.display = "initial";


const addButton = document.querySelector(".addButton");
const closeButton = document.querySelector(".closeButton");
const confirmButton = document.querySelector(".confirmButton");
const modifyButton = document.querySelector("#modifyButton");
const removeButton = document.querySelector("#removeButton");
const archiveButton = document.querySelector("#archiveButton");


const modal = document.querySelector(".modal");


const openCreator = () => {
    modal.style.display = "initial";
    modal.style.zIndex = "1";
    modal.style.transitionDuration = "0.3s";

}
const closeCreator = () => {
    modal.style.transitionDuration = "0.5s";
    modal.style.display = "none";
}

addButton.addEventListener("click", openCreator);
closeButton.addEventListener("click", closeCreator);

let url = "http://localhost:5000/api/home/bob";

let outPut = ""
fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }

    })
    .then(result => result.json())
    .then(response => {
        // console.log(response)
        console.log("test1")
        console.log(" here's result ");
        response.map((item, index) => {
            outPut += /*html*/ `
                <h1>FKSGDK</h1>

            <p>${item.notes}</p>
            `

            document.querySelector(".doTitle").innerHTML = outPut;

            console.log("test3");
            console.log(item)
        })

    })