class Empleado {
   constructor(nombre, apellido, correo, cargo) {
      this.codigo = JSON.parse(localStorage.getItem("users")).length + 1;
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.cargo = cargo;
   }

   // calcular sueldo bruto
   calcularSueldoBruto() {
      let sueldos = {
         Jefe: 5000,
         Analista: 4000,
         Programador: 3000,
         Soporte: 2000,
         Asistente: 1500,
      };
      return sueldos[this.cargo].toFixed(2);
   }

   // calcular sueldo neto
   calcularSueldoNeto() {
      return (this.calcularSueldoBruto() * 0.8).toFixed(2);
   }

   // obtener datos del empleado
   obtenerDatos() {
      return {
         codigo: this.codigo,
         nombre: this.nombre,
         apellido: this.apellido,
         correo: this.correo,
         cargo: this.cargo,
      };
   }

   // guardar datos del empleado
   guardarDatos() {
      let users = JSON.parse(localStorage.getItem("users"));
      users.push(this);
      localStorage.setItem("users", JSON.stringify(users));
   }
}

export { Empleado };
