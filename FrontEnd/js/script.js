init();
//localStorage
function init(){
    getCategories();
    getProjects();
}

function getCategories() {
    fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
        displayCategories(data);
    });
}

function getProjects() {
    fetch('http://localhost:5678/api/works') 
    .then((respe) => respe.json())
    .then(data => { 
        displayWorks(data);
});
}

function displayCategories(tableCategories) {
    tableCategories.forEach(element => {
    const filterButton = document.createElement("button")
    filterButton.textContent = element.name
    filterButton.setAttribute('data-category-id',element.id)
    const filterDiv = document.querySelector(".filter")

    filterDiv.appendChild(filterButton)

    // if (element.id === 1) {
    // filterButton.className = "bouttonObjets" }
    // else if (element.id === 2) {
    // filterButton.className = "bouttonAppart";}
    // else  {
    // filterButton.className = "bouttonHotel";
    // }
    })
}

function displayWorks(tableWork) {
    tableWork.forEach(element => {
        const imageElement = document.createElement("img");
        imageElement.crossOrigin = "allow";
        imageElement.src = element.imageUrl;
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = element.title;
        const parent = document.querySelector(".gallery");
        const figureElement = document.createElement("figure");
        figureElement.setAttribute('data-category-id',element.categoryId)
        
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        parent.appendChild(figureElement);
      });
      filterProjects(); 
}

function filterProjects(){
    const btnFilter = document.querySelectorAll('.filter button');
    const projects = document.querySelectorAll('.gallery figure');
    btnFilter.forEach(element =>{
        element.addEventListener('click', function(){
            let categoryId = element.getAttribute('data-category-id');
            projects.forEach(el=>{
                if(categoryId){
                   if(el.getAttribute('data-category-id') === categoryId){
                    el.style.display = 'block';
                    }else{
                        el.style.display = 'none';
                    }
                }else{
                    el.style.display = 'block';
                }
            })
        })
    })
}

 /* Salut, n'oublie pas que le fetch() 
 renvoie une Promise donc tu dois ajouter 
 .then() pour récupérer ce que le serveur 
 te renvoie et .catch() pour gérer l'erreur 
 s'il y en a une Pour t'expliquer comment fonctionne 
 l'authentification, une des méthodes consiste à sauvegarder 
 dans le localStorage le token qui est renvoyer lors de la 
 requête au serveur avec l'email et le mot de passe  
 (cf. le cours Créez des pages web dynamiques avec JavaScript)
Ainsi, quand tu dois faire des requêtes pour ajouter 
ou supprimer des images, tu récupères ce token afin 
de prouver au serveur que tu es bien authentifié */




