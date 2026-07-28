import { WEATHER_CODES, WEATHER_ICONS } from '../api/weatherApi';

// Displays current conditions for one location. Receives everything
// it needs via props — it has no idea where the data came from or
// how it was fetched.
function WeatherResult({ location, weatherData, unit, onToggleUnit }) {
  const rawTemp = weatherData.current.temperature_2m;
  const displayTemp = unit === 'celsius' ? Math.round(rawTemp) : celsiusToFahrenheit(rawTemp);
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';
  const weatherCode = weatherData.current.weather_code;

  return (
    <section className="weather-result">
      <button className="unit-toggle" onClick={onToggleUnit}>
        Switch to {unit === 'celsius' ? '°F' : '°C'}
      </button>

      <span className="weather-icon">{WEATHER_ICONS[weatherCode] || '🌡️'}</span>
      <h2>{location.name}, {location.country}</h2>
      <p className="temperature-readout">{displayTemp}{unitSymbol}</p>
      <p className="conditions-label">{WEATHER_CODES[weatherCode] || 'Unknown'}</p>
      <p className="wind-readout">Wind: {weatherData.current.wind_speed_10m} km/h</p>
    </section>
  );
}

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

export default WeatherResult;