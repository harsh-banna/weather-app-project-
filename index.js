let cityInput =document.querySelector("#city_input"),
searchBtn = document.getElementById('searchBtn'),
locationBtn = document.getElementById('locationBtn'),
api_key = '72d4bdcd7e383254f0b2bdb6ad5e9ba7',
currentWeatherCard = document.querySelectorAll('.weather-left .card')[0],
fiveDaysForecastCard = document.querySelector('.day-forecast'),
aqiCard =document.querySelectorAll('.highlights .card')[0],
sunriseCard =document.querySelectorAll('.highlights .card')[1],
humidityVal = document.querySelector('#humidityval'),
pressureVal = document.querySelector('#pressureval'),
visibilityVal = document.querySelector('#visibilityval'),
windSpeedVal = document.querySelector('#windSpeedval'),
feelsVal = document.querySelector('#feelsval'),
hourlyforcastcard = document.querySelector('.hourly-forecast'),
aqilist = ['good','fair','moderate','poor','very poor'];


function getWeatherDetails(name, lat, lon, country, state){
    let FORECASTAPI_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    AIR_POLU_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
    days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ],
    months = [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec'
    ];


    fetch(AIR_POLU_API_URL).then(res => res.json()).then(data => {
        let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
        aqiCard.innerHTML =`
        <div class="card-head">
            <p>air quality index</p>
            <p class="air-index aqi-${data.list[0].main.aqi}">${data.list[0].main.aqi - 1}</p>
        </div>
        <div class="air-indices">
            <i class="fa-solid fa-wind"></i>
            <div class="item">
                <p>pm2.5</p>
                <h2>${pm2_5}</h2>
            </div>
            <div class="item">
                <p>PM10</p>
                <h2>${pm10}</h2>
            </div>
            <div class="item">
                <p>S02</p>
                <h2>${so2}</h2>
            </div>
            <div class="item">
                <p>co</p>
                <h2>${co}</h2>
            </div>
            <div class="item">
                <p>no</p>
                <h2>${no}</h2>
            </div>
            <div class="item">
                <p>no2</p>
                <h2>${no2}</h2>
            </div>
            <div class="item">
                <p>nnh3</p>
                <h2>${nh3}</h2>
            </div>
            <div class="item">
                 <p>o3</p>
                <h2>${o3}</h2>
            </div>
        </
        `;
    }).catch(() => {alert('air polution not fetched')})

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
        <div class="current-weather">
                        <div class="details">
                            <p>now</p>
                            <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;</h2>
                            <p>${data.weather[0].description}</p>
                        </div>
                        <div class="weather-icon">
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="60px" alt="">
                        </div>
                    </div>
                    <hr>
                    <div class="card-footer">
                        <p><i class="fa-regular fa-calendar"></i>${days[date.getDay()]},${date.getDate()},${months[date.getMonth()]},${date.getFullYear()}</p>
                        <p><i class="fa-solid fa-location-dot"></i>${name}, ${country}</p>
                    </div>
                </div>
        `;
        let {sunrise, sunset} = data.sys,
        {timezone, visibility } = data,
        {humidity, pressure, feels_like} = data.main,
        {speed} = data.wind,
        sRisetime = moment.utc(sunrise, 'x').add(timezone, 'seconds').format('hh:mm A'),
        sSetTime = moment.utc(sunset, 'x').add(timezone, 'seconds').format('hh:mm A');
        sunriseCard.innerHTML = `
        <div class="card-head">
                <p>sunrise & sunset</p>
            </div>
            <div class="sunrise-sunset">
                <div class="item">
                <div class="icon"><i class="fa-thin fa-sunrise fa-4x"></i></div>
                </div>
                <div>
                    <p>sunrise</p>
                    <h2>${sRisetime}</h2>
                </div>    
            <div>
                    <div class="item">
                        <div class="icon"><i class="fa-thin fa-sunrise fa-4x"></i></div>
                    </div>
                    <div>
                    <p>sunset</p>
                    <h2>${sSetTime}</h2>
                    </div>
            </div>
        </div>
        `;
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hpa`;
        visibilityVal.innerHTML = `${visibility/1000}km`;
        windSpeedVal.innerHTML = `${speed}m/s`;
        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;c`;
    }).catch(() => {
        alert('failed to fetch current weather');
    });

    // fetch(FORECASTAPI_URL).then(res => res.json()).then(data => {
    //     console.log(data);
    //     let hourlyForecast = data.list;
    //     hourlyforcastcard.innerHTML = '';
    //     for(let i=0;i <= 7;i++){
    //         let hrForecastDate = new date(hourlyForecast[i].dt_txt);
    //         let hr = hrForecastDate.getHours();
    //         let a = 'pm';
    //         if(hr < 12) a ='am';
    //         if(hr == 0)hr =12;
    //         if(hr > 12) hr = hr -12;
    //         hourlyforcastcard.innerHTML += `
    //             <div class="card">
    //                 <p>${hr} ${a}</p>
    //                 <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" width="24" alt="">
    //                 <p>${(hourlyForecast[i].man.temp -273.1).toFixed(2)}&deg;c</p>
    //             </div>
    //         `;
    //     }
    //     let uniqueForecastDays = [];
    //     let fiveDaysForecast = data.list.filter(forecast => {
    //         let forecastDate = new Date(forecast.dt_txt).getDate();
    //         if(!uniqueForecastDays.includes(forecastDate)){
    //             return uniqueForecastDays.push(forecastDate);
    //         }
    //     });
    //     fiveDaysForecastCard.innerHTML = '';
    //     for(let i=1;i<fiveDaysForecast.length; i++){
    //         let date = new Date(fiveDaysForecast[i].dt_txt);
    //         fiveDaysForecastCard.innerHTML += `
    //             <div class="forecast-item">
    //                 <div class="icon-wrapper">
    //                     <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png"  alt="">
    //                     <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;c</span>
    //                 </div>
    //                 <p>${date.getDate()} ${months[date.getMonth()]}</p>
    //                 <p>${days[date.getDay()]}</p>
    //             </div>
    //         `;
    //     }
    //     console.log(fiveDaysForecast);
    // }).catch(() => {
    //     alert('failed to fetch forecast')
    // });

    let i;
let hrForecastDate;

fetch(FORECASTAPI_URL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let hourlyForecast = data.list;
    for (i = 0; i < 8; i++) {
      hrForecastDate = new Date(hourlyForecast[i].dt_txt);
      let hr = hrForecastDate.getHours();
      let a = "pm";
      if (hr < 12) a = "am";
      if (hr === 0) hr = 12;
      if (hr > 12) hr = hr - 12;
      hourlyforcastcard.innerHTML += `
                <div class="card">
                    <p>${hr} ${a}</p>
                    <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png" width="24" alt="">
                    <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;c</p>
                </div>
            `;
    }

    let uniqueForecastDays = [];
    let fiveDaysForecast = data.list.filter((forecast) => {
      let forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForecastDays.includes(forecastDate)) {
        uniqueForecastDays.push(forecastDate);
        return true;
      }
      return false;
    });

    fiveDaysForecastCard.innerHTML = "";
    for (i = 0; i < fiveDaysForecast.length; i++) {
      let date = new Date(fiveDaysForecast[i].dt_txt);
      fiveDaysForecastCard.innerHTML += `<div class="forecast-item">
                    <div class="icon-wrapper">
                        <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png"  alt="">
                        <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;c</span>
                    </div>
                    <p>${date.getDate()} ${months[date.getMonth()]}</p>
                    <p>${days[date.getDay()]}</p>
                </div>
            `;
    }
    console.log(fiveDaysForecast);
  })

}

function getcitycoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if(!cityName) return;
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        let {name, lat, lon, country, state} = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`failed to get coordinates of ${cityName}`);
    })
}

function getusercoordinates(){
    navigator.geolocation.getCurrentPosition(position => {
        let {latitude, longitude} = position.coords;
        let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}
        `;

        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            let {name, country, state} = data[0];
            getWeatherDetails(name, latitude, longitude, country, state);
        }).catch(() => {
            alert('failed to fetch user coordinates')
        })
    }, error => {
        if(error.code === error.PERMISSION_DENIED){
            alert('location permission denied.  grant permission to continue')
        }
    })
}

searchBtn.addEventListener('click',getcitycoordinates);
locationBtn.addEventListener('click',getusercoordinates);
cityInput.addEventListener('keyup', e => e.key === 'enter' && getcitycoordinates());
window.addEventListener('load',getusercoordinates);

//https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${api_key}