var store = {name: "National Book Store", inventory: [], earnings: 0};
var book = {title: "default", quantity: 0, value: 0};

function addBook(t, q, v) {
    book = {title: t, quantity: q, value: v}
    let newbook = JSON.parse(JSON.stringify(book));
    store.inventory.push(newbook);
    // return store.inventory
}

function restockBook(t, q) {
    for(let i=0; i<store.inventory.length; i++) {
        if(store.inventory[i].title === t){
            store.inventory[i].quantity += q;
            return "Restock Successful";
            // return store.inventory;
        }  
    }
    return "Not included in the list";
    // return store.inventory;
}

function sellBook(t, q) {
    for(let i=0; i<store.inventory.length; i++) {
        if(store.inventory[i].title === t && store.inventory[i].quantity >= q){
            store.inventory[i].quantity -= q;
            store.earnings += store.inventory[i].value*q;
            return `Successful Transaction`;
            // return store;
        }
        else if(store.inventory[i].title === t && store.inventory[i].quantity < q){
            return `only ${store.inventory[i].quantity} stocks left`;
            // return store
        }
    }
    return `${t} out of stock`;
    // return store 
}

function totalEarnings() {
    return `${store.name}'s total earnings = Php ${store.earnings}`;
}

function listInventory() {
    return store.inventory;
}

module.exports = {store, book, addBook, restockBook, sellBook, totalEarnings,listInventory};