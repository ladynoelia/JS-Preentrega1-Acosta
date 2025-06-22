class Libros {
    constructor(id,titulo,autor,stock){
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.stock = stock;
    }
};

const libro1 = new Libros(1, "Estructuras de hormigón armado", "Fritz Leonhardt", 0);
const libro2 = new Libros(2, "Orgullo y prejuicio", "Jane Austen", 1);
const libro3 = new Libros(3, "El principito", "Antoine de Saint-Exupéri", 0);
const libro4 = new Libros(4, "Bushido, el espiritú de Japón", "Inazo Nitobe", 3);

//Array de todos los libros.
const biblioteca = [libro1, libro2, libro3, libro4];
//Elementos del Html
const seccionLibros = document.getElementById('cardsbox');
const grupoBotones = document.getElementsByClassName('filtros');
const grupBtnReservar = document.getElementsByClassName('btn');

const disponibles = biblioteca.filter(libro => (libro.stock>0));
//Array del carrito
const reservados = [];


let soloDisponibles = false;
function renderizarLibros(){
    seccionLibros.innerHTML = '';        
    biblioteca.forEach(libro => seccionLibros.innerHTML += `
        <div>
            <h3>${libro.titulo}</h3>
            <h4>${libro.autor}</h4>
            <h5>Disponibles: ${libro.stock}</h5>
            <button id='${libro.id}' class='btn' ${libro.stock === 0 ? 'disabled' : ''}>
                ${libro.stock === 0 ? 'Sin stock' : 'Reservar'}
            </button>
        </div>`
    );
    reservarLibro();
    soloDisponibles = false;
    grupoBotones[0].innerText = 'Libros disponibles';
};
renderizarLibros();

function reservarLibro() {
    for (const button of grupBtnReservar) {
        button.addEventListener('click', () => {
            const libroSeleccionado = biblioteca.find(libro => libro.id === parseInt(button.id));
            if (libroSeleccionado){
                alert(`Agregaste "${libroSeleccionado.titulo}" a la sección de Mis reservas.`);
                reservados.push(libroSeleccionado);
            }                            
        })
    }
};

// Sección Mis reservas ----------------------------------------------------------------
let usuarioActivo = localStorage.getItem('usuario');

function guardarNombreUsuario(){
    const nombreUsuario = prompt('Ingresa tu nombre para registrar tus pedidos');
    if (nombreUsuario != null){
        localStorage.setItem('usuario', nombreUsuario);
    }    
};

function mostrarEstado(){
    seccionLibros.innerHTML += `
    <div class='menu_reservas'>
        <h3>Bienvenid@</h3>
        <h4>${usuarioActivo} estos son los libros reservados hasta en momento</h4>
        <button class='btn_mr'>Confirmar reservaciones</button>
        <button class='btn_mr'>Borrar todo</button>
    </div>`
    const btnsMisReservas = document.getElementsByClassName('btn_mr');
    btnsMisReservas[0].addEventListener('click', () => {
        guardarNombreUsuario();
    }
    );
    btnsMisReservas[1].addEventListener('click', () => {
        alert('ay');
    }
    );
};

function mostrarReservados(){    
    reservados.forEach(libro => seccionLibros.innerHTML += `
        <div>
            <h3>${libro.titulo}</h3>
            <h4>${libro.autor}</h4>            
            <button id='${libro.id}' class='btn'>Cancelar reservación</button>
        </div>`
    );
};

grupoBotones[1].addEventListener ('click', () => {
    seccionLibros.innerHTML = '';    
    mostrarEstado();   
    mostrarReservados();
    }
);

// Botones dentro de la sección Mis reservas --------------------------------------------------


/*  */


/* localStorage.removeItem('usuario'); */

// Boton para mostrar solo los libros disponibles -----------------------------------------
function mostrarDisponibles(){
    seccionLibros.innerHTML = '';
    grupoBotones[0].innerText = 'Mostrar todos los libros';
    const disponibles = biblioteca.filter(libro => (libro.stock>0));
    disponibles.forEach(libro => seccionLibros.innerHTML += `
        <div>
            <h3>${libro.titulo}</h3>
            <h4>${libro.autor}</h4>
            <h5>Disponibles: ${libro.stock}</h5>
            <button id='${libro.id}' class='btn'>Reservar</button>
        </div>`
    );
    soloDisponibles = true;
    reservarLibro();
};

grupoBotones[0].addEventListener ('click', () => {
    intercambiarFiltros();
    }
);
function intercambiarFiltros(){
    if(!soloDisponibles){
        mostrarDisponibles()
    } else {
        renderizarLibros();
    }
};

//


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
