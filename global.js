navbar = document.getElementById("navbar");
menuButton = document.getElementById("menu-button-container")

menuButton.addEventListener("mouseenter", openNavBar);
navbar.addEventListener("mouseleave", closeNavBar);

function openNavBar() {
    navbar.style.left = "0em";
    menuButton.style.rotate = "90deg"
}

function closeNavBar() {
    navbar.style.left = "-15em";
    menuButton.style.rotate = "0deg"
}