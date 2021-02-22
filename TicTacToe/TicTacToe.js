var X = "X"
var O = "O"
var EMPTY = ""
var choice = document.getElementById("choices");
var table = document.getElementById("table");
var gstatus = document.getElementById("status");
var previous = document.getElementById("prev")
var reset = document.getElementById("reset")
var next = document.getElementById("next")

//storage of turns
var turn = []

//Check which will go first
var X1st = document.getElementById("X");
X1st.addEventListener("click",function() {
    turn.push(X);
    choice.style.display = "none";
    table.style.display = "inline-table";
    gstatus.innerHTML = "X to move";
    reset.style.display = "block";
})

var O1st = document.getElementById("O")
O1st.addEventListener("click",function() {
    turn.push(O);
    choice.style.display = "none";
    table.style.display = "inline-table";
    gstatus.innerHTML = "O to move";
    reset.style.display = "block";
})


//Synchronizing board as 2D array
var board = [[EMPTY, EMPTY, EMPTY],
                [EMPTY, EMPTY, EMPTY],
                [EMPTY, EMPTY, EMPTY]]

for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
        table.rows[i].cells[j].innerHTML = board[i][j];
        }
}

//Check for move/click
    var cells = document.querySelectorAll("td");
    for (var cell of cells) {
    cell.addEventListener('click', marker)
    }

//Taking turns between X and O
function toggle() {
    if (turn[0] === X) {
        turn.pop();
        turn.push(O);
        gstatus.innerHTML = "O to move";
    }
    else {
        turn.pop();
        turn.push(X);
        gstatus.innerHTML = "X to move";
    }
}

//storage of moves
var moves = []

//Action done, result of action, storage of move
function marker() {
    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            if (this.innerHTML === EMPTY && this === table.rows[i].cells[j]) {
                    board[i][j] = turn[0];
                    table.rows[i].cells[j].innerHTML = board[i][j];
                    
                    var board_copy = []
                    for (var x = 0; x < board.length; x++){
                        board_copy[x] = board[x].slice();
                    }
                        

                    moves.push(board_copy);
                    toggle();
                    endGame(winner(board),final(board));
            }
        }
    }
}

//Check winner
function winner(board_copy) {
    //Horizontal Winner
    for (var i=0; i<3; i++) {
        if (board_copy[i][0] !== EMPTY &&
            board_copy[i][0] === board_copy[i][1] &&
            board_copy[i][1] === board_copy[i][2]) {
                return board_copy[i][0];
            }
    }

    //Vertical Winner
    for (var j=0; j<3; j++) {
        if (board_copy[0][j] !== EMPTY &&
            board_copy[0][j] == board_copy[1][j] &&
            board_copy[1][j] == board_copy[2][j]){
                return board_copy[0][j];
            }
    }

    //Diagonal Winner
    if (board_copy[0][0] !== EMPTY &&
        board_copy[0][0] == board_copy[1][1] &&
        board_copy[1][1] == board_copy[2][2]){
            return board_copy[0][0];
        }
        
    
    if (board_copy[0][2] !== EMPTY &&
        board_copy[0][2] === board_copy[1][1] &&
        board_copy[1][1] === board_copy[2][0]) {
            return board_copy[0][2];
        }
        

    return EMPTY;
}


//Check if game ends
function final(board_copy) {
    if (winner(board_copy) !== EMPTY) {
        return true;
    }

    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            if (board_copy[i][j] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

//Executes after game
function endGame (champ, finale) {
    if (finale === true) {
        if (champ === X) {
            gstatus.innerHTML = "X Wins!";
            previous.style.display = "block";
            next.style.display = "block";
            for (var cell of cells) {
                cell.removeEventListener('click', marker)
                }
            lenMove();
        }
        else if (champ === O) {
            gstatus.innerHTML = "O Wins!";
            previous.style.display = "block";
            next.style.display = "block";
            for (var cell of cells) {
                cell.removeEventListener('click', marker)
                }
            lenMove();
        }
        else {
            gstatus.innerHTML = "It's a Tie!";
            previous.style.display = "block";
            next.style.display = "block";
            for (var cell of cells) {
                cell.removeEventListener('click', marker)
                }
            lenMove();
        }
    }
}



// storage of move length
function lenMove () {
    var k = moves.length-1;
    len.push(k);
    
    if (len[0] === 0) {
        
    }
}

// length of moves
var len = []

//Next Button
next.addEventListener("click", nextState)

//Next Button Function
function nextState () {
    var k = len[0]
    board = moves[k+1];
        for (var i=0; i<3; i++) {
            for (var j=0; j<3; j++) {
                table.rows[i].cells[j].innerHTML = board[i][j];
            }
        }
        k += 1;
        len.pop();
        len.push(k);
    }



//Previous button
previous.addEventListener("click", prevState)

//Previous Button Function
function prevState () {
        var k = len[0]
        board = moves[k-1];
            
        for (var i=0; i<3; i++) {
            for (var j=0; j<3; j++) {
                table.rows[i].cells[j].innerHTML = board[i][j];
            }
        }
        k = k-1;
        len.pop();
        len.push(k)
}


//Reset Button
reset.addEventListener("click", function() {
    location.reload();
})







