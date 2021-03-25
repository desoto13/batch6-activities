var store = {name: "National Book Store", inventory: [], earnings: 0};
var book = {title: "default", quantity: 0, value: 0};

function addBook(t, q, v) {
    book = {title: t, quantity: q, value: v}
    let newbook = JSON.parse(JSON.stringify(book));
    store.inventory.push(newbook);
}

function restockBook(t, q) {
    for(let i=0; i<store.inventory.length; i++) {
        if(store.inventory[i].title === t){
            store.inventory[i].quantity += q;
            return "Restock Successful";
        }  
    }
    return "Not included in the list";
}

function sellBook(t, q) {
    for(let i=0; i<store.inventory.length; i++) {
        if(store.inventory[i].title === t && store.inventory[i].quantity >= q){
            store.inventory[i].quantity -= q;
            store.earnings += store.inventory[i].value*q;
            return `Successful Transaction`;
        }
        else if(store.inventory[i].title === t && store.inventory[i].quantity < q){
            return `only ${store.inventory[i].quantity} stocks left`;
        }
    }
    return `${t} out of stock`;   
}

function totalEarnings() {
    return `${store.name}'s total earnings = Php ${store.earnings}`;
}

function listInventory() {
    return store.inventory;
}