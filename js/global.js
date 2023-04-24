var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

navbar = document.getElementById("navbar");
menuButton = document.getElementById("menu-button-container")

homeButton = document.getElementById("home");
dashboardButton = document.getElementById("dashboard");
calendarButton = document.getElementById("calendar");
integrationsButton = document.getElementById("integrations");
aboutButton = document.getElementById("about");
helpButton = document.getElementById("help");

menuButton.addEventListener("mouseenter", openNavBar);
navbar.addEventListener("mouseleave", closeNavBar);

homeButton.addEventListener("click", function(){ window.open(href="home.html", target="_self") });
dashboardButton.addEventListener("click", function(){ window.open(href="dashboard.html", target="_self") });
calendarButton.addEventListener("click", function(){ window.open(href="calendar.html", target="_self") });
integrationsButton.addEventListener("click", function(){ window.open(href="integrations.html", target="_self") });
aboutButton.addEventListener("click", function(){ window.open(href="about.html", target="_self") });
helpButton.addEventListener("click", function(){ window.open(href="help.html", target="_self") });

function openNavBar() {
    navbar.style.left = "0em";
    menuButton.style.rotate = "90deg"
}

function closeNavBar() {
    navbar.style.left = "-15em";
    menuButton.style.rotate = "0deg"
}