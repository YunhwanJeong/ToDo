const API_KEY = "4a3eab6239059420c18fe1191b908a21";
const COORDS = 'coords';

function paintWeather(temp, cityName) {
  const weather = document.querySelector(".js-weather");
  weather.innerText = `${temp}℃ @ ${cityName}`;
}

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    const temp = json.main.temp;
    const cityName = json.name;
    paintWeather(temp, cityName);
  })
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getPositionSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function getPositionError(positionError) {
  console.log(positionError); 
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();