const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

svLogin("USERNAME","PASSWORD");
async function svLogin(user, pass) {
    
    //Getting grade data
    var svData = {grades: {}, attendance: {}}

    let svPrefix = "va-chesterfield-psv"
    let url = "https://" + svPrefix + ".edupoint.com/PXP2_Login_Student.aspx?regenerateSessionId=True";

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    //Go to studentVue, wait for page load
    await page.goto(url)
    await page.waitForSelector('#ctl00_MainContent_Submit1');

    await page.type("#ctl00_MainContent_username", user);
    await page.type("#ctl00_MainContent_password", pass);

    //Login
    await page.click('#ctl00_MainContent_Submit1');

    //Open grade book
    await page.waitForSelector('[data-desc="Grade Book"]');
    const hrefs1 = await page.evaluate(
        () => Array.from(
          document.querySelectorAll('[data-desc="Grade Book"]'),
          a => a.getAttribute('href')
        )
    );
    await page.goto("https://" + svPrefix + ".edupoint.com/" + hrefs1[0]);

    //Injected code to retrieve grade data
    await page.waitForSelector("#ctl00_ctl00_MainContent_PXPMainContent_repSchoolClasses_ctl01_ctl00_SchoolClassesPanel");
    var gradeResult = await page.evaluate(() => {
        let wrapperChildren = document.getElementById("ctl00_ctl00_MainContent_PXPMainContent_repSchoolClasses_ctl01_ctl00_SchoolClassesPanel").children;
        let gradeContainer = wrapperChildren[1].children[1];
        var classTitle = "";
        var gradeData = {};
        var currentGrades = {};

        for (let i = 0; i < gradeContainer.children.length; i++){
            if (gradeContainer.children[i].className == "row gb-class-header gb-class-row flexbox horizontal") {
                gradeData[classTitle] = currentGrades;

                currentGrades = {};
                classTitle = gradeContainer.children[i].querySelector(".course-title").innerHTML;
            }
            else if (gradeContainer.children[i].className == "row gb-class-row") {
                let category = gradeContainer.children[i].children[0].children[0].children[1].children[0].innerHTML;
                let score = gradeContainer.children[i].children[0].children[1].children[1].innerHTML
                currentGrades[category] = score;
            }
        }
        gradeData[classTitle] = currentGrades;

        return gradeData;
    });

    delete gradeResult[''];
    svData.grades = gradeResult;

    //Getting attendance data
    await page.goto("https://" + svPrefix + ".edupoint.com/PXP2_Attendance.aspx?AGU=0");
    await page.waitForSelector(".segment");


    let rows = await page.$$(".row");
    for (let j = 0; j < rows.length; j++){
        await rows[j].click();

        let attData = await page.evaluate(() => {
            let wrapper = document.querySelector('.table-striped');
            let container = wrapper.children[7];
            let textElements = container.children;
    
            var data = []
            for (let i = 2; i < textElements.length; i++){
                data.push(textElements[i].innerHTML);
            }
    
            return data
        });
    
        console.log(attData)
    }
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }