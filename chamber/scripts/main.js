fetch('Charlotte Weather on Weather.com.')
  .then(response => response.json())
  .then(data => {
    document.getElementById('weather-current').textContent = `Temp: ${data.current.temp}°F, ${data.current.weather[0].description}`;
    // build and insert 3-day forecast similarly
  });

// Example: Load members JSON, filter gold/silver, randomly pick 2-3, insert spotlight cards
fetch('member.json')
  .then(response => response.json())
  .then(members => {
    const filtered = members.filter(m => m.membership === 'gold' || m.membership === 'silver');
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
    const container = document.getElementById('spotlight-container');
    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <h3>${member.name}</h3>
        <p>Membership: ${member.membership}</p>
        <img src="${member.photo}" alt="Photo of ${member.name}">
      `;
      container.appendChild(card);
    });
  });