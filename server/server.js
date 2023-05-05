const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/canvas', async (req, res) => {
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

    res.send(cnvData);
});

app.get('/studentVue', async (req, res) => {
    /* 
    const svData = [
        {class: "College Composition", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
        {class: "AP US Government", grades: {"MP4": "91.3", "Exam 2": "0.0", "Semester 2": "93.8", "Final Grade": "95.2"}, attendance: {present: "79", tardy: "1", absent: "8", excused: "3"}},
        {class: "Hon Multivariable Calculus w/ Linear Algebra", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
        {class: "AP Physics C", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
        {class: "AP Chemistry", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
        {class: "Hon Indpndnt Stdy Cmptr Sci", grades: {"MP4": "87.5", "Exam 2": "0.0", "Semester 2": "91.5", "Final Grade": "94.4"}, attendance: {present: "145", tardy: "7", absent: "25", excused: "9"}},
    ];

    res.send(svData);
    */
    let svPrefix = "va-chesterfield-psv"
    let url = "https://" + svPrefix + ".edupoint.com/PXP2_Login_Student.aspx?regenerateSessionId=True";

    axios(url).then(response => {
        let html = response.data;
        const $ = cheerio.load(html);

        console.log(html);
        return html;
    });
});

app.post('/studentVue', async (req, res) => {
    console.log(req)
});

app.listen(port, () => {
  console.log(`Muraboard app listening on port ${port}`);
});