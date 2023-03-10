const btnLogin = document.querySelector('.btnLogin');

function redirectionAcceuil(){
  document.location.href="/FrontEnd/index.html";
}

function login() {
  const email =  document.querySelector('#email');
  const password = document.querySelector('#password');
  if(email.value.length > 0 && password.value.length > 0){
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email.value, password: password.value})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Adresse mail ou mot de passe incorrect")
      }
    })
    .then(data => {
      if (data != null) {
      const userLogged = JSON.stringify(data)
      localStorage.setItem('userLogged', userLogged);
      redirectionAcceuil()
    }})
  }else{
    alert("Adresse mail ou mot de passe incorrect")  
  }
}

btnLogin.addEventListener('click', function (event) {
  login()
  event.preventDefault();
});


/*var hours = 1; // to clear the localStorage after 1 hour
               // (if someone want to clear after 8hrs simply change hours=8)
var now = new Date().getTime();
var setupTime = localStorage.getItem('setupTime');
if (setupTime == null) {
    localStorage.setItem('setupTime', now)
} else {
    if(now-setupTime > hours*60*60*1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
    }
}*/

