

const openSignUp = document.querySelector("#openSignUp");
const openSignIn = document.querySelector("#openSignIn");
const signUp = document.querySelector(".signUp");
const signIn = document.querySelector(".signIn");
const submitSignUp = document.querySelector("#submitSignUp");
const submitSignIn = document.querySelector("#submitSignIn");
//XXXXXXXXXXXXXXXXXXXXX
// STYLE FUNCTIONS
//XXXXXXXXXXXXXXXXXXXXX
let displaySignUp = () => {
    if (signIn.style.display != "none") {
        signIn.style.display = "none";
    }
    signUp.style.display = "initial";
    signUp.style.backgroundColor = "#00000059"; // <--Dosn't work, find out why.
}

let displaySignIn = () => {
    if (signUp.style.display != "none") {
        signUp.style.display = "none";
    }
    signIn.style.display = "initial";
    signIn.style.backgroundColor = "#00000059" // <--Dosn't work, find out why.
}

//XXXXXXXXXXXXXXXXXXXXX
// BACKEND FUNCTIONS
//XXXXXXXXXXXXXXXXXXXXX

let postSignUp = () => {
    let url = 'http://localhost:5000/api/signUp';
    let name = document.querySelector("#newUserName").value;
    let email = document.querySelector("#newUserEmail").value;
    let password = document.querySelector("#newUserPassword").value;
    name.toString();
    email.toString();
    password.toString();
    
    if(email != "" && password != "" && name != "") {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }, body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
            })
        })
    } else {
        alert("Please enter a valid email andress and password");
    }
    document.querySelector("#newUserName").value = "";
    document.querySelector("#newUserEmail").value = "";
    document.querySelector("#newUserPassword").value = "";
    
    console.log("end of the function")
}

let postSignIn = async () => {
    let url = "http://localhost:5000/api/signIn";
    let name = document.querySelector("#registeredUserName").value;
    let email = document.querySelector("#registeredUserEmail").value;
    let password = document.querySelector("#registeredUserPassword").value;
    name.toString();
    email.toString();
    password.toString();
    //PROBLEMA: il login sarà accettato dal momento che tutti e tre i campi non sono vuoti anche se erronei.
    //SOLUZIONE(?): cambiare la condizione qui sotto per fare in modo che compari l'input a il database
    if(email != "" && password != "" && name != "") {
       let token = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }, body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
            })
        })
        const biscuit = await token.json();
        
        console.log(biscuit.token);
        localStorage.setItem("token", biscuit.token);
        
        
        if (localStorage.getItem("token")) {
            window.location= "/home.html";
        } else {
            alert("Wrong parameters");
        }

    } else {
        alert("The submitted parameters do not match any registered user")
    }

    document.querySelector("#registeredUserName").value = "";
    document.querySelector("#registeredUserEmail").value = "";
    document.querySelector("#registeredUserPassword").value = "";
}

//XXXXXXXXXXXXXXXXXXXXX
// EVENT LISTENERS
//XXXXXXXXXXXXXXXXXXXXX

openSignUp.addEventListener("click", displaySignUp);
openSignIn.addEventListener("click", displaySignIn);

submitSignUp.addEventListener("click", postSignUp);
submitSignIn.addEventListener("click", postSignIn);
//non è altro che un modello scarabocchiato

// let login = ()=>{
//     let email = document.getElementById('esempio').value;
//     fetch('/user',)
// }

// let bob = document.getElementById('bob').addEventListener('click', login);