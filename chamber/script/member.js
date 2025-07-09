// Populate current year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

document.getElementById("gridBtn").addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
});

document.getElementById("listBtn").addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
});

const container = document.getElementById("membersContainer");

async function getMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Website</a>
      <p class="membership">${getMembershipLevel(member.membership)}</p>
    `;
    container.appendChild(card);
  });
}

function getMembershipLevel(level) {
  return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
}

getMembers();