/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var player1 = document.getElementById("name-0");
var player2 = document.getElementById("name-1");
var global1 = document.getElementById("score-0");
var global2 = document.getElementById("score-1");
var current1 = document.getElementById("current-0");
var current2 = document.getElementById("current-1");
var dice = document.getElementById("dicenumber");
var activePlayer1 = document.getElementById("Player-1");
var activePlayer2 = document.getElementById("Player-2");
var turn = [player1];
var oink = new Audio("assets/oink.mp4");
var realoink = new Audio("assets/realoink.mp4")

var sumCurrent = 0;
var sumGlobal1 = 0;
var sumGlobal2 = 0;

var diceRoll = document.getElementById("roll");
diceRoll.addEventListener('click', rollDice);

function rollDice() {
    realoink.play();
    if(turn[0] === player1){
        player1Rolls();
    }
    else {
        player2Rolls();
    }
}

function player1Rolls() {
    let thrownDice = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${thrownDice}.png`;
    if (thrownDice !== 1) {
        sumCurrent += thrownDice;
    }
    else {
        oink.play();
        sumCurrent = 0;
        turn.pop();
        turn.push(player2);
        activePlayer1.classList.toggle("active");
        activePlayer2.classList.toggle("active");
    }
    current1.innerText = sumCurrent;

}

function player2Rolls() {
    let thrownDice = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${thrownDice}.png`;
    if (thrownDice !== 1) {
        sumCurrent += thrownDice;
    }
    else {
        oink.play();
        sumCurrent = 0;
        turn.pop();
        turn.push(player1);
        activePlayer1.classList.toggle("active");
        activePlayer2.classList.toggle("active");
    }
    current2.innerText = sumCurrent;

}

var holdScore = document.getElementById("hold");
holdScore.addEventListener('click', Scorehold);

function Scorehold() {
    oink.play();
    if(turn[0] === player1){
        sumGlobal1 += sumCurrent;
        global1.innerText = sumGlobal1;
        sumCurrent = 0;
        turn.pop();
        turn.push(player2);
        current1.innerText = sumCurrent;
        
    }
    else {
        sumGlobal2 += sumCurrent;
        global2.innerText = sumGlobal2;
        sumCurrent = 0;
        turn.pop();
        turn.push(player1);
        current2.innerText = sumCurrent;
        
    }
    activePlayer1.classList.toggle("active");
    activePlayer2.classList.toggle("active");
    checkWinner();
}

function checkWinner() {
    if(sumGlobal1 >= 100){
        alert("Player 1 Wins");
        diceRoll.classList.add("hidden");
        holdScore.classList.add("hidden");
        activePlayer1.classList.toggle("winner");
        activePlayer1.classList.remove("active");
        activePlayer2.classList.remove("active");
    }
    else if(sumGlobal2 >= 100) {
        alert("Player 2 Wins");
        diceRoll.classList.add("hidden");
        holdScore.classList.add("hidden");
        activePlayer2.classList.toggle("winner");
        activePlayer1.classList.remove("active");
        activePlayer2.classList.remove("active");w
    }
    
}

var reset = document.getElementById("reset");
reset.addEventListener('click', newGame);

function newGame() {
    location.reload();
}