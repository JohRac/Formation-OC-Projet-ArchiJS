const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

function genererWorks(works){
    for (let i = 0; i < works.length; i++) {
        
        const work = works[i];
        console.log(work)

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

