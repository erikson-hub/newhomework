import { Empleado } from "./employee.js";

const user = JSON.parse(localStorage.getItem("user"));

const empleado = new Empleado(
   user.nombre,
   user.apellido,
   user.correo,
   user.cargo
);

if (user) {
   // Cargar los datos del usuario en el formulario and set readonly
   const inputs = document.querySelectorAll("input");
   inputs.forEach((input) => {
      input.value = user[input.name];
      input.readOnly = true;
      input.style.backgroundColor = "#ccc";
   });
   document.querySelector("select").value = user.cargo;
   document.querySelector("select").disabled = true;
   document.querySelector("select").style.backgroundColor = "#ccc";

   const div_sueldo_bruto = document.getElementById("sueldo-bruto");
   div_sueldo_bruto.style.marginTop = "-15px";
   const div_sueldo_neto = document.getElementById("sueldo-neto");
   div_sueldo_neto.style.marginTop = "-15px";
   div_sueldo_neto.style.marginBottom = "30px";

   // Cargar el sueldo bruto y neto
   const users = JSON.parse(localStorage.getItem("users"));
   users.forEach((usr) => {
      if (usr.correo === user.correo) {
         // Cargar el sueldo bruto
         const div1 = document.createElement("div");
         div1.classList.add("formulario__grupo");
         div1.id = "grupo__nombre";
         div1.innerHTML = `
      <label class="formulario__label">Sueldo Bruto</label>
      <p class="formulario__input" style="background-color: #ccc;">
         ${empleado.calcularSueldoBruto()}
      </p>
      `;
         div_sueldo_bruto.appendChild(div1);
         // Cargar el sueldo neto
         const div2 = document.createElement("div");
         div2.classList.add("formulario__grupo");
         div2.id = "grupo__nombre";
         div2.innerHTML = `
      <label class="formulario__label">Sueldo Neto</label>
      <p class="formulario__input" style="background-color: #ccc;">
         ${empleado.calcularSueldoNeto()}
      </p>
      `;
         div_sueldo_neto.appendChild(div2);
      }

      // Ocultar el boton de enviar
      const btn = document.getElementById("enviar");
      btn.style.display = "none";
   });

   // Agregar el boton de editar
   const div_editar = document.getElementById("editar");
   const editar = document.createElement("button");
   editar.type = "submit";
   editar.classList.add("formulario__btn");
   editar.style.backgroundColor = "#f0ad4e";
   editar.style.borderColor = "#eea236";
   editar.innerHTML = "Editar";
   div_editar.appendChild(editar);
   // Agregar el boton de guardar
   const div_guardar = document.getElementById("guardar");
   const guardar = document.createElement("button");
   guardar.type = "submit";
   guardar.classList.add("formulario__btn");
   guardar.style.backgroundColor = "#5cb85c";
   guardar.style.borderColor = "#4cae4c";
   guardar.innerHTML = "Guardar";
   div_guardar.appendChild(guardar);
}

// habilitar inputs para editar
const editar = document.getElementById("editar");
editar.addEventListener("click", () => {
   const inputs = document.querySelectorAll("input");
   inputs.forEach((input) => {
      input.readOnly = false;
      input.style.backgroundColor = "#fff";
   });
   document.querySelector("select").disabled = false;
   document.querySelector("select").style.backgroundColor = "#fff";
   alert("Se ha habilitado la edición de los datos");
});

// Guardar los datos editados
const guardar = document.getElementById("guardar");
guardar.addEventListener("click", () => {
   const input = document.querySelectorAll("input");
   if (input[0].readOnly === false) {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
         user[input.name] = input.value;
      });
      user.cargo = document.querySelector("select").value;
      // Guardar los datos en el localStorage users
      const users = JSON.parse(localStorage.getItem("users"));
      users.forEach((usr) => {
         if (usr.correo === user.correo) {
            usr.nombre = user.nombre;
            usr.apellido = user.apellido;
            usr.correo = user.correo;
            usr.cargo = user.cargo;
         }
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Los datos se han guardado correctamente");
      window.location.href = "../list/list.html";
   } else {
      alert("Primero debe habilitar la edición de los datos");
   }
});
