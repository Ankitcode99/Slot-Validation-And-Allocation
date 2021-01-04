var userName;
var userPass;

const menuItem = document.getElementById('menuItem');
menuItem.addEventListener('click', () => {
  if (confirm('Do you want to leave this website ?'))
    document.location.href='./home.html';
});

const userLogin = document.getElementById('userLogin');
if (userLogin) {
  if (userName) {
    userLogin.innerHTML=userName;
  }

  userLogin.addEventListener('click', () => {
    if (confirm('Do you want to leave this website ?'))
      if (userName) 
        document.location.href='./user.html';
      else 
        document.location.href='./login.html';
  });
}

var lform=true;
const loginForm = document.getElementById('loginform');
if (loginForm) {
  
}
const signForm = document.getElementById('signform');
if (signForm) {
  signForm.style.display='none';
}

function siwitchLoginSighup() {
  if (lform) {
    loginForm.style.display='none';
    signForm.style.display='block';
    lform=false;
  } else {
    loginForm.style.display='block';
    signForm.style.display='none';
    lform=true;
  }
}