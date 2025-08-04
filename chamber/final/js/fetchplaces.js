import { openModal } from './modal.js';

async function loadPlaces() {
  try {
    const res = await fetch('data/places.json');
    const places = await res.json();

    const container = document.getElementById('places-list');
    if (!container) return;

    places.forEach(place => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${place.image}" alt="${place.name}" loading="lazy">
        <h3>${place.name}</h3>
        <p>${place.location}</p>
        <button class="details-btn">More Info</button>
      `;
      card.querySelector('.details-btn').addEventListener('click', () => openModal(place));
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load places:", err);
  }
}

loadPlaces();