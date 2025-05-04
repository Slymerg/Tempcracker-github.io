const claveApi = "b57c3aef33924c53aca222837252404";
const idioma = "es";
const inpCiudad = document.getElementById("input-ciudad");

async function obtenerClima() {
    const ciudad = inpCiudad.value.trim();
    if (!ciudad) {
        alert("Por favor, ingresa una ciudad");
        return;
    }

    const apiClimaActual = `https://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

    try {
        const response = await fetch(apiClimaActual);
        if (!response.ok) {
            throw new Error("Ciudad no encontrada");
        }

        const data = await response.json();
        mostrarClima(data);
    } catch (error) {
        alert("No se pudo obtener el clima. Verifica el nombre de la ciudad.");
        console.error(error);
    }
}

function mostrarClima(data) {
    document.querySelector(".clima-icono").src = data.current.condition.icon;
    document.querySelector(".clima-texto").textContent = data.current.condition.text;
    document.querySelector(".temp").textContent = `${data.current.temp_c}ºC`;
    document.querySelector(".ciudad").textContent = data.location.name;
    document.querySelector(".humedad").textContent = `${data.current.humidity}%`;
    document.querySelector(".viento").textContent = `${data.current.wind_kph} km/h`;
}
