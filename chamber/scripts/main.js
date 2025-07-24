const weatherData = {
  "location": {
    "name": "London",
    "region": "City of London, Greater London",
    "country": "United Kingdom",
    "lat": 51.52,
    "lon": -0.11,
    "tz_id": "Europe/London",
    "localtime_epoch": 1613896955,
    "localtime": "2021-02-21 8:42"
  },
  "current": {
    "last_updated_epoch": 1613896210,
    "last_updated": "2021-02-21 08:30",
    "temp_c": 11,
    "temp_f": 51.8,
    "is_day": 1,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
      "code": 1003
    },
    "wind_mph": 3.8,
    "humidity": 82,
    "feelslike_f": 49.2
  }
};

// Display it
document.getElementById('weather-current').innerHTML = `
  <h3>Weather for ${weatherData.location.name}</h3>
  <p>Temp: ${weatherData.current.temp_f}°F</p>
  <p>Condition: ${weatherData.current.condition.text}</p>
  <img src="${weatherData.current.condition.icon}" alt="Weather Icon">
`;
// Example: Load members JSON, filter gold/silver, randomly pick 2-3, insert spotlight cards
fetch('data/member.json')
  .then(response => response.json())
  .then(data => {
    const members = data.members; // Now we declare it once from 'data'
    const filtered = members.filter(m => m.membership === 3  || m.membership === 1);
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
    const container = document.getElementById('spotlight-container');

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <h3>${member.name}</h3>
        <p>Membership: ${member.membership}</p>
        
      `;
      container.appendChild(card);
    });
  });

