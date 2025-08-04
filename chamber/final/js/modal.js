export function openModal(place) {
  const modal = document.getElementById("modal");
  const details = document.getElementById("modal-details");
  modal.classList.remove("hidden");

  details.innerHTML = `
    <h2>${place.name}</h2>
    <img src="${place.image}" alt="${place.name}" loading="lazy" />
    <p><strong>Location:</strong> ${place.location}</p>
    <p><strong>Type:</strong> ${place.type}</p>
    <p>${place.description}</p>
    <p><strong>Rating:</strong> ${place.rating}/5</p>
  `;
}

document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});