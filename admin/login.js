function login(){

const email = document.getElementById("email").value.trim();
const senha = document.getElementById("password").value.trim();

const emailAdmin = "admin@espacoearte.com";
const senhaAdmin = "123456";


if(email === emailAdmin && senha === senhaAdmin){

localStorage.setItem("adminLogado","true");

window.location.href = "dashboard.html";

}else{

alert("E-mail ou senha inválidos.");

}

}


function togglePw(){

const senha = document.getElementById("password");

if(senha.type === "password"){

senha.type = "text";

}else{

senha.type = "password";

}

}