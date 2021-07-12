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
let container = document.querySelector('.weather-info')
let city = document.querySelector('.cityName');
let weather = document.querySelector('.weather');
let temp = document.querySelector('.temp');
let tempMinMax = document.querySelector('.temp-minmax');
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

new autoComplete({
    data: {                              // Data src [Array, Function, Async] | (REQUIRED)
      src: async () => {
        // User search query
        const query = document.querySelector("#city").value;
        // Fetch External Data Source
        const source = await fetch(`js/city.list.min.json`);
        // Format data into JSON
        const data = await source.json();
        // Return Fetched data
        return data;
      },
      key: ["name"],
      cache: true
    },
    placeHolder: "Find a city...",     // Place Holder text                 | (Optional)
    selector: "#city",                 // Input field selector              | (Optional)
    threshold: 0,                      // Min. Chars length to start Engine | (Optional)
    debounce: 0,                       // Post duration for engine to start | (Optional)
    searchEngine: "strict",            // Search Engine type/mode           | (Optional)
    resultsList: {                     // Rendered results list object      | (Optional)
        render: true,
        container: source => {
            source.setAttribute("id", "autoComplete_list");
        },
        destination: document.querySelector("#city"),
        position: "afterend",
        element: "ul"
    },
    maxResults: 5,                         // Max. number of rendered results | (Optional)
    highlight: true,                       // Highlight matching results      | (Optional)
    resultItem: {                          // Rendered result item            | (Optional)
        content: (data, source) => {
            source.innerHTML = data.match;
        },
        element: "li"
    },
    noResults: () => {                     // Action script on noResults      | (Optional)
        const result = document.createElement("li");
        result.setAttribute("class", "autoComplete_result");
        result.setAttribute("tabindex", "1");
        result.innerHTML = "No Results";
        document.querySelector("#autoComplete_list").appendChild(result);
    },
    onSelection: feedback => {             // Action script onSelection event | (Optional)
        const selection = feedback.selection.value;
        let sel_city = selection.name;
        let sel_country = selection.country;

		// Change value in input
        document.querySelector("#city").value = sel_city + ', ' + sel_country;
        // Change value in cityName
        cityName = sel_city + ', ' + sel_country;

		// Concole log autoComplete data feedback
		console.log(sel_city, sel_country);
    }
});

// When form is submitted print 'submitted' to the browser console
form.addEventListener('submit', function(e) {
    // prevent form default behavior
    e.preventDefault();
    let unit = document.querySelector('input[name="unit"]:checked').value;

    // make request to our API
    axios.get('https://api.openweathermap.org/data/2.5/weather?q='+ cityName + '&units=' + unit + '&appid=472561ed8fcd58a94e7a86d842fd1f4e')
    .then(function(response) {

        container.classList.add('pre-animation');

        setTimeout(function(){
            city.innerHTML = response.data.name + ', ' + response.data.sys.country;
            t = convertTime(response.data.dt,response.data.timezone);
            ret.innerHTML = t.format('dddd h:mm a');
            weather.innerHTML =  response.data.weather[0].description;
            tempVal = Math.floor(response.data.main.temp)
            temp.innerHTML = tempVal + '&deg';
            feels.innerHTML = 'Feels like: ' + Math.floor(response.data.main.feels_like) + '&deg';
            nt = minTemp.innerHTML = 'Lo: ' + Math.floor(response.data.main.temp_min) + '&deg';
            xt = maxTemp.innerHTML = 'Hi: ' + Math.floor(response.data.main.temp_max) + '&deg';
            tempMinMax.innerHTML = '<img src="./img/temperature-c.svg"></img>' + nt + ' ' + xt;
            sr = convertTime(response.data.sys.sunrise,response.data.timezone);
            sunrise.innerHTML = '<img src="./img/sunrise-c.svg"></img>' + sr.format('h:mm a');
            ss = convertTime(response.data.sys.sunset,response.data.timezone);
            sunset.innerHTML = '<img src="./img/sunset-c.svg"></img>' + ss.format('h:mm a');
            wind.innerHTML = '<img src="./img/wind-c.svg"></img>' + convertWindDir(response.data.wind.deg) + ' at ' + Math.floor(response.data.wind.speed) + ' mph';
            icon.src = 'http://openweathermap.org/img/wn/'+ response.data.weather[0].icon + '@2x.png';
            container.classList.remove('pre-animation')
        },500)
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
    // city.innerHTML = '';
    // weather.innerHTML = '';
    // temp.innerHTML = '';
    // tempValue.innerHTML = '';
    // minTemp.innerHTML = '';
    // maxTemp.innerHTML = '';
    // icon.src = '';
    // sunrise.innerHTML = '';
    // sunset.innerHTML = '';
    // wind.innerHTML = '';
    errorMessage.innerHTML = '';
})