const cnvData = {
    inbox: {
        0: {
            subject: "Example subject",
            sender: "Sender",
            recipient: "Recipient",
            category: "AP US Gov",
            date: "April 28, 2023 at 2:43pm",
            body: "What the scallop. what the SCALLOP! god DAMN it what the SCALLOP BRO"
        },
        1: {
            subject: "Another example subject",
            sender: "Sender2",
            recipient: "Recipient2",
            category: "AP Chemistry",
            date: "May 18, 2023 at 5:12pm",
            body: "Boy what the hell boy boy what the boy"
        }
    },
    assignments: {
        0: {
            title: "Assignment Name 1",
            class: "Class title",
            points: "25",
            duedate: "May 4 at 11pm"
        },
        1: {
            title: "Assignment Name 2",
            class: "Class title",
            points: "50",
            duedate: "May 21 at 11pm"
        },
        2: {
            title: "Assignment Name 3",
            class: "Class title",
            points: "10",
            duedate: "Jun 6 at 11pm"
        }
    }
}

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

function populateAssignments() {
    let assignmentData = cnvData.assignments;
    let assignmentContainer = document.getElementById("canvas-assignments");

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

function populateInbox() {
    let inboxContainer = document.getElementById("canvas-inbox")

    jQuery.get("Elements/canvas/canvas-inbox-email.html", function(data) {
        let emailData = cnvData.inbox;

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