// Función para cargar datos del archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch('datos.json');
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Inicializar el simulador con los datos cargados
cargarDatos().then(datos => {
    inicializarSimulador(datos);
});

// Función para inicializar el simulador con los datos cargados
function inicializarSimulador(datos) {
    const marcaSelect = document.getElementById('marca');
    datos.marcas.forEach(marca => {
        let option = document.createElement('option');
        option.value = marca.id;
        option.textContent = marca.nombre;
        marcaSelect.appendChild(option);
    });

    document.getElementById('tipo').addEventListener('change', function() {
        actualizarModelos(datos.modelos[this.value], this.value);
    });

    document.getElementById('simular').addEventListener('click', function() {
        simularCotizacion(datos);
    });
}

// Función para actualizar los modelos según el tipo seleccionado
function actualizarModelos(modelos, tipoSeleccionado) {
    const modeloSelect = document.getElementById('modelo');
    modeloSelect.innerHTML = '';
    modelos.forEach(modelo => {
        const option = document.createElement('option');
        option.value = modelo;
        option.textContent = modelo;
        modeloSelect.appendChild(option);
    });
}

// Función para simular la cotización
function simularCotizacion(datos) {
    const marcaId = parseInt(document.getElementById('marca').value);
    const tipo = document.getElementById('tipo').value;
    const modeloSeleccionado = document.getElementById('modelo').value;
    const marca = datos.marcas.find(marca => marca.id === marcaId);

    // Obtener el nombre de la marca seleccionada
    const nombreMarcaSeleccionada = marca.nombre;

    // Validar que el modelo seleccionado pertenezca a la marca seleccionada
    const modelosValidos = datos.modelos[tipo].filter(modelo => modelo.includes(nombreMarcaSeleccionada));

    if (!modelosValidos.includes(modeloSeleccionado)) {
        alert("La marca que seleccionaste no coincide con el modelo del vehículo por favor verifica los datos e intenta de nuevo. Gracias.");
        return;
    }

    // Cálculo del precio final
    const precioBase = datos.preciosBase[tipo];
    const precioFinal = precioBase * marca.multiplicador;

    // Mostrar resultado en el DOM
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = `El precio de tu seguro para un ${marca.nombre} ${modeloSeleccionado} es de $${precioFinal.toFixed(2)}`;
    resultadoDiv.classList.add('mostrar');
}
