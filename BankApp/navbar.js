var clientList = document.getElementById("clientlist");
var transact = document.getElementById("transact");
var addClient = document.getElementById("addclient");
var thistory = document.getElementById("history");
var logout = document.getElementById("logout");
var str_admin = localStorage.getItem("admincredentials");
var admin = JSON.parse(str_admin);
var str_clientList = localStorage.getItem("clientList");
var listOfClient = JSON.parse(str_clientList);
var searchBox = document.getElementById("searchtext");
var searchBtn = document.getElementById("searchbutton");
var str_transactionHistory = localStorage.getItem("transactionHistory");
var transactionHistory = JSON.parse(str_transactionHistory);
var str_searchHistory = localStorage.getItem("searchHistory");
var searchHistory = JSON.parse(str_searchHistory);

clientList.addEventListener("click", clientListAll);

function clientListAll() {
    let searchClient = [];
    if(str_clientList !== null){
        for (let client of listOfClient) {
            let client_values = [client.AcctNum, `${client.FirstName} ${client.LastName}`, client.Birthday, 
            `Php ${new Intl.NumberFormat().format(client.Balance)}`, "Transact"]
            searchClient.push(client_values);
        }
        let str_searchClient = JSON.stringify(searchClient);
        localStorage.setItem("searchClient", str_searchClient);
    }
    location.replace("clientlist.html");
}

var str_profile = localStorage.getItem("Profile");

transact.addEventListener("click", function() {
    if(str_profile !== null){
        localStorage.removeItem("Profile");
    }
    location.replace("transact.html");
})

addClient.addEventListener("click", function() {
    location.replace("addclient.html");
})

thistory.addEventListener("click", historyList)

function historyList() {
    let historySearch = [];
    if(str_transactionHistory !== null){
        for (let each_transaction of transactionHistory) {
            let transaction_values = Object.values(each_transaction)
            historySearch.push(transaction_values);
        }
        let str_historySearch = JSON.stringify(historySearch);
        localStorage.setItem("searchHistory", str_historySearch);
    }
    location.replace("history.html");
}

searchBtn.addEventListener("click", clientSearch);

searchBox.addEventListener("change", clientSearch);

function clientSearch() {
    let searchClient = [];
    for (let client of listOfClient) {
        let string_values = Object.values(client);
        for(let i=0; i<string_values.length; i++) {
            if(typeof(string_values[i]) === "string" && string_values[i].includes(searchBox.value.toUpperCase())){
                let client_values = [client.AcctNum, `${client.FirstName} ${client.LastName}`, client.Birthday, 
                `Php ${new Intl.NumberFormat().format(client.Balance)}`, "Transact"]
                searchClient.push(client_values);
            }
        } 
    }

    let historySearch = [];
    if(str_transactionHistory !== null){
        for (let each_transaction of transactionHistory) {
            let transaction_values = Object.values(each_transaction)
            historySearch.push(transaction_values);
        }
        let str_historySearch = JSON.stringify(historySearch);
        localStorage.setItem("searchHistory", str_historySearch);
    }

    let str_searchHistory = localStorage.getItem("searchHistory");
    let searchHistory = JSON.parse(str_searchHistory);

    let newSearchHistory = [];
    for (let each_history of searchHistory) {
        for (let j=0; j<2; j++){
            if(each_history[j].includes(searchBox.value.toUpperCase())){
                let new_each_history = JSON.parse(JSON.stringify(each_history));
                newSearchHistory.push(new_each_history);
            }
        }    
    }

    let str_newSearchHistory = JSON.stringify(newSearchHistory);
    localStorage.setItem("searchHistory", str_newSearchHistory);

    let str_searchClient = JSON.stringify(searchClient);
    localStorage.setItem("searchClient", str_searchClient);
    location.reload();
}

logout.addEventListener("click", function() {
    admin.loggedin = false;
    str_admin = JSON.stringify(admin);
    localStorage.setItem("admincredentials", str_admin);
    location.replace("login.html");
})