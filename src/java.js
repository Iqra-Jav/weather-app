//Displaying real-time Date and Time
let now = new Date();

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

function searchCity(city) {
  let apiKey = `9802d88f6dd188634b8362bf8e2349da`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureText = document.querySelector(`#temperature`);
  temperatureText.innerHTML = `${temperature}°`;

  let description = response.data.weather[0].main;
  let dayForcast = document.querySelector(".dayForcast");
  dayForcast.innerHTML = `${description}`;
}

//Display search-input city in header
function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  searchCity(city);
}
let element = document.querySelector("#search-form");
element.addEventListener("submit", updateCity);

function searchLocation(position) {
  let apiKey = `9802d88f6dd188634b8362bf8e2349da`;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
