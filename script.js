

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
    // Obtener valores del formulario
    const fechaRecepcion = document.getElementById('fechaRecepcion').value;
    const cantidadBotonesOjales = parseInt(document.getElementById('cantidadBotones').value);
    const entregaUrgente = document.getElementById('entregaUrgente').checked;

    // Validaciones básicas
    if (!fechaRecepcion || isNaN(cantidadBotonesOjales) || cantidadBotonesOjales <= 0) {
        document.getElementById('fechaEntrega').textContent = "⚠️ Ingrese una fecha válida y cantidades correctas.";
        document.getElementById('costoAdicional').textContent = "";
        return;
    }

    // Configuración de producción
    let fechaEntrega = new Date(fechaRecepcion);
    const capacidadDiaria = 1600;  // Producción máxima diaria
    let diasNecesarios = Math.ceil(cantidadBotonesOjales / capacidadDiaria);

    // La entrega **siempre** inicia al día siguiente
    fechaEntrega.setDate(fechaEntrega.getDate() + 1 + diasNecesarios - 1);

    // Formatear fecha
    let mensajeEntrega = `📌 Fecha estimada de entrega: ${fechaEntrega.toLocaleDateString('es-ES')}`;
    
    // Calcular costo adicional si es urgente
    let mensajeCosto = "";
    if (entregaUrgente) {
        mensajeCosto = `⚡ Entrega urgente con 50% de costo adicional.`;
    }

    // Mostrar resultados en pantalla
    document.getElementById('fechaEntrega').textContent = mensajeEntrega;
    document.getElementById('costoAdicional').textContent = mensajeCosto;
}

// Función para limpiar el formulario (solo cuando se necesite)
function limpiarCalendario() {
    document.getElementById('fechaRecepcion').value = '';
    document.getElementById('cantidadPrendas').value = '';
    document.getElementById('cantidadBotones').value = '';
    document.getElementById('entregaUrgente').checked = false;
    
    // Limpiar mensajes de resultado
    document.getElementById('fechaEntrega').textContent = "";
    document.getElementById('costoAdicional').textContent = "";
}



function initMap() {
    var location = { lat: -34.397, lng: 150.644 }; // Reemplaza con la ubicación real
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}


document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("particles-js")) { 
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 50
                },
                color: {
                    value: "#000000"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5
                },
                size: {
                    value: 3
                },
                move: {
                    speed: 1
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    }
                }
            }
        });
    }
});
