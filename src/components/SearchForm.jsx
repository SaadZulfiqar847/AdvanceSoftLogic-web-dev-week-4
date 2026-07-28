import { useState } from 'react';

// A controlled search form. Doesn't know anything about fetching or
// weather data — it just collects a city name and hands it off via
// the onSearch callback passed down from App.
function SearchForm({ onSearch }) {
  const [cityInput, setCityInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = cityInput.trim();
    if (trimmed === '') {
      return;
    }

    onSearch(trimmed);
    setCityInput('');
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city..."
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        autoComplete="off"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;