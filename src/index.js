//Time and date
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

  let year = now.getFullYear();

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

  let today = `${day}, ${month} ${date}, ${year} | ${hour}:${minute} ${prepand}`;

  return today;
}

console.log(formatDate(new Date()));

let currentDate = document.querySelector("p.date");
currentDate.innerHTML = formatDate(new Date());

//City search
function search(city) {
  let apiKey = "a7775f651d2a52140ceaa2d49494f5ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleSearchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  if (city.length === 0) {
    alert("Please enter a city");
  }
  search(city);
}

//Temperature information
function showTemperature(response) {
  console.log(response);
  let currentCity = document.querySelector("#actual-temp");
  fahrenheitTemperature = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${fahrenheitTemperature}`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#search-city").innerHTML = response.data.name;

  document
    .querySelector("#condition")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#condition")
    .setAttribute("alt", response.data.weather[0].description);
}

//Moonphase will be here

//Weekly forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"><h2>5 Day Forecast</h2>`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tues", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
  <div class="weekly-forecast-date">${day}</div>
  <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="" width="36" />
  <div class="forecast-temps">
    <span class="forecast-max">48°</span> <span class="forecast-min">36°</span>
    </div>
</div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Location logging
function logLocation(postion) {
  let apiKey = "a7775f651d2a52140ceaa2d49494f5ca";
  let lat = postion.coords.latitude;
  let lon = postion.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(logLocation);
}

//Units
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actual-temp");
  let celsiusTemp = (fahrenheitTemperature - 32) * 0.55555555555;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actual-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", handleSearchCity);

let searchCurrentCity = document.querySelector("#current-location");
searchCurrentCity.addEventListener("click", getLocation);

search("Dallas");

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", displayCelsiusTemp);

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", displayFahrenheitTemp);
