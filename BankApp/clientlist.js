var str_admin = localStorage.getItem("admincredentials");
var admin = JSON.parse(str_admin);

if(!admin.loggedin){
    location.replace("login.html")
}

var str_searchClient = localStorage.getItem("searchClient");
var searchClient = JSON.parse(str_searchClient);

function list_users() {
    let tableBody = document.getElementById("tablecontent");
    if(str_searchClient !== null){
        for (let i=0; i<searchClient.length; i++) {
            let tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);
            for(let j=0; j<searchClient[i].length; j++){
                let tableCell = document.createElement("td");
                tableCell.innerText = searchClient[i][j];
                tableRow.appendChild(tableCell);
    
            }
        }
    }
}

list_users();

var mainAdd = document.getElementById("addbtn");

mainAdd.addEventListener("click", function() {
    location.replace("addclient.html");
})

var str_clientList = localStorage.getItem("clientList");
var listOfClient = JSON.parse(str_clientList);

var views = document.querySelectorAll("tr td:nth-child(2)");

for(let view of views) {
    view.addEventListener("click", view_account);
}

function view_account() {
    let profile = listOfClient.find(acct_num => acct_num.AcctNum === this.parentElement.firstChild.innerText);
    let str_profile = JSON.stringify(profile);
    localStorage.setItem("Profile", str_profile);
    location.replace(`viewprofile.html`);
}

var client_transactions = document.querySelectorAll("tr td:nth-child(5)");

for(let transaction of client_transactions) {
    transaction.addEventListener("click", transact_client);
}

function transact_client() {
    let profile = listOfClient.find(acct_num => acct_num.AcctNum === this.parentElement.firstChild.innerText);
    let str_profile = JSON.stringify(profile);
    localStorage.setItem("Profile", str_profile);
    location.replace(`transact.html`);
}
