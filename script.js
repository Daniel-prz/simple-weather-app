"use strict";
const BASE_URL = "https://api.weatherbit.io/v2.0/forecast/";
const API_KEY = "8e832613011a41afb2dcb1073accdb4d";

class Weather {
  constructor(city, weatherDay) {
    this.city = city;
    this.date = weatherDay.datetime;
    this.averageTemp = weatherDay.temp;
    this.description = weatherDay.weather.description;
    this.icon = weatherDay.weather.icon;
    this.high = weatherDay.high_temp;
    this.low = weatherDay.low_temp;
  }

  displayForecast(weatherData) {
    const forecastContainer = document.querySelector(".forecast-display");
    forecastContainer.innerHTML += `<div>
    <h3 class="date">Date - ${weatherData.date}</h3>
    <h4 class="city">City - ${weatherData.city}</h4>
    <div class="weather-row"><span>${weatherData.averageTemp}</span>
    <span>${weatherData.high}</span>
    <span>${weatherData.low}</span>
    <img class="weather-icon" src="https://cdn.weatherbit.io/static/img/icons/${weatherData.icon}.png"
     alt="weather icon" >
    <span>${weatherData.description}</span>
    </div>            
    </div>`;
  }
}

async function fetchForecastData(zip) {
  try {
    const response = await fetch(
      BASE_URL + `daily?postal_code=${zip}&key=${API_KEY}&days=7&units=I`
    );
    //const response = await fetch("weatherData.json");
    const weatherData = await response.json();
    const cityName = weatherData.city_name;
    const weatherDays = weatherData.data.map(
      (weatherDay) => new Weather(cityName, weatherDay)
    );
    weatherDays.forEach((day) => day.displayForecast(day));
  } catch (error) {
    console.log(error);
  }
}

// fetchForecastData(11208);

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchForecastData(form.zip.value);
});
