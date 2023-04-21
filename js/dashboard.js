var reminders_newReminder_addTagButton = document.getElementById("new-reminder-addtag-button");
var reminders_newReminder_tagSelector = document.getElementById("new-reminder-tag-selector");
var reminders_newReminder = document.getElementById("new-reminder-box")
var reminders_newReminder_tagSelector_tags = reminders_newReminder_tagSelector.childNodes;
var screenDarken = document.getElementById("screen-darken");
var reminders_newReminder_addReminderButton = document.getElementById("new-reminder-create-button");
var reminders_newReminder_tagDeleteButtons = document.getElementsByClassName("new-reminder-tag-delete");

reminders_newReminder_addTagButton.addEventListener("click", toggleTagSelector);
reminders_newReminder_addReminderButton.addEventListener("click", packageReminder)

var fr = new FileReader();

function toggleTagSelector(){
    if (reminders_newReminder_tagSelector.style.visibility == "visible") {
        reminders_newReminder_tagSelector.style.visibility = "hidden";
    }
    else {
        reminders_newReminder_tagSelector.style.visibility = "visible";
    }
}

function addFirstHTML(html, parentId){
    let parent = document.getElementById(parentId);
    parent.innerHTML = html + parent.innerHTML;
}

function insertHTML(html, parentId){
    let parent = document.getElementById(parentId);
    parent.innerHTML += html;
}

function packageReminder() {
    var reminderTitle = document.getElementById("new-reminder-name");
    var reminderDesc = document.getElementById("new-reminder-description");
    var reminderDate = document.getElementById("new-reminder-datetime");
    var reminderResource = document.getElementById("new-reminder-links");

    reminderTagsElms = document.getElementById("new-reminder-selected-tags");
    reminderTagsElms = reminderTagsElms.children;
    let rTags = []

    for (let i=0; i<reminderTagsElms.length; i++){
        rTags.push(reminderTagsElms[i].innerText.split("\n")[1]);
    }

    storeReminder(reminderTitle.value, reminderDesc.value, reminderDate.valueAsDate, reminderResource.value, rTags);
    closeNewReminder();
}

function storeReminder(title, desc, date, resources, tags){
    let reminderHTML = '<div class="reminder-card" id=[TITLE]> <p class="reminder-card-title">[TITLE]</p> <p class="reminder-card-description">[DESCRIPTION]</p> <p class="reminder-card-resource">[RESOURCES]</p> <p class="reminder-card-date">[DATE]</p> <p class="reminder-card-timeleft">[REMAINING]</p> <input type="image" src="Assets/Images/edit_icon.png" class="reminder-card-edit" alt="" /> <input type="image" src="Assets/Images/checkbox_icon.png" class="reminder-card-check" alt="" /> <input type="image" src="Assets/Images/trash_icon.png" class="reminder-card-trash" alt="" /> </div>'
    reminderHTML = reminderHTML.replaceAll("[TITLE]", title);
    reminderHTML = reminderHTML.replace("[DESCRIPTION]", desc);
    reminderHTML = reminderHTML.replace("[DATE]", formatDate(date));

    let today = new Date();

    reminderHTML = reminderHTML.replace("[REMAINING]", daysRemaining(today, date).toString() + " days")
    reminderHTML = reminderHTML.replace("[RESOURCES]", resources);
    insertHTML(reminderHTML, "reminders");

    let tagHTML = '<div class="reminder-card-tag" style="background-color:[COLOR]">[TAGNAME]</div>'
    
    for (let i=0; i<tags.length; i++){
        thisTag = tagHTML.replace("[TAGNAME]", tags[i]);
        thisTag = thisTag.replace("[COLOR]", "yellowgreen");
        addFirstHTML(thisTag, title);
    }
}

function selectNewReminderTag(tagName) {
    reminders_newReminder_tagSelector.style.visibility = "hidden";
    tagHTML = '<div style="background-color:[COLOR]" class="new-reminder-tag"><button class="new-reminder-tag-delete" onclick="return this.parentNode.remove();">X</button>[TAGNAME]</div>';
    tagHTML = tagHTML.replace("[TAGNAME]", tagName);
    tagHTML = tagHTML.replace("[COLOR]", getTagColor(tagName));

    insertHTML(tagHTML, "new-reminder-selected-tags")
}

function closeNewReminder() {
    reminders_newReminder.style.visibility = "hidden";
    screenDarken.style.visibility = "hidden";
}

function createNewReminder() {
    reminders_newReminder.style.visibility = "visible";
    screenDarken.style.visibility = "visible";
}

function formatDate(date) {
    date.setDate(date.getDate() + 1);
    intToDay = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    intToMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return intToDay[date.getDay()] + ", " + intToMonth[date.getMonth()] + " " + date.getDate();
}

function daysRemaining(date1, date2) {
    let dayLength = 1000 * 60 * 60 * 24;
    let differenceMs = Math.abs(date1 - date2);
    return Math.round(differenceMs / dayLength);

}

function getTagColor() {
    return 'red';
}