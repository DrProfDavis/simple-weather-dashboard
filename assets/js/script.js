let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');

let geoResultsArray = [];
let weatherResultsArray = [];

button.addEventListener('click', getGeoApi)

        // Geo Api fetch
function getGeoApi() {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue.value}&limit=1&appid=0dff19434666c0633032ec00e05dfa2a`)
        .then(function (responseGeo) {
            return responseGeo.json();
        })
        .then(function (dataGeo){
            console.log("Current dataGeo content:")
            console.log(dataGeo)
            console.log("Current dataGeo[0] content:")
            console.log(dataGeo[0].name)
            console.log(dataGeo[0].state)
            console.log(dataGeo[0].lat)
            console.log(dataGeo[0].lon)
            var cityName = dataGeo[0].name
            var cityState = dataGeo[0].state
            var lat = dataGeo[0].lat
            var lon = dataGeo[0].lon
            getWeatherApi(cityName,cityState,lat,lon);
            get5DayApi(lat,lon);
    })
}

        // Weather Api Fetch
function getWeatherApi(cityName,cityState,lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0dff19434666c0633032ec00e05dfa2a`)
    .then(function (responseWeather) {
        return responseWeather.json();
    })
    .then(function (dataWeather) {
        let name = document.getElementById('name');
        let tempCurrent = document.getElementById('tempCurrent');
        let tempLow = document.getElementById('tempLow');
        let tempHigh = document.getElementById('tempHigh');
        let humidity = document.getElementById('humidity');
        let wind = document.getElementById('wind-speed');
        console.log("Current weather results content:")
        console.log(dataWeather)
        name.innerHTML = cityName+", "+cityState;
        tempCurrent.innerHTML = "Current: " + Math.trunc((dataWeather.main.temp - 273.15) * 9/5 + 32) + " F";
        tempLow.innerHTML = "Low: " + Math.trunc((dataWeather.main.temp_min - 273.15) * 9/5 + 32) + " F";
        tempHigh.innerHTML = "High: " + Math.trunc((dataWeather.main.temp_max - 273.15) * 9/5 + 32) + " F";
        humidity.innerHTML = dataWeather.main.humidity + "%";
        wind.innerHTML = dataWeather.wind.speed + " mph";
    })
}

// 5 Day Forecast Api Fetch
function get5DayApi(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0dff19434666c0633032ec00e05dfa2a`)
    .then(function (response5Day) {
        return response5Day.json();
    })
    .then(function (data5Day) {
        console.log("Current 5 Day content:")
        console.log(data5Day)

        // Set the dates of each tile
        let dayOneInfo = document.getElementById('firstDay');
        dayOne = new Date(data5Day.list[7].dt*1000);
        dayOneMonth = JSON.stringify(dayOne.getMonth()+1);
        dayOneDate = JSON.stringify(dayOne.getDate());
        dayOneInfo.innerHTML = dayOneMonth+"-"+dayOneDate;
        let dayOneTemp = document.getElementById('firstDayTemp');
        dayOneTemp.innerHTML = "Temp: " + Math.trunc(((data5Day.list[7].main.temp) - 273.15) * 9/5 + 32) + " F";
        let dayOneHumid = document.getElementById('firstDayHumid');
        dayOneHumid.innerHTML = "Humidity: " + data5Day.list[7].main.humidity + "%";

        let dayTwoInfo = document.getElementById('secondDay');
        dayTwo = new Date(data5Day.list[15].dt*1000);
        dayTwoMonth = JSON.stringify(dayTwo.getMonth()+1);
        dayTwoDate = JSON.stringify(dayTwo.getDate());
        dayTwoInfo.innerHTML = dayTwoMonth+"-"+dayTwoDate;
        let dayTwoTemp = document.getElementById('secondDayTemp');
        dayTwoTemp.innerHTML = "Temp: " + Math.trunc(((data5Day.list[15].main.temp) - 273.15) * 9/5 + 32) + " F";
        let dayTwoHumid = document.getElementById('secondDayHumid');
        dayTwoHumid.innerHTML = "Humidity: " + data5Day.list[15].main.humidity + "%";

        let dayThreeInfo = document.getElementById('thirdDay');
        dayThree = new Date(data5Day.list[23].dt*1000);
        dayThreeMonth = JSON.stringify(dayThree.getMonth()+1);
        dayThreeDate = JSON.stringify(dayThree.getDate());
        dayThreeInfo.innerHTML = dayThreeMonth+"-"+dayThreeDate;
        let dayThreeTemp = document.getElementById('thirdDayTemp');
        dayThreeTemp.innerHTML = "Temp: " + Math.trunc(((data5Day.list[23].main.temp) - 273.15) * 9/5 + 32) + " F";
        let dayThreeHumid = document.getElementById('thirdDayHumid');
        dayThreeHumid.innerHTML = "Humidity: " + data5Day.list[23].main.humidity + "%";

        let dayFourInfo = document.getElementById('fourthDay');
        dayFour = new Date(data5Day.list[31].dt*1000);
        dayFourMonth = JSON.stringify(dayFour.getMonth()+1);
        dayFourDate = JSON.stringify(dayFour.getDate());
        dayFourInfo.innerHTML = dayFourMonth+"-"+dayFourDate;
        let dayFourTemp = document.getElementById('fourthDayTemp');
        dayFourTemp.innerHTML = "Temp: " + Math.trunc(((data5Day.list[31].main.temp) - 273.15) * 9/5 + 32) + " F";
        let dayFourHumid = document.getElementById('fourthDayHumid');
        dayFourHumid.innerHTML = "Humidity: " + data5Day.list[31].main.humidity + "%";

        let dayFiveInfo = document.getElementById('fifthDay');
        dayFive = new Date(data5Day.list[39].dt*1000);
        dayFiveMonth = JSON.stringify(dayFive.getMonth()+1);
        dayFiveDate = JSON.stringify(dayFive.getDate());
        dayFiveInfo.innerHTML = dayFiveMonth+"-"+dayFiveDate;
        let dayFiveTemp = document.getElementById('fifthDayTemp');
        dayFiveTemp.innerHTML = "Temp: " + Math.trunc(((data5Day.list[39].main.temp) - 273.15) * 9/5 + 32) + " F";
        let dayFiveHumid = document.getElementById('fifthDayHumid');
        dayFiveHumid.innerHTML = "Humidity: " + data5Day.list[39].main.humidity + "%";
    })
}

// Display Date
const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

// Turns numbers into words
if (month == 0){ wordMonth = "January"}
if (month == 1){ wordMonth = "February"}
if (month == 2){ wordMonth = "March"}
if (month == 3){ wordMonth = "April"}
if (month == 4){ wordMonth = "May"}
if (month == 5){ wordMonth = "June"}
if (month == 6){ wordMonth = "July"}
if (month == 7){ wordMonth = "August"}
if (month == 8){ wordMonth = "September"}
if (month == 9){ wordMonth = "October"}
if (month == 10){ wordMonth = "November"}
if (month == 11){ wordMonth = "December"}

currentDate.innerText = `${wordMonth} ${day}, ${year}`;