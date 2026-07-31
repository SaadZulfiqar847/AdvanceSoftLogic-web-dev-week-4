# React Weather Dashboard

A weather dashboard rebuilt from a Week 3 vanilla JavaScript project into a React application, using functional components, hooks, and a custom `useWeather` hook for data fetching — built with Vite.

## 📋 Project Overview

This project demonstrates core React concepts:
- Component-based architecture with props and composition
- Local and lifted state using `useState`
- Data fetching and side effects using `useEffect`
- A custom hook (`useWeather`) encapsulating fetch logic and loading/error state
- Controlled form inputs
- Declarative UI states (loading, success, empty, error)
- List rendering with `.map()` and stable keys

## 🛠️ Built With

- React (functional components + hooks)
- Vite
- [Open-Meteo](https://open-meteo.com/) — free geocoding and weather API, no key required

## 📁 Project Structure

week-4-react-dashboard/
├── src/
│ ├── components/
│ │ ├── SearchForm.jsx — controlled search input
│ │ ├── WeatherResult.jsx — displays current conditions
│ │ ├── ForecastList.jsx — renders forecast days via .map()
│ │ └── RecentSearches.jsx — recent search chips, reload/remove
│ ├── hooks/
│ │ └── useWeather.js — custom hook wrapping fetch + state
│ ├── api/
│ │ └── weatherApi.js — pure data-fetching functions
│ ├── App.jsx — owns lifted state, composes components
│ ├── App.css
│ ├── index.css
│ └── main.jsx
├── index.html
└── README.md


## 🚀 Setup & Usage

1. Clone this repository: git clone https://github.com/SaadZulfiqar847/AdvanceSoftLogic-web-dev-week-4.git

2. Navigate into the project folder: cd AdvanceSoftLogic-web-dev-week-4

3. Install dependencies: npm install

4. Start the dev server: npm run dev


5. Open the URL shown in the terminal (usually `http://localhost:5173`).

## 🏗️ Architecture Notes

- **State ownership:** `App.jsx` owns all shared state (`searchedCity`, `unit`, `recentSearches`) since multiple components need to read or trigger changes to it. Each component only holds local state it doesn't need to share (e.g. `SearchForm`'s in-progress input text).
- **Data flow:** props flow down from `App` to child components; callbacks (`onSearch`, `onToggleUnit`, `onCityClick`, `onRemoveClick`) flow back up so children can trigger state changes without owning that state themselves.
- **Custom hook:** `useWeather(city)` re-runs its fetch automatically whenever `city` changes, using a cleanup function to guard against race conditions if a new search starts before a previous one resolves.
- **Persistence:** recent searches are saved to `localStorage` whenever a search successfully resolves to a location, and read back using a lazy `useState` initializer on first render.

## ✨ Features

- City search with controlled input
- Current conditions: temperature, condition label, icon, wind speed
- 7-day forecast rendered via `.map()`
- Celsius/Fahrenheit toggle (client-side conversion, no extra fetch)
- Recent searches (last 5), clickable to reload, individually removable
- Animated loading state (sun + drifting cloud, GPU-accelerated)
- Declarative loading / error / empty / success states

## ⚠️ Known Limitations

- Weather icons are mapped from a partial list of Open-Meteo's weather codes; uncommon codes fall back to a generic icon
- No client-side caching — switching back to a previously searched city triggers a fresh fetch rather than reusing prior data

## 👤 Author

Saad Zulfiqar — [GitHub](https://github.com/SaadZulfiqar847)


