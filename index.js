var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getWeatherData() {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherMap = new Map();
        try {
            const response = yield fetch("https://api.open-meteo.com/v1/forecast?latitude=30.4333&longitude=-87.2167&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m");
            const weather = yield response.json();
            const weatherData = JSON.parse(localStorage.getItem('weatherData') || '{}');
            for (let i = 0; i < 167; i++) {
                const time = weather.hourly.time[i];
                const temperature = weatherData.temperature_2m[i];
                const humidity = weatherData.relative_humidity_2m[i];
                const windSpeed = weatherData.wind_speed_10m[i];
                weatherMap.set(time, [temperature, humidity, windSpeed]);
            }
            console.log("Weather data:", weatherMap);
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
        const forecastElement = document.getElementById("forecast");
        if (forecastElement) {
            forecastElement.innerHTML = "Weather data: " + Array.from(weatherMap.entries()).map(([time, data]) => `${time}: ${data.join(', ')}`).join('<br>');
        }
    });
}
getWeatherData();
