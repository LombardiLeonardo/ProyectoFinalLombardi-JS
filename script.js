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
        actualizarModelos(datos.modelos[this.value]);
    });

    document.getElementById('simular').addEventListener('click', function() {
        simularCotizacion(datos);
    });
}

// Función para actualizar los modelos según el tipo seleccionado
function actualizarModelos(modelos) {
    const modeloSelect = document.getElementById('modelo');
    modeloSelect.innerHTML = '';
    modelos.forEach((modelo, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = modelo;
        modeloSelect.appendChild(option);
    });
}

// Función para simular la cotización
function simularCotizacion(datos) {
    const marcaId = parseInt(document.getElementById('marca').value);
    const tipo = document.getElementById('tipo').value;
    const modelo = document.getElementById('modelo').value;
    const marca = datos.marcas.find(marca => marca.id === marcaId);
    
    // Validación
    if (!marca || !tipo || !modelo) {
        alert('Por favor completa todos los campos antes de simular.');
        return;
    }

    // Cálculo del precio final
    const precioBase = datos.preciosBase[tipo];
    const precioFinal = precioBase * marca.multiplicador;

    // Mostrar resultado en el DOM
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = `El precio de tu seguro para un ${marca.nombre} ${tipo} es de $${precioFinal.toFixed(2)}`;
    resultadoDiv.classList.add('mostrar');
}
