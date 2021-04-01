var str_admin = localStorage.getItem("admincredentials");
var admin = JSON.parse(str_admin);

if(!admin.loggedin){
    location.replace("login.html")
}


var str_clientList = localStorage.getItem("clientList");

//Check if this is the first time creating a client
if(str_clientList === null){
    var listOfClient = [];
}   
else{
    var listOfClient = JSON.parse(str_clientList);
}

var str_transactionHistory = localStorage.getItem("transactionHistory");

//Check if this is the first transaction history
if(str_transactionHistory === null){
    var transactionHistory = [];
}   
else{
    var transactionHistory = JSON.parse(str_transactionHistory);
}   

var str_acctNumCreation = localStorage.getItem("acctNumCreation");

//Check if this is the first Account Number Creation
if(str_acctNumCreation === null){
    var acctNumCreation = 10000001;
    str_acctNumCreation = acctNumCreation.toString();
    localStorage.setItem("acctNumCreation", str_acctNumCreation);
}
else{
    var acctNumCreation = parseInt(str_acctNumCreation);
    acctNumCreation++;
    str_acctNumCreation = acctNumCreation.toString();
}

var addbtn = document.getElementById("add");
var first = document.getElementById("firstname");
var mid = document.getElementById("middlename");
var last = document.getElementById("lastname");
var birthday = document.getElementById("birthday");
var init_deposit = document.getElementById("initdeposit");
var confirmbox = document.getElementById("confirmation");
var success = document.getElementById("success");
var execute = document.getElementById("execute");
var returnbtn = document.getElementById("return");
var okbtn = document.getElementById("ok");

//Show the confirmation box
function confirmationBox() {
    confirmbox.style.display = "flex";
}

returnbtn.addEventListener("click", function() {
    confirmbox.style.display = "none";
})

execute.addEventListener("click", add_client);

function add_client(){
    create_user(str_acctNumCreation,init_deposit.value);
}

function create_user(user,balance) {
    let client = new Object();
    let transaction = new Object();
    let d = new Date();
    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString().padStart(2, "0");
    let day = d.getDate().toString().padStart(2, "0");
    let hours = d.getHours().toString().padStart(2, "0");
    let minutes = d.getMinutes().toString().padStart(2, "0");
    let seconds = d.getSeconds().toString().padStart(2, "0");

    if(balance === "") {
        balance = 0;
    }
    else{
        balance = parseFloat(balance);
    }

    for(let people of listOfClient){
        if (people.FirstName === first.value.toUpperCase() && people.MiddleName === mid.value.toUpperCase() &&
            people.LastName === last.value.toUpperCase() && people.Birthday === birthday.value){
                alert("Client already exists!");
        }
    }
        
    client = {AcctNum: user, FirstName: first.value.toUpperCase(), MiddleName: mid.value.toUpperCase(), LastName: last.value.toUpperCase(), Birthday: birthday.value, Balance: balance};
    let str_client = JSON.stringify(client);
    localStorage.setItem("Profile", str_client);
    listOfClient.unshift(client);
    str_clientList = JSON.stringify(listOfClient);
    localStorage.setItem("clientList", str_clientList);
    transaction = {
        AcctNum: user,
        Name: `${first.value.toUpperCase()} ${last.value.toUpperCase()}`,
        Details: `Created a new Account with Php ${new Intl.NumberFormat().format(balance)}`,
        Datet: `${year}-${month}-${day}`,
        Time: `${hours}:${minutes}:${seconds}`,
        Amount: `Php ${new Intl.NumberFormat().format(balance)}`,
        Type: "Open",
        Balance: `Php ${new Intl.NumberFormat().format(balance)}`
    }
    transactionHistory.unshift(transaction);
    str_transactionHistory = JSON.stringify(transactionHistory);
    localStorage.setItem("transactionHistory", str_transactionHistory);
    localStorage.setItem("acctNumCreation",user);
    confirmbox.style.display = "none";
    success.style.display = "flex";
}

okbtn.addEventListener("click", function(){
    location.replace("viewprofile.html");
})

        

            
    
