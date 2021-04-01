var str_admin = localStorage.getItem("admincredentials");
var admin = JSON.parse(str_admin);

if(!admin.loggedin){
    location.replace("login.html")
}

var str_searchHistory = localStorage.getItem("searchHistory");
var searchHistory = JSON.parse(str_searchHistory);

var tableBody = document.getElementById("tablecontent");

function updateTable() {
    if(str_searchHistory !== null){
        for (let i=0; i<searchHistory.length; i++) {
            let tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);
            for(let j=0; j<searchHistory[i].length; j++){
                let tableCell = document.createElement("td");
                tableCell.innerText = searchHistory[i][j];
                tableRow.appendChild(tableCell);
            }
        }
    }
}

updateTable();

var datefilter = document.getElementById("datefilter");
datefilter.addEventListener("change", searchDate);

var dateSearch =[];

function searchDate() {
    dateSearch = [];
    if(str_searchHistory !== null){
        for (let i=0; i<searchHistory.length; i++) {
            if (searchHistory[i][3] === datefilter.value){
                console.log(searchHistory[i])
                dateSearch.push(searchHistory[i]);
        }
    }
}
    updateTablebyDate();  
}

function updateTablebyDate() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    for (let i=0; i<dateSearch.length; i++) {
        let tableRow = document.createElement("tr");
        tableBody.appendChild(tableRow);
        for(let j=0; j<dateSearch[i].length; j++){
            let tableCell = document.createElement("td");
            tableCell.innerText = dateSearch[i][j];
            tableRow.appendChild(tableCell);
        }
    }
}