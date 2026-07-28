// Base URLs for the two Open-Meteo endpoints we need
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// Looks up a city name and returns its coordinates and display name.
// Throws an error if the city can't be found, so the caller can show a message.
export async function getCoordinates(cityName) {
    const params = new URLSearchParams({
        name: cityName,
        count: 1,
        language: 'en',
        format: 'json'
    });

    const response = await fetch(`${GEOCODING_URL}?${params}`);

    if (!response.ok) {
        throw new Error('Something went wrong while searching for that city.');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`No results found for "${cityName}".`);
    }

    const place = data.results[0];

    return {
        name: place.name,
        country: place.country,
        latitude: place.latitude,
        longitude: place.longitude
    };
}

// Fetches current weather and a short daily forecast for the given coordinates.
export async function getWeather(latitude, longitude) {
    const params = new URLSearchParams({
        latitude,
        longitude,
        current: 'temperature_2m,wind_speed_10m,weather_code',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code',
        timezone: 'auto'
    });

    const response = await fetch(`${WEATHER_URL}?${params}`);

    if (!response.ok) {
        throw new Error('Could not fetch weather data right now.');
    }

    return response.json();
}

// Maps Open-Meteo's numeric weather codes to a short human-readable label.
export const WEATHER_CODES = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Snow',
    80: 'Rain showers',
    95: 'Thunderstorm'
};

// Simple icon per weather code, grouped roughly by condition category.
export const WEATHER_ICONS = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️',
    61: '🌦️', 63: '🌧️', 65: '🌧️',
    71: '❄️',
    80: '🌦️',
    95: '⛈️'
};