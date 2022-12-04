import { users } from '../users/users.js';

// Tabla de usuarios
function users_table(users) {
  const tableUsers = document.getElementById('table-users');
  tableUsers.innerHTML = ''; // Limpiar tabla
  // leer encabezados
  const keys = Object.keys(users[0]);
  // crear tabla
  const table = document.createElement('table');
  table.classList.add('table');
  // crear encabezados de la tabla
  const thead = document.createElement('thead');
  table.append(thead);
  const tr = document.createElement('tr');
  thead.append(tr);
  keys.forEach((key) => {
    const th = document.createElement('th');
    th.textContent = key;
    tr.append(th);
  });
  // crear cuerpo de la tabla
  const tbody = document.createElement('tbody');
  table.append(tbody);
  users.forEach((user) => {
    const tr = document.createElement('tr');
    tbody.append(tr);
    keys.forEach((key) => {
      const td = document.createElement('td');
      td.textContent = user[key];
      tr.append(td);
    });
  });
  tableUsers.append(table);
  const br = document.createElement('br');
  tableUsers.append(br);
}

// Funcion para leer usuarios
function read(users) {
  users_table(users);
}

// Actualizar usuarios
// function update() {
//   const id = prompt_alerts(
//     null,
//     'id',
//     'number',
//     (value) => value > 0,
//     'Ingrese un id valido'
//   );
//   if (id === undefined) {
//     return;
//   }
//   const user = users.find((user) => user.id === id);
//   console.log(user);
//   if (user) {
//     for (const prop in user) {
//       if (prop === 'id' || prop === 'created_at') {
//         continue;
//       } else if (prop === 'edad') {
//         const edad = prompt_alerts(
//           null,
//           prop,
//           'number',
//           (value) => value > 0 && value < 100,
//           'La edad debe estar entre 0 y 100'
//         );
//         if (edad === undefined) {
//           return;
//         } else {
//           user[prop] = edad;
//         }
//       } else if (prop === 'modified_at') {
//         user[prop] = new Date().toISOString();
//       } else {
//         const value = prompt_alerts(null, prop, 'string', null, null);
//         if (value === undefined) {
//           return;
//         } else {
//           user[prop] = value;
//         }
//       }
//     }
//   } else {
//     alert('Usuario no existe');
//   }
//   read(users);
// }

function main() {
  read(users);
}

main();
