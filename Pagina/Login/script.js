import { initializeApp } from 
"https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

import firebaseConfig from "./21aqmq5v.e5a.js";


   const app = initializeApp(firebaseConfig);

   import { getAuth, signInWithEmailAndPassword} 
   from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'
   
   
   const auth = getAuth(app);

var email = document.getElementById("email_login")
var senha = document.getElementById("senha_login")
var button = document.getElementById("login")
button.addEventListener('click',credenciar)
function credenciar(){

localStorage.removeItem("emailImport")
localStorage.removeItem("senhaImport")  

signInWithEmailAndPassword(auth ,email.value, senha.value  
    )
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href = "Menu/Menu.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    console.log( errorMessage)
   if(errorMessage == "Firebase: Error (auth/user-not-found)."){
   let messageErro = document.getElementById("erro_email");
    messageErro.classList.remove('display_block')

   } else if (errorMessage == "Firebase: Error (auth/wrong-password)."){

    let messageErroSenha = document.getElementById("erro_senha");
    messageErroSenha.classList.remove('display_block')
   }
  });


var emailImport = email.value;
localStorage.setItem("emailImport", emailImport)
var senhaImport = senha.value;
localStorage.setItem("senhaImport", senhaImport)

}
