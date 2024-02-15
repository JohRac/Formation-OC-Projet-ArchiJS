const loginClient = document.querySelector(".loginSubmit");
loginClient.addEventListener("submit", async function (event) {
    event.preventDefault();
    const loginID = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };
    console.log(loginID)
    const loginCharge = JSON.stringify(loginID);
    const user = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: loginCharge
    });
    await fetch("http://localhost:5678/api/users/login")
        .then(response => {
            if (response.status == 200) {
            window.localStorage.setItem("token", body.token );
            window.location.href="./index.html";
            } else {
                let errorMessage = document.querySelector(".errorMessage"); 
                if (!errorMessage) {
                    errorMessage = document.createElement("p");
                    errorMessage.classList.add('errorMessage')
                    errorMessage.innerText = "Erreur dans l'identifiant ou le mot de passe";
                    let forgotPassword = document.getElementById("forgotPassword") 
                    forgotPassword.insertBefore(errorMessage, forgotPassword.firstChild); 
                }
        }});
    const body = await user.json();
    console.log(body)
    console.log(user)
});








/*await fetch("http://localhost:5678/api/users/login")
        .then(response => {
            if (response.status == 200) {
            window.localStorage.setItem("token", body.token );
            window.location.href="./index.html";
            } else {
            let errorMessage = document.createElement("p");
            errorMessage.classList.add('errorMessage')
            errorMessage.innerText = "Erreur dans l'identifiant ou le mot de passe";
            let forgotPassword = document.getElementById("forgotPassword") 
            forgotPassword.insertBefore(errorMessage, forgotPassword.firstChild);
        }});*/


