$( document ).ready(function() {
    populateAssignments();
    populateInbox();
});

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
                email.style.height = "5vw"
            }
        }
        if (email.children[i].className == "canvas-email-overflow-indicator"){
            email.children[i].style.visibility = overflowMode;
        }
    }
}

function apiRefuse(widget){
    jQuery.get("Elements/api-connection-refused.html", function(data) {
        let apiHTML = data.toString();
        widget.innerHTML += apiHTML;
    });
}

async function populateAssignments() {
    let assignmentContainer = document.getElementById("canvas-assignments");
    var apiStatus = 0;
    var cnvData;

    try {
        const response = await fetch("http://localhost:3000/canvas");
        cnvData = await response.json();

        apiStatus = 200;
    }
    catch (e) {
        apiStatus = 204;
        apiRefuse(assignmentContainer);
    }

    if (apiStatus == 200){
        let assignmentData = cnvData.assignments;

        for (let i = 0; i < Object.keys(assignmentData).length; i++){
            let assignment = assignmentData[i];
            jQuery.get("Elements/canvas/canvas-assignment-card.html", function(data) {
                let cardData = data.toString();

                cardData = cardData.replace("[TITLE]", assignment.title);
                cardData = cardData.replace("[CLASS]", assignment.class);
                cardData = cardData.replace("[POINTS]", assignment.points);
                cardData = cardData.replace("[DATE]", assignment.duedate);

                assignmentContainer.innerHTML += cardData;
            });
        }
    }
}

async function populateInbox() {
    let inboxContainer = document.getElementById("canvas-inbox")
    var apiStatus = 0;
    var cnvData;

    try {
        const response = await fetch("http://localhost:3000/canvas");
        cnvData = await response.json();

        apiStatus = 200;
    }
    catch (e) {
        apiStatus = 204;
        apiRefuse(inboxContainer);
    }
    
    if (apiStatus == 200){
        let emailData = cnvData.inbox;

        jQuery.get("Elements/canvas/canvas-inbox-email.html", function(data) {
            for (let i = 0; i < Object.keys(emailData).length; i++) {
                let emailHTML = data.toString();
                
                emailHTML = emailHTML.replace("[DATE]", emailData[i].date);
                emailHTML = emailHTML.replace("[SUBJECT]", emailData[i].subject);
                emailHTML = emailHTML.replace("[SENDER]", emailData[i].sender);
                emailHTML = emailHTML.replace("[RECIPIENT]", emailData[i].recipient);
                emailHTML = emailHTML.replace("[CATEGORY]", emailData[i].category);
                emailHTML = emailHTML.replace("[BODY]", emailData[i].body);

                inboxContainer.innerHTML += emailHTML;
            }
        });
    }
}