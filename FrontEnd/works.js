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


const buttonAll = document.getElementById("all");

buttonAll.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(works);
});

const buttonTrinkets = document.getElementById("trinkets");

buttonTrinkets.addEventListener("click", function () {
    const workfilter = works.filter((work) => work.categoryId == 1);

    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workfilter);
});

const buttonFlats = document.getElementById("flats");

buttonFlats.addEventListener("click", function () {
    const workfilter = works.filter((work) => work.categoryId == 2);

    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workfilter);
});

const buttonBuildings = document.getElementById("buildings");

buttonBuildings.addEventListener("click", function () {
    const workfilter = works.filter((work) => work.categoryId == 3);

    document.querySelector(".gallery").innerHTML = "";
    genererWorks(workfilter);
});
