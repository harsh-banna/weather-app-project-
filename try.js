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
