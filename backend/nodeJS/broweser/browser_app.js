// setup date
const date = (document.getElementById(
  "date"
).innerHTML = new Date().getFullYear());
// setup nav
const navBtn = document.getElementById("nav-btn");
const navbar = document.getElementById("navbar");
const navClose = document.getElementById("nav-close");
// show nav
navBtn.addEventListener("click", () => {
  navbar.classList.add("showNav");
});
// close nav
navClose.addEventListener("click", () => {
  navbar.classList.remove("showNav");
});

// Code for connecting explore button with navbar

// JavaScript for connecting explore button with navbar and smooth scrolling
document.getElementById("explore-button").addEventListener("click", function (e) {
  e.preventDefault();
  const targetSection = document.getElementById("services");

  // Get the navigation bar element
  var navbar = document.getElementById("navbar");

  // Toggle the "showNav" class to show/hide the navigation bar
  navbar.classList.toggle("showNav");

  // Scroll to the "services" section
  targetSection.scrollIntoView({ behavior: "smooth" });
});
