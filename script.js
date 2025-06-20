class Libros {
    constructor(id,titulo,autor,stock){
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.stock = stock;
    }
};

const libro1 = new Libros(1, "Estructuras de hormigón armado", "Fritz Leonhardt", 2);
const libro2 = new Libros(2, "Orgullo y prejuicio", "Jane Austen", 0);
const libro3 = new Libros(3, "El principito", "Antoine de Saint-Exupéri", 5);
const libro4 = new Libros(4, "Bushido, el espiritú de Japón", "Inazo Nitobe", 0);

//Array de todos los libros.
const biblioteca = [libro1, libro2, libro3, libro4];
//Elementos del Html
const seccionLibros = document.getElementById('cardsbox');
const grupoBotones = document.getElementsByClassName('filtros');
const grupBtnReservar = document.getElementsByClassName('btn');

const disponibles = biblioteca.filter(libro => (libro.stock>0));

//Primer intento
/* function renderizarLibros(){
    seccionLibros.innerHTML = '';    
    biblioteca.forEach(libro => seccionLibros.innerHTML += `
        <div>
            <h3>${libro.titulo}</h3>
            <h4>${libro.autor}</h4>
            <h5>Disponibles: ${libro.stock}</h5>
            <button id='${libro.id}' class='btn'>Reservar</button>
        </div>`
    );    
};
renderizarLibros(); */

// Boton para mostrar solo los libros disponibles
/* function renderizarDisponibles(){
    seccionLibros.innerHTML = '';
    grupoBotones[0].innerText = 'Mostrar todo';
    const disponibles = biblioteca.filter(libro => (libro.stock>0));
    disponibles.forEach(libro => seccionLibros.innerHTML += `
        <div>
            <h3>${libro.titulo}</h3>
            <h4>${libro.autor}</h4>
            <h5>Disponibles: ${libro.stock}</h5>
            <button id='${libro.id}' class='btn'>Reservar</button>
        </div>`
    );
    filtroMode = true;
    reservarLibro();
};

grupoBotones[0].addEventListener ('click', () => {
    intercambiarFiltros();
    }
);

let filtroMode = false;
function intercambiarFiltros(){
    if(!filtroMode){
        renderizarDisponibles()
    } else {
        renderizarLibros();
        grupoBotones[0].innerText = 'Libros disponibles';
        filtroMode = false;
        reservarLibro();
    }
};

//Función de reservar
function reservarLibro() {
    for (const button of grupBtnReservar) {
        button.addEventListener('click', () => {
            alert('Función de reservar en construcción')
            if (button.stock>0) {
                let nombreUsuario = prompt("Ingresa tu nombre para reservarlo\nSino 'v' para volver al buscador");

            } else {
                alert(`El libro ${button.id} no esta disponible`);
            }        
        })
    }
};
/* reservarLibro(); */

//Segundo intento
function renderizarLibros(){        
    biblioteca.forEach(libro => seccionLibros.innerHTML += `
        <div>
            <h3>${libro.titulo}</h3>
            <h4>${libro.autor}</h4>
            <h5>Disponibles: ${libro.stock}</h5>
            <button id='${libro.id}' class='btn'>Reservar</button>
        </div>`
    );
    reservarLibro();  
};
renderizarLibros();

function reservarLibro() {
    for (const button of grupBtnReservar) {
        button.addEventListener('click', () => {
            const libroSeleccionado = biblioteca.find(libro => libro.id === Number(button.id));
            if (libroSeleccionado.stock>0){
                alert('Sigo trabajando en la Función de reservar');
            } else {
                button.innerText = 'Sin stock';                
                alert('El libro no figura en stock o se encuentra reservado.');
            }                             
        })
    }
};

/* function cambiarBoton() {
    for (const button of grupBtnReservar) {
        const sinStock = biblioteca.filter(libro => (libro.stock<=0));
        if (sinStock){
            button.innerText = 'sfdsdf';                
        }
    }
};
cambiarBoton(); */

// Boton para mostrar solo los libros disponibles
function mostrarDisponibles(){
    seccionLibros.innerHTML = '';
    grupoBotones[0].innerText = 'Mostrar todo';
    const disponibles = biblioteca.filter(libro => (libro.stock>0));
    disponibles.forEach(libro => seccionLibros.innerHTML += `
        <div>
            <h3>${libro.titulo}</h3>
            <h4>${libro.autor}</h4>
            <h5>Disponibles: ${libro.stock}</h5>
            <button id='${libro.id}' class='btn'>Reservar</button>
        </div>`
    );
    /* filtroMode = true; */
    reservarLibro();
};

grupoBotones[0].addEventListener ('click', () => {
    mostrarDisponibles();
    }
);

//Carrito
const carrito = [];
/* grupoBotones[1].addEventListener('click', aca la funcionde agregar objetos al array de carrito renderizarLibros());
 */


//let opcion = prompt("Selecciona un titulo de la lista\n1 - "+ libro1.titulo + ", " + libro1.autor + "\n2 - "+ libro2.titulo + ", " + libro2.autor + "\n3 - "+ libro3.titulo + ", " + libro3.autor + "\n4 - "+ libro4.titulo + ", " + libro4.autor +"\ns - Salir");
/* 
function reservarLibro1 () {
    let nombreUsuario = prompt("¡El libro esta disponible!\nSi te gustaría reservarlo, ingresa tu nombre\nSino 'v' para volver al buscador");
    if (nombreUsuario == "v"){
        opcion = prompt("Selecciona un titulo de la lista\n1 - "+ libro1.titulo + ", " + libro1.autor + "\n2 - "+ libro2.titulo + ", " + libro2.autor + "\n3 - "+ libro3.titulo + ", " + libro3.autor + "\n4 - "+ libro4.titulo + ", " + libro4.autor +"\ns - Salir");
    } else {
        console.log("Genial, " + nombreUsuario + ", el libro quedó reservado, pasalo a retirar cuando puedas");
        libro1.disponibilidad = false;
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
} */
