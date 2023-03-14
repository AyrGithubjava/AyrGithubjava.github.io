const app = document.getElementById('app');
const boton = document.getElementById('boton-iniciar');
const menu = document.getElementById('menu');

function ejecutarPrograma() {

    saludarUsuario();
    mostrarMenu();
    const cantidad = solicitarCantidad();
    console.log('La cantidad ingresada fue de: ' + cantidad);

    solicitarSabores(cantidad);
    mostrarPedidoEnConsola(pedidoUsuario);

    const totalSinDescuentos = calcularTotal(cantidad);
    console.log('El total sin descuentos es de: ' + totalSinDescuentos);
    const totalSegunCantidad = calcularDescuentoCantidad(cantidad, totalSinDescuentos);
    console.log('El total según la cantidad que lleva es: ' + totalSegunCantidad);
    mostrarTotal(cantidad);
    procesarPago(totalSegunCantidad);

    finalizarPedido();
    resetearPedido();
}

boton.onclick = ejecutarPrograma;
menu.onclick = mostrarMenu;
