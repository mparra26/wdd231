document.addEventListener('DOMContentLoaded', () => {
  loadWeather();
  loadSpotlights();
});

// Constants
const chamberLat = 29.9668;  // example coordinates for Timbuktu or your chamber city
const chamberLon = -5.5434;
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // replace with your key

async function loadWeather() {
  try {
    // Call OpenWeatherMap One Call API (requires paid for forecast? Use free 5 day forecast API alternatively)
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${chamberLat}&lon=${chamberLon}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${chamberLat}&lon=${chamberLon}&units=imperial&appid=${apiKey}`;

    const currentResp = await fetch(currentWeatherUrl);
    const currentData = await currentResp.json();

    const forecastResp = await fetch(forecastUrl);
    const forecastData = await forecastResp.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);

  } catch (error) {
    document.getElementById('weather-current').textContent = 'Failed to load weather data.';
    console.error('Weather load error:', error);
  }
}

function displayCurrentWeather(data) {
  const container = document.getElementById('weather-current');
  container.innerHTML = `
    <p><strong>Temperature:</strong> ${data.main.temp} °F</p>
    <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
  `;
}

function displayForecast(data) {
  // The forecast API returns data every 3 hours for 5 days. Extract daily noon temps for next 3 days.
  const container = document.getElementById('weather-forecast');
  container.innerHTML = ''; // clear

  // Extract unique days
  const forecastByDay = {};

  data.list.forEach(entry => {
    const date = new Date(entry.dt * 1000);
    const dayStr = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    if (!forecastByDay[dayStr] && date.getHours() === 12) {
      forecastByDay[dayStr] = entry.main.temp;
    }
  });

  // Get first 3 days
  let count = 0;
  for (const [day, temp] of Object.entries(forecastByDay)) {
    if (count >= 3) break;

    const div = document.createElement('div');
    div.textContent = `${day}: ${temp} °F`;
    container.appendChild(div);
    count++;
  }
}

async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();

    // Filter gold or silver members
    const filteredMembers = data.members.filter(m => m.membership === 1 || m.membership === 2);

    // Shuffle array and pick 3 random spotlights
    const shuffled = filteredMembers.sort(() => 0.5 - Math.random());
    const spotlights = shuffled.slice(0, 3);

    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    spotlights.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} logo" />
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <p><strong>Membership:</strong> ${membershipText(member.membership)}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Spotlights load error:', error);
  }
}

function membershipText(level) {
  switch(level) {
    case 1: return 'Gold';
    case 2: return 'Silver';
    default: return 'Member';
  }
}