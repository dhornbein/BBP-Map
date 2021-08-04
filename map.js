// STATES	
const oregon     = document.getElementById("oregon");
const california = document.getElementById("california");
const montana    = document.getElementById("montana");
const nebraska   = document.getElementById("nebraska");
const louisiana  = document.getElementById("louisiana");
const florida    = document.getElementById("florida");

let issues = {
    1: {
        "active":false,
        "btn": document.getElementById("btn-1"),
        "states": [oregon, california],
        "cont": document.getElementById("cont-1")
    },
    2: {
        "active":false,
        "btn": document.getElementById("btn-2"),
        "states": [montana, nebraska],
        "cont": document.getElementById("cont-2")
    },
    3: {
        "active":false,
        "btn": document.getElementById("btn-3"),
        "states": [louisiana, florida],
        "cont": document.getElementById("cont-3")
    }
}

const classActive= "active";
const classHover= "hover";
const classState = "state-of-interest";
const classStemStateIssue = "issue-";
const classStemBtn = "issue-btn-";
const classStemCont = "issue-cont-";

init();

function init() {

    actOnIssue(function(issue,i){
        // add class to states
        actOnProp(issue, 'states', function (state) {
            state.classList.add(classState, classStemStateIssue + i);
        });
        // add class to content container
        issue.cont.classList.add(classStemCont + i);
        // add class to button
        issue.btn.classList.add(classStemBtn + i);
        // add listener to button
        issue.btn.addEventListener("click", function (e) {
            issueClick(issue);
        });
        issue.btn.addEventListener("mouseover", function (e) {
            issueHover(issue);
        });
        issue.btn.addEventListener("mouseout", function (e) {
            issueUnhover(issue);
        });
        // add listener to state
        actOnProp(issue, 'states', function (state) {
            state.addEventListener("click", function (e) {
                issueClick(issue);
            });
            // add hover listener to state
            state.addEventListener("mouseover", function (e) {
                issueHover(issue);
            });
            state.addEventListener("mouseout", function (e) {
                issueUnhover(issue);
            });
        });
    });
}

function issueHover(issue) {
    actOnProp(issue, 'states', function (state) {
        state.classList.add(classHover);
    });
    issue.cont.classList.add(classHover);
    issue.btn.classList.add(classHover);
}

function issueUnhover(issue) {
    actOnProp(issue, 'states', function (state) {
        state.classList.remove(classHover);
    });
    issue.cont.classList.remove(classHover);
    issue.btn.classList.remove(classHover);
}

function issueClick(issue) {
    switchIssue(issue);
    deactivateIssue();
    if (issue.active) activateIssue(issue);
}

function actOnIssue(callback) {
    for (let i in issues) {
        callback(issues[i],i);
    }
}

function actOnProp(issue,prop,callback){
    if (issue[prop] && issue[prop].length > 0) {
        for (let j in issue[prop]) {
            callback(issue[prop][j],j);
        }
    } else if (issue[prop]) {
        callback(issue[prop],0);
    }
}

// make issue active and deactivate other issues
function switchIssue(targetIssue) {
    actOnIssue(function(issue,i){
        if (issue == targetIssue) {
            issue.active = !issue.active;
        } else {
            issue.active = false;
        }
    });
}

function deactivateIssue() {
    // remove class from all states
    actOnIssue(function(issue,i){
        if (!issue.active) {
            actOnProp(issue, 'states', function (state) {
                state.classList.remove(classActive);
            });
            issue.cont.classList.remove(classActive);
            issue.btn.classList.remove(classActive);
        }
    });
}

// activate issue
function activateIssue(issue) {
    actOnProp(issue, 'states', function (state) {
        state.classList.toggle(classActive);
    });
    issue.cont.classList.toggle(classActive);
    issue.btn.classList.toggle(classActive);
}