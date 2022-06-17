// DOM
const container = document.getElementById("container");
const searchForm = document.getElementById("search_submit");
const searchInput = document.getElementById("search_input");
const weatherIcon = document.getElementById("weatherIcon");
const description = document.getElementById("description");
const temperatureDegrees = document.getElementById("degreeNumber");
const timeZone = document.getElementById("timeZone");
const date = document.getElementById("date");
const min = document.getElementById("min");
const max = document.getElementById("max");

// MAIN FUNCTION
const getWeatherData = async (city) => {
    // request a la API y obtención de un objeto con los datos del clima
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
            'X-RapidAPI-Key': '9fcd997527msh8c27c47dc069e86p110976jsn3f963b101261'
        }
    };
    
    const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&lang=sp&units=metric`, options);
    const data = await res.json();
    console.log(data);

    // cambiar el fondo de pantalla según dia/noche
    displayBackgroundImage(data);
    // mostrar datos por pantalla
    displayData(data);
};

// SECONDARY FUNCTIONS
const displayBackgroundImage = (obj) => {
    // extraer hora + covertila a un formato humano
    let spanishDate = new Date(obj.list[0].dt*1000).toLocaleString("es-ES", {
        timeStyle: "short",
        dateStyle: "long"
    });

    date.textContent = `Actualización: ${spanishDate}`;
    
    const dayHour = new Date(obj.list[0].dt*1000).getHours();
    // logica background image
    if(dayHour >= 6 && dayHour < 21){
        container.classList.remove("night");
        container.classList.add("day");
    }else{
        container.classList.remove("day");
        container.classList.add("night");
    }
};

const displayData = (obj) => {
    const icon = obj.list[0].weather[0].icon;
    temperatureDegrees.textContent = Math.floor(obj.list[0].main.temp);
    timeZone.textContent = obj.list[0].name;
    weatherIcon.innerHTML = `<img src="icons/${icon}.png" alt="icon">`;
    description.textContent = obj.list[0].weather[0].description;
    min.textContent = Math.floor(obj.list[0].main.temp_min);
    max.textContent = Math.floor(obj.list[0].main.temp_max);

};

// ERROR FUNCTION
const handleError = () => {
    console.log("error")
}

// EVENT SUBMIT
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    getWeatherData(searchInput.value);
});

// FIRST ONLOAD
window.onload = () => {
    getWeatherData("valencia");
};