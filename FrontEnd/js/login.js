init()

function init(){
  loginSubmit();
  LogInTimer();
}

function redirectionAcceuil(){
  document.location.href="/FrontEnd/index.html";
}

function login() {
  const email =  document.querySelector('#email');
  const password = document.querySelector('#password');
  if(email.value.length > 5 && password.value.length > 0){
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
        const errorLog = document.querySelector('.errorLog')
        errorLog.style.display = 'block'
      }
    })
    .then(data => {
      if (data != null) {
      const userLogged = JSON.stringify(data)
      localStorage.setItem('userLogged', userLogged);
      redirectionAcceuil()
    }})
  }else{
    const errorLog = document.querySelector('.errorLog')
    errorLog.style.display = 'block'
  }
}

function loginSubmit(){
  const btnLogin = document.querySelector('.btnLogin');
  btnLogin.addEventListener('click', function (event) {
    login()
    event.preventDefault();
  });
}

function LogInTimer() {
  var hours = 8; // to clear the localStorage after 1 hour
  // (if someone want to clear after 8hrs simply change hours=8)
  var now = new Date().getTime();
  console.log(now);
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



