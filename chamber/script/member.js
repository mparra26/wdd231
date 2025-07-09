// Get container and buttons early
const container = document.getElementById("membersContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// View toggle button event listeners
gridBtn.addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
  gridBtn.setAttribute("aria-pressed", "false");
  listBtn.setAttribute("aria-pressed", "true");
});

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    container.innerHTML = `<p>Sorry, we couldn't load the members at this time.</p>`;
    console.error("Fetch error:", error);
  }
}

function displayMembers(members) {
  container.innerHTML = ''; // Clear existing

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}" loading="lazy" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Website</a>
      <p class="membership">${getMembershipLevel(member.membership)}</p>
    `;

    container.appendChild(card);
  });
}

function getMembershipLevel(level) {
  return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
}

// Initialize
getMembers();