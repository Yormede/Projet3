init();

function init() {
    launchModale();
    goToAddPhotoForm();
}

function launchModale() {
    const modaleOverlay = document.querySelector('.modaleOverlay')
    
    const modale = document.querySelector('.modale');
    const modaleContent = document.createElement("div");
    modaleContent.className = "modaleWrapper"
    modale.appendChild(modaleContent);

    const openModalButton = document.querySelectorAll('.openModale');

    const closeButton = document.createElement("p");
    closeButton.innerHTML = "<i class=\"fas fa-thin fa-xmark\"></i>"
    closeButton.classList = "closeModale"
    modaleContent.appendChild(closeButton);

    const modaleTitle = document.createElement('h3')
    modaleTitle.innerText = 'Galerie photo'
    modaleTitle.classList = "modaleTitle"
    modaleContent.appendChild(modaleTitle);

    const galleryPhoto = document.createElement('div')
    galleryPhoto.classList = 'galleryToEdit'
    modaleContent.appendChild(galleryPhoto);

    const divForButton = document.createElement('div');
    divForButton.classList = 'addAndDeleteButton'
    modaleContent.appendChild(divForButton);

    const buttonAddPhoto = document.createElement('button')
    buttonAddPhoto.classList = 'buttonAddPhoto'
    buttonAddPhoto.innerHTML = 'Ajouter une photo'
    divForButton.appendChild(buttonAddPhoto);

    const deleteGallery = document.createElement('p')
    deleteGallery.classList = 'deleteGallery'
    deleteGallery.innerHTML = 'Supprimer la galerie'
    divForButton.appendChild(deleteGallery);

    openModalButton.forEach(element => {
        element.addEventListener("click", function (event) {
            modale.style.display = "flex";
            modaleOverlay.style.display = "block";
            const parent = document.querySelector(".galleryToEdit");
            parent.innerHTML = ''
            getWorksForModale();
        });
    })

    closeButton.addEventListener("click", function() {
        modale.style.display = "none";
        modaleOverlay.style.display = "none";
    });

    modaleOverlay.addEventListener("click", function() {
        modale.style.display = "none";
        modaleOverlay.style.display = "none";
    });
}

function getWorksForModale() {
    fetch('http://localhost:5678/api/works') 
    .then((respe) => respe.json())
    .then(data => { 
        displayWorksInModale(data);
        confirmationDeletePhoto();
    });
}

function displayWorksInModale(tableWork) {
    tableWork.forEach(element => {
        const imageElement = document.createElement("img");
        imageElement.classList = "imageItem"
        imageElement.setAttribute("id", element.id)
        imageElement.crossOrigin = "allow";
        imageElement.src = element.imageUrl;
        const parent = document.querySelector(".galleryToEdit");
        const figureElement = document.createElement("figure");
        const figCaption = document.createElement("figcaption");
        figCaption.textContent = "éditer"
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class=\"fa fa-solid fa-trash-can\"></i>"
        deleteButton.classList = 'deleteButton'
        figureElement.appendChild(deleteButton);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figCaption);
        parent.appendChild(figureElement);
    });
}

function displayAddPhotoForm() {
    const modaleContent = document.querySelector(".modalWrapper");
    modaleContent.innerHTML = ''

    const closeButton = document.createElement("p");
    closeButton.innerHTML = "<i class=\"fas fa-thin fa-xmark\"></i>"
    closeButton.classList = "closeModale"
    modaleContent.appendChild(closeButton);
    
    const modaleTitle = document.createElement('h3')
    modaleTitle.innerText = 'Ajout photo'
    modaleTitle.classList = "modaleTitle modaleTitleAddPhoto"
    modaleContent.appendChild(modaleTitle);

    const goBackArrow = document.createElement('p')
    goBackArrow.innerHTML = '<i class=\"fa fa-thin fa-arrow-left\"></i>'
    goBackArrow.classList = 'goBackArrow'
    modaleContent.appendChild(goBackArrow);

    const formAddPhoto = document.createElement('form')
    formAddPhoto.classList = 'formAddPhoto'
    formAddPhoto.innerHTML = '<div>    <label for="images">+ Ajout photo</label>    <p class="">jpg. png: 4mo max</p><input type="file" accept=".jpg, .png, .gif " onchange="previewPicture(this)" required></div><label for="title">Titre</label><input type="text" name="title" id="titleNewPhoto"><label for="class">Catégorie</label><select id="categoryOfForm" name="class"><option value="pomme">Pomme</option><option value="banane">Banane</option><option value="orange">Orange</option><option value="kiwi">Kiwi</option></select>'

}

function goToAddPhotoForm() {
    const buttonAddPhoto = document.querySelector('.buttonAddPhoto')
    buttonAddPhoto.addEventListener('click', function (event) {
        const modaleContent = document.querySelector(".modalWrapper");
        modaleContent.innerHTML = ''
    } )
}

function confirmationDeletePhoto() {
    const deleteButton = document.querySelectorAll('.deleteButton')
    deleteButton.forEach (function (x) {
        x.addEventListener('click',openPopup)
    })
}

const openPopup = (e) => {
    let gridItemClicked = e.target.closest("figure")
    let imageElement = gridItemClicked.children[1].src
    let idToDelete = gridItemClicked.children[1].id
    createPopup(imageElement, idToDelete)
}

function createPopup(x, idToDelete) {
    const parentPopup = document.querySelector("body")
    const popup = document.createElement("div")
    popup.classList = 'popup'
    parentPopup.appendChild(popup)
    const popupOverlay = document.createElement("div")
    popupOverlay.classList = 'PopupOverlay'
    popup.appendChild(popupOverlay)
    const popupElement = document.createElement("div")
    popupElement.classList = 'popupElement'
    popup.appendChild(popupElement)
    const imgElement = document.createElement("img")
    imgElement.src = x
    popupElement.appendChild(imgElement)
    const parentDiv = document.createElement("div")
    parentDiv.classList = "DivTextAndButton"
    popupElement.appendChild(parentDiv)
    const paragraphElement = document.createElement('p')
    paragraphElement.innerHTML = "Voulez vous confirmer la suppresion de cet objet ?"
    parentDiv.appendChild(paragraphElement)
    const parentDivOfButton = document.createElement('div')
    parentDivOfButton.classList = 'buttonDiv'
    parentDiv.appendChild(parentDivOfButton)
    const cancelButton = document.createElement('button')
    cancelButton.classList = 'cancelButton'
    cancelButton.innerHTML = 'Annuler'
    cancelButton.addEventListener('click', () => popup.remove())
    parentDivOfButton.appendChild(cancelButton)
    const deleteFetchButton = document.createElement('button')
    deleteFetchButton.classList = 'fetchDeleteButton'
    deleteFetchButton.innerHTML = 'Supprimer !'
    deleteFetchButton.addEventListener('click', function (){
        fetchDelete(idToDelete)
        popup.remove()
    })
    parentDivOfButton.appendChild(deleteFetchButton)
}

function fetchDelete(id) {
    const userObject = JSON.parse(localStorage.getItem('userLogged'));
    const userToken = userObject.token
    console.log(userToken)
    console.log(id)
    fetch('http://localhost:5678/api/works/'+id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + userToken
        },
        }).then(response => {
            if(Response.ok) {
                return Response.json
            } else {
                alert('Une erreur est survenue')
            }
        }).catch()
}

