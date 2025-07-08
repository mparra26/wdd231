const membersContainer = document.getElementById('membersContainer');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error('Failed to fetch members');
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.textContent = 'Error loading members.';
    console.error(error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" />
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${getMembershipLevelName(member.membershipLevel)}</p>
      <p>${member.notes || ''}</p>
    `;
    membersContainer.appendChild(card);
  });
}

function getMembershipLevelName(level) {
  switch (level) {
    case 1: return 'Member';
    case 2: return 'Silver';
    case 3: return 'Gold';
    default: return 'Unknown';
  }
}

function setGridView() {
  membersContainer.classList.add('grid-view');
  membersContainer.classList.remove('list-view');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
}

function setListView() {
  membersContainer.classList.add('list-view');
  membersContainer.classList.remove('grid-view');
  gridBtn.setAttribute('aria-pressed', 'false');
  listBtn.setAttribute('aria-pressed', 'true');
}

gridBtn.addEventListener('click', () => {
  setGridView();
});

listBtn.addEventListener('click', () => {
  setListView();
});

// Footer date scripts
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initial load
fetchMembers();
setGridView();