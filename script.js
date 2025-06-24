document.addEventListener("DOMContentLoaded", function () {
    // Lógica para tsParticles
    const particlesContainer = document.getElementById("tsparticles");
    if (particlesContainer) {
        tsParticles.load("tsparticles", {
            background: {
                color: {
                    value: "#F8F9FA" // Fondo principal claro de tu CSS (var(--dark-bg))
                }
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    },
                    resize: true
                },
                modes: {
                    push: {
                        quantity: 4
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    // Colores de tu nueva paleta para las partículas
                    value: ["#2F80ED", "#27AE60", "#E74C3C", "#34495E", "#BDC3C7"] 
                },
                links: {
                    color: "#BDC3C7", // Color para las líneas de conexión (Gris Medio Claro)
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce"
                    },
                    random: false,
                    speed: 2, // Velocidad de movimiento de las partículas
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 80 // Cantidad de partículas
                },
                opacity: {
                    value: 0.5, // Opacidad de las partículas
                    random: true, // Que la opacidad sea aleatoria
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                shape: {
                    type: "circle" // Tipo de forma de las partículas
                },
                size: {
                    value: { min: 1, max: 3 }, // Tamaño de las partículas
                    random: true,
                    animation: {
                        enable: true,
                        speed: 40,
                        minimumValue: 0.1,
                        sync: false
                    }
                }
            },
            detectRetina: true
        });
    }

    // --- Tu lógica JavaScript existente a continuación ---

    // Función para mostrar/ocultar vistas
    window.mostrarVista = function(id) {
        const vistas = document.querySelectorAll('.vista');
        vistas.forEach(vista => {
            vista.classList.remove('vista-activa');
        });
        document.getElementById(id).classList.add('vista-activa');
    };

    window.cerrarVentana = function(id) {
        document.getElementById(id).classList.remove('vista-activa');
        document.getElementById('vista-principal').classList.add('vista-activa'); // Vuelve a la vista principal
    };

    // Lógica para la cotización
    const formCotizacion = document.getElementById('form-cotizacion');
    const generarCotizacionBtn = document.getElementById('generarCotizacion');
    const cotizacionResult = document.getElementById('cotizacionResult');
    const cotizacionComprobante = document.getElementById('cotizacionComprobante');

    if (generarCotizacionBtn) {
        generarCotizacionBtn.addEventListener('click', function() {
            const cantidadPrendas = parseInt(document.getElementById('cantidadCotizacion').value);
            const tipoTrabajo = document.getElementById('tipoTrabajo').value;
            const cantidadBotonesOjales = parseInt(document.getElementById('cantidadBotonesOjales').value);

            if (isNaN(cantidadPrendas) || cantidadPrendas <= 0 || isNaN(cantidadBotonesOjales) || cantidadBotonesOjales <= 0) {
                cotizacionResult.style.color = "var(--accent-color)"; // Rojo
                cotizacionResult.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
                cotizacionResult.textContent = "Por favor, ingresa cantidades válidas.";
                cotizacionComprobante.style.display = 'none';
                return;
            }

            let precioBasePorUnidad = 0;
            let tipoTrabajoTexto = "";

            switch (tipoTrabajo) {
                case 'ambos-comun':
                    precioBasePorUnidad = 50; // Ejemplo: $50 por botón y ojal común
                    tipoTrabajoTexto = "Botón y Ojal Común";
                    break;
                case 'ambos-especial':
                    precioBasePorUnidad = 80; // Ejemplo: $80 por botón y ojal especial
                    tipoTrabajoTexto = "Botón y Ojal Especial";
                    break;
                case 'boton-comun':
                    precioBasePorUnidad = 25; // Ejemplo: $25 solo botón común
                    tipoTrabajoTexto = "Solo Botón Común";
                    break;
                case 'ojal-comun':
                    precioBasePorUnidad = 25; // Ejemplo: $25 solo ojal común
                    tipoTrabajoTexto = "Solo Ojal Común";
                    break;
                case 'boton-especial':
                    precioBasePorUnidad = 40; // Ejemplo: $40 solo botón especial
                    tipoTrabajoTexto = "Solo Botón Especial";
                    break;
                case 'ojal-especial':
                    precioBasePorUnidad = 40; // Ejemplo: $40 solo ojal especial
                    tipoTrabajoTexto = "Solo Ojal Especial";
                    break;
                default:
                    precioBasePorUnidad = 0;
            }

            const totalBotonesOjales = cantidadPrendas * cantidadBotonesOjales;
            const costoTotal = totalBotonesOjales * precioBasePorUnidad;

            cotizacionResult.style.color = "var(--secondary-color)"; // Verde
            cotizacionResult.style.backgroundColor = "rgba(39, 174, 96, 0.15)";
            cotizacionResult.textContent = `Costo total estimado: $${costoTotal.toFixed(2)}`;

            const fechaActual = new Date();
            const dia = String(fechaActual.getDate()).padStart(2, '0');
            const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Meses son 0-11
            const año = fechaActual.getFullYear();
            const hora = String(fechaActual.getHours()).padStart(2, '0');
            const minutos = String(fechaActual.getMinutes()).padStart(2, '0');

            cotizacionComprobante.textContent = `
--- COMPROBANTE DE COTIZACIÓN ---
Fecha: ${dia}/${mes}/${año} ${hora}:${minutos}
-------------------------------
Cantidad de Prendas: ${cantidadPrendas}
Tipo de Trabajo: ${tipoTrabajoTexto}
Cant. Botones/Ojales por Prenda: ${cantidadBotonesOjales}
Total Botones/Ojales: ${totalBotonesOjales}
Precio Base por Unidad: $${precioBasePorUnidad.toFixed(2)}
-------------------------------
COSTO TOTAL ESTIMADO: $${costoTotal.toFixed(2)}
-------------------------------
`;
            cotizacionComprobante.style.display = 'block';
        });
    }

    // Lógica para el calendario
    window.calcularFechaEntrega = function() {
        const fechaRecepcionInput = document.getElementById('fechaRecepcion');
        const cantidadBotonesInput = document.getElementById('cantidadBotones');
        const entregaUrgenteCheckbox = document.getElementById('entregaUrgente');
        const fechaEntregaParrafo = document.getElementById('fechaEntrega');
        const costoAdicionalParrafo = document.getElementById('costoAdicional');

        const fechaRecepcionStr = fechaRecepcionInput.value;
        const cantidadBotones = parseInt(cantidadBotonesInput.value);
        const entregaUrgente = entregaUrgenteCheckbox.checked;

        if (!fechaRecepcionStr || isNaN(cantidadBotones) || cantidadBotones <= 0) {
            fechaEntregaParrafo.style.color = "var(--accent-color)";
            fechaEntregaParrafo.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
            fechaEntregaParrafo.textContent = "Por favor, completa todos los campos.";
            costoAdicionalParrafo.textContent = "";
            return;
        }

        const fechaRecepcion = new Date(fechaRecepcionStr + 'T00:00:00'); // Asegura que sea el inicio del día
        if (isNaN(fechaRecepcion.getTime())) {
            fechaEntregaParrafo.style.color = "var(--accent-color)";
            fechaEntregaParrafo.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
            fechaEntregaParrafo.textContent = "Fecha de recepción inválida.";
            costoAdicionalParrafo.textContent = "";
            return;
        }

        // Días hábiles de lunes a viernes
        const diasPorBotonOjal = 0.005; // Ejemplo: 1 botón/ojal = 0.005 días (200 botones = 1 día)
        let diasNecesarios = cantidadBotones * diasPorBotonOjal;

        // Mínimo de 1 día de trabajo
        if (diasNecesarios < 1) {
            diasNecesarios = 1;
        }

        let costoAdicional = 0;
        if (entregaUrgente) {
            costoAdicional = costoAdicional + 50; // Ejemplo: 50% de costo adicional, aquí solo un valor fijo
            diasNecesarios = Math.max(1, diasNecesarios * 0.5); // Reduce los días a la mitad, mínimo 1 día
        }

        let fechaEntrega = new Date(fechaRecepcion);
        let diasAgregados = 0;

        while (diasAgregados < diasNecesarios) {
            fechaEntrega.setDate(fechaEntrega.getDate() + 1);
            const diaSemana = fechaEntrega.getDay(); // 0 = Domingo, 6 = Sábado
            if (diaSemana !== 0 && diaSemana !== 6) { // Si no es domingo (0) ni sábado (6)
                diasAgregados++;
            }
        }

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        fechaEntregaParrafo.style.color = "var(--secondary-color)";
        fechaEntregaParrafo.style.backgroundColor = "rgba(39, 174, 96, 0.15)";
        fechaEntregaParrafo.textContent = `Fecha de entrega estimada: ${fechaEntrega.toLocaleDateString('es-AR', options)}`;

        if (entregaUrgente) {
            costoAdicionalParrafo.style.color = "var(--accent-color)";
            costoAdicionalParrafo.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
            costoAdicionalParrafo.textContent = "¡Costo adicional por entrega urgente aplicada!";
        } else {
            costoAdicionalParrafo.textContent = "";
        }
    };

    window.limpiarCalendario = function() {
        document.getElementById('fechaRecepcion').value = '';
        document.getElementById('cantidadBotones').value = '';
        document.getElementById('entregaUrgente').checked = false;
        document.getElementById('fechaEntrega').textContent = '';
        document.getElementById('costoAdicional').textContent = '';
        document.getElementById('fechaEntrega').style.backgroundColor = '';
        document.getElementById('costoAdicional').style.backgroundColor = '';
    };

    // Lógica para Google Maps
    window.initMap = function() {
        if (document.getElementById('map')) {
            const tallerLocation = { lat: -34.8988, lng: -57.9734 }; // Coordenadas de ejemplo (ajusta a tu dirección real)
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: tallerLocation,
                disableDefaultUI: true // Deshabilita controles predeterminados si quieres un mapa limpio
            });

            new google.maps.Marker({
                position: tallerLocation,
                map: map,
                title: 'Nuestro Taller de Costura',
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" // Icono de marcador rojo
                }
            });
        }
    };

    // Verifica si Google Maps ya está cargado para llamar a initMap si es necesario
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        initMap();
    }
});