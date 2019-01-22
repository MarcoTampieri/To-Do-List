//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// SET UP
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
let token = sessionStorage.getItem("token");
let userId = sessionStorage.getItem("userId");

if (!token) {
    alert('You do not have acces to this page.');
    window.location = "/index.html";
}

const body = document.querySelector("body");
body.style.display = "initial";

const openButton = document.querySelector(".openButton"); //ok
const closeButton = document.querySelector(".closeButton"); //ok
const closeButtonTwo = document.querySelector(".closeButtonTwo");
const addButton = document.querySelector(".addButton"); //ok
const modifyButton = document.querySelector(".modifyButton");
const modal = document.querySelector(".modal");
const modalTwo = document.querySelector(".modaltwo");
let putId;


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// FUNCTIONS
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

const openCreator = () => {
    modal.style.display = "initial";
    modal.style.zIndex = "1";
    modal.style.transitionDuration = "0.3s";

}
const closeCreator = () => {
    modal.style.transitionDuration = "0.5s";
    modal.style.display = "none";
}



const closeModifier = () => {
    modalTwo.style.transitionDuration = "0.5s";
    modalTwo.style.display = "none";
}


// *****CRUD SECTION*****

let url = `http://localhost:5000/api/home/${userId}`;
let urlDel = `http://localhost:5000/api/home`;

//*****GET*****
const generateList = () => {
    let outPut = ""
    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(result => result.json())
        .then(response => {
            response.map((item, index) => {
                outPut += /*html*/ `
            <div class="contenitore-griglia" >

                <div class="fare">
                    <p class="doTitle">${item.argument}</p>
                </div>

                <div class="inCorso">
                    <p class="radioButton">
                        <input type="radio" name="elementStatus${item._id}" value="on-it">
                    </p>

                </div>

                <div class="bloccato">
                    <p class="radioButton">
                        <input type="radio" name="elementStatus${item._id}" value="stuck">
                    </p>
                </div>

                <div class="rimandato">
                    <p class="radioButton">
                        <input type="radio" name="elementStatus${item._id}" value="ostponed">
                    </p>
                </div>

                <div id="notes" class="note">
                    <p class="doNotes">${item.notes}</p>
                </div>

                <div class="priorita">
                    <p>${item.priority} </p>
                </div>

                <div class="opzioni">
                    <p>
                        <button class="opzioniBottone" id="modifyButton" onclick="openModifier(this.value)" value="${item._id}">
                            <ion-icon name="hammer"></ion-icon>
                        </button>
                        <button class="opzioniBottone" id="removeButton" onclick="removeTask(this.value)" value="${item._id}" >
                            <ion-icon name="remove-circle"></ion-icon>
                        </button>
                        <button class="opzioniBottone" id="archiveButton">
                            <ion-icon name="folder-open"></ion-icon>
                        </button>
                    </p>
                </div>
            </div>
            `
                console.log(item)
                document.querySelector(".list").innerHTML = outPut;
            })
        });
}
generateList();

//*****POST*****
const postTask = () => {
    let writeName = document.querySelector('.writeName').value;
    let radioButtons = document.getElementsByName('elementStatus'); //Attr.name('elementStatus').value;
    let statusValue = "";
    for (i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            statusValue = radioButtons[i].value;
            break
        } else {
            statusValue = null;
        }
    }
    let writeNote = document.querySelector('.writeNote').value;
    let prioritySelector = document.querySelector('.prioritySelector').value;


    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId": userId,
            "argument": writeName,
            "status": statusValue, //<--problem
            "notes": writeNote,
            "priority": prioritySelector
        })
    })
    writeName = "";
    statusValue = null;
    writeNote = "";
    prioritySelector = "";
    generateList();
    closeCreator();

}

//*****PUT*****
let writeNameTwo = document.querySelector(".writeNameTwo");
let radioButtonTwo = document.querySelector(".radioButtonTwo");
let createNTwo = document.querySelector(".createNTwo");
let createPTwo = document.querySelector(".createPTwo");

const openModifier = (e) => {
    modalTwo.style.display = "initial";
    modalTwo.style.zIndex = "1";
    modalTwo.style.transitionDuration = "0.3s";
    console.log("we got here")


    putId = e;
    let urlSingle = `http://localhost:5000/api/home/elements/${putId}`
    fetch(urlSingle, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(result => result.json())
        .then(response => {
            console.log("we got this far")
            console.log(response.argument)

            writeNameTwo.value = response.argument;
            let statusValueTwo = "";
            for (i = 0; i < radioButtonsTwo.length; i++) {
                if (radioButtonsTwo[i].checked) {
                    statusValueTwo = radioButtonsTwo[i].value;
                    break
                } else {
                    statusValueTwo = null;
                }
            };
            createNTwo.value = response.notes;
            createPTwo.value = response.priority;
            console.log("almost there");
        })
        .catch(err => {
            throw err
        })
}

const modifyTask = () => {
    console.log("testting put")
    console.log(putId)


}

//*****DELETE*****
const removeTask = (e) => {
    console.log("testing delete id")
    // console.log("id",e);

    let sure = confirm("Do you Want to delete this task?");

    if (sure == true) {
        fetch(urlDel, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "elementId": e,
            })
        }, )
        console.log('deleted')
        generateList();
    };
}


//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// EVENT LISTENERS
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


openButton.addEventListener("click", openCreator);
closeButton.addEventListener("click", closeCreator);
closeButtonTwo.addEventListener("click", closeModifier);
addButton.addEventListener("click", postTask);
modifyButton.addEventListener("click", modifyTask);