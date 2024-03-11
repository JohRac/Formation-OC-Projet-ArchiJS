import { editPage, openModal } from "./edit.js";
import { getWork } from "./apiCall.js";

const reponse = await getWork()
export const works = await reponse.json();

export function displayWorks(works, modalGallery=false){
    for (let i = 0; i < works.length; i++) {
        
        const work = works[i];
        let sectionGallery = null
        const workElement = document.createElement("div");
        workElement.classList.add("work")
        const ImageElement = document.createElement("img");
        ImageElement.src = work.imageUrl;

        if (modalGallery) {
            sectionGallery = document.querySelector(".gridModal")
            let deleteElement = document.createElement("i")
            deleteElement.classList.add("fa-solid", "fa-trash-can")
            deleteElement.classList.add("deleteWork")
            sectionGallery.appendChild(workElement);
            workElement.appendChild(ImageElement);
            workElement.appendChild(deleteElement)
            workElement.id = work.id

        } else {
            sectionGallery = document.querySelector(".gallery");
            const TitleElement = document.createElement("p");
            TitleElement.innerText = work.title;

            sectionGallery.appendChild(workElement);
            workElement.appendChild(ImageElement);
            workElement.appendChild(TitleElement);
        }
    };
    
};

displayWorks(works);

let radioFilters = document.querySelectorAll('.filters input');
for (let index = 0; index < radioFilters.length; index++) {
    radioFilters[index].addEventListener("change", (event) => {
        if (event.target.value === "0") {
            document.querySelector(".gallery").innerHTML = "";
            displayWorks(works);
        }   else if (event.target.value === "1") {
            const workfilter = works.filter((work) => work.categoryId == 1);
            document.querySelector(".gallery").innerHTML = "";
            displayWorks(workfilter);
        }   else if (event.target.value === "2") {
            const workfilter = works.filter((work) => work.categoryId == 2);
            document.querySelector(".gallery").innerHTML = "";
            displayWorks(workfilter);
        }   else {
            const workfilter = works.filter((work) => work.categoryId == 3);
            document.querySelector(".gallery").innerHTML = "";
            displayWorks(workfilter);
        };
    });
};

if(localStorage.getItem('tokenID')) {
    editPage()
    const modalLink = document.getElementById("modalLink");
    modalLink.addEventListener("click", openModal);
};


