console.log('hola api clima');

const API_KEY = '9410e03fabc8ba2fdb99b01fab50359e';

const getGeoLoc = () => { //obtiene geolocalizacion de dispositivo
   navigator.geolocation.getCurrentPosition(getDataApi);
}

const getDataApi = pos => {
    console.log(pos);
    const { latitude , longitude } = pos.coords; //asigna lat y long
    fetch( `https://api.openweathermap.org/data/2.5/weather?q={city name}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric` )
    .then( res => res.json() )
    .then( data => renderData(data) )
    .catch( err => console.log('Consulta API Fallida!',err) );
}

const renderData = dataApi => {
    console.log(dataApi);
    const country = dataApi.sys.country;
    console.log(country);
}

getGeoLoc()


