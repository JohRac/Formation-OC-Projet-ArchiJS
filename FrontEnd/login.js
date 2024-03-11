import { postUser } from "./apiCall.js";

const loginClient = document.querySelector(".loginSubmit");

loginClient.addEventListener("submit", async function (event) {

    event.preventDefault();
    const loginID = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };
    const loginCharge = JSON.stringify(loginID);

    const user = await postUser(loginCharge)

    const userBody = await user.json()

    if (user.ok) {
        window.localStorage.setItem("tokenID", userBody.token );
        window.location.href="./index.html";
    } else {
        let errorMessage = document.querySelector(".errorMessage");
        if (!errorMessage) {
            errorMessage = document.createElement("p");
            errorMessage.classList.add('errorMessage')
            errorMessage.innerText = "Erreur dans l'identifiant ou le mot de passe";
            let forgotPassword = document.getElementById("forgotPassword"); 
            forgotPassword.insertBefore(errorMessage, forgotPassword.firstChild); 
        }
    }
});
