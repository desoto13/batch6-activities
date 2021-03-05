var values = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine", "Ten","Jack","Queen","King"];
var valueSymbols = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var suits = ["Clubs", "Spades", "Hearts", "Diamonds"];
var suitSymbols = ["\u2663","\u2660","\u2661","\u2662"];
var order = [];
var deckObj = [];
var deck = [];
var message = "Input commands\n shuffle(deck) = shuffle  deck\n arrangeBySuits(deck) = sort deck by suits\n arrangeByValues(deck) = ascending sort deck\n arrangeByValuesDown(deck) = descending sort deck\n dealCard(deck) = draw one card\n dealFive(deck) = shuffle and draw 5 cards"

for (i=1; i<14; i++) {
    order.push(i);
}

for (v=0; v<values.length; v++) {
    for (s=0; s<suits.length; s++) {
        var cardObj = {Value: values[v], Suit: suits[s], Order: order[v], Card: valueSymbols[v]+suitSymbols[s]};
        deckObj.push(cardObj);
        deck.push(cardObj.Card)
    }
}

console.log(message)
console.log(deck)

//Shuffle Cards
function shuffle(deckOfCards) {
    for (var i = 0; i < 1000; i++){
		var location1 = Math.floor((Math.random() * deckOfCards.length));
		var location2 = Math.floor((Math.random() * deckOfCards.length));
        var tmpObj = deckObj[location1];
        deckObj[location1] = deckObj[location2];
		deckObj[location2] = tmpObj;
	}
    for (var x=0; x<deckObj.length; x++) {
        deckOfCards[x] = deckObj[x].Card
    }
    deck = deckOfCards;
    return deck;
}

//Sort by Suits
function arrangeBySuits(deckOfCards) {
    deckObj.sort((a,b) => (a.Suit > b.Suit) ? 1 : (a.Suit === b.Suit) ? 1 : -1);
    for (var x=0; x<deckObj.length; x++) {
        deckOfCards[x] = deckObj[x].Card
    }
    deck = deckOfCards;
    console.log(deck);
}

//Sort by Values ascending
function arrangeByValues(deckOfCards) {
    deckObj.sort((a,b) => (a.Order > b.Order) ? 1 : (a.Order === b.Order) ? 1 : -1);
    for (var x=0; x<deckObj.length; x++) {
        deckOfCards[x] = deckObj[x].Card
    }
    deck = deckOfCards;
    console.log(deck);
}

//Sort by Values descending
function arrangeByValuesDown(deckOfCards) {
    deckObj.sort((a,b) => (a.Order > b.Order) ? -1 : (a.Order === b.Order) ? -1 : 1);
    for (var x=0; x<deckObj.length; x++) {
        deckOfCards[x] = deckObj[x].Card
    }
    deck = deckOfCards;
    console.log(deck);
}

//Deal a single card
function dealCard(deckOfCards) {
    var topObj = deckObj.shift();
    var top = deckOfCards.shift();
    deck = deckOfCards;
    console.log(`${topObj.Value} of ${topObj.Suit}`, top, deck);
}

//Draw 5 cards
function dealFive(deckOfCards) {
    //Shuffle first
    var shuffleDeck = shuffle(deckOfCards);
    // var shuffleDeck = deckOfCards;

    //To determine Unique elements
    var suitObj = new Set();
    var orderObj = new Set();

    //array of 5 cards drawn
    var fiveCards = shuffleDeck.slice(0,5);
    var fiveObj = deckObj.slice(0,5);
    var orderArr = [];

    //Input the cards into set and remove them from the deck
    for (i=0; i<fiveCards.length; i++) {
        suitObj.add(fiveObj[i].Suit);
        orderObj.add(fiveObj[i].Order);
        orderArr.push(fiveObj[i].Order);
        shuffleDeck.shift();
        deckObj.shift();
    }

    // Count the number of value cards in the hand
    var elcount = count(orderArr ,orderObj);

    //To determine the poker hand dealt
    if (suitObj.size === 1 && straight(orderObj) && orderObj.size === 5) {
        pokerHand = "Straight Flush";
    }
    else if (elcount.includes(4)) {
        pokerHand = "Four of a Kind";
    }
    else if (elcount.includes(2) && elcount.includes(3)) {
        pokerHand = "Full House";
    }
    else if (suitObj.size === 1) {
        pokerHand = "Flush";
    }
    else if (straight(orderObj) && orderObj.size === 5) {
        pokerHand = "Straight"
    }
    else if (elcount.includes(1) && elcount.includes(3)) {
        pokerHand = "Three of a Kind";
    }
    else if (elcount.reduce((a,b) => a*b) === 4) {
        pokerHand = "Two Pair";
    }
    else if (elcount.reduce((a,b) => a*b) === 2) {
        pokerHand = "One Pair";
    }
    else {
        pokerHand = "High Card";
    }

    deck = shuffleDeck;
    console.log(fiveCards)
    console.log(pokerHand)
    console.log(deck)
}

//Compare the 5 cards if they are straight
function straight(inputSet) {
    var prodarr = Array.from(inputSet);
    var sortArr = prodarr.sort((a,b) => (a > b) ? 1 : (a === b) ? 1 : -1);
    for (i=0;i<sortArr.length-1;i++) {
        if (sortArr[i] === (sortArr[i+1]-1) || JSON.stringify(sortArr)===JSON.stringify([1,10,11,12,13])) {
            continue
        }
        else {
            return false
        }            
    }
    return true;
}

//Count number of elements
function count(arrInput, inputSet) {
    var output = [];
    var inputArr = Array.from(inputSet);
    for (i=0; i<inputArr.length ;i++) {
        var counter = 0;
        arrInput.forEach(element => {
            if (element === inputArr[i]) {
                counter++;
            }
        });
        output.push(counter);
    }
    return output;   
}

