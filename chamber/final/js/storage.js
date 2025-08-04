export function saveVisitTime() {
  localStorage.setItem("lastVisit", new Date().toISOString());
}

export function getLastVisit() {
  return localStorage.getItem("lastVisit");
}