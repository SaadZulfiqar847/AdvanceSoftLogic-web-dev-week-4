import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchForm from './components/SearchForm';
import WeatherResult from './components/WeatherResult';
import ForecastList from './components/ForecastList';
import RecentSearches from './components/RecentSearches';
import './App.css';

const STORAGE_KEY = 'recentSearches';
const MAX_RECENT = 5;

function App() {
  const [searchedCity, setSearchedCity] = useState('');
  const [unit, setUnit] = useState('celsius');
  const [recentSearches, setRecentSearches] = useState(() => {
    // Lazy initializer: this function only runs once, on first render,
    // instead of reading localStorage on every re-render.
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const { location, weatherData, loading, error } = useWeather(searchedCity);

  // Whenever a search successfully resolves to a new location, save it
  // to recent searches. This runs as a side effect of `location` changing,
  // rather than being called manually inside handleSearch, since location
  // only becomes available once useWeather's fetch actually succeeds.
  useEffect(() => {
    if (!location) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (city) => city.name !== location.name || city.country !== location.country
      );
      const updated = [location, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [location]);

  function handleSearch(cityName) {
    setSearchedCity(cityName);
  }

  function handleToggleUnit() {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }

  function handleRemoveRecent(cityToRemove) {
    setRecentSearches((prev) => {
      const updated = prev.filter(
        (city) => city.name !== cityToRemove.name || city.country !== cityToRemove.country
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <p className="tagline">A quiet read on the sky, wherever you're looking.</p>
      </header>

      <main>
        <SearchForm onSearch={handleSearch} />

        {loading && (
          <section className="loading-state">
            <div className="spinner"></div>
            <p>Reading the sky...</p>
          </section>
        )}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && weatherData && location && (
          <>
            <WeatherResult
              location={location}
              weatherData={weatherData}
              unit={unit}
              onToggleUnit={handleToggleUnit}
            />
            <ForecastList daily={weatherData.daily} unit={unit} />
          </>
        )}

        {!loading && !error && !weatherData && searchedCity === '' && (
          <p className="empty-state">Search a city to see its weather.</p>
        )}

        <RecentSearches
          cities={recentSearches}
          onCityClick={(city) => handleSearch(city.name)}
          onRemoveClick={handleRemoveRecent}
        />
      </main>
    </div>
  );
}

export default App;