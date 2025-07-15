class Materiales {
    constructor(grup,id,titulo,stock){
        this.grup = grup;
        this.id = id;
        this.titulo = titulo;        
        this.stock = stock;
    }
};

const mate1 = new Materiales(1, 1, "Estructuras de hormigón armado, Fritz Leonhardt", 0);
const mate2 = new Materiales(1, 2,  "Orgullo y prejuicio, Jane Austen", 1);
const mate3 = new Materiales(1, 3,  "El principito, Antoine de Saint-Exupéri", 0);
const mate4 = new Materiales(1, 4,  "Bushido, el espiritú de Japón, Inazo Nitobe", 3);
const mate5 = new Materiales(2, 5, "Proyectores", 3);
const mate6 = new Materiales(2, 6,  "TV", 2);
const mate7 = new Materiales(2, 7,  "Parlantes", 4);
const mate8 = new Materiales(3, 8,  "Aula de computación", 2);
const mate9 = new Materiales(3, 9,  "Aula de dibujo técnico", 3);
const mate10 = new Materiales(3, 10, "Aula taller", 4);

//Array de todos los materiales. ----------------------------------------------------------------
const materialDidactico = [mate1, mate2, mate3, mate4, mate5, mate6, mate7, mate8, mate9, mate10];

//Elementos del Html ----------------------------------------------------------------
const seccionTarjetas = document.getElementById('cardsbox');
const grupoBotones = document.getElementsByClassName('filtros');
const grupBtnReservar = document.getElementsByClassName('btn');
const btnCancelar = document.getElementsByClassName('btn-cancel');
const btnsMisReservas = document.getElementsByClassName('btn-mr');

//Array de los materiales reservados ----------------------------------------------------------------
const reservados = [];

//funciones ppales ----------------------------------------------------------------
function renderizarTarjertas(arrayDeMateriales){
    seccionTarjetas.innerHTML = '';        
    arrayDeMateriales.forEach(material => seccionTarjetas.innerHTML += `
        <div>
            <h3>${material.titulo}</h3>
            <h4>Disponibles: ${material.stock}</h4>
            <button id='${material.id}' class='btn' ${material.stock === 0 ? 'disabled' : ''}>
                ${material.stock === 0 ? 'Todo reservado' : 'Reservar'}
            </button>
        </div>`
    );
    reservarMaterial();
};

renderizarTarjertas(materialDidactico);

function reservarMaterial() {
    for (const button of grupBtnReservar) {
        button.addEventListener('click', () => {
            const materialSeleccionado = materialDidactico.find(material => material.id === parseInt(button.id));
            if (materialSeleccionado){
                Toastify({
                    text: `Agregaste "${materialSeleccionado.titulo}" a la sección de Mis reservas.`,
                    duration: 3000,
                    position: "center",
                    gravity: "top",
                }).showToast();                
                reservados.push(materialSeleccionado);
            }                            
        })
    }
};

// Botón Biblioteca ----------------------------------------------------------------
const biblioteca = materialDidactico.filter(material => material.grup == 1);
grupoBotones[0].addEventListener('click', () => {
        renderizarTarjertas(biblioteca);
    }
);

// Botón Audiovisual ----------------------------------------------------------------
const audiovisual = materialDidactico.filter(material => material.grup == 2);
grupoBotones[1].addEventListener('click', () => {
        renderizarTarjertas(audiovisual);
    }
);

// Botón Aulas ----------------------------------------------------------------
const aulas = materialDidactico.filter(material => material.grup == 3);
grupoBotones[2].addEventListener('click', () => {
        renderizarTarjertas(aulas);
    }
);

// Botón Mostrar todo ----------------------------------------------------------------
grupoBotones[3].addEventListener('click', () => {
        renderizarTarjertas(materialDidactico);
    }
);

// Botón Mis reservas ----------------------------------------------------------------
grupoBotones[4].addEventListener('click', () => {
    seccionTarjetas.innerHTML = '';
    mostrarEstado();    
    mostrarReservados();
    cancelarReserva();
    confirmarReserva();
    borrarReservados();
    }
);

function mostrarReservados(){
    reservados.forEach(material => seccionTarjetas.innerHTML += `
        <div>
            <h3>${material.titulo}</h3>
            <h4>Cantidad: 1</h4>           
            <button id='${material.id}' class='btn-cancel'>Cancelar reservación</button>
        </div>`
    );
};

function mostrarEstado(){
    seccionTarjetas.innerHTML += `
    <div class='menu_reservas'>
        <h3>Bienvenid@</h3>
        <h4>Estos son los materiales reservados hasta el momento</h4>
        <button class='btn-mr'>Confirmar reservaciones</button>
        <button class='btn-mr'>Borrar todo</button>
    </div>`
    
};

// Botones dentro de la sección Mis reservas --------------------------------------------------
// Para cancelar reservas
function cancelarReserva() {
    for (const button of btnCancelar) {
        button.addEventListener('click', () => {
            const materialDeseleccionado = reservados.find(material => material.id === parseInt(button.id));
            if (materialDeseleccionado){                
                Toastify({
                    text: `"${materialDeseleccionado.titulo}" eliminado de Mis reservas.`,
                    duration: 3000,
                    position: "center",
                    gravity: "top",
                }).showToast();
                let posicionAEliminar = reservados.indexOf(materialDeseleccionado,0);
                reservados.splice(posicionAEliminar,1);                
            }                            
        })
    }    
};

// Error al reservar
function mostrarError(){
    Toastify({
        text: "No hay material reservado todavía",
        duration: 3000,
        position: "center",
        gravity: "top",
    }).showToast();
}

// Para confirmar reservas
function confirmarReserva(){
    btnsMisReservas[0].addEventListener('click', async () => {
        if(reservados.length == 0){
            mostrarError();
        } else {
            ingresarDatos();
        };       
    });    
};

async function ingresarDatos(){
    const { value: formValues } = await Swal.fire({
        title: "Ingresá tu nombre y selecciona la fecha de uso",
        input: "text",
        inputLabel: "Apellido y Nombre:",
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: `
            Continue&nbsp;<i class="fa fa-arrow-right"></i>
        `,
        inputValidator: (value) => {
            if (!value) {
                return "Es necesario colocar un nombre";
            }
        }
    });    
    if (formValues) {
        elegirFecha();
    }
};

async function elegirFecha(){
    const { value: date } = await Swal.fire({
        title: "select departure date",
        input: "date",
        didOpen: () => {
            const today = (new Date()).toISOString();
            Swal.getInput().min = today.split("T")[0];
        },
        inputValidator: (fecha) => {
            if (!fecha) {
                return "Se debe seleccionar una fecha";
            }
        }
    });
    if (date) {
        Swal.fire({
            title: "¡Hecho!",
            text:"Tus materiales fueron reservados.",
            icon: "success"
        });
        vaciarCarrito();
    }
};

// Para borrar todo
function borrarReservados(){
    btnsMisReservas[1].addEventListener('click', () => {
        if (reservados.length == 0){
            mostrarError();
        } else {
            confirmarBorrar();
        }        
    })
};

function confirmarBorrar(){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, borrar todo",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Hecho!",
                text: "Tus materiales fueron borrados.",
                icon: "success"
            });
            vaciarCarrito();
        }
    });
};

function vaciarCarrito(){
    reservados.splice(0, reservados.length);
};

//let usuarioActivo = localStorage.getItem('usuario');

function guardarNombreUsuario(){
    const nombreUsuario = document.getElementById;
    if (nombreUsuario != null){
        localStorage.setItem('usuario', nombreUsuario);
    } else {
        Toastify({
            text: `Operación cancelada.`,
            duration: 3000,
            position: "center",
            gravity: "top",
        }).showToast();
    }  
};




/* localStorage.removeItem('usuario'); */


//Fecha
