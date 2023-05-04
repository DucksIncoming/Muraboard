let widget = document.getElementById("studentVue-widget");
let gradesContainer = document.getElementById("studentVue-grades-container");
let attendanceContainer = document.getElementById("studentVue-attendance-container");

function apiRefuse(widget){
    jQuery.get("Elements/api-connection-refused.html", function(data) {
        let apiHTML = data.toString();
        widget.innerHTML += apiHTML;
    });
}

$( document ).ready(function() {
    populateGrades();
    populateAttendance();
});

async function populateGrades(){
    var apiStatus = 0;
    var svData;

    try {
        const response = await fetch("http://localhost:3000/studentVue");
        svData = await response.json();
        apiStatus = 200;
    }
    catch (e) {
        apiStatus = 204;

        let gradesContainer = document.getElementById("studentVue-grades-container");
        apiRefuse(gradesContainer);
    }
    
    if (apiStatus == 200){
        let gradesContainer = document.getElementById("studentVue-grades-container");

        jQuery.get("Elements/studentVue/grade-card.html", function(cardHTMLData) {
            jQuery.get("Elements/studentVue/grade-column.html", function(columnHTMLData) {
                let dataLen = Object.keys(svData).length;
                
                for (let i = 0; i < dataLen; i++){
                    let cardHTML = cardHTMLData.toString();

                    let classTitle = svData[i].class;
                    let classID = classTitle.replaceAll(" ", "");
                    let gradeData = svData[i].grades;

                    cardHTML = cardHTML.replace("[CLASSID]", classID);
                    cardHTML = cardHTML.replace("[CLASSNAME]", classTitle);

                    for (let g in gradeData){
                        let columnHTML = columnHTMLData.toString();
                        columnHTML = columnHTML.replace("[CATEGORY]", g);
                        columnHTML = columnHTML.replace("[SCORE]", gradeData[g]);

                        cardHTML += columnHTML;
                    }

                    cardHTML += "</div>";
                    gradesContainer.innerHTML += cardHTML;
                }
            });
        });
    }
}

async function populateAttendance(){
    var apiStatus = 0;
    var svData;
    
    try {
        const response = await fetch("http://localhost:3000/studentVue");
        svData = await response.json();
        apiStatus = 200;
    }
    catch (e){
        apiStatus = 204;

        let attendanceContainer = document.getElementById("studentVue-attendance-container");
        apiRefuse(attendanceContainer);
    }
    if (apiStatus == 200){
        let attendanceContainer = document.getElementById("studentVue-attendance-container");

        jQuery.get("Elements/studentVue/attendance-column.html", function(cardHTMLData) {
            let dataLen = Object.keys(svData).length;
            
            for (let i = 0; i < dataLen; i++){
                let cardHTML = cardHTMLData.toString();

                let classTitle = svData[i].class;
                let classID = classTitle.replaceAll(" ", "");
                let attendanceData = svData[i].attendance;

                cardHTML = cardHTML.replace("[CLASSID]", classID);
                cardHTML = cardHTML.replace("[CLASSNAME]", classTitle);

                cardHTML = cardHTML.replace("[ABS#]", attendanceData.absent);
                cardHTML = cardHTML.replace("[TAR#]", attendanceData.tardy);
                cardHTML = cardHTML.replace("[EXC#]", attendanceData.excused);

                let present = parseInt(attendanceData.present, 10);
                let tardies = parseInt(attendanceData.tardy, 10);
                let absences = parseInt(attendanceData.absent, 10);

                let totalDays = present + tardies + absences;
                let absentPercentage = Math.round(100 - (absences / totalDays * 100))
                let tardyPercentage = Math.round(100 - (tardies / totalDays * 100 + (100 - absentPercentage)))
                let percentage = Math.round(present * 1000 / totalDays) / 10

                cardHTML = cardHTML.replace("[PERCENTAGE]", percentage.toString())
                cardHTML = cardHTML.replaceAll("[TAR%]", tardyPercentage);
                cardHTML = cardHTML.replaceAll("[ABS%]", absentPercentage);

                attendanceContainer.innerHTML += cardHTML;
            }
        });
    }
}