// Renders a row of forecast day cards. Receives the daily forecast
// object straight from the Open-Meteo response shape and a unit
// string so it can convert temperatures independently of WeatherResult.
function ForecastList({ daily, unit }) {
  return (
    <div className="forecast">
      {daily.time.map((dateString, index) => {
        const date = new Date(dateString);
        const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });

        const maxTemp = unit === 'celsius'
          ? Math.round(daily.temperature_2m_max[index])
          : celsiusToFahrenheit(daily.temperature_2m_max[index]);

        const minTemp = unit === 'celsius'
          ? Math.round(daily.temperature_2m_min[index])
          : celsiusToFahrenheit(daily.temperature_2m_min[index]);

        return (
          <div className="forecast-day" key={dateString}>
            <p>{dayLabel}</p>
            <p>{maxTemp}° / {minTemp}°</p>
          </div>
        );
      })}
    </div>
  );
}

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

export default ForecastList;