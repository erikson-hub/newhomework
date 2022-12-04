import { users } from "../users/users.js";

// Obtener los datos del usuario seleccionado que fueron enviados desde index.html
const user = JSON.parse(localStorage.getItem("user"));
// Obtener los elementos del DOM
const codigo = document.querySelector("#codigo");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const correo = document.querySelector("#correo");
const sueldobruto = document.querySelector("#sueldobruto");
const sueldoneto = document.querySelector("#sueldoneto");
// Asignar los valores del usuario seleccionado a los elementos del DOM
codigo.textContent = user.codigo;
nombre.textContent = user.nombre;
apellido.textContent = user.apellido;
correo.textContent = user.correo;
sueldobruto.textContent = user.sueldobruto;
sueldoneto.textContent = user.sueldoneto;
