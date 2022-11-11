let apiKey = "a7775f651d2a52140ceaa2d49494f5ca";
let apiUrl = `http://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&units={units}`;

axios.get(apiUrl).then(displayTemperature);

function displayTemperature(response) {
  console.log(response.data);
}
