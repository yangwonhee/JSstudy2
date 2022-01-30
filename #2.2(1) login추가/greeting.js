
const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");
const noPainting = document.getElementById("canvasShow")

const HIDDEN_CLASSNAME = "hidden";
const NAME_KEY = "name";

function removeHiddenclass(){
    noPainting.classList.remove(HIDDEN_CLASSNAME);
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

function onLoginSubmit(event){
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const Name = loginInput.value;
    localStorage.setItem(NAME_KEY, Name);
    paintGreetings(Name);
}

function paintGreetings(Name){
    greeting.innerText = `${Name}'s painting!`;
    removeHiddenclass()
}

const savedName = localStorage.getItem(NAME_KEY);

if(savedName === null){
    // show the form
    loginForm.addEventListener("submit", onLoginSubmit);
    loginForm.classList.remove(HIDDEN_CLASSNAME);
} else {
    // show the greetings
    loginForm.classList.add(HIDDEN_CLASSNAME);
    paintGreetings(savedName);
}