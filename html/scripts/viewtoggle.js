const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("article");

// Set default view on page load (optional)
display.classList.add("grid"); // default to grid view

// Single handler function to toggle views
function toggleView(view) {
  display.classList.toggle("grid", view === "grid");
  display.classList.toggle("list", view === "list");
}

gridButton.addEventListener("click", () => toggleView("grid"));
listButton.addEventListener("click", () => toggleView("list"));