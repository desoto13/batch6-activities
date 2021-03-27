/*A variation on Problem 1 at Project Euler http://projecteuler.net/problem=1*/
// import {addBook, restockBook, sellBook, totalEarnings, listInventory} from "./BookStore";

const {store, book, addBook, restockBook, sellBook, totalEarnings,listInventory} = require("./BookStore")

test("add a book", () => {
    let inv =[{title: "Science", quantity: 2, value: 200},{title: "Math", quantity: 1, value: 100}]
    addBook("Science", 2, 200);
    expect(addBook("Math", 1, 100)).toStrictEqual(inv); 
});

test("restock a book", () => {
    let inv =[{title: "Science", quantity: 2, value: 200},{title: "Math", quantity: 4, value: 100}]
    restockBook("English", 3, 300);
    expect(restockBook("Math", 3)).toStrictEqual(inv); 
});

test("sell a book", () => {
    let st = {name: "National Book Store", inventory: [{title: "Science", quantity: 2, value: 200},{title: "Math", quantity: 1, value: 100}], earnings: 300};
    sellBook("English, 2");
    expect(sellBook("Math", 3)).toStrictEqual(st); 
});

