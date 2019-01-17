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
console.log('test');
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

    if (email != "" && password != "" && name != "") {
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
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
    console.log('test 2');
    if (email != "" && password != "" && name != "") {
        console.log('oi');
        fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password,
                })

            })
            .then((res) => res.json())
            .then((data) => {
                if (data.succes) {
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("userId", data.id);
                    

                    console.log(data)
                    if (sessionStorage.getItem("token")) {
                        alert('moving on');
                        window.location = "/public/home.html";
                    } else {
                        alert("Wrong parameters");
                    }
                } else {
                    alert("Wrong parameterss dummy")
                }
            })
            .catch(err => alert(err))


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