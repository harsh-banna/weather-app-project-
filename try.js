// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const API_KEY = '72d4bdcd7e383254f0b2bdb6ad5e9ba7';
const CITY_NAME = 'ajmer'; // Replace with the desired city name

// Construct the API URL for hourly forecast
const HOURLY_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;

// Fetch hourly forecast data
fetch(HOURLY_API_URL)
  .then((response) => response.json())
  .then((data) => {
    // Extract and display hourly forecast data (similar to your existing code)
    const hourlyForecast = data.list;
    console.log('Hourly Forecast:');
    hourlyForecast.forEach((hour) => {
      const time = new Date(hour.dt * 1000).toLocaleTimeString();
      const temperature = hour.main.temp;
      console.log(`${time}: ${temperature}°C`);
    });

    // Now let's process the five-day forecast
    const uniqueForecastDays = new Set();
    const fiveDayForecast = [];

    // Filter data to include only one entry per day
    hourlyForecast.forEach((hour) => {
      const date = new Date(hour.dt * 1000);
      const day = date.getDate();
      if (!uniqueForecastDays.has(day)) {
        uniqueForecastDays.add(day);
        fiveDayForecast.push(hour);
      }
    });

    console.log('Five-Day Forecast:');
    fiveDayForecast.forEach((day) => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      const temperature = day.main.temp;
      console.log(`${date}: ${temperature}°C`);
    });
  })
  .catch((error) => {
    console.error('Error fetching forecast:', error);
  });


//

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

        //





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