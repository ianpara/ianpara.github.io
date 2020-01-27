// new autoComplete({
//     data: {
//         src: async () => {
//             const query = document.querySelector('#autocomplete').value;
//             const source = awat fetch('js/city')
//         }
//     }
// })

// select text input
const inputCity = document.getElementById('city');

// store value into variable
let cityName = inputCity.value;

// when input event is triggered update cityName
inputCity.addEventListener('input', function(e) {
    cityName = e.target.value;
})

//time converter using moment.js
function convertTime(utc,tz) {
    //add timezone offset
    let date = (utc + tz);
    date = moment.unix(date).utc();
    return date;
}

//convert wind from deg to compass dir
function convertWindDir(deg) {
    let compass = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]
    let index = Math.round((deg % 360) / 22.5 )
    return compass[index]
}

// define vars
let city = document.querySelector('.cityName');
let weather = document.querySelector('.weather');
let temp = document.querySelector('.temp');
let tempValue = document.querySelector('.temp-value');
let minTemp = document.querySelector('.min-temp');
let maxTemp = document.querySelector('.max-temp');
let feels = document.querySelector('.feels')
let icon = document.querySelector('.icon');
let sunrise = document.querySelector('.sunrise');
let sunset = document.querySelector('.sunset');
let wind = document.querySelector('.wind');
let ret = document.querySelector('.timeRet');
let errorMessage = document.querySelector('.error-message');

// select form
const form = document.querySelector('form');

// When form is submitted print 'submitted' to the browser console
form.addEventListener('submit', function(e) {
    // prevent form default behavior
    e.preventDefault();
    let unit = document.querySelector('input[name="unit"]:checked').value;

    // make request to our API
    axios.get('https://api.openweathermap.org/data/2.5/weather?q='+ cityName + '&units=' + unit + '&appid=472561ed8fcd58a94e7a86d842fd1f4e')
    .then(function(response) {

        city.innerHTML = response.data.name + ', ' + response.data.sys.country;
        t = convertTime(response.data.dt,response.data.timezone);
        ret.innerHTML = t.format('dddd h:mm a');
        weather.innerHTML =  response.data.weather[0].description;
        temp.innerHTML = Math.floor(response.data.main.temp) + '&deg';
        feels.innerHTML = 'Feels like: ' + Math.floor(response.data.main.feels_like) + '&deg';
        nt = minTemp.innerHTML = 'Low: ' + Math.floor(response.data.main.temp_min) + '&deg';
        xt = maxTemp.innerHTML = 'High: ' + Math.floor(response.data.main.temp_max) + '&deg';
        tempValue.innerHTML = '<img src="/weather/img/temperature.svg"></img>' + nt + ' ' + xt;
        sr = convertTime(response.data.sys.sunrise,response.data.timezone);
        sunrise.innerHTML = '<img src="/weather/img/sunrise.svg"></img>' + sr.format('h:mm a');
        ss = convertTime(response.data.sys.sunset,response.data.timezone);
        sunset.innerHTML = '<img src="/weather/img/sunset.svg"></img>' + ss.format('h:mm a');
        wind.innerHTML = '<img src="/weather/img/wind.svg"></img>' + convertWindDir(response.data.wind.deg) + ' at ' + Math.floor(response.data.wind.speed) + ' mph';
        icon.src = 'http://openweathermap.org/img/wn/'+ response.data.weather[0].icon + '@2x.png';
    })
    .catch(function(error) {
        if (error = 404) {
            console.log(error);
            errorMessage.innerHTML = "City not found."
        } else {
            console.log(error);
            errorMessage.innerHTML = error;
        }
    })


    //clear input
    inputCity.value = '';
    city.innerHTML = '';
    weather.innerHTML = '';
    temp.innerHTML = '';
    tempValue.innerHTML = '';
    minTemp.innerHTML = '';
    maxTemp.innerHTML = '';
    icon.src = '';
    sunrise.innerHTML = '';
    sunset.innerHTML = '';
    wind.innerHTML = '';
    errorMessage.innerHTML = '';
})