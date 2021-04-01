var admin = {User: "admin", Password:"12345", loggedin: false};
var str_admin = JSON.stringify(admin);
localStorage.setItem("admincredentials", str_admin);
var user_input = document.getElementById("UN");
var pw_input = document.getElementById("PW");
var submitbtn = document.getElementById("submit");
var str_clientList = localStorage.getItem("clientList");
var listOfClient = JSON.parse(str_clientList);

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
}


clientListAll();

submitbtn.addEventListener("click", credentialChecker);
pw_input.addEventListener("change", credentialChecker);

function credentialChecker() {
    if(user_input.value === admin.User && pw_input.value === admin.Password) {
        admin.loggedin = true;
        str_admin = JSON.stringify(admin);
        localStorage.setItem("admincredentials", str_admin);
        location.replace("clientlist.html");
    }
    else {
        alert("invalid username or password");
    }
}


