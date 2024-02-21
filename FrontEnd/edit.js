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
    
    displayWorks(works, true)

    let iconCloseModal = document.querySelector(".XModal")
    if (!iconCloseModal) {
        iconCloseModal = document.createElement("i")
        iconCloseModal.classList.add("fas", "xmark")
        iconCloseModal.classList.add("XModal")
        let titleModal = document.getElementById("titleModal")
        titleModal.parentNode.insertBefore(iconCloseModal, titleModal);
    }


    const stopPropagation = function (event) {
        event.stopPropagation()
    }

    let windowModal = null
    event.preventDefault()
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    windowModal = modal
    modal.addEventListener("click", closeModal)
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
        modal.querySelector(".modalStop").removeEventListener("click", stopPropagation)
        document.querySelector(".gridModal").innerHTML = "";
    }

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal(event)
        }
    })

    
}
