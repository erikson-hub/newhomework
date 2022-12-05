import { Empleado } from "../form/employee.js";

const nav = document.querySelector("#List");
nav.addEventListener("click", () => {
   console.log("click");
   if (localStorage.getItem("user") != null) {
      localStorage.setItem("user", null);
   }
});

// Mostrar el boton de enviar si esta oculto
const btn = document.getElementById("enviar");
if (btn.style.display === "none") {
   btn.style.display = "block";
}

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
   nombre: /^[a-zA-ZÀ-ÿ\s]{2,14}$/, // Letras y espacios, pueden llevar acentos.
   apellido: /^[a-zA-ZÀ-ÿ\s]{2,14}$/, // Letras y espacios, pueden llevar acentos.
   correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
   // cargo: /^[a-zA-ZÀ-ÿ\s]{2,14}$/,
};

const campos = {
   nombre: false,
   apellido: false,
   correo: false,
   //   cargo: false,
};

const validarFormulario = (e) => {
   switch (e.target.name) {
      case "apellido":
         validarCampo(expresiones.apellido, e.target, "apellido");
         break;
      case "nombre":
         validarCampo(expresiones.nombre, e.target, "nombre");
         break;
      case "correo":
         validarCampo(expresiones.correo, e.target, "correo");
         break;
   }
};

const validarCampo = (expresion, input, campo) => {
   if (expresion.test(input.value)) {
      document
         .getElementById(`grupo__${campo}`)
         .classList.remove("formulario__grupo-incorrecto");
      document
         .getElementById(`grupo__${campo}`)
         .classList.add("formulario__grupo-correcto");
      document
         .querySelector(`#grupo__${campo} i`)
         .classList.add("fa-check-circle");
      document
         .querySelector(`#grupo__${campo} i`)
         .classList.remove("fa-times-circle");
      document
         .querySelector(`#grupo__${campo} .formulario__input-error`)
         .classList.remove("formulario__input-error-activo");
      campos[campo] = true;
   } else {
      document
         .getElementById(`grupo__${campo}`)
         .classList.add("formulario__grupo-incorrecto");
      document
         .getElementById(`grupo__${campo}`)
         .classList.remove("formulario__grupo-correcto");
      document
         .querySelector(`#grupo__${campo} i`)
         .classList.add("fa-times-circle");
      document
         .querySelector(`#grupo__${campo} i`)
         .classList.remove("fa-check-circle");
      document
         .querySelector(`#grupo__${campo} .formulario__input-error`)
         .classList.add("formulario__input-error-activo");
      campos[campo] = false;
   }
};

inputs.forEach((input) => {
   input.addEventListener("keyup", validarFormulario);
   input.addEventListener("blur", validarFormulario);
});

// verificar si el correo existe en el array de empleados
const verificarCorreo = (correo) => {
   let existe = false;
   let users = JSON.parse(localStorage.getItem("users"));
   console.log(correo);
   users.forEach((user) => {
      console.log(user.correo);
      if (user.correo === correo) {
         existe = true;
      }
   });
   return existe;
};

formulario.addEventListener("submit", (e) => {
   e.preventDefault();

   if (campos.apellido && campos.nombre && campos.correo) {
      // verificar si el correo existe en el array de empleados
      if (verificarCorreo(correo.value)) {
         alert("El correo ya existe");
      } else {
         // crear un objeto de tipo empleado
         const nombre = document.getElementById("nombre").value;
         const apellido = document.getElementById("apellido").value;
         const correo = document.getElementById("correo").value;
         const cargo = document.querySelector("select").value;
         const empleado = new Empleado(nombre, apellido, correo, cargo);
         empleado.guardarDatos();
         // limpiar el formulario
         formulario.reset();
         document
            .getElementById("formulario__mensaje-exito")
            .classList.add("formulario__mensaje-exito-activo");
         setTimeout(() => {
            document
               .getElementById("formulario__mensaje-exito")
               .classList.remove("formulario__mensaje-exito-activo");
         }, 5000);
         document
            .querySelectorAll(".formulario__grupo-correcto")
            .forEach((icono) => {
               icono.classList.remove("formulario__grupo-correcto");
            });
      }
   } else {
      document
         .getElementById("formulario__mensaje")
         .classList.add("formulario__mensaje-activo");
      // ver
      let empleado = new Empleado(
         document.getElementById("nombre").value,
         document.getElementById("apellido").value,
         document.getElementById("correo").value
      );
   }
});
