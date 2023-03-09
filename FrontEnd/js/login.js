const btnLogin = document.querySelector('.btnLogin');

function RedirectionAcceuil(){
  document.location.href="/FrontEnd/index.html";
}

function login() {
fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: document.querySelector('#email').value, password: document.querySelector('#password').value})
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      alert("Adresse mail ou mot de passe incorrect")
    }
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    RedirectionAcceuil()
    success = false;
  })
  .catch();
}

btnLogin.addEventListener('click', function (event) {
  login()
  event.preventDefault();
});

