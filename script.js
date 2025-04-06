
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const sunrise = document.getElementById('sunrise');

// Forecast elements
const monTemp = document.getElementById('monTemp');
const monMinTemp = document.getElementById('monMinTemp');
const tueTemp = document.getElementById('tueTemp');
const tueMinTemp = document.getElementById('tueMinTemp');
const wedTemp = document.getElementById('wedTemp');
const wedMinTemp = document.getElementById('wedMinTemp');
const thuTemp = document.getElementById('thuTemp');
const thuMinTemp = document.getElementById('thuMinTemp');
const friTemp = document.getElementById('friTemp');
const friMinTemp = document.getElementById('friMinTemp');

const apiKey = '7957813aa0aec15c2ddc806d6ad1329f'; // Replace with your API key

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        updateWeatherUI(data);
        getForecastData(city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('City not found or API error.');
    }
}

async function getForecastData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        updateForecastUI(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} km/h`;
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunrise.textContent = sunriseTime;

    // Set weather icon (you'll need to download or use an icon library)
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`; // Replace with your icon path
}

function updateForecastUI(data) {
    const forecastDays = [monTemp, tueTemp, wedTemp, thuTemp, friTemp];
    const forecastMinTemps = [monMinTemp, tueMinTemp, wedMinTemp, thuMinTemp, friMinTemp];

    for (let i = 0; i < forecastDays.length; i++) {
        const forecastData = data.list[i * 8 + 4]; // Get noon forecast (approximately)
        if (forecastData) {
            forecastDays[i].textContent = `${Math.round(forecastData.main.temp)}°C`;
            forecastMinTemps[i].textContent = `${Math.round(forecastData.main.temp_min)}°C`;
        } else {
            forecastDays[i].textContent = 'N/A';
            forecastMinTemps[i].textContent = 'N/A';
        }
    }
}