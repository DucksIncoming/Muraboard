const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const studentVue = require('./server-studentVue.js')

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
    
});

app.post('/studentVue', async (req, res) => {
    console.log(req)
});

app.listen(port, () => {
  console.log(`Muraboard app listening on port ${port}`);
});