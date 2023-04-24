widget = document.getElementById("studentVue-widget");
gradesContainer = document.getElementById("studentVue-grades-container");
attendanceContainer = document.getElementById("studentVue-attendance-container");

$( document ).ready(function() {
    addGradeColumn();
});

function addGradeColumn(){
    var columnHTML;
    jQuery.get("js/Widgets/WidgetHTML/studentVue/grade-card.html", function(data) {
        columnHTML = data.toString();
    });

    gradesContainer.innerHTML += columnHTML;
    alert("done?");
}