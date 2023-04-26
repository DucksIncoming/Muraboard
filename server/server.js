const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/studentVue', async (req, res) => {
    const svData = [
        {class: "College Composition", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
        {class: "AP US Government", grades: {"MP4": "91.3", "Exam 2": "0.0", "Semester 2": "93.8", "Final Grade": "95.2"}, attendance: {present: "79", tardy: "1", absent: "8", excused: "3"}},
        {class: "Hon Multivariable Calculus w/ Linear Algebra", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
        {class: "AP Physics C", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
        {class: "AP Chemistry", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
        {class: "Hon Indpndnt Stdy Cmptr Sci", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
    ];

    res.send(svData);
});

app.post('/studentVue', async (req, res) => {
    console.log(req)
});

app.listen(port, () => {
  console.log(`Muraboard app listening on port ${port}`);
});