import { Empleado } from "./form/employee.js";

let users = [];
localStorage.setItem("users", JSON.stringify(users));

// limpiar localStorage users cuando se inicia la página
// if (localStorage.getItem("users") != null) {
//    localStorage.setItem("users", "[]");
// }

// limpiar localStorage user cuando se inicia la página
if (localStorage.getItem("user") != null) {
   localStorage.setItem("user", null);
}

const empleado_1 = new Empleado();
empleado_1.nombre = "Braulio Ernesto";
empleado_1.apellido = "Pacheco Nuñez";
empleado_1.correo = "pacheco@gmail.com";
empleado_1.cargo = "Jefe";
empleado_1.guardarDatos();

const empleado_2 = new Empleado();
empleado_2.nombre = "Maria";
empleado_2.apellido = "Salas Tinta";
empleado_2.correo = "salas@gmail.com";
empleado_2.cargo = "Analista";
empleado_2.guardarDatos();

const empleado_3 = new Empleado();
empleado_3.nombre = "Andres Pablo";
empleado_3.apellido = "Quispe Suyo";
empleado_3.correo = "quispe@gmail.com";
empleado_3.cargo = "Programador";
empleado_3.guardarDatos();

const empleado_4 = new Empleado();
empleado_4.nombre = "Jose Maria";
empleado_4.apellido = "Rodriguez Chacón";
empleado_4.correo = "rodriguez@gmail.com";
empleado_4.cargo = "Soporte";
empleado_4.guardarDatos();

const empleado_5 = new Empleado();
empleado_5.nombre = "Pedro";
empleado_5.apellido = "Cruz Ojeda";
empleado_5.correo = "cruz@gmail.com";
empleado_5.cargo = "Asistente";
empleado_5.guardarDatos();

// mostrar datos en consola
console.log(JSON.parse(localStorage.getItem("users")));
