// Renders recent search chips. Each chip can be clicked to reload that
// city, or have its × button clicked to remove it — both actions are
// handled by callbacks passed down from App, since App owns the actual
// recent searches state (and localStorage).
function RecentSearches({ cities, onCityClick, onRemoveClick }) {
  if (cities.length === 0) {
    return null;
  }

  return (
    <section className="recent-searches">
      <h3>Recent Searches</h3>
      <ul>
        {cities.map((city) => {
          const key = `${city.name}-${city.country}`;

          return (
            <li className="recent-item" key={key}>
              <span
                className="recent-city-name"
                onClick={() => onCityClick(city)}
              >
                {city.name}, {city.country}
              </span>
              <button
                className="remove-btn"
                aria-label={`Remove ${city.name} from recent searches`}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveClick(city);
                }}
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default RecentSearches;