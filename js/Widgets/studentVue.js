widget = document.getElementById("studentVue-widget");
gradesContainer = document.getElementById("studentVue-grades-container");
attendanceContainer = document.getElementById("studentVue-attendance-container");

const svData = { // For testing purposes only
    0: {
        class: "Example Class 1",
        grades: {
            "MP4": "98.5",
            "Exam": "0.0",
            "Semester 2": "93.5",
            "Final Grade": "89.5",
        },
        attendance: {
            present: "140",
            absent: "10",
            tardy: "16",
            excused: "3"
        }
    },
    1: {
        class: "Example Class 2",
        grades: {
            "MP4": "78.5",
            "Exam": "0.0",
            "Semester 2": "90.5",
            "Final Grade": "85.9",
        },
        attendance: {
            present: "140",
            absent: "403",
            tardy: "160",
            excused: "9"
        }
    },
    2: {
        class: "Example Class 3",
        grades: {
            "MP4": "18.5",
            "Exam": "0.0",
            "Semester 2": "73.5",
            "Final Grade": "89.5",
        },
        attendance: {
            present: "100",
            absent: "13",
            tardy: "12",
            excused: "0"
        }
    },
    3: {
        class: "Example Class 4",
        grades: {
            "Final Grade": "86.0",
        },
        attendance: {
            present: "90",
            absent: "43",
            tardy: "10",
            excused: "2"
        }
    },
};

$( document ).ready(function() {
    populateGrades();
    populateAttendance();
});

async function fetchIntegrationData() {
    var res = await fetch("http://localhost:3000/studentVue");
    var svData = await res.json();

    return svData;
}

function getHTML(path){
    var res;

    jQuery.get(path, function(data) {
        data =  data.toString();
    });
}

async function populateGrades(){
    //var svData = await fetchIntegrationData();
    let gradesContainer = document.getElementById("studentVue-grades-container");

    jQuery.get("Elements/grade-card.html", function(cardHTMLData) {
        jQuery.get("Elements/grade-column.html", function(columnHTMLData) {
            let dataLen = Object.keys(svData).length;
            
            for (let i = 0; i < dataLen; i++){
                let cardHTML = cardHTMLData.toString();

                let classTitle = svData[i].class;
                let classID = classTitle.replaceAll(" ", "");
                let gradeData = svData[i].grades;

                cardHTML = cardHTML.replace("[CLASSID]", classID);
                cardHTML = cardHTML.replace("[CLASSNAME]", classTitle);

                for (g in gradeData){
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

async function populateAttendance(){
    //var svData = await fetchIntegrationData();
    let attendanceContainer = document.getElementById("studentVue-attendance-container");

    jQuery.get("Elements/attendance-column.html", function(cardHTMLData) {
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
            let totalDays = present + parseInt(attendanceData.tardy, 10) + parseInt(attendanceData.absent, 10);
            let percentage = Math.round(present * 1000 / totalDays) / 10

            cardHTML = cardHTML.replace("[PERCENTAGE]", percentage.toString())

            attendanceContainer.innerHTML += cardHTML;
        }
    });
}