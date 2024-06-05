interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    windspeed_10m: number[];
  };
}

async function getWeatherData(): Promise<void> {
  const weatherMap = new Map<string, [number, number, number]>();

  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=30.4333&longitude=-87.2167&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
    );
    const weather: WeatherData = await response.json();
    const weatherData = JSON.parse(localStorage.getItem('weatherData') || '{}');
  
    const time = weather.hourly.time;
    const temperature = weatherData.temperature_2m;
    const humidity = weatherData.relative_humidity_2m;
    const windSpeed = weatherData.wind_speed_10m;
    console.log("Time:", time);
    //weatherMap.set(time, [temperature, humidity, windSpeed]);
    // for (let i = 0; i < 167; i++) {
      
    // }

    console.log("Weather data:", weatherMap);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }

  const forecastElement = document.getElementById("forecast");
  if (forecastElement) {
    forecastElement.innerHTML = "Weather data: " + Array.from(weatherMap.entries()).map(([time, data]) => `${time}: ${data.join(', ')}`).join('<br>');
  }
}

getWeatherData();