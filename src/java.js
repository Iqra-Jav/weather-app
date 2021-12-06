//Displaying real-time Date and Time
let now = new Date();

const icons = {
  "01d": "fas fa-sun",

  "02d": "fas fa-cloud-sun",

  "01n": "fas fa-moon",

  "02n": "fas fa-cloud-moon",

  "03d": "fas fa-cloud",

  "04d": "fas fa-cloud",

  "03n": "fas fa-cloud",

  "04n": "fas fa-cloud",

  "09d": "fas fa-cloud-showers-heavy",

  "09n": "fas fa-cloud-showers-heavy",

  "10d": "fas fa-cloud-sun-rain",

  "10n": "fas fa-cloud-moon-rain",

  "11d": "fas fa-bolt",

  "11n": "fas fa-bolt",

  "13d": "fas fa-snowflake",

  "13n": "fas fa-snowflake",

  "50d": "fas fa-smog",

  "50n": "fas fa-smog",
};

function showForecastIcon(icon) {
  if (icons[icon] !== undefined) {
    console.log("Hit!! Icon is ", icons[icon]);
    return icons[icon];
  }
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateTime = document.querySelector(".currentDay");
dateTime.innerHTML = `${day}, ${hours}:${minutes}`;

//
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

//
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2 card-body">
       <div class="forecast-temperature">${Math.round(
         forecastDay.temp.max
       )}°</div> 
        <br />
        <div class="weather-icon"><i class="${showForecastIcon(
          forecastDay.weather[0].icon
        )}"></i></div>
        <br />
        <div class="day">${formatDay(forecastDay.dt)}</div>
     </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `9802d88f6dd188634b8362bf8e2349da`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//
function searchCity(city) {
  let apiKey = `9802d88f6dd188634b8362bf8e2349da`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureText = document.querySelector(`#temperature`);
  temperatureText.innerHTML = `${temperature}°`;

  let description = response.data.weather[0].main;
  let dayForcast = document.querySelector(".dayForcast");
  dayForcast.innerHTML = `${description}`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  getForecast(response.data.coord);
}

//
function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  searchCity(city);
}
let element = document.querySelector("#search-form");
element.addEventListener("submit", updateCity);

//
function searchLocation(position) {
  let apiKey = `9802d88f6dd188634b8362bf8e2349da`;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
