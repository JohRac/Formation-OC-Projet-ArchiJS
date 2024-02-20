import { editPage, openModal } from "./edit.js";

const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

function genererWorks(works){
    for (let i = 0; i < works.length; i++) {
        
        const work = works[i];

        const sectionGallery = document.querySelector(".gallery");
        const workElement = document.createElement("work");
        const ImageElement = document.createElement("img");
        ImageElement.src = work.imageUrl;
        const TitleElement = document.createElement("p");
        TitleElement.innerText = work.title;

        sectionGallery.appendChild(workElement);
        workElement.appendChild(ImageElement);
        workElement.appendChild(TitleElement);
    };
};

genererWorks(works);

/** 
const radioAll = document.getElementById("all");

radioAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(works);
});

const radioTrinkets = document.getElementById("trinkets");

radioTrinkets.addEventListener("click", function () {
    const workfilter = works.filter((work) => work.categoryId == 1);

    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workfilter);
});

const radioFlats = document.getElementById("flats");

radioFlats.addEventListener("click", function () {
    const workfilter = works.filter((work) => work.categoryId == 2);

    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workfilter);
});

const radioBuildings = document.getElementById("buildings");

radioBuildings.addEventListener("click", function () {
    const workfilter = works.filter((work) => work.categoryId == 3);

    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workfilter);
});
**/

let radioFilters = document.querySelectorAll('.filters input');
for (let index = 0; index < radioFilters.length; index++) {
    radioFilters[index].addEventListener("change", (event) => {
        if (event.target.value === "0") {
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(works);
        }   else if (event.target.value === "1") {
            const workfilter = works.filter((work) => work.categoryId == 1);
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(workfilter);
        }   else if (event.target.value === "2") {
            const workfilter = works.filter((work) => work.categoryId == 2);
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(workfilter);
        }   else {
            const workfilter = works.filter((work) => work.categoryId == 3);
            document.querySelector(".gallery").innerHTML = "";
            genererWorks(workfilter);
        };
    });
};

if(localStorage.getItem('tokenID')) {
    editPage()
};

/*editPage();*/

const modalLink = document.getElementById("modalLink");
modalLink.addEventListener("click", openModal);
