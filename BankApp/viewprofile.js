var str_admin = localStorage.getItem("admincredentials");
var admin = JSON.parse(str_admin);

if(!admin.loggedin){
    location.replace("login.html")
}

var str_profile = localStorage.getItem("Profile");
var profile = JSON.parse(str_profile);

var str_clientList = localStorage.getItem("clientList");
var listOfClient = JSON.parse(str_clientList);

var acct_number = document.getElementById("acctnumber");
var acct_number2 = document.getElementById("acctnumber2");
var client_balance = document.getElementById("balance");
var client_balance2 = document.getElementById("balance2");
var fullname = document.getElementById("name");
var client_birthday = document.getElementById("disbirthday");

//check if profile is not null
function profileChecker() {
    if(str_profile !== null){
        displayProfile();
    }else{
        clientListAll();
    }
}

profileChecker();

function displayProfile(){
    acct_number.innerText = acct_number2.innerText = `Account Number: ${profile.AcctNum}`;
    client_balance.innerText = client_balance2.innerText = `Balance: Php ${new Intl.NumberFormat().format(profile.Balance)}`;
    fullname.innerText = `Name: ${profile.FirstName} ${profile.MiddleName} ${profile.LastName}`;
    client_birthday.innerText = `Birthday: ${profile.Birthday}`;
}

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

var editbtn = document.getElementById("edit");
var firstname_box = document.getElementById("firstname");
var middlename_box = document.getElementById("middlename");
var lastname_box = document.getElementById("lastname");
var client_birthday = document.getElementById("birthday");

editbtn.addEventListener("click", displayUpdateForm);

//Display form once edit button is clicked
function displayUpdateForm() {
    firstname_box.value = profile.FirstName;
    middlename_box.value = profile.MiddleName;
    lastname_box.value = profile.LastName;
    client_birthday.value = profile.Birthday;

    document.getElementById("clientdetails").classList.remove("active");
    document.getElementById("clientform").classList.add("active");
}


var confirmbox = document.getElementById("confirmation");
var success = document.getElementById("success");
var execute = document.getElementById("execute");
var returnbtn = document.getElementById("return");
var okbtn = document.getElementById("ok");

var type_of_transaction ="default";

//Show confirmation box
function confirmationBox(transaction_type) {
    type_of_transaction = transaction_type;
    confirmbox.style.display = "flex";
}

//Close confirmation box
returnbtn.addEventListener("click", function() {
    type_of_transaction ="default"
    confirmbox.style.display = "none";
})

var deletebtn = document.getElementById("delete");
deletebtn.addEventListener("click", function() {
    type_of_transaction = "Close";
    confirmbox.style.display = "flex";
})

execute.addEventListener("click", updateOrDelete)

function updateOrDelete() {
    switch(type_of_transaction){
        case "Update":
            updateAccount();
            break;
        case "Close":
            deleteAccount();
            break;
    }
}

function updateAccount(){
    for (let client of listOfClient) {
        if(client.FirstName === firstname_box.value.toUpperCase() && client.MiddleName === middlename_box.value.toUpperCase() && 
            client.LastName === lastname_box.value.toUpperCase() && client.Birthday === client_birthday.value){
            type_of_transaction ="default";
            confirmbox.style.display = "none";
            alert("Client already exists!");
            return;
        }
    }

    let new_profile = {
        AcctNum: profile.AcctNum,
        FirstName: firstname_box.value.toUpperCase(),
        MiddleName: middlename_box.value.toUpperCase(),
        LastName: lastname_box.value.toUpperCase(),
        Birthday: client_birthday.value,
        Balance: profile.Balance
    }

    let new_profile_index = listOfClient.findIndex(client => client.AcctNum === new_profile.AcctNum);
    listOfClient.splice(new_profile_index, 1, new_profile);
    let clientList_str = JSON.stringify(listOfClient);
    localStorage.setItem("clientList", clientList_str);

    let str_new_profile = JSON.stringify(new_profile);
    localStorage.setItem("Profile",str_new_profile);
    recordHistory(new_profile);
}

var str_transactionHistory = localStorage.getItem("transactionHistory");
var transactionHistory = JSON.parse(str_transactionHistory);

function recordHistory(user) {
    let transaction = new Object();
    let d = new Date();
    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let day = d.getDate().toString().padStart(2, "0");
    let hours = d.getHours().toString().padStart(2, "0");
    let minutes = d.getMinutes().toString().padStart(2, "0");
    let seconds = d.getSeconds().toString().padStart(2, "0");
    transaction = {
        AcctNum: user.AcctNum,
        Name: `${user.FirstName} ${user.LastName}`,
        Details: `${type_of_transaction}d the Account`,
        Datet: `${year}-${month}-${day}`,
        Time: `${hours}:${minutes}:${seconds}`,
        Amount: `N/A`,
        Type: type_of_transaction,
        Balance: `Php ${new Intl.NumberFormat().format(user.Balance)}`
    }
    transactionHistory.unshift(transaction);
    str_transactionHistory = JSON.stringify(transactionHistory);
    localStorage.setItem("transactionHistory", str_transactionHistory);
    // localStorage.setItem("acctNumCreation",user);
    confirmbox.style.display = "none";
    success.style.display = "flex";
}

function deleteAccount() {
    if(profile.Balance === 0){
        let delete_profile_index = listOfClient.findIndex(client => client.AcctNum === profile.AcctNum);
        listOfClient.splice(delete_profile_index,1);
        let clientList_str = JSON.stringify(listOfClient);
        localStorage.setItem("clientList",clientList_str);
        recordHistory(profile);
        localStorage.removeItem("Profile");
    }else{
        type_of_transaction ="default"
        confirmbox.style.display = "none";
        alert("Please EMPTY your Balance prior closing the account")
    }
    
}

var previous = document.getElementById("prev");
previous.addEventListener("click", function(){
    document.getElementById("clientform").classList.remove("active");
    document.getElementById("clientdetails").classList.add("active");
})

var transact_client = document.getElementById("transact_client");
transact_client.addEventListener("click", function() {
    location.replace("transact.html");
})

okbtn.addEventListener("click", function(){
    location.reload();
})



