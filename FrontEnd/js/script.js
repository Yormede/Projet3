init();

function init(){
    getCategories();
    getWorks();
    userLoggedIn();
    filterProjects();
    LogInTimer();
    logOut();
}

function getCategories() {
    fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
        displayCategories(data);
    });
}

function getWorks() {
    fetch('http://localhost:5678/api/works') 
    .then((respe) => respe.json())
    .then(data => { 
        displayWorks(data);
});
}

function displayCategories(tableCategories) {
    tableCategories.forEach(element => {
    const filterButton = document.createElement("button")
    filterButton.classList.add("backgroundFilterwhite")
    filterButton.textContent = element.name
    filterButton.setAttribute('data-category-id',element.id)
    const filterDiv = document.querySelector(".filter")
    filterDiv.appendChild(filterButton)
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
            colourFilter(element)
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
    colourFilter()
}

function colourFilter() {
    const filterBtn = document.querySelectorAll('.filter button') 
    filterBtn.forEach(element => {
        element.addEventListener("click",  () => {
            filterBtn.forEach(otherElement => {
                otherElement.classList.remove('backgroundFilterGreen');
                otherElement.classList.add('backgroundFilterWhite');
            });
            element.classList.add('backgroundFilterGreen');
            element.classList.remove('backgroundFilterWhite');
        })
    })
}

function LogInTimer() {
    var hours = 8; // to clear the localStorage after 1 hour
    // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > hours*1000*60*60) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
            alert("vous n'ètes pas connecté")
        }
    }
  }

function userLoggedIn() {
    const userObject = JSON.parse(localStorage.getItem('userLogged'));
    if (userObject.token !== undefined) {
        const elementToDisplayWhenLoggedIn = document.querySelectorAll('.displayWhenLoggedIn')
        elementToDisplayWhenLoggedIn.forEach (element =>{
            element.style.display = 'block';
          })
        const elementToUndisplayWhenLoggedIn = document.querySelectorAll('.undisplayWhenLoggedIn')
        elementToUndisplayWhenLoggedIn.forEach (element =>{
            element.style.display = 'none';
          })
        const header = document.querySelector("header")
        header.style.marginTop = '90px';
        const topBlackBar = document.querySelector(".topBarBlack")
        topBlackBar.style.display = 'flex';
    }
}

function logOut() {
    const logOutButton = document.querySelector('.logOutButton')
    logOutButton.addEventListener('click', function (event) {
      localStorage.clear();
      window.location.reload();
    })
}



