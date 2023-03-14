class PromoBancaria {
    constructor(banco, descuento) {
        this.banco = banco;
        this.promocion = descuento;
    }

    mostrarInfo() {
        return `${this.banco} ${(this.promocion * 100)}%`;
    }
}

class Balanceado {
    constructor(nombre, sigla) {
        this.nombre = nombre;
        this.sigla = sigla;
    }
    
    mostrarInfo() {
        return `${this.nombre} (${this.sigla})`;
    }
}

const generarMenuDeSabores = (listaDeSabores) => {
    let mensajeDelMenu = 'Menu:';
    let opcion = 0;
    const copiaDeLista = listaDeSabores;
    copiaDeLista.forEach(sabor => {
        opcion++;
        mensajeDelMenu += '\nOpcion ' + opcion + ': '+ sabor.mostrarInfo();
    })
    return mensajeDelMenu;
};

const generarMenuPromociones = (listaDePromociones) => {
    let mensajeDelMenu = 'Tenemos las siguientes promociones bancarias:';
    let opcion = 0;
    const copiaDeLista = listaDePromociones;
    copiaDeLista.forEach(promo => {
        opcion++;
        mensajeDelMenu += '\nOpcion ' + opcion + ': '+ promo.mostrarInfo();
    })
    return mensajeDelMenu;
};

const precioUnidad = 7000;
const descuentoMediaDocena = 0.10;
const descuentoDocena = 0.15;
const cantidadDeOpciones = 6;

const listaSabores = [
    new Balanceado('BALANCE sabor pollo', 'BP'),
    new Balanceado('DOGI sabor carne', 'DC'),
    new Balanceado('VITALCAN sabor pollo','VP'),
    new Balanceado('ADVANCED sabor mixto', 'AM'),
    new Balanceado('PEDIGREE sabor mixto', 'PM'),
    new Balanceado('KONGO sabor pescado', 'KP'),
];

const promocionesBancarias = [
    new PromoBancaria('Banco Nación', 0.15),
    new PromoBancaria('Banco Francés', 0.05),
    new PromoBancaria('Banco HSBC', 0.05),
    new PromoBancaria('Mercado Pago', 0.10),
];

const mensajeBienvenida = `¡Bienvenido a la SegundaPre-Entrega Online!

Precios:
- Por unidad $${precioUnidad}.
- Llevando 6 o más ${descuentoMediaDocena * 100}% off.
- Llevando 12 o más ${descuentoDocena * 100}% off.

Elegí a continuación la cantidad y los sabores del alimento.`;

const mensajeMenu = generarMenuDeSabores(listaSabores);

const mensajeSolicitarBalanceado = `${mensajeMenu}

Ingresa el número de opción elegida:`;

const mensajePago = `Modalidad de pago:
- Opción 1: Efectivo
- Opción 2: Crédito`;

const mensajePromos = generarMenuPromociones(promocionesBancarias);

const saludarUsuario = () => {
    alert (mensajeBienvenida);
};

const mostrarMenu = () => {
    alert (mensajeMenu);
};

const ingresarCantidad = () => {
    const cantidad = Number(parseInt(prompt('Ingresa la cantidad de Alimento balanceado que desea llevar:')));
    return cantidad;
};

const verificarCantidadIngresada = (cantidad) => {
    return (cantidad <= 0 || cantidad === null || isNaN(cantidad)) ? 
        false : 
        true;
};

const solicitarCantidad = () => {
    let cantidad = ingresarCantidad();
    while (!verificarCantidadIngresada(cantidad)) {
        cantidad = ingresarCantidad();
    }
    return cantidad;
};

const solicitarOpcion = (mensaje, cantidad) => {
    let opcion = Number(parseInt(prompt(`${mensaje}`)));
    while (!verificarOpcion(opcion, cantidad)) {
        opcion = Number(parseInt(prompt(`${mensaje}`)));
    }
    return opcion;
};

const verificarOpcion = (opcion, cantidadDeOpciones) => {
    return (opcion > 0 && opcion <= cantidadDeOpciones && opcion !== null && !isNaN(opcion)) ?
        true :
        false;
};

let pedidoUsuario = [];

const mostrarPedidoEnConsola = (pedido) => {
    let mensaje = 'Los sabores elegidos son:';
    pedido.forEach(item => {
        mensaje += '\n- ' + item;
    })
    console.log(mensaje);
};

const agregarOpcionAlPedido = (opcion) => {
    // necesita restar 1 porque los indices del array empiezan en 0
    // y las cantidades fisicas las contamos desde 1 unidad en adelante
    const indice = opcion - 1;
    pedidoUsuario.push(listaSabores[indice].nombre);
};

const solicitarSabores = (cantidad) => {
    for (let i = 0; i < cantidad; i++) {
        let opcion = solicitarOpcion(mensajeSolicitarBalanceado, cantidadDeOpciones);
        agregarOpcionAlPedido(opcion);
    }
};

const calcularTotal = (cantidad) => {
    return cantidad * precioUnidad;
};

const aplicarDescuento = (total, promocion) => {
    const descuento = total * promocion;
    return total - descuento;
};

const calcularDescuentoCantidad = (cantidad, total) => {
    let totalAPagar = total;
    if (cantidad >= 6 && cantidad < 12) {
        totalAPagar = aplicarDescuento(total, descuentoMediaDocena);
    } else if (cantidad >= 12) {
        totalAPagar = aplicarDescuento(total, descuentoDocena);
    }
    return totalAPagar;
};

const mostrarTotal = (cantidad) => {
    const total = calcularTotal(cantidad);
    alert(`Tu total es: $${total}. A continuación elegí tu opción de pago.`);
};

const procesarPagoEfectivo = (total) => {
    alert(`Pago completo, tu total fue de $${total}`);
    console.log(`El pago final fue de: ${total}`);
};

const calcularDescuentoBancario = (opcion, total) => {
    let resultado;
    if (opcion === 1) {
        resultado = aplicarDescuento(total, promocionesBancarias[0].promocion);
    } else if (opcion === 2) {
        resultado = aplicarDescuento(total, promocionesBancarias[1].promocion);
    } else if (opcion === 3) {
        resultado = aplicarDescuento(total, promocionesBancarias[2].promocion);
    } else if (opcion === 4) {
        resultado = aplicarDescuento(total, promocionesBancarias[3].promocion);
    }
    return resultado;
};

const procesarPagoTarjeta = (opcion, total) => {
    const pago = calcularDescuentoBancario(opcion, total);
    alert(`Pago completo, tu total fue de $${pago}`);
    console.log(`El pago final fue de: ${pago}`);
};

const procesarPago = (total) => {
    const pagoElegido = solicitarOpcion(mensajePago, 2);
    if (pagoElegido === 1) {
        procesarPagoEfectivo(total);
    } else {
        const promoElegida = solicitarOpcion(mensajePromos, 4);
        procesarPagoTarjeta(promoElegida, total);
    }    
};

const finalizarPedido = () => {
    alert('¡Gracias por tu compra!')
};

const resetearPedido = () => {
    pedidoUsuario = [];
};
