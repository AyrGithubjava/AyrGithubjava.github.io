
// Defino la clase Viaje y el metodo para calcular el precio final,
class Viaje {
    constructor(destino, precioBase) {
        this.destino = destino;
        this.precioBase = precioBase;
    }
    calcularPrecio(cantidadPasajeros, cantidadDias) {
        let incremento = 0;

        switch (true) {
            case cantidadDias > 28:
                incremento = 0;
                break;
            case cantidadDias >= 22:
                incremento = 0.1;
                break;
            case cantidadDias >= 15:
                incremento = 0.2;
                break;
            case cantidadDias >= 8:
                incremento = 0.3;
                break;
            default:
                incremento = 0.4;
                break;
        }
        const precioFinal = this.precioBase * cantidadPasajeros * (1 + incremento);
        return precioFinal;
    }
}

// Crear un array de objetos Viaje
const viajes = [
    new Viaje("Amsterdam", 500000),
    new Viaje("Barcelona", 450000),
    new Viaje("Berlin", 600000),
    new Viaje("Roma", 400000),
    new Viaje("Londres", 700000),
    new Viaje("Paris", 600000)
];


// Ingreso anio de nacimiento
let anioNacimiento;



do {
    anioNacimiento = Number(prompt("Ingrese feche de nacimiento de su mascota:"));
} while (anioNacimiento <= 0 || !Number.isInteger(anioNacimiento));

// Valido edad del usuario
let fechaActual = new Date();
let anioActual = fechaActual.getFullYear();
let edad = anioActual - anioNacimiento;

if (edad < 1) {
    alert(`Lo siento, ingrese una fecha de nacimiento valida ya que (${edad}) es invalida`);
} else {
    alert(`Bienvenido al sitio.`);

    let nombre, destino, cantidadPasajeros, cantidadDias;
    do {
        nombre = prompt("Ingrese su nombre:").toUpperCase();
    } while (nombre === "");

    do {
        destino = prompt("Ingrese el destino del viaje (Amsterdam, Barcelona, Berlin, Roma, Londres o Paris):").toUpperCase();
    } while (destino !== "AMSTERDAM" && destino !== "BARCELONA" && destino !== "BERLIN" && destino !== "ROMA" && destino !== "LONDRES" && destino !== "PARIS");

    do {
        cantidadPasajeros = Number(prompt("Ingrese la cantidad de pasajeros:"));
    } while (isNaN(cantidadPasajeros) || cantidadPasajeros < 1 || !Number.isInteger(cantidadPasajeros));

    do {
        cantidadDias = Number(prompt("Ingrese la cantidad de días de estancia:"));
    } while (isNaN(cantidadDias) || cantidadDias < 1 || !Number.isInteger(cantidadDias));

    // Busco el objeto Viaje segun el destino ingresado con find()
    const viajeSeleccionado = viajes.find(viaje => viaje.destino.toUpperCase() === destino);

    // Calculo el precio final y renderizo
    if (viajeSeleccionado) {
        const precioFinal = viajeSeleccionado.calcularPrecio(cantidadPasajeros, cantidadDias);
        alert(` Estimado/a ${nombre}, el precio final de su viaje a ${destino} para ${cantidadPasajeros} pasajeros por ${cantidadDias} día/s de estadia es de ARS $${precioFinal.toLocaleString('es-AR')}.`);

        document.write(` <h1> Estimado/a ${nombre}, el precio final de su viaje a ${destino} para ${cantidadPasajeros} pasajeros por ${cantidadDias} día/s de estadia es de ARS $${precioFinal.toLocaleString('es-AR')}.        </h1>`);

    } else {
    }

    // Utilizo un map() para obtener un array con los precios finales de cada viaje para el % aplicable al usuario por los dias seleccionados
    const preciosFinales = viajes.map(viaje => viaje.calcularPrecio(cantidadPasajeros, cantidadDias));

    // Muestro Array con precios finales por Consola
    console.log(preciosFinales);

}

//variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}
 function clearHtml(){
    containerBuyCart.innerHTML = '';
 }

 