class libros {
    constructor(titulo,autor,disponibilidad){
        this.titulo = titulo;
        this.autor = autor;
        this.disponibilidad = disponibilidad;
    }
}

const libro1 = new libros("Estructuras de hormigón armado", "Fritz Leonhardt", false);
const libro2 = new libros("Orgullo y prejuicio", "Jane Austen", true);
const libro3 = new libros("El principito", "Antoine de Saint-Exupéri", true);
const libro4 = new libros("Bushido, el espiritú de Japón", "Inazo Nitobe", false);

let opcion = prompt("Selecciona un titulo de la lista\n1 - "+ libro1.titulo + ", " + libro1.autor + "\n2 - "+ libro2.titulo + ", " + libro2.autor + "\n3 - "+ libro3.titulo + ", " + libro3.autor + "\n4 - "+ libro4.titulo + ", " + libro4.autor +"\ns - Salir");

function reservarLibro1 () {
    let nombreUsuario = prompt("¡El libro esta disponible!\nSi te gustaría reservarlo, ingresa tu nombre\nSino 'v' para volver al buscador");
    if (nombreUsuario == "v"){
        opcion = prompt("Selecciona un titulo de la lista\n1 - "+ libro1.titulo + ", " + libro1.autor + "\n2 - "+ libro2.titulo + ", " + libro2.autor + "\n3 - "+ libro3.titulo + ", " + libro3.autor + "\n4 - "+ libro4.titulo + ", " + libro4.autor +"\ns - Salir");
    } else {
        console.log("Genial, " + nombreUsuario + ", el libro quedó reservado, pasalo a retirar cuando puedas");
        libro1.disponibilidad = false;
    }
}
function reservarLibro2 () {
    let nombreUsuario = prompt("¡El libro esta disponible!\nSi te gustaría reservarlo, ingresa tu nombre\nSino 'v' para volver al buscador");
    if (nombreUsuario == "v"){
        opcion = prompt("Selecciona un titulo de la lista\n1 - "+ libro1.titulo + ", " + libro1.autor + "\n2 - "+ libro2.titulo + ", " + libro2.autor + "\n3 - "+ libro3.titulo + ", " + libro3.autor + "\n4 - "+ libro4.titulo + ", " + libro4.autor +"\ns - Salir");
    } else {
        console.log("Genial, " + nombreUsuario + ", el libro quedó reservado, pasalo a retirar cuando puedas");
        libro2.disponibilidad = false;
    }
}
function reservarLibro3 () {
    let nombreUsuario = prompt("¡El libro esta disponible!\nSi te gustaría reservarlo, ingresa tu nombre\nSino 'v' para volver al buscador");
    if (nombreUsuario == "v"){
        opcion = prompt("Selecciona un titulo de la lista\n1 - "+ libro1.titulo + ", " + libro1.autor + "\n2 - "+ libro2.titulo + ", " + libro2.autor + "\n3 - "+ libro3.titulo + ", " + libro3.autor + "\n4 - "+ libro4.titulo + ", " + libro4.autor +"\ns - Salir");
    } else {
        console.log("Genial, " + nombreUsuario + ", el libro quedó reservado, pasalo a retirar cuando puedas");
        libro3.disponibilidad = false;
    }
}
function reservarLibro4 () {
    let nombreUsuario = prompt("¡El libro esta disponible!\nSi te gustaría reservarlo, ingresa tu nombre\nSino 'v' para volver al buscador");
    if (nombreUsuario == "v"){
        opcion = prompt("Selecciona un titulo de la lista\n1 - "+ libro1.titulo + ", " + libro1.autor + "\n2 - "+ libro2.titulo + ", " + libro2.autor + "\n3 - "+ libro3.titulo + ", " + libro3.autor + "\n4 - "+ libro4.titulo + ", " + libro4.autor +"\ns - Salir");
    } else {
        console.log("Genial, " + nombreUsuario + ", el libro quedó reservado, pasalo a retirar cuando puedas");
        libro4.disponibilidad = false;
    }
}

while (opcion != "s"){
    switch (opcion) {
        case "1":
            if (libro1.disponibilidad == true){
                reservarLibro1();                
            } else {
                console.log("El libro no figura en nuestro catalogo o se encuentra reservado.\nElegí otra opción.");
            }        
            break;
        case "2":
            if (libro2.disponibilidad == true){
                reservarLibro2();                
            } else {
                console.log("El libro no figura en nuestro catalogo o se encuentra reservado.\nElegí otra opción.");
            }        
            break;
        case "3":
            if (libro3.disponibilidad == true){
                reservarLibro3();                
            } else {
                console.log("El libro no figura en nuestro catalogo o se encuentra reservado.\nElegí otra opción.");
            }        
            break;
        case "4":
            if (libro4.disponibilidad == true){
                reservarLibro4();
            } else {
                console.log("El libro no figura en nuestro catalogo o se encuentra reservado.\nElegí otra opción.");
            }        
            break;
        default:
            console.log("Opción invalida");
    }
    opcion = prompt("Selecciona un titulo de la lista\n1 - "+ libro1.titulo + ", " + libro1.autor + "\n2 - "+ libro2.titulo + ", " + libro2.autor + "\n3 - "+ libro3.titulo + ", " + libro3.autor + "\n4 - "+ libro4.titulo + ", " + libro4.autor +"\ns - Salir");
}
