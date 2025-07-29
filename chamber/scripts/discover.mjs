import { places } from './places.mjs';

const container = document.querySelector('#card-container');

places.forEach(place => {
  const card = document.createElement('div');
  card.classList.add('place-card');

  // Support both `photo_url` and `imageUrl` keys
  const imageSrc = place.imageUrl || place.photo_url;

  card.innerHTML = `
    <img src="${imageSrc}" alt="Photo of ${place.name}">
    <h2>${place.name}</h2>
    <p><strong>Address:</strong> ${place.address}</p>
    <p><strong>Cost:</strong> ${
      typeof place.cost === 'object'
        ? `Adult: ${place.cost.adult}, Child: ${place.cost.child}`
        : place.cost
    }</p>
    <p>${place.description}</p>
    ${place.url ? `<a href="${place.url}" target="_blank">Visit Website</a>` : ''}
  `;

  container.appendChild(card);
});