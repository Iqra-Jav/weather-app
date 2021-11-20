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

//Display search-input city in header
function updateCity(event) {
  event.preventDefault();

  let city = document.querySelector(".form-control").value;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;
  let apiKey = `9802d88f6dd188634b8362bf8e2349da`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
let element = document.querySelector("#search-form");
element.addEventListener("submit", updateCity);

//Display live temperature of the search input city

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureText = document.querySelector(`#temperature`);
  temperatureText.innerHTML = `${temperature}°`;

  let description = response.data.weather[0].description;
  let dayForcast = document.querySelector(".dayForcast");
  dayForcast.innerHTML = `${description}`;
}
