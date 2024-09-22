class Persona {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class Docente extends Persona {
    constructor(nombre) {
        super(nombre);
    }
}

class Alumno extends Persona {
    constructor(noControl, nombre) {
        super(nombre);
        this.noControl = noControl;
        this.materias = {};
    }

    agregarMateria(materia, calificacion) {
        this.materias[materia.nombre] = { materia, calificacion };
    }

    mostrarInformacion() {
        console.log(`No. Control: ${this.noControl}, Alumno: ${this.nombre}`);
        for (let key in this.materias) {
            const { materia, calificacion } = this.materias[key];
            console.log(`Materia: ${materia.nombre}, Docente: ${materia.docente.nombre}, Calificaciones: ${calificacion.calificaciones.join(", ")}, Promedio: ${calificacion.promedio.toFixed(2)}`);
        }
    }
}

class Materia {
    constructor(nombre, docente) {
        this.nombre = nombre;
        this.docente = docente;
    }
}

class Calificacion {
    constructor(calificaciones) {
        this.calificaciones = calificaciones;
        this.promedio = this.calcularPromedio();
    }

    calcularPromedio() {
        const total = this.calificaciones.reduce((acc, cal) => acc + cal, 0);
        return total / this.calificaciones.length;
    }
}

// Tabla
const docente1 = new Docente("José");
const docente2 = new Docente("Pedro");
const docente3 = new Docente("Juan");

const materia1 = new Materia("Matemáticas", docente1);
const materia2 = new Materia("Física", docente2);
const materia3 = new Materia("Programación", docente3);

const alumno1 = new Alumno("20E20104", "Dany");
alumno1.agregarMateria(materia1, new Calificacion([90, 95]));
alumno1.agregarMateria(materia2, new Calificacion([85, 75]));
alumno1.agregarMateria(materia3, new Calificacion([30, 30]));

const alumno2 = new Alumno("20E20123", "Luis");
alumno2.agregarMateria(materia1, new Calificacion([75, 85]));
alumno2.agregarMateria(materia2, new Calificacion([70, 30]));

console.log("Información del Alumno 1:");
alumno1.mostrarInformacion();
console.log("\nInformación del Alumno 2:");
alumno2.mostrarInformacion();