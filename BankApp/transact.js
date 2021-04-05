var str_admin = localStorage.getItem("admincredentials");
var admin = JSON.parse(str_admin);

if(!admin.loggedin){
    location.replace("login.html")
}

var deposittab = document.getElementById("deposittab");
var withdrawtab = document.getElementById("withdrawtab");
var transfertab = document.getElementById("transfertab");
var depositform = document.getElementById("depositform");
var withdrawform = document.getElementById("withdrawform");
var transferform = document.getElementById("transferform")

//Tab transfer between Deposit, Withdraw and Transfer
withdrawtab.addEventListener("click", showWithdrawForm);
transfertab.addEventListener("click", showTransferForm);

function showDepositForm() {
    withdrawtab.classList.remove("active");
    transfertab.classList.remove("active");
    deposittab.classList.add("active");

    withdrawform.classList.remove("selected");
    transferform.classList.remove("selected");
    depositform.classList.add("selected");
    
    withdrawtab.addEventListener("click", showWithdrawForm);
    transfertab.addEventListener("click", showTransferForm);
    deposittab.removeEventListener("click", showDepositForm)
}

function showWithdrawForm() {
    transfertab.classList.remove("active");
    deposittab.classList.remove("active");
    withdrawtab.classList.add("active");

    transferform.classList.remove("selected");
    depositform.classList.remove("selected");
    withdrawform.classList.add("selected");
    
    transfertab.addEventListener("click", showTransferForm);
    deposittab.addEventListener("click", showDepositForm);
    withdrawtab.removeEventListener("click", showWithdrawForm);
}

function showTransferForm() {
    withdrawtab.classList.remove("active");
    deposittab.classList.remove("active");
    transfertab.classList.add("active");

    withdrawform.classList.remove("selected");
    depositform.classList.remove("selected");
    transferform.classList.add("selected");
    
    withdrawtab.addEventListener("click", showWithdrawForm);
    deposittab.addEventListener("click", showDepositForm);
    transfertab.removeEventListener("click", showTransferForm);
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

var str_clientList = localStorage.getItem("clientList");
var listOfClient = JSON.parse(str_clientList);

var str_profile = localStorage.getItem("Profile");
var profile = JSON.parse(str_profile);

var client_deposit_account = document.getElementById("clientdepositacct");
var client_deposit_full = document.getElementById("clientdepositfull");
var deposit_amount = document.getElementById("depositamount");

var client_withdraw_account = document.getElementById("clientwithdrawacct");
var client_withdraw_full = document.getElementById("clientwithdrawfull");
var client_withdraw_name = document.getElementById("clientwithdrawname");
var withdraw_birthday = document.getElementById("withdrawbirthday");
var withdraw_amount = document.getElementById("withdrawamount");

var client_transfer_account = document.getElementById("clienttransferacct");
var client_transfer_full = document.getElementById("clienttransferfull");
var client_transfer_name = document.getElementById("clienttransfername");
var transfer_birthday = document.getElementById("transferbirthday");
var receiver_account =document.getElementById("receiver");
var receiver_transfer_full = document.getElementById("receivertransferfull");
var transfer_amount = document.getElementById("transferamount");

function autoUpdate() {
    if(str_profile !== null){
        client_deposit_account.value = client_withdraw_account.value = client_transfer_account.value = profile.AcctNum;
        client_deposit_full.value = client_withdraw_full.value = client_transfer_full.value = `${profile.FirstName} ${profile.LastName}`
    }
}

autoUpdate();


execute.addEventListener("click", proceed_transaction);

function proceed_transaction() {
    switch(type_of_transaction){
        case "Deposit":
            deposit(client_deposit_account.value,deposit_amount.value);
            break;
        case "Withdraw":
            withdraw(client_withdraw_account.value,withdraw_amount.value);
            break;
        case "Transfer":
            send(client_transfer_account.value,receiver_account.value,transfer_amount.value);
            break;
    }
}

function deposit(user,amount){
    amount = parseFloat(amount);
    let update_deposit = listOfClient.find(acct_num => acct_num.AcctNum === user);
    if(update_deposit === undefined || 
        `${update_deposit.FirstName} ${update_deposit.LastName}` !== client_deposit_full.value.toUpperCase()){
        type_of_transaction ="default";
        confirmbox.style.display = "none";
        alert("Wrong Client details!");
        return;
    }
    update_deposit.Balance += amount;
    let update_deposit_index = listOfClient.findIndex(client => client.AcctNum === user);
    listOfClient.splice(update_deposit_index, 1, update_deposit);
    let clientList_str = JSON.stringify(listOfClient);
    localStorage.setItem("clientList", clientList_str);
    recordHistory(update_deposit,update_deposit.AcctNum,amount);
}

var str_transactionHistory = localStorage.getItem("transactionHistory");
var transactionHistory = JSON.parse(str_transactionHistory);

function recordHistory(user,receiver,amount) {
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
        Details: `${type_of_transaction} Php ${new Intl.NumberFormat().format(amount)} >>> ${receiver}`,
        Datet: `${year}-${month}-${day}`,
        Time: `${hours}:${minutes}:${seconds}`,
        Amount: `Php ${new Intl.NumberFormat().format(amount)}`,
        Type: type_of_transaction,
        Balance: `Php ${new Intl.NumberFormat().format(user.Balance)}`
    }
    let str_user = JSON.stringify(user);
    localStorage.setItem("Profile",str_user);
    transactionHistory.unshift(transaction);
    str_transactionHistory = JSON.stringify(transactionHistory);
    localStorage.setItem("transactionHistory", str_transactionHistory);
    // localStorage.setItem("acctNumCreation",user);
    confirmbox.style.display = "none";
    success.style.display = "flex";
}

okbtn.addEventListener("click", function(){
    location.replace("viewprofile.html");
})

function withdraw(user,amount){
    amount = parseFloat(amount);
    let update_withdraw = listOfClient.find(acct_num => acct_num.AcctNum === user);
    if(update_withdraw === undefined || update_withdraw.MiddleName !== client_withdraw_name.value.toUpperCase() ||
        update_withdraw.Birthday !== withdraw_birthday.value ||
        `${update_withdraw.FirstName} ${update_withdraw.LastName}` !== client_withdraw_full.value.toUpperCase()){
        type_of_transaction ="default";
        confirmbox.style.display = "none";
        alert("Wrong Client Details!");
        return;
    } else if(amount > update_withdraw.Balance){
        type_of_transaction ="default";
        confirmbox.style.display = "none";
        alert("Insufficient Funds!");
        return;
    }
    update_withdraw.Balance -= amount;
    let update_withdraw_index = listOfClient.findIndex(client => client.AcctNum === user);
    listOfClient.splice(update_withdraw_index, 1, update_withdraw);
    let clientList_str = JSON.stringify(listOfClient);
    localStorage.setItem("clientList", clientList_str);
    recordHistory(update_withdraw,update_withdraw.AcctNum,amount);
}

function send(from_user,to_user,amount){
    amount = parseFloat(amount);
    let update_transfer_from = listOfClient.find(acct_num => acct_num.AcctNum === from_user);
    let update_transfer_to = listOfClient.find(acct_num => acct_num.AcctNum === to_user);
    if(update_transfer_from === undefined || update_transfer_from.MiddleName !== client_transfer_name.value.toUpperCase() ||
        update_transfer_from.Birthday !== transfer_birthday.value ||
        `${update_transfer_from.FirstName} ${update_transfer_from.LastName}` !== client_transfer_full.value.toUpperCase()){
        type_of_transaction ="default";
        confirmbox.style.display = "none";
        alert("Wrong Client Details!");
        return;
    } else if(amount > update_transfer_from.Balance){
        type_of_transaction ="default";
        confirmbox.style.display = "none";
        alert("Insufficient Funds!");
        return;
    } else if(update_transfer_to === undefined ||
        `${update_transfer_to.FirstName} ${update_transfer_to.LastName}` !== receiver_transfer_full.value.toUpperCase() ||
        client_transfer_account.value === receiver_account.value){
        type_of_transaction ="default";
        confirmbox.style.display = "none";
        alert("Wrong Receiver Details!");
        return;
    }
    update_transfer_from.Balance -= amount;
    let update_transfer_from_index = listOfClient.findIndex(client => client.AcctNum === from_user);
    listOfClient.splice(update_transfer_from_index, 1, update_transfer_from);

    update_transfer_to.Balance += amount;
    let update_transfer_to_index = listOfClient.findIndex(client => client.AcctNum === to_user);
    listOfClient.splice(update_transfer_to_index, 1, update_transfer_to);

    let clientList_str = JSON.stringify(listOfClient);
    localStorage.setItem("clientList", clientList_str);
    recordHistory(update_transfer_from,update_transfer_to.AcctNum,amount);
}
