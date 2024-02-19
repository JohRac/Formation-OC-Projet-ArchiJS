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

    let iconModale = document.createElement("i");
    iconModale.classList.add("far", "fa-pen-to-square");
    let titleModale = document.createElement("p");
    titleModale.innerText = "Modifier";
    let divModale = document.createElement("div");
    divModale.classList.add("modaleDiv")
    divModale.appendChild(iconModale);
    divModale.appendChild(titleModale);
    let projectsTitle = document.getElementById("projectsTitle");
    projectsTitle.appendChild(divModale);

    let cleanFilters = document.querySelector(".filters");
    if (cleanFilters) {
        cleanFilters.remove();
    };
};