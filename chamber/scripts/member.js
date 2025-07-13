
const container = document.getElementById("membersContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p class="membership">Level: ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
      <p>${member.description}</p>
    `;
    container.appendChild(card);
  });
}

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

getMembers();