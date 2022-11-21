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
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
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

  minFahrenheit = response.data.main.temp_min;
  maxFahrenheit = response.data.main.temp_max;

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

  let localDate = new Date();
  let localOffset = localDate.getTimezoneOffset() * 60000;

  let sunriseInfo = document.querySelector(`#sunrise`);
  let sunriseUnix = response.data.sys.sunrise * 1000;
  let sunriseUTC = sunriseUnix + localOffset;
  let sunriseTime = new Date(sunriseUTC + 1000 * response.data.timezone);
  let sunriseHours = String(sunriseTime.getHours()).padStart(2, `0`);
  let sunriseMinutes = String(sunriseTime.getMinutes()).padStart(2, `0`);
  let sunriseSeconds = String(sunriseTime.getSeconds()).padStart(2, `0`);
  let sunrise = `${sunriseHours}:${sunriseMinutes}`;
  sunriseInfo.innerHTML = sunrise;

  let sunsetInfo = document.querySelector(`#sunset`);
  let sunsetUnix = response.data.sys.sunset * 1000;
  let sunsetUTC = sunsetUnix + localOffset;
  let sunsetTime = new Date(sunsetUTC + 1000 * response.data.timezone);
  let sunsetHours = String(sunsetTime.getHours()).padStart(2, `0`);
  let sunsetMinutes = String(sunsetTime.getMinutes()).padStart(2, `0`);
  let sunsetSeconds = String(sunsetTime.getSeconds()).padStart(2, `0`);
  let sunset = `${sunsetHours}:${sunsetMinutes}`;
  sunsetInfo.innerHTML = sunset;

  getForecast(response.data.coord);
}

//Weekly forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"><h2>Weekly Forecast</h2>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
  <div class="weekly-forecast-date">${formatDay(forecastDay.dt)}</div>
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt="" width="36" />
  <div class="forecast-temps">
    <span class="forecast-max"><strong>${Math.round(
      forecastDay.temp.max
    )}°</strong></span> | <span class="forecast-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
    </div>
</div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//Location logging
function logLocation(postion) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let lat = postion.coords.latitude;
  let lon = postion.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getLocation(event) {
  navigator.geolocation.getCurrentPosition(logLocation);
}

//Units
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#actual-temp`);
  let celsiusTemp = (fahrenheitTemperature - 32) * 0.55555555555;
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  let minElement = document.querySelector(`#daily-low`);
  let minCelsius = (minFahrenheit - 32) * 0.55555555555;
  minElement.innerHTML = `${Math.round(minCelsius)}`;

  let maxElement = document.querySelector(`#daily-high`);
  let maxCelsius = (maxFahrenheit - 32) * 0.55555555555;
  maxElement.innerHTML = `${Math.round(maxCelsius)}`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(`#actual-temp`);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let minElement = document.querySelector(`#daily-low`);
  minElement.innerHTML = `${Math.round(minFahrenheit)}`;

  let maxElement = document.querySelector(`#daily-high`);
  maxElement.innerHTML = `${Math.round(maxFahrenheit)}`;
}

let fahrenheitTemperature = null;
let minFahrenheit = null;
let maxFahrenheit = null;

let searchCity = document.querySelector("#city-search");
searchCity.addEventListener("submit", handleSearchCity);

let searchCurrentCity = document.querySelector("#current-location");
searchCurrentCity.addEventListener("click", getLocation);

search("Dallas");

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", displayCelsiusTemp);

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", displayFahrenheitTemp);
