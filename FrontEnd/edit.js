import { displayWorks, works } from "./works.js";
import { postWork, deleteWork } from "./apiCall.js";

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
        document.querySelector(".divForm").remove()
        previousPage.remove()
    })
    
}

function checkFormValidity() {
    const fileInput = document.querySelector('.imgInput');
    const titleInput = document.getElementById('titleInput');
    const categorySelect = document.getElementById('categorySelect');
    const submitButton = document.getElementById('submitButton');
    let errorMessage = document.querySelector(".errorMessage");
  
    if (fileInput.files.length > 0 && titleInput.value.trim() !== '' && categorySelect.value !== '') {
        submitButton.removeAttribute('disabled');
        if (errorMessage) {
            errorMessage.remove()
        }
    } else {
        submitButton.setAttribute('disabled', true);
        if (!errorMessage) {
            errorMessage = document.createElement("p");
            errorMessage.classList.add('errorMessage')
            errorMessage.innerText = "Attention le formulaire n'est pas correctement rempli ";
            submitButton.parentNode.insertBefore(errorMessage, submitButton); 
        }
        
    }
}

async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:5678/api/categories");
      if (!response.status === 200) {
        throw new Error('Erreur lors de la récupération des catégories');
      }
      const categories = await response.json();
      
      for (let i = 0; i < categories.length; i++) {
        let cat = categories[i];
        let option = document.createElement("option");
        option.value = cat.id;
        option.innerText = cat.name;
        categorySelect.appendChild(option);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
}

function newWork() {
    previous()
    document.querySelector("#displayModal").style.display = "none";
    let divForm = document.querySelector(".divForm")
    if (!divForm) {
        divForm = document.createElement("div")
        divForm.classList.add("divForm")
        document.querySelector("#divModal").appendChild(divForm)

        let titleForm = document.createElement("h1")
        titleForm.innerText = "Ajout photo"
        titleForm.classList.add("titleForm")
        divForm.appendChild(titleForm)

        let form = document.createElement ("form");
        form.id = "formProject";
        form.method = "POST";
        form.enctype = "multipart/form-data";

        let divAddImg = document.createElement("div")
        divAddImg.classList.add("divAddImg")
        form.appendChild(divAddImg)

        let divInput = document.createElement("div")
        divInput.classList.add("divInput")
        divAddImg.appendChild(divInput)

        let imgI = document.createElement("i")
        imgI.classList.add("far", "fa-image");
        divInput.appendChild(imgI);

        let imgLabel = document.createElement("label");
        imgLabel.setAttribute("for", "fileInput")
        imgLabel.innerText = "+ Ajouter photo"
        imgLabel.classList.add("imgLabel")
        divInput.appendChild(imgLabel);

        let imgInput = document.createElement("input");
        imgInput.setAttribute("type", "file")
        imgInput.setAttribute("id", "fileInput")
        imgInput.classList.add("imgInput")
        imgInput.required = true;
        imgInput.style.display = "none"
        divInput.appendChild(imgInput);

        let formatImg = document.createElement("p")
        formatImg.innerText = "jpg, png : 4mo max"
        divInput.appendChild(formatImg)

        let previewDiv = document.createElement("div");
        previewDiv.classList.add("previewDiv")
        divAddImg.appendChild(previewDiv)

        imgInput.addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const imageUrl = event.target.result;
                    const previewImg = document.createElement("img");
                    previewImg.setAttribute("src", imageUrl);
                    previewDiv.innerHTML = "";
                    previewDiv.appendChild(previewImg);
                }
                reader.readAsDataURL(file);
                divInput.style.display = "none"
            }
        })

        let titleProject = document.createElement ("label");
        titleProject.for = "titleProject";
        titleProject.innerText = "Titre"
        form.appendChild(titleProject);

        let titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.id = "titleInput";
        titleInput.required = true;
        form.appendChild(titleInput);

        let categoryForm = document.createElement("label");
        categoryForm.for = "categorySelect";
        categoryForm.innerText = "Catégorie";
        form.appendChild(categoryForm);

        let categorySelect = document.createElement("select");
        categorySelect.id = "categorySelect";
        categorySelect.name = "category";
        categorySelect.required = true;

        fetchCategories()

        form.appendChild(categorySelect);

        let hrForm = document.createElement("hr");
        form.appendChild(hrForm)

        let submitWork = document.createElement('input');
        submitWork.type = 'submit';
        submitWork.value = 'Valider';
        submitWork.classList.add('submitWork');
        submitWork.id = "submitButton"
        submitWork.disabled = true
        form.appendChild(submitWork);

        divForm.appendChild(form)
    }

    document.getElementById("formProject").addEventListener("change", checkFormValidity)

    const formNewWork = document.querySelector("#formProject")

    formNewWork.addEventListener("submit", submitNewWork)
    
}

async function submitNewWork(event) {

    event.preventDefault();
    
    const workForm = new FormData();

    workForm.append("image", document.querySelector(".imgInput").files[0]);
    workForm.append("title", document.getElementById("titleInput").value);
    workForm.append("category", document.getElementById("categorySelect").value);

    const formResponse = postWork(workForm)

    if (formResponse.ok) {

    } else {
        alert("Le Projet n'a pas pu être rajouté avec succès")
        
    }

}


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
        let divForm = document.querySelector(".divForm")
        if (divForm) {
            divForm.remove()
        }
        let previousPage = document.querySelector(".previousPage")
        if (previousPage) {
            previousPage.remove()
        }
    }

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal(event)
        }
    })

    let addWork = document.querySelector(".addWork");
    addWork.addEventListener("click", newWork)
    
    let deleteWorks = document.querySelectorAll(".deleteWork")

    for (let i = 0; i < deleteWorks.length; i++) {
        deleteWorks[i].addEventListener("click", async function (event) {

            event.preventDefault()

            const workDiv = deleteWorks[i].parentNode
            const workId = workDiv.getAttribute("id")

            const deleteResponse = deleteWork(workId)

            if (deleteResponse.ok) {
                deleteWorks[i].parentNode.remove()
            } else {
                alert("La photo n'a pas été supprimée avec succès")
            }

            deleteWorks[i].parentNode.remove()

        });
    }
}