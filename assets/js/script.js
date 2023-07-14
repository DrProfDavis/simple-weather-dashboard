let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');
let name = document.querySelector('.name');
let temp = document.querySelector('.temp');
let humidity = document.querySelector('.humidity');
let windSpeed = document.querySelector('.wind-speed');

let geoResultsArray = [];
let weatherResultsArray = [];


button.addEventListener('click', getGeoApi)

        // Geo Api fetch
function getGeoApi() {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue.value}&limit=5&appid=0dff19434666c0633032ec00e05dfa2a`)
        .then(function (responseGeo) {
            return responseGeo.json();
        })
        .then(function (dataGeo){
            console.log("Current dataGeo content:")
            console.log(dataGeo)
            console.log("Current dataGeo[0].name content:")
            console.log(dataGeo[0].name)
            console.log("Current dataGeo[0].lat content:")
            console.log(dataGeo[0].lat)
            console.log("Current dataGeo[0].lon content:")
            console.log(dataGeo[0].lon)
            var name = dataGeo[0].name
            var lat = dataGeo[0].lat
            var lon = dataGeo[0].lon
            getWeatherApi(name,lat,lon);
    })
}

        // Weather Api Fetch
function getWeatherApi(name,lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0dff19434666c0633032ec00e05dfa2a`)
    .then(function (responseWeather) {
        return responseWeather.json();
    })
    .then(function (dataWeather) {
        weatherResultsArray = dataWeather;
        console.log("Current weatherResultsArray content:")
        console.log(weatherResultsArray)
    })
}


// DISPLAY SEARCH RESULTS
// ON CLICK - SET lat AND lon FOR NEXT API

    // Weather Api
//     console.log("Current geoResultsArray content:")
//     console.log(geoResultsArray)
//     fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=&appid=0dff19434666c0633032ec00e05dfa2a`)
//     .then(function(responseWeather) {
//         return responseWeather.json();
//     })
//     .then(function (dataWeather){
//         console.log(dataWeather)
//     })
// })


// fetch('https://api.github.com/orgs/twitter/repos')
//     .then(function (response) {
//     return response.json();
//     })
//     .then(function (data) {
//     console.log(data);
//     console.log('Twitter Repositories: Names only \n----------');
//     for (var i = 0; i < data.length; i++) {
//         console.log(data[i].name);
//     }
// });