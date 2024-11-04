/* Sw que permita mostrar información, dada las 
siguientes clases: Alumnos, Calificaciones, Materias, Docente. */

class Persona {
    constructor(nombre) {
        this._nombre = nombre;
    }
} /* Uso de herencia con la creación de una clase padre, 
que hereda el atributo "nombre" a las clases hijas,
que son docente y alumno, como se aprendio en clase */

class Docente extends Persona {
    constructor(nombre) {
        super(nombre);
    }

    get nombre() {
        return this._nombre;
    }
}

class Alumno extends Persona {
    constructor(noControl, nombre) {
        super(nombre);
        this._noControl = noControl;
        this._materias = {};
    }

    agregarMateria(materia, calificacion) {
        this._materias[materia.nombre] = { materia, calificacion };
    }

    static mostrarInfoAlumnos(alumnos) {
        const datos = [];
    
        alumnos.forEach(alumno => {
            Object.values(alumno._materias).forEach(({ materia, calificacion }) => {
                const calfSeparadas = calificacion._calificaciones.map((cal, index) => `Cal${index + 1}: ${cal}`).join(", ");
                datos.push({
                    "No. Control": alumno._noControl,
                    "Alumno": alumno._nombre,
                    "Materia": materia.nombre,
                    "Docente": materia.docente.nombre,
                    "Calificaciones": calfSeparadas,
                    "Promedio": calificacion.promedio.toFixed(2)
                });
            });
        });
    
        console.table(datos); // Muestra la info en una tabla
    }
}

class Materia {
    constructor(nombre, docente) {
        this._nombre = nombre;
        this._docente = docente
    }

    get nombre() {
        return this._nombre;
    }

    get docente() {
        return this._docente;
    }
}

class Calificacion {
    constructor(calificaciones) {
        this._calificaciones = calificaciones;
    }

    get promedio() {
        return this.calcularPromedio();
    }

    calcularPromedio() {
        const total = this._calificaciones.reduce((acc, cal) => acc + cal, 0);
        return total / this._calificaciones.length || 0;
    }
}

// Objetos
const docente1 = new Docente("José");
const docente2 = new Docente("Pedro");
const docente3 = new Docente("Juan");

const materia1 = new Materia("Matemáticas", docente1);
const materia2 = new Materia("Física", docente2);
const materia3 = new Materia("Programación", docente3);

const alumno1 = new Alumno("20E20110", "Dany");
alumno1.agregarMateria(materia1, new Calificacion([90, 95]));
alumno1.agregarMateria(materia2, new Calificacion([85, 75]));
alumno1.agregarMateria(materia3, new Calificacion([30, 30]));

const alumno2 = new Alumno("20E20123", "Luis");
alumno2.agregarMateria(materia1, new Calificacion([75, 85]));
alumno2.agregarMateria(materia2, new Calificacion([70, 30]));

// Mostrar información
Alumno.mostrarInfoAlumnos([alumno1, alumno2]);