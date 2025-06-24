document.addEventListener("DOMContentLoaded", function () {
    const particlesContainer = document.getElementById("tsparticles");
    if (particlesContainer) {
        // tsParticles cargará y mostrará las partículas
        tsParticles.load("tsparticles", {
            background: {
                color: {
                    value: "#05223f"
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
                    value: ["#2F80ED", "#27AE60", "#E74C3C", "#34495E", "#BDC3C7"]
                },
                links: {
                    color: "#BDC3C7",
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
                    speed: 2,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 80
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: { min: 1, max: 3 },
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

    // Funciones globales para mostrar y cerrar vistas
    window.mostrarVista = function(id) {
        const vistas = document.querySelectorAll('.vista');
        vistas.forEach(vista => {
            vista.classList.remove('vista-activa');
        });
        document.getElementById(id).classList.add('vista-activa');
    };

    window.cerrarVentana = function(id) {
        document.getElementById(id).classList.remove('vista-activa');
        document.getElementById('vista-principal').classList.add('vista-activa');
    };

    // Lógica para la cotización
    const generarCotizacionBtn = document.getElementById('generarCotizacion');
    const cotizacionResult = document.getElementById('cotizacionResult');
    const cotizacionComprobante = document.getElementById('cotizacionComprobante');

    if (generarCotizacionBtn) {
        generarCotizacionBtn.addEventListener('click', function() {
            const cantidadPrendas = parseInt(document.getElementById('cantidadCotizacion').value);
            const tipoTrabajo = document.getElementById('tipoTrabajo').value;
            const cantidadBotonesOjales = parseInt(document.getElementById('cantidadBotonesOjales').value);

            if (isNaN(cantidadPrendas) || cantidadPrendas <= 0 || isNaN(cantidadBotonesOjales) || cantidadBotonesOjales <= 0) {
                cotizacionResult.style.color = "var(--accent-color)";
                cotizacionResult.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
                cotizacionResult.textContent = "Por favor, ingresa cantidades válidas.";
                cotizacionComprobante.style.display = 'none';
                return;
            }

            let precioBasePorUnidad = 0;
            let tipoTrabajoTexto = "";

            switch (tipoTrabajo) {
                case 'ambos-comun':
                    precioBasePorUnidad = 50;
                    tipoTrabajoTexto = "Botón y Ojal Común";
                    break;
                case 'ambos-especial':
                    precioBasePorUnidad = 80;
                    tipoTrabajoTexto = "Botón y Ojal Especial";
                    break;
                case 'boton-comun':
                    precioBasePorUnidad = 25;
                    tipoTrabajoTexto = "Solo Botón Común";
                    break;
                case 'ojal-comun':
                    precioBasePorUnidad = 25;
                    tipoTrabajoTexto = "Solo Ojal Común";
                    break;
                case 'boton-especial':
                    precioBasePorUnidad = 40;
                    tipoTrabajoTexto = "Solo Botón Especial";
                    break;
                case 'ojal-especial':
                    precioBasePorUnidad = 40;
                    tipoTrabajoTexto = "Solo Ojal Especial";
                    break;
                default:
                    precioBasePorUnidad = 0;
            }

            const totalBotonesOjales = cantidadPrendas * cantidadBotonesOjales;
            const costoTotal = totalBotonesOjales * precioBasePorUnidad;

            cotizacionResult.style.color = "var(--secondary-color)";
            cotizacionResult.style.backgroundColor = "rgba(39, 174, 96, 0.15)";
            cotizacionResult.textContent = `Costo total estimado: $${costoTotal.toFixed(2)}`;

            const fechaActual = new Date();
            const dia = String(fechaActual.getDate()).padStart(2, '0');
            const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
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

    // Lógica para el calendario de entregas
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

        const fechaRecepcion = new Date(fechaRecepcionStr + 'T00:00:00');
        if (isNaN(fechaRecepcion.getTime())) {
            fechaEntregaParrafo.style.color = "var(--accent-color)";
            fechaEntregaParrafo.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
            fechaEntregaParrafo.textContent = "Fecha de recepción inválida.";
            costoAdicionalParrafo.textContent = "";
            return;
        }

        const diasPorBotonOjal = 0.005;
        let diasNecesarios = cantidadBotones * diasPorBotonOjal;

        if (diasNecesarios < 1) {
            diasNecesarios = 1;
        }

        let costoAdicional = 0;
        if (entregaUrgente) {
            costoAdicional = costoAdicional + 50; 
            diasNecesarios = Math.max(1, diasNecesarios * 0.5); 
        }

        let fechaEntrega = new Date(fechaRecepcion);
        let diasAgregados = 0;

        while (diasAgregados < diasNecesarios) {
            fechaEntrega.setDate(fechaEntrega.getDate() + 1);
            const diaSemana = fechaEntrega.getDay();
            if (diaSemana !== 0 && diaSemana !== 6) { // Excluir domingos (0) y sábados (6)
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

    // Inicialización del mapa de Google
    window.initMap = function() {
        if (document.getElementById('map')) {
            // Coordenadas para Tolosa, Buenos Aires
            const tallerLocation = { lat: -34.8988, lng: -57.9734 }; 
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: tallerLocation,
                disableDefaultUI: true 
            });

            new google.maps.Marker({
                position: tallerLocation,
                map: map,
                title: 'Nuestro Taller de Costura',
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" 
                }
            });
        }
    };

    // Esta verificación es redundante si `callback=initMap` ya se usa en el HTML, 
    // pero es una buena práctica si initMap pudiera ser llamado de otra forma.
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        initMap();
    }
});