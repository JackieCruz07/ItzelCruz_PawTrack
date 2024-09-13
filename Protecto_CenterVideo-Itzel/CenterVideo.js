const prompt = require("prompt-sync")();

class CentralVideo {
  constructor() {
    this.clientes = [];
    this.peliculas = [];
    this.rentas = [];
  }

  // Control de Clientes
  registrarCliente(numeroMembresia, nombre, direccion, telefono) {
    const cliente = new Cliente(numeroMembresia, nombre, direccion, telefono);
    this.clientes.push(cliente);
    return cliente;
  }

  consultarClientes() {
    return this.clientes;
  }

  bajaCliente(numeroMembresia) {
    const index = this.clientes.findIndex(c => c.numeroMembresia === numeroMembresia);
    if (index !== -1) {
      this.clientes.splice(index, 1);
      return true;
    }
    return false;
  }

  // Control de Películas
  registrarPelicula(numeroPelicula, titulo, clasificacion, tipo) {
    const pelicula = new Pelicula(numeroPelicula, titulo, clasificacion, tipo);
    this.peliculas.push(pelicula);
    return pelicula;
  }

  consultarPeliculas() {
    return this.peliculas;
  }

  bajaPelicula(numeroPelicula) {
    const index = this.peliculas.findIndex(p => p.numeroPelicula === numeroPelicula);
    if (index !== -1) {
      this.peliculas.splice(index, 1);
      return true;
    }
    return false;
  }

  // Control de Rentas
  rentarPelicula(numeroMembresia, numeroPelicula) {
    const cliente = this.clientes.find(c => c.numeroMembresia === numeroMembresia);
    const pelicula = this.peliculas.find(p => p.numeroPelicula === numeroPelicula);

    if (!cliente || !pelicula) {
      return { exito: false, mensaje: "Cliente o película no encontrados" };
    }

    if (cliente.estado === "deudor") {
      return { exito: false, mensaje: "El cliente tiene una multa pendiente" };
    }

    if (pelicula.estado === "rentada") {
      return { exito: false, mensaje: "La película no está disponible" };
    }

    const fechaRenta = new Date();
    const renta = new Renta(cliente, pelicula, fechaRenta);
    this.rentas.push(renta);

    pelicula.estado = "rentada";

    const monto = pelicula.tipo === "estreno" ? 50.00 : 35.00;
    const recibo = this.generarRecibo(renta, monto);

    return { exito: true, recibo };
  }

  generarRecibo(renta, monto) {
    return `
      Recibo de Renta
      ----------------
      Cliente: ${renta.cliente.nombre}
      Película: ${renta.pelicula.titulo}
      Fecha de Renta: ${renta.fechaRenta.toLocaleDateString()}
      Fecha de Devolución: ${renta.fechaDevolucion.toLocaleDateString()} antes de las 10 p.m.
      Monto: $${monto.toFixed(2)}

      Nota: Se aplicará una multa de $${monto.toFixed(2)} por cada día de retraso.
    `;
  }

  consultarRentas() {
    return this.rentas.map(renta => ({
      cliente: renta.cliente.nombre,
      pelicula: renta.pelicula.titulo,
      fechaDevolucion: renta.fechaDevolucion.toLocaleDateString()
    }));
  }
}

// Clase Cliente
class Cliente {
  constructor(numeroMembresia, nombre, direccion, telefono) {
    this.numeroMembresia = numeroMembresia;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.estado = "libre"; 
  }
}

// Clase Pelicula
class Pelicula {
  constructor(numeroPelicula, titulo, clasificacion, tipo) {
    this.numeroPelicula = numeroPelicula;
    this.titulo = titulo;
    this.clasificacion = clasificacion;
    this.estado = "disponible";
    this.tipo = tipo; 
  }
}

// Clase Renta
class Renta {
  constructor(cliente, pelicula, fechaRenta) {
    this.cliente = cliente;
    this.pelicula = pelicula;
    this.fechaRenta = fechaRenta;
    this.fechaDevolucion = new Date(fechaRenta.getTime() + 3 * 24 * 60 * 60 * 1000);
  }
}

// Menus
function mostrarMenu() {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "\n--- Menú Principal --- \n[1] Control de Clientes \n[2] Control de Películas \n[3] Control de Rentas \n[4] Salir"
  );
}

function menuClientes(centralVideo) {
  while (true) {
    console.log(
      "\x1b[36m%s\x1b[0m",
    "\n--- Control de Clientes --- \n[1] Registrar Clientes \n[2] Consultar Clientes \n[3] Baja de Clientes \n[4] Volver al Menú Principal \n[5] Salir"
    );

    const opcion = prompt("Seleccione una opción: ");

    switch (opcion) {
      case "1":
        const numeroMembresia = parseInt(prompt("Número de membresía: "));
        const nombre = prompt("Nombre: ");
        const direccion = prompt("Dirección: ");
        const telefono = prompt("Teléfono: ");
        const cliente = centralVideo.registrarCliente(numeroMembresia, nombre, direccion, telefono);
        console.log(`Cliente registrado con éxito. Número de membresía: ${cliente.numeroMembresia}`);
        break;
      case "2":
        console.log(centralVideo.consultarClientes());
        break;
      case "3":
        const numBaja = parseInt(prompt("Número de membresía a dar de baja: "));
        if (centralVideo.bajaCliente(numBaja)) {
          console.log("Cliente dado de baja con éxito.");
        } else {
          console.log("Cliente no encontrado.");
        }
        break;
      case "4":
        return;
      default:
        console.log("Opción no válida.");
    }
  }
}

function menuPeliculas(centralVideo) {
  while (true) {
    console.log(
      "\x1b[36m%s\x1b[0m",
    "\n--- Control de Películas --- \n[1] Registrar Películas \n[2] Consultar Películas \n[3] Baja de Películas \n[4] Volver al Menú Principal \n[5] Salir"
    );

    const opcion = prompt("Seleccione una opción: ");

    switch (opcion) {
      case "1":
        const numeroPelicula = parseInt(prompt("Número de película: "));
        const titulo = prompt("Título: ");
        const clasificacion = prompt("Clasificación: ");
        const tipo = prompt("Tipo (estreno/catalogo): ");
        const pelicula = centralVideo.registrarPelicula(numeroPelicula, titulo, clasificacion, tipo);
        console.log(`Película registrada con éxito. ID de película: ${pelicula.numeroPelicula}`);
        break;
      case "2":
        console.log(centralVideo.consultarPeliculas());
        break;
      case "3":
        const numBaja = parseInt(prompt("Número de película a dar de baja: "));
        if (centralVideo.bajaPelicula(numBaja)) {
          console.log("Película dada de baja con éxito.");
        } else {
          console.log("Película no encontrada.");
        }
        break;
      case "4":
        return;
      default:
        console.log("Opción no válida.");
    }
  }
}

function menuRentas(centralVideo) {
  while (true) {
     console.log(
      "\x1b[36m%s\x1b[0m",
    "\n--- Control de Rentas --- \n[1] Rentar Películas \n[2] Consultar Rentas \n[3] Volver al Menú Principal \n[4] Salir"
    );

    const opcion = prompt("Seleccione una opción: ");

    switch (opcion) {
      case "1":
        const numeroMembresia = parseInt(prompt("Número de membresía del cliente: "));
        const numeroPelicula = parseInt(prompt("Número de película a rentar: "));
        const resultado = centralVideo.rentarPelicula(numeroMembresia, numeroPelicula);
        if (resultado.exito) {
          console.log(resultado.recibo);
        } else {
          console.log(resultado.mensaje);
        }
        break;
      case "2":
        console.log(centralVideo.consultarRentas());
        break;
      case "3":
        return;
      default:
        console.log("Opción no válida.");
    }
  }
}

function main() {
  const centralVideo = new CentralVideo();

  while (true) {
    mostrarMenu();
    const opcion = prompt("Seleccione una opción: ");

    switch (opcion) {
      case "1":
        menuClientes(centralVideo);
        break;
      case "2":
        menuPeliculas(centralVideo);
        break;
      case "3":
        menuRentas(centralVideo);
        break;
      case "4":
        console.log("Gracias por usar el sistema. ¡Hasta luego!");
        return;
      default:
        console.log("Opción no válida.");
    }
  }
}

main();
