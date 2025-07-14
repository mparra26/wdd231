const courses = [
  { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, completed: true },
  { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, completed: true },
  { code: 'WDD 231', name: 'Front-end Web Dev I', credits: 2, completed: false },
  { code: 'CSE 110', name: 'Programming Basics', credits: 2, completed: true },
  { code: 'CSE 111', name: 'Programming with Functions', credits: 2, completed: true },
  { code: 'CSE 210', name: 'Programming with Classes', credits: 2, completed: true },
  // Add all course objects
];

function renderCourses(filteredCourses) {
  const container = document.getElementById('courseContainer');
  const creditTotal = document.getElementById('creditTotal');
  container.innerHTML = '';
  let total = 0;

  filteredCourses.forEach(course => {
    const card = document.createElement('div');
    card.className = `course ${course.completed ? 'completed' : 'incomplete'}`;
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>Credits: ${course.credits}</p>`;
    container.appendChild(card);
    total += course.credits;
  });

  creditTotal.textContent = total;
}

document.getElementById('allBtn').addEventListener('click', () => renderCourses(courses));
document.getElementById('wddBtn').addEventListener('click', () =>
  renderCourses(courses.filter(c => c.code.includes('WDD')))
);
document.getElementById('cseBtn').addEventListener('click', () =>
  renderCourses(courses.filter(c => c.code.includes('CSE')))
);

window.addEventListener('DOMContentLoaded', () => renderCourses(courses));