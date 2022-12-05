// Limpiar local storage user
const nav = document.querySelector("#Form");
nav.addEventListener("click", () => {
   if (localStorage.getItem("user") != null) {
      localStorage.setItem("user", null);
   }
});

// Crear filas de la tabla
function rows_table(users, tbody) {
   users.forEach((user) => {
      const tr = document.createElement("tr");
      tbody.append(tr);
      const keys = Object.keys(user);
      keys.push("datos");
      keys.forEach((key) => {
         const td = document.createElement("td");
         if (key === "datos") {
            const a = document.createElement("a");
            a.classList.add("link");
            a.textContent = "Ver datos ...";
            a.href = "#";
            td.append(a);
         } else {
            td.textContent = user[key];
         }
         tr.append(td);
      });
   });
}

// Tabla de usuarios
function users_table(users) {
   const tableUsers = document.getElementById("table-users");
   tableUsers.innerHTML = ""; // Limpiar tabla
   // Crear tabla
   const table = document.createElement("table");
   table.classList.add("table");
   tableUsers.append(table);
   // Crear encabezados de la tabla
   const headers = [
      "Codigo",
      "Nombre",
      "Apellido",
      "Correo",
      "Cargo",
      "Datos empleado",
   ];
   const thead = document.createElement("thead");
   table.append(thead);
   const tr = document.createElement("tr");
   thead.append(tr);
   headers.forEach((header) => {
      const th = document.createElement("th");
      th.id = "asc";
      th.textContent = header;
      tr.append(th);
   });
   // Crear cuerpo de la tabla (filas)
   const tbody = document.createElement("tbody");
   table.append(tbody);
   rows_table(users, tbody);
}

// Enviar datos de usuario cuando se hace click en el enlace "Ver datos ..."
function send_user_data() {
   const links = document.querySelectorAll(".link");
   links.forEach((link) => {
      link.addEventListener("click", (e) => {
         e.preventDefault();
         const tr = e.target.parentElement.parentElement; // link -> td -> tr (fila)
         const tds = tr.querySelectorAll("td");
         const user = {
            codigo: tds[0].textContent,
            nombre: tds[1].textContent,
            apellido: tds[2].textContent,
            correo: tds[3].textContent,
            cargo: tds[4].textContent,
         };
         localStorage.setItem("user", JSON.stringify(user));
         link.href = `../form/form.html?codigo=${user.codigo}`; // redireccionar
         window.location.href = link.href;
      });
   });
}

// Ordenar por atributo de forma ascendente o descendente
function sortBy(users, prop, asc) {
   if (
      prop === "nombre" ||
      prop === "apellido" ||
      prop === "correo" ||
      prop === "cargo"
   ) {
      return users.sort((a, b) => {
         if (asc) {
            return a[prop].localeCompare(b[prop]);
         } else {
            return b[prop].localeCompare(a[prop]);
         }
      });
   } else {
      return users.sort((a, b) => {
         if (asc) {
            return a[prop] - b[prop];
         } else {
            return b[prop] - a[prop];
         }
      });
   }
}

// Ordenar haciendo click en encabezados.
function sort_by_headers(users) {
   const ths = document.querySelectorAll("th");
   ths.forEach((th) => {
      if (th.textContent !== "Datos empleado") {
         th.addEventListener("click", () => {
            // Eliminar las clases de los encabezados previamente seleccionados
            ths.forEach((th) => {
               th.classList.remove("th-sort-asc");
               th.classList.remove("th-sort-desc");
            });
            // Ordenar de acuerdo al encabezado seleccionado y el valor del atributo id
            let prop = th.textContent.toLowerCase().replace(" ", "");
            let sorted = null;
            if (th.id === "asc") {
               th.classList.add("th-sort-asc");
               th.id = "desc";
               sorted = sortBy(users, prop, true);
            } else {
               th.classList.add("th-sort-desc");
               th.id = "asc";
               sorted = sortBy(users, prop, false);
            }
            // Actualizar tabla
            const tbody = document.querySelector("tbody");
            tbody.innerHTML = ""; // limpiar tabla
            rows_table(sorted, tbody);
            send_user_data();
         });
      }
   });
}

function render() {
   let users = JSON.parse(localStorage.getItem("users"));
   users_table(users);
   sort_by_headers(users);
   send_user_data();
}

render();
