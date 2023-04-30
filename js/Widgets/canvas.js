function toggleEmailVisibility(email) {
    var overflowMode = "hidden";

    for (let i = 0; i < email.children.length; i++){
        if (email.children[i].className == "canvas-email-body"){
            if (email.children[i].style.visibility == "hidden"){
                email.children[i].style.visibility = "visible";
                overflowMode = "hidden"
                email.style.height = "auto"
            }
            else {
                email.children[i].style.visibility = "hidden";
                overflowMode = "visible"
                email.style.height = "4vw"
            }
        }
        if (email.children[i].className == "canvas-email-overflow-indicator"){
            email.children[i].style.visibility = overflowMode;
        }
    }
}