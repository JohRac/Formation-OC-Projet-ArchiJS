import { displayWorks, works } from "./works.js";

export function editPage() {
    let iconHeader = document.createElement("i");
    iconHeader.classList.add("far", "fa-pen-to-square");
    let titleHeader = document.createElement("p");
    titleHeader.innerText = "Mode édition";
    let divHeader = document.createElement("div");
    divHeader.classList.add("editDiv")
    divHeader.appendChild(iconHeader);
    divHeader.appendChild(titleHeader);
    let header = document.getElementById("titlePage");
    header.parentNode.insertBefore(divHeader, header);

    let loginButton = document.getElementById("loginButton");
    loginButton.href = "./index.html"
    loginButton.innerText = "logout"
    const logoutButton = document.getElementById("loginButton");
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("tokenID");
    });

    let iconModify = document.createElement("i");
    iconModify.classList.add("far", "fa-pen-to-square");
    let titleModify = document.createElement("p");
    titleModify.innerText = "Modifier";
    let divModify = document.createElement("div");
    divModify.classList.add("modifyDiv")
    let linkModify = document.createElement("a");
    linkModify.id = "modalLink"
    linkModify.href ="#modal"
    linkModify.appendChild(iconModify);
    linkModify.appendChild(titleModify);
    divModify.appendChild(linkModify)
    let projectsTitle = document.getElementById("projectsTitle");
    projectsTitle.appendChild(divModify);

    let cleanFilters = document.querySelector(".filters");
    if (cleanFilters) {
        cleanFilters.remove();
    };
};



export function openModal(event) {
    document.querySelector("#displayModal").style.display = "inherit"

    displayWorks(works, true)

    const stopPropagation = function (event) {
        event.stopPropagation()
    }

    let windowModal = null
    event.preventDefault()
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    windowModal = modal
    modal.addEventListener("click", closeModal)
    modal.querySelector(".closeModal").addEventListener("click", closeModal)
    modal.querySelector(".modalStop").addEventListener("click", stopPropagation)

    function closeModal(event) {
        if (windowModal === null) return
        event.preventDefault()
        window.setTimeout(function () {
            modal.style.display = "none"
            windowModal = null
        }, 500)
        modal.setAttribute("aria-hidden", true)
        modal.removeEventListener("click", closeModal)
        modal.querySelector(".closeModal").addEventListener("click", closeModal)
        modal.querySelector(".modalStop").removeEventListener("click", stopPropagation)
        document.querySelector(".gridModal").innerHTML = "";
    }

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal(event)
        }
    })

    function previous() { 
        
        let previousPage = document.querySelector(".previousPage")
        if (!previousPage) {
                
            previousPage = document.createElement("i")
            previousPage.classList.add("fa-solid", "fa-arrow-left")
            previousPage.classList.add("previousPage")
            let iconCloseModal = document.querySelector(".closeModal")
            iconCloseModal.parentNode.insertBefore(previousPage, iconCloseModal);
        }
        previousPage.addEventListener("click", function () {
            document.querySelector("#displayModal").style.display = "inherit";
            previousPage.remove()
        })
        
    }

    function newProject() {
        previous()
        document.querySelector("#displayModal").style.display = "none";
        let divForm = document.createElement("div")
        divForm.classList.add("divForm")
        document.querySelector("#divModal").appendChild(divForm)
        let titleForm = document.createElement("h1")
        titleForm.innerText = "Ajout photo"
        titleForm.classList.add("titleForm")
        divForm.appendChild(titleForm)
        let form = document.createElement ("form");
        form.id = "formProject";

        let imgI = document.createElement("i")
        imgI.classList.add("far", "fa-image");
        form.appendChild(imgI);
        let imgForm = document.createElement("label");
        imgForm.for = "imgForm";
        form.appendChild(imgForm);

        let imgInput = document.createElement("input");
        imgInput.type = "file";
        imgInput.id = "imgForm";
        imgInput.name = "image";
        imgInput.accept = "image/*"
        
        form.appendChild(imgInput);

        let titleProject = document.createElement ("label");
        titleProject.for = "titleProject";
        titleProject.innerText = "Titre"
        form.appendChild(titleProject);

        let titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.id = "titleProject";
        titleInput.name = "title";
        form.appendChild(titleInput);

        let categoryForm = document.createElement("label");
        categoryForm.for = "categoryForm";
        categoryForm.innerText = "Catégorie";
        form.appendChild(categoryForm);

        let categorySelect = document.createElement("select");
        categorySelect.id = "categoryForm";
        categorySelect.name = "category";

        fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {
            for (let i = 0; i < categories.length; i++) {
                let cat = categories[i];
                let option = document.createElement("option");
                option.value = cat.id;
                option.innerText = cat.name;
                categorySelect.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories:', error);
        });
        form.appendChild(categorySelect);

        let hrForm = document.createElement("hr");
        form.appendChild(hrForm)

        let submitForm = document.createElement('input');
        submitForm.type = 'submit';
        submitForm.value = 'Valider';
        submitForm.id = 'submitForm';
        form.appendChild(submitForm);

        divForm.appendChild(form)
    }

    let addWork = document.querySelector(".addWork");
    addWork.addEventListener("click", newProject)
    
    let deleteWorks = document.querySelectorAll(".deleteWork")
    let tokenID = localStorage.getItem("tokenID")

    for (let i = 0; i < deleteWorks.length; i++) {
        deleteWorks[i].addEventListener("click", async function () {

            const workDiv = deleteWorks[i].parentNode
            const workId = workDiv.getAttribute("id")

            const deleteResponse = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: { 
                accept: "*/*",
                Authorization: `Bearer ${tokenID}`}
            })

            console.log(deleteResponse)
            if (deleteResponse.status === 200) {
                deleteWorks[i].parentNode.remove()
                window.location.href="./index.html";
            } else {
                alert("La photo n'a pas été supprimée avec succès")
            }

            deleteWorks[i].parentNode.remove()

        });
    }
}