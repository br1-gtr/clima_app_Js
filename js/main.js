console.log('hola api clima');

const API_KEY = '9410e03fabc8ba2fdb99b01fab50359e';

const getGeoLoc = () => { //obtiene geolocalizacion de dispositivo
   navigator.geolocation.getCurrentPosition(getDataApi);
   //navigator.geolocation.getCurrentPosition(getForecastInfo);
}

const getDataApi = pos => {
    console.log(pos);
    const { latitude , longitude } = pos.coords; //asigna lat y long
    fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=sp` )
    .then( res => res.json() )
    .then( data => renderData(data) )
    .catch( err => console.log('Consulta API Fallida!',err) );
}
/*
const getForecastInfo = pos =>{
    const { latitude , longitude } = pos.coords; //asigna lat y long
    fetch( `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=4&appid=${API_KEY}`)
    .then( res => res.json() )
    .then( data => console.log(data) )
    .catch( err => console.log('Consulta API Fallida!',err) );
}*/

const renderData = dataApi => {
    console.log(dataApi);
    setIcon(dataApi);
    setInfoWeather(dataApi);
}

const setIcon = dataApi => { //establece icono segun id
    const iconCard = document.querySelector('#icon');
    const idIcon = dataApi.weather[0].icon
    iconCard.setAttribute('src', `http://openweathermap.org/img/wn/${idIcon}.png`);
}
const setInfoWeather = dataApi => {
    const temp = document.querySelector('.temp');
    temp.textContent = Math.round(dataApi.main.temp);
    const hum = document.querySelector('.humidity');
    hum.textContent = dataApi.main.humidity;
    const feelsLike = document.querySelector('.feels_like');
    feelsLike.textContent = Math.round(dataApi.main.feels_like);
    const windSpeed = document.querySelector('.wind');
    windSpeed.textContent = dataApi.wind.speed;
    const weatherDescription = document.querySelector('.weather-description');
    weatherDescription.textContent = dataApi.weather[0].description.toUpperCase();
    const dataZone = document.querySelector('.data-zone');
    dataZone.textContent = dataApi.name;
    const dataCountry = document.querySelector('.data-country');
    dataCountry.textContent = dataApi.sys.country;
    const dataDate = document.querySelector('.data-date');
    dataDate.textContent = getDateInfo();

}

const getDateInfo = () => {
    let dateInfo = '';
    const date = new Date()
    const month = date.toString().substring(4,7);
    dateInfo = `${month}, ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()} hs`;
    return dateInfo;
}

getDateInfo();
getGeoLoc();

