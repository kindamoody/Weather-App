let now = new Date();

function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  minute = minute <= 9 ? "0" + minute : minute;
  console.log(minute);
  let second = now.getSeconds();
  let prepand = hour >= 12 ? " PM " : " AM ";
  hour = hour >= 12 ? hour - 12 : hour;
  if (hour === 0 && prepand === " PM ") {
    if (minute === 0 && second === 0) {
      hour = 12;
      prepand = " Noon";
    } else {
      hour = 12;
      prepand = " PM";
    }
  }
  if (hour === 0 && prepand === " AM ") {
    if (minute === 0 && second === 0) {
      hour = 12;
      prepand = " Midnight";
    } else {
      hour = 12;
      prepand = " AM";
    }
  }
  console.log("Current Time: " + hour + prepand + ":" + minute + ":" + second);

  let today = `${day}, ${month} ${date} </br> ${hour}:${minute} ${prepand}`;

  return today;
}

console.log(formatDate(new Date()));

function updateCity(event) {
  event.preventDefault();
  let place = document.querySelector("#city");
  let city = document.querySelector("#search-city");
  city.innerHTML = `${place.value}`;
}

let showCity = document.querySelector("#city-search");
showCity.addEventListener("submit", updateCity);

function showCelsius(event) {
  let temperature = document.querySelector("#actual-temp");
  temperature.innerHTML = `26°`;
}

function showFahrenheit(event) {
  let temperature = document.querySelector("#actual-temp");
  temperature.innerHTML = `79°`;
}

function displayWeather(response) {
  document.querySelector("#search-city").innerHTML = response.data.name;
  document.querySelector("#actual-temp").innerHTML =
    Math.round(response.data.main.temp) + "°";
}

function citySearch(city) {
  let apiKey = `a7775f651d2a52140ceaa2d49494f5ca`;
  let units = `imperial`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  citySearch(city);
}

function findLocation(position) {
  let apiKey = `a7775f651d2a52140ceaa2d49494f5ca`;
  let units = `imperial`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = formatDate(new Date());

let searchButton = document.querySelector("#search");
searchButton.addEventListener("submit", searchSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

let celsiusTemp = document.querySelector("#celsius-link");
celsiusTemp.addEventListener("click", showCelsius);

let fahrenheitTemp = document.querySelector("#fahrenheit-link");
fahrenheitTemp.addEventListener("click", showFahrenheit);
