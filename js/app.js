const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e) {
    e.preventDefault();

    // Validar 

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Todos los campos son obligatorios');
        return;
    }

    // Consultaríamos la API
    consultarAPI(ciudad, pais);
}


function mostrarError(mensaje) {

    const existeAlerta = document.querySelector('.bg-red-100');

    if (!existeAlerta) {
        // Crear una alerta
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>`;

        container.appendChild(alerta);

        // Remover la alerta después de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad, pais) {

    const appID = '6c40a53ace4f812371bfebb87f32f6a8';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    spinner() // Muestra un spinner de carga

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            limpiarHTML(); // Limpiar el HTML previo
            if (data.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }

            // Imprime la respuesta en el HTML
            mostrarClima(data);
        })

}

function mostrarClima(data) {

    const { name, main: { temp, temp_max, temp_min } } = data;

    const centigrados = convertir(temp);
    const max = convertir(temp_max);
    const min = convertir(temp_min);

    const cityName = document.createElement('p');
    cityName.innerHTML = `${name}`;
    cityName.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(cityName);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

function convertir(grados) {
    return parseInt(grados - 273.15);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner() {
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-cube-grid');
    divSpinner.innerHTML = `
    
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>`;

    resultado.appendChild(divSpinner);
}