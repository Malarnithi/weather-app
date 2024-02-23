import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import icon from './icon.png';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '4a5028bb61b7af195c504989897d1a99';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric', 
        },
      });
      setWeather(response.data);
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          autoComplete='none'
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div className='detail'>
          <img src={icon} width='80px' />
          <h2>{weather.name} - {weather.weather[0].description}</h2>
          <p className='temp'>{weather.main.temp}°C</p>
          <p><span>Humidity:</span> {weather.main.humidity}%</p>
          <p><span>Wind Speed:</span> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
