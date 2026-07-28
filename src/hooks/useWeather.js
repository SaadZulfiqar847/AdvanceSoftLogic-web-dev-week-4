import { useState, useEffect } from 'react';
import { getCoordinates, getWeather } from '../api/weatherApi';

// Custom hook that fetches weather data for a given city name.
// Re-runs automatically whenever `city` changes.
// Returns { location, weatherData, loading, error } so components
// can render the right UI state without knowing how the fetch works.
export function useWeather(city) {
    const [location, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If there's no city yet (e.g. on first load before any search),
        // don't fetch anything — just reset to a clean empty state.
        if (!city) {
            setLocation(null);
            setWeatherData(null);
            setError(null);
            return;
        }

        // This flag prevents a race condition: if the user searches a new
        // city before the previous fetch finishes, we don't want the OLD
        // request's result overwriting the NEW request's result once it
        // arrives late.
        let cancelled = false;

        async function fetchWeather() {
            setLoading(true);
            setError(null);

            try {
                const loc = await getCoordinates(city);
                const weather = await getWeather(loc.latitude, loc.longitude);

                if (!cancelled) {
                    setLocation(loc);
                    setWeatherData(weather);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                    setLocation(null);
                    setWeatherData(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchWeather();

        // Cleanup function: React runs this before the effect re-runs
        // (i.e. right before fetching a NEW city), marking the old
        // request as cancelled so its result gets ignored if it arrives late.
        return () => {
            cancelled = true;
        };
    }, [city]); // re-run this effect only when `city` changes

    return { location, weatherData, loading, error };
}