init();

function init() {
    launchModale();
    createAddPhotoForm()
    goToAddPhotoForm()
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

function createAddPhotoForm() {
    const modale = document.querySelector(".modale");

    const modaleContent = document.querySelector(".modaleWrapper");

    const modaleContentAddPhoto = document.createElement("div");
    modaleContentAddPhoto.classList = "modaleWrapperTwo"
    modale.appendChild(modaleContentAddPhoto)

    const closeButton = document.createElement("p");
    closeButton.classList = "closeModale"
    modaleContentAddPhoto.appendChild(closeButton);

    const closeButtonIcon = document.createElement("i");
    closeButtonIcon.classList = "fas fa-thin fa-xmark"
    closeButton.appendChild(closeButtonIcon);
    closeButton.addEventListener("click", function() {
        modale.style.display = "none";
        modaleContentAddPhoto.style.display = "none";
        modaleContent.style.display = "block";
        makeElementEmpty()
    });

    const goBackArrow = document.createElement('p')
    goBackArrow.classList = 'goBackArrow'
    const goBackArrowIcon = document.createElement("i");
    goBackArrowIcon.classList = "fa fa-thin fa-arrow-left"
    modaleContentAddPhoto.appendChild(goBackArrow);
    goBackArrow.appendChild(goBackArrowIcon);

    goBackArrow.addEventListener("click", function (event) {
        modaleContentAddPhoto.style.display = "none";
        modaleContent.style.display = "block";
        makeElementEmpty()
    })
    
    const modaleTitle = document.createElement('h3')
    modaleTitle.innerText = 'Ajout photo'
    modaleTitle.classList = "modaleTitle modaleTitleAddPhoto"
    modaleContentAddPhoto.appendChild(modaleTitle);

    const formAddPhoto = document.createElement('form')
    formAddPhoto.classList = 'formAddPhoto'
    modaleContentAddPhoto.appendChild(formAddPhoto)

    const formDiv = document.createElement('div')
    formDiv.classList = 'divDropImage'
    formAddPhoto.appendChild(formDiv)

    const iconImage = document.createElement('i')
    iconImage.classList = "fa fa-light fa-image displayWhenNoImage"
    formDiv.appendChild(iconImage)

    const labelImage = document.createElement('label')
    labelImage.textContent = "+ Ajouter photo"
    labelImage.classList = "displayWhenNoImage"
    labelImage.setAttribute('for', "image")
    formDiv.appendChild(labelImage)

    const paragraphInImage = document.createElement('p')
    paragraphInImage.innerHTML = 'jpg. png: 4mo max'
    paragraphInImage.classList = 'displayWhenNoImage'
    formDiv.appendChild(paragraphInImage)

    const inputImageFile = document.createElement('input')
    inputImageFile.setAttribute('Type', "file")
    inputImageFile.setAttribute('accept',".jpg, .png, .gif")
    inputImageFile.setAttribute('required','true')
    inputImageFile.setAttribute('id', "image")
    formDiv.appendChild(inputImageFile)

    const imagePreview = document.createElement('img')
    imagePreview.setAttribute('id', "imagePreview")
    formDiv.appendChild(imagePreview)

    previewImage()

    const labelTitle = document.createElement('label')
    labelTitle.textContent = "Titre"
    labelTitle.setAttribute('for', "titleAddPhoto")
    formAddPhoto.appendChild(labelTitle)

    const inputTitle = document.createElement('input')
    inputTitle.setAttribute('id', "titleAddPhoto")
    inputTitle.setAttribute("type", "text")
    inputTitle.setAttribute("required", "true")
    formAddPhoto.appendChild(inputTitle)

    const labelCategory = document.createElement('label')
    labelCategory.innerText = "Catégorie"
    labelCategory.setAttribute('for', "categoryOfObject")
    formAddPhoto.appendChild(labelCategory)

    const selectClass = document.createElement('select')
    selectClass.classList = 'SelectInAddPhoto'
    selectClass.setAttribute("id", "categoryOfObject")
    selectClass.setAttribute("required", "true")
    formAddPhoto.appendChild(selectClass)

    fetchCategoryForFormAddPhoto()

    const divForButton = document.createElement('div')
    divForButton.classList = "DivForAddingPhotoButton"
    formAddPhoto.appendChild(divForButton)
    const buttonSend = document.createElement('button')
    buttonSend.setAttribute("type", "submit")
    buttonSend.setAttribute("id", "buttonAddPhoto")
    buttonSend.innerHTML = "Valider"
    divForButton.appendChild(buttonSend)

    inputTitle.addEventListener("input", checkInputs);
    inputImageFile.addEventListener("change", checkInputs); 
    
    buttonSend.addEventListener("click", function () {
        postNewProject(inputTitle.value, inputImageFile.files[0]);
        event.preventDefault();
    })
}

function createCategoryOptionForSelectInForm (x) {
    const optionParent = document.querySelector('.SelectInAddPhoto')
    x.forEach(function (e) {
        const option = document.createElement('option')
        option.setAttribute('value', e.name)
        option.innerText = e.name
        optionParent.appendChild(option)
    })
}

function fetchCategoryForFormAddPhoto() {
    fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
        createCategoryOptionForSelectInForm(data)
    });
}

function goToAddPhotoForm() {
    const buttonAddPhoto = document.querySelector('.buttonAddPhoto')
    buttonAddPhoto.addEventListener('click', function (event) {
        const modaleContent = document.querySelector(".modaleWrapper");
        modaleContent.style.display = "none";
        const modalePhoto = document.querySelector(".modaleWrapperTwo")
        modalePhoto.style.display = "block";
    })
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
    deleteFetchButton.innerHTML = 'Supprimer'
    deleteFetchButton.addEventListener('click', function (){
        fetchDelete(idToDelete)
        popup.remove()
    })
    parentDivOfButton.appendChild(deleteFetchButton)
}

function fetchDelete(id) {
    const userObject = JSON.parse(localStorage.getItem('userLogged'));
    const userToken = userObject.token
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

function previewImage() {
    const imageInput = document.getElementById("image");
    const preview = document.getElementById("imagePreview");

    imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
        preview.src = reader.result;
        });

        reader.readAsDataURL(file);

        document.querySelectorAll(".displayWhenNoImage").forEach(function (element) {
            element.style.display = "none";
        }) 
    }
    });
}

function makeElementEmpty() {
    const imageInput = document.getElementById("image")
    document.querySelector(".fa-xmark").addEventListener("click", () => {
        imageInput.value = "";
      });
    document.querySelector(".fa-arrow-left").addEventListener("click", () => {
        imageInput.value = "";
      });
      document.querySelectorAll(".displayWhenNoImage").forEach(function (element) {
        element.style.display = "block";
      });
      document.getElementById("imagePreview").src = ""
      document.getElementById("titleAddPhoto").value = ""
}

function checkInputs() {
    const imageInput = document.getElementById("image");
    const titleInput = document.getElementById("titleAddPhoto");
    const validerButton = document.getElementById("buttonAddPhoto");

        if (imageInput.files.length > 0 && titleInput.value.trim() !== "") {
            validerButton.classList.add("enabledColor");
            validerButton.classList.remove("disabledcolor");
        } else {
            validerButton.classList.remove("enabledColor");
            validerButton.classList.add("disabledcolor");
        }
}

function postNewProject(titleValue, imageValue) {
        const select = document.querySelector("select")
        let categoryId = undefined;
        if (select.value === "Objets") {
            categoryId = 1
        } if (select.value === "Appartements") {
            categoryId = 2
        } if (select.value === "Hotels & restaurants") {
            categoryId = 3
        }
        console.log(titleValue, categoryId, imageValue)

        const userObject = JSON.parse(localStorage.getItem('userLogged'));
        const userToken = userObject.token

        const form = new FormData();
        form.append("title", titleValue)
        form.append("image", imageValue)
        form.append("category", categoryId)

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer ' + userToken
      },
      body: form
    })
}