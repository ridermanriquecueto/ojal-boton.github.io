

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("particles-js")) { // Reemplaza con el ID o clase correcta
        particlesJS("particles-js", {
            // Configuración de particles.js
        });
    }
});

// Función para mostrar las vistas
function mostrarVista(vista) {
    const vistas = document.querySelectorAll('.vista');
    vistas.forEach(v => v.style.display = 'none');  // Ocultar todas las vistas
    const vistaElement = document.getElementById('vista-' + vista);
    if (vistaElement) {
        vistaElement.style.display = 'block';  // Mostrar solo la vista seleccionada
    }
}

// Función para cerrar la ventana emergente
function cerrarVentana(vista) {
    const vistaElement = document.getElementById('vista-' + vista);
    if (vistaElement) {
        vistaElement.style.display = 'none';
    }
}
// Esperar a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {
    // Asociar evento al botón después de que el DOM haya cargado
    document.getElementById('generarCotizacion').addEventListener('click', generarCotizacion);
});

// Función para generar la cotización
function generarCotizacion() {
    const cantidadPrendas = parseInt(document.getElementById('cantidadCotizacion').value);
    const cantidadBotonesOjales = parseInt(document.getElementById('cantidadBotonesOjales').value);
    const tipoTrabajo = document.getElementById('tipoTrabajo').value;
    const resultadoDiv = document.getElementById('cotizacionResult');

    // Verificar si la cantidad de prendas es válida
    if (isNaN(cantidadPrendas) || cantidadPrendas <= 0) {
        resultadoDiv.textContent = "⚠️ Por favor, ingrese una cantidad válida de prendas.";
        resultadoDiv.style.color = "red";
        return;
    }

    // Verificar si la cantidad de botones/ojales es válida
    if (isNaN(cantidadBotonesOjales) || cantidadBotonesOjales <= 0) {
        resultadoDiv.textContent = "⚠️ Por favor, ingrese una cantidad válida de botones/ojales.";
        resultadoDiv.style.color = "red";
        return;
    }

    let precioFinal = 0;
    let comprobante = ''; // Variable para guardar el mensaje del comprobante

    // Lógica de cotización según el tipo de trabajo
    switch (tipoTrabajo) {
        case "ambos-comun":
            let precioBasePorPrenda = cantidadPrendas < 100 ? 150 : 125;
            precioFinal = cantidadPrendas * precioBasePorPrenda * cantidadBotonesOjales;
            comprobante = `Tipo de trabajo: Botón y Ojal Común\nCantidad de prendas: ${cantidadPrendas}\nCantidad de botones/ojales por prenda: ${cantidadBotonesOjales}\nPrecio por prenda (cada botón y ojal): $${precioBasePorPrenda}\nPrecio final: $${precioFinal.toFixed(2)}`;
            break;
        case "ambos-especial":
            let precioBasePorPrendaEspecial = cantidadPrendas < 100 ? 180 : 150;
            precioFinal = cantidadPrendas * precioBasePorPrendaEspecial * cantidadBotonesOjales;
            comprobante = `Tipo de trabajo: Botón y Ojal Especial\nCantidad de prendas: ${cantidadPrendas}\nCantidad de botones/ojales por prenda: ${cantidadBotonesOjales}\nPrecio por prenda (cada botón y ojal): $${precioBasePorPrendaEspecial}\nPrecio final: $${precioFinal.toFixed(2)}`;
            break;
            
        case "boton-comun":
            let precioBasePorBoton = cantidadPrendas < 100 ? 75 : 62.5;
            precioFinal = cantidadPrendas * precioBasePorBoton * cantidadBotonesOjales;
            comprobante = `Tipo de trabajo: Botón Común\nCantidad de prendas: ${cantidadPrendas}\nPrecio unitario: $${precioBasePorBoton}\nPrecio final: $${precioFinal.toFixed(2)}`;
            break;
        case "ojal-comun":
            let precioBasePorOjal = cantidadPrendas < 100 ? 75 : 62.5;
            precioFinal = cantidadPrendas * precioBasePorOjal * cantidadBotonesOjales;
            comprobante = `Tipo de trabajo: Ojal Común\nCantidad de prendas: ${cantidadPrendas}\nPrecio unitario: $${precioBasePorOjal}\nPrecio final: $${precioFinal.toFixed(2)}`;
            break;
        case "boton-especial":
            let precioBasePorBotonEspecial = 90;
            precioFinal = cantidadPrendas * precioBasePorBotonEspecial * cantidadBotonesOjales;
            comprobante = `Tipo de trabajo: Botón Especial\nCantidad de prendas: ${cantidadPrendas}\nPrecio unitario: $${precioBasePorBotonEspecial}\nPrecio final: $${precioFinal.toFixed(2)}`;
            break;
        case "ojal-especial":
            let precioBasePorOjalEspecial = 90;
            precioFinal = cantidadPrendas * precioBasePorOjalEspecial * cantidadBotonesOjales;
            comprobante = `Tipo de trabajo: Ojal Especial\nCantidad de prendas: ${cantidadPrendas}\nPrecio unitario: $${precioBasePorOjalEspecial}\nPrecio final: $${precioFinal.toFixed(2)}`;
            break;
        default:
            resultadoDiv.textContent = "⚠️ Por favor, seleccione un tipo de trabajo válido.";
            resultadoDiv.style.color = "red";
            return;
    }
    window.generarCotizacion = generarCotizacion; // Asegura que sea accesible desde el HTML

    // Mostrar el resultado de la cotización en el DOM
    resultadoDiv.textContent = `✅ El precio estimado es $${precioFinal.toFixed(2)}`;
    resultadoDiv.style.color = "green";

    // Mostrar el detalle completo en un alert
    alert(comprobante);

    // Limpiar el formulario
    limpiarCotizacion();
}

// Función para limpiar el formulario de cotización
function limpiarCotizacion() {
    document.getElementById('cantidadCotizacion').value = '';
    document.getElementById('cantidadBotonesOjales').value = '';
    document.getElementById('tipoTrabajo').value = 'ambos-comun';
}



function calcularFechaEntrega() {
    const fechaRecepcion = document.getElementById('fechaRecepcion').value;
    const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);
    const cantidadBotones = parseInt(document.getElementById('cantidadBotones').value);
    const entregaUrgente = document.getElementById('entregaUrgente').checked;

    // Verificar que los datos sean válidos
    if (!fechaRecepcion || isNaN(cantidadPrendas) || cantidadPrendas <= 0 || isNaN(cantidadBotones) || cantidadBotones <= 0) {
        document.getElementById('fechaEntrega').textContent = "Por favor, ingrese una fecha válida y cantidades correctas.";
        return;
    }

    let fechaEntrega = new Date(fechaRecepcion);
    let diasExtra = 0;
    let costoAdicional = 0;

    const capacidadProduccion = 1600; // Capacidad de producción diaria de botones y ojales

    // Calcular la cantidad de días extra según la cantidad de botones y ojales
    if (cantidadBotones <= capacidadProduccion) {
        // Si la cantidad de botones y ojales es menor o igual a la capacidad diaria
        diasExtra = 1; // La entrega es al día siguiente
    } else {
        // Si se superan los 1600 botones y ojales, calculamos los días necesarios
        let diasNecesarios = Math.ceil(cantidadBotones / capacidadProduccion); // Cuántos días se necesitan
        diasExtra = diasNecesarios;
    }

    // Si es urgente, se hace un ajuste en la entrega
    if (entregaUrgente) {
        if (cantidadBotones <= capacidadProduccion) {
            // Si es urgente y la cantidad es menor a la capacidad, se entrega el mismo día
            diasExtra = 0;
            costoAdicional = 0.5; // 50% adicional
        } else {
            // Si es urgente y la cantidad excede la capacidad, la entrega se realiza al siguiente día
            diasExtra = 1;
            costoAdicional = 0.5; // 50% adicional
        }
    }

    // Sumamos los días extra a la fecha de recepción
    fechaEntrega.setDate(fechaEntrega.getDate() + diasExtra);

    // Formateamos la fecha de entrega
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaCalculada = fechaEntrega.toLocaleDateString('es-ES', opcionesFecha);

    // Mostrar la fecha calculada
    document.getElementById('fechaEntrega').textContent = `Fecha estimada de entrega: ${fechaCalculada}`;

    // Si es urgente, mostrar el precio adicional
    if (costoAdicional > 0) {
        document.getElementById('fechaEntrega').textContent += ` (Entrega urgente con un 50% adicional al costo normal)`;
    }

    // Limpiar el formulario
    limpiarCalendario();
}

// Función para limpiar el formulario
function limpiarCalendario() {
    document.getElementById('fechaRecepcion').value = '';
    document.getElementById('cantidadPrendas').value = '';
    document.getElementById('cantidadBotones').value = '';
    document.getElementById('entregaUrgente').checked = false;
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}

// Asegúrate de que la función está en el `window`
window.initMap = initMap;
