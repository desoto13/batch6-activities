var black = {Pawn: "♟", Rook: "♜", Knight: "♞", Bishop: "♝", Queen: "♛", King: "♚"};
var white = {Pawn: "♙", Rook: "♖", Knight: "♘", Bishop: "♗", Queen: "♕", King: "♔"};
var EMPTY = ""
var board = [];
var blackOff = [black.Rook, black.Knight, black.Bishop, black.Queen, black.King, black.Bishop, black.Knight, black.Rook];
var whiteOff = [white.Rook, white.Knight, white.Bishop, white.Queen, white.King, white.Bishop, white.Knight, white.Rook];
var blackPawn = [];
var whitePawn = [];
var blackCapturedBoard = [];
var whiteCapturedBoard = [];

for (i=0; i<8; i++) {
    blackPawn.push(black.Pawn);
    whitePawn.push(white.Pawn);
}

//Initialize the Game
function createGame() {
    //Draw Board
    var tableBoard = document.createElement("table");
    document.body.appendChild(tableBoard);
    tableBoard.id = "chessboard"
    for (var i=0; i<8 ;i++) {
        board.push([]);
        var tableRow = document.createElement("tr");
        tableBoard.appendChild(tableRow);
        for (var j=0; j<8 ;j++) {
            var tableCell = document.createElement("td");
            tableRow.appendChild(tableCell);
            board[i][j] = EMPTY;
            tableCell.classList.add("chesscell")
            tableCell.setAttribute("data",`${i}-${j}`)
            if ((j % 2 === 0 && i % 2 === 0) || ((j % 2 !== 0 && i % 2 !== 0))) {
                tableCell.classList.add("whitecell")
            }
            else {
                tableCell.classList.add("blackcell")
            }
        }
    }

    //Place Chess Pieces
    for (var y=0; y<8 ;y++) {
        board[0][y] = blackOff[y];
        tableBoard.rows[0].cells[y].innerHTML = blackOff[y];
        board[1][y] = blackPawn[y];
        tableBoard.rows[1].cells[y].innerHTML = blackPawn[y]
        board[6][y] = whitePawn[y];
        tableBoard.rows[6].cells[y].innerHTML = whitePawn[y]
        board[7][y] = whiteOff[y];
        tableBoard.rows[7].cells[y].innerHTML = whiteOff[y]
    }

    //Create Dashboard
    var dashBoard = document.createElement("div");
    document.body.appendChild(dashBoard);
    dashBoard.id = "dashboard";

        //Create Black Dashboard Container
        var blackContainer = document.createElement("div");
        dashBoard.appendChild(blackContainer);

            //Create Black Timer and Captured Pieces
            var blackTimer = document.createElement("span");
            blackContainer.appendChild(blackTimer);
            blackTimer.id = "blackchessclock"
            blackTimer.innerHTML = "15:00"
            var blackCaptured = document.createElement("table");
            blackCaptured.id = "blackcaptured";
            blackContainer.appendChild(blackCaptured);
            for (var i=0; i<2; i++) {
                blackCapturedBoard.push([]);
                var blackCapturedRow = document.createElement("tr");
                blackCaptured.appendChild(blackCapturedRow);
                for (var j=0; j<6; j++) {
                    var blackCapturedCell = document.createElement("td");
                    blackCapturedRow.appendChild(blackCapturedCell);
                    if (i === 0) {
                        blackCapturedBoard[i][j] = Object.values(white)[j];
                        blackCaptured.rows[i].cells[j].innerHTML = Object.values(white)[j];
                    }
                    else {
                        blackCapturedBoard[i][j] = 0;
                        blackCaptured.rows[i].cells[j].innerHTML = 0;
                    }
                    blackCapturedCell.classList.add("blackcell");
                }
            }
        
        //Create Make Decision button
        var dealButton = document.createElement("button");
        dealButton.id = "deal"
        dealButton.innerText = "MAKE DECISION"
        dashBoard.appendChild(dealButton);


        //Create White Dashboard Container
        var whiteContainer = document.createElement("div");
        dashBoard.appendChild(whiteContainer);


            //Create White Timer and Captured Pieces
            var whiteTimer = document.createElement("span");
            whiteContainer.appendChild(whiteTimer);
            whiteTimer.id = "whitechessclock"
            whiteTimer.innerHTML = "15:00"
            var whiteCaptured = document.createElement("table");
            whiteCaptured.id = "whitecaptured";
            whiteContainer.appendChild(whiteCaptured);
            for (var i=0; i<2; i++) {
                whiteCapturedBoard.push([]);
                var whiteCapturedRow = document.createElement("tr");
                whiteCaptured.appendChild(whiteCapturedRow);
                for (var j=0; j<6; j++) {
                    var whiteCapturedCell = document.createElement("td");
                    whiteCapturedRow.appendChild(whiteCapturedCell);
                    if (i === 0) {
                        whiteCapturedBoard[i][j] = Object.values(black)[j];
                        whiteCaptured.rows[i].cells[j].innerHTML = Object.values(black)[j];
                    }
                    else {
                        whiteCapturedBoard[i][j] = 0;
                        whiteCaptured.rows[i].cells[j].innerHTML = 0;
                    }
                    whiteCapturedCell.classList.add("whitecell")
                }
            }  
}

createGame();

// Syncrhonize 2D array with DOM
function synchronize() {
    var table = document.getElementById("chessboard")
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            table.rows[i].cells[j].innerHTML = board[i][j];
            }
    }
}


var whitetime = [14,60];
var blacktime = [14,60];

var whiteclock = document.getElementById("whitechessclock")
var blackclock = document.getElementById("blackchessclock")
var whitetimestarts = null;
var blacktimestarts = null;

//White Chess Clock Timer
function whiteClockCounter() {
    whitetime[1]--;
    if (whitetime[1] === -1) {
        whitetime[0]--;
        whitetime[1] = 59;
    }
    if(whitetime[1] < 10){
    whiteclock.innerHTML = `${whitetime[0]}:0${whitetime[1]}`
    }
    else{
        whiteclock.innerHTML = `${whitetime[0]}:${whitetime[1]}`
    }
    
}

function whiteClockStart() {
    whiteClockPause();
    whitetimestarts = setInterval(whiteClockCounter,1000);
}

function whiteClockPause() {
    clearInterval(whitetimestarts);
    whitetimestarts = null;
}


//Black Chess Clock Timer
function blackClockCounter() {
    blacktime[1]--;
    if (blacktime[1] === -1) {
        blacktime[0]--;
        blacktime[1] = 59;
    }
    if(blacktime[1] < 10){
        blackclock.innerHTML = `${blacktime[0]}:0${blacktime[1]}`
    }
    else{
            blackclock.innerHTML = `${blacktime[0]}:${blacktime[1]}`
    }
}

function blackClockStart() {
    blackClockPause();
    blacktimestarts = setInterval(blackClockCounter,1000);
}

function blackClockPause() {
    clearInterval(blacktimestarts);
    blacktimestarts = null;
}

var move = [];
move.push("black")

//Toggle clocks between black and white
function toggleClock(move_made = "black") {
    if(move_made === "black") {
        whiteClockStart();
        blackClockPause();
    } else {
        blackClockStart();
        whiteClockPause();
    }
}

toggleClock();

//Check for move/click
var cells = document.querySelectorAll(".chesscell");
    for (var cell of cells) {
    cell.addEventListener('click', pickOrPlace)
    }

var pickedPiece = [];
var capturedPiece = [];

var blackKingPosition = [0,4];
var blackKingMove = [];
var whiteKingPosition = [7,4];
var whiteKingMove = [];
var check = "✓";

function monitorKing(input_piece) {
    switch(input_piece){
        case white.King:
            whiteKingPosition = [pickedPiece[1],pickedPiece[2]];
            if(whiteKingMove.length === 1) {
                whiteKingMove = [];
            }
            break;
        case black.King:
            blackKingPosition = [pickedPiece[1],pickedPiece[2]];
            if(blackKingMove.length === 1) {
                whiteKingMove = [];
            }
            break;
    }
    return        
}

function positionKing() {
    for (var i=0; i<8; i++){
        for (var j=0; j<8; j++){
            switch(board[i][j]) {
                case white.King:
                    whiteKingPosition = [i,j]
                    break;
                case black.King:
                    blackKingPosition = [i,j]
                    break;
            }
        }
    }
}


//Click function. Toggle between black and white. Pick Up Piece or Drop a Piece
function pickOrPlace() {
    var coor = this.getAttribute("data").split("-");
    var x = parseInt(coor[0]);
    var y = parseInt(coor[1]);
    var piece = this.textContent
    var whitepiece = Object.values(white).includes(piece);
    var blackpiece = Object.values(black).includes(piece);
    var movesound = new Audio("assets/MoveSound.mp4");
    movesound.play();

    //Pick piece
    if(pickedPiece.length === 0 && move[0] === "black" && whitepiece) {
        pickedPiece = [piece,x,y]
        lastMoveWhite = [...pickedPiece];
    } else if(pickedPiece.length === 0 && move[0] === "white" && blackpiece) {
        pickedPiece = [piece,x,y]
        lastMoveBlack = [...pickedPiece];

    //Drop piece
    //White Move
    } else if(pickedPiece.length !== 0 && move[0] === "black") {
        capturedPiece.push(board[x][y])
        lastMoveWhite[3] = x;
        lastMoveWhite[4] = y;

        if(x === pickedPiece[1] && y === pickedPiece[2]) {
            pickedPiece = [];
            capturedPiece.pop();
            return;
        }
        else if (validMove(pickedPiece[0],x,y)) {
            board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
            board[x][y] = pickedPiece[0];
            positionKing();
            capture();
            if (!whiteIsCheck(whiteKingPosition[0],whiteKingPosition[1])) {
                if(pickedPiece[0] === white.Pawn && x === 0){
                    whitePawnPromotion();
                }
                else {
                    move.pop();
                    move.push("white");
                    toggleClock(move[0]);
                    pickedPiece = [];
                    positionKing();
                    synchronize();
                    gameOver();
                }
                
            }
            else {
                board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                board[x][y] = capturedPiece[capturedPiece.length-1];
                monitorKing(pickedPiece[0]);
                capture();
                capturedPiece.pop();
                pickedPiece = [];
                synchronize();
                alert('Invalid move');
                }  
        }
        else {
            board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
            board[x][y] = capturedPiece[capturedPiece.length-1];
            capturedPiece.pop();
            pickedPiece = [];
            synchronize();
            alert('Invalid move');
            }

    // Black Move  
    } else if(pickedPiece.length !== 0 && move[0] === "white") {
        capturedPiece.push(board[x][y]);
        lastMoveBlack[3] = x;
        lastMoveBlack[4] = y;
        if(x === pickedPiece[1] && y === pickedPiece[2]) {
            pickedPiece = [];
            capturedPiece.pop();
            return;
        }
        else if (validMove(pickedPiece[0],x,y)) {
            board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
            board[x][y] = pickedPiece[0];
            positionKing();
            capture();
            if(!blackIsCheck(blackKingPosition[0],blackKingPosition[1])) {
                if(pickedPiece[0] === black.Pawn && x === 7) {
                    blackPawnPromotion();
                }
                else {
                    move.pop();
                    move.push("black");
                    toggleClock(move[0]);
                    pickedPiece = [];
                    positionKing();
                    synchronize();
                    gameOver();
                }
            }
            else {
                board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                board[x][y] = capturedPiece[capturedPiece.length-1];
                monitorKing(pickedPiece[0]);
                capture();
                capturedPiece.pop();
                pickedPiece = [];
                synchronize();
                alert('Invalid move');
            }
            
        }
        else {
            board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
            board[x][y] = capturedPiece[capturedPiece.length-1];
            capturedPiece.pop();
            pickedPiece = [];
            synchronize();
            alert('Invalid move');
        }
    }
}

var output = [0,0,0,0,0,0,0,0,0,0,0,0];

//Record Captured Pieces
function capture() {
    var blackCapturedArr = Object.values(white);
    var whiteCapturedArr = Object.values(black);
    var CapturedArr = whiteCapturedArr.concat(blackCapturedArr)
    for (i=0; i<CapturedArr.length ;i++) {
        var counter = 0;
        capturedPiece.forEach(element => {
            if (element === CapturedArr[i]) {
                counter++;
            }
        });
        output[i] = counter;
    }
    var blackCapturedArrBoard = document.getElementById("blackcaptured");
    var whiteCapturedArrBoard = document.getElementById("whitecaptured");
    for (var j=0; j<6; j++) {
        blackCapturedArrBoard.rows[1].cells[j].innerHTML = output[j+6];
        whiteCapturedArrBoard.rows[1].cells[j].innerHTML = output[j];
    }
    if(blackIsCheck(blackKingPosition[0],blackKingPosition[1])) {
        whiteCapturedArrBoard.rows[1].cells[5].innerHTML = check;
        whiteCapturedArrBoard.rows[1].classList.add("red")
    }
    else {
        whiteCapturedArrBoard.rows[1].classList.remove("red")
    }

    if(whiteIsCheck(whiteKingPosition[0],whiteKingPosition[1])) {
        blackCapturedArrBoard.rows[1].cells[5].innerHTML = check;
        blackCapturedArrBoard.rows[1].classList.add("red")
    }
    else {
        blackCapturedArrBoard.rows[1].classList.remove("red")
    }
}  

//Check if move is valid
function validMove(input_piece,x,y) {
    switch (input_piece){
        case white.Pawn:
            return whitePawnMove(x,y);
        case black.Pawn:
            return blackPawnMove(x,y);
        case white.Knight:
            return knightMove(input_piece,x,y);
        case black.Knight:
            return knightMove(input_piece,x,y);
        case white.Bishop:
            return bishopMove(input_piece,x,y);
        case black.Bishop:
            return bishopMove(input_piece,x,y);
        case white.Rook:
            return rookMove(input_piece,x,y);
        case black.Rook:
            return rookMove(input_piece,x,y);
        case white.Queen:
            return queenMove(input_piece,x,y);
        case black.Queen:
            return queenMove(input_piece,x,y);
        case white.King:
            return Boolean(kingMove(input_piece,x,y) || castling(input_piece,x,y));
        case black.King:
            return Boolean(kingMove(input_piece,x,y) || castling(input_piece,x,y));
    }
        
}

var lastMoveWhite = [];
var lastMoveBlack = [];

function whitePawnMove(x,y) {
    var startmove_whitepawn = y === pickedPiece[2] && pickedPiece[1] === 6 && x === 4 && board[4][y] === EMPTY;
    var midmove_whitepawn = y === pickedPiece[2] && pickedPiece[1] - x === 1 && board[x][y] === EMPTY;
    var whitepawn_tocapture = (x===pickedPiece[1]-1 && y===pickedPiece[2]+1 && board[pickedPiece[1]-1][pickedPiece[2]+1] !== EMPTY && 
                                Object.values(black).includes(board[pickedPiece[1]-1][pickedPiece[2]+1])) || 
                                (x===pickedPiece[1]-1 && y===pickedPiece[2]-1 && board[pickedPiece[1]-1][pickedPiece[2]-1] !== EMPTY && 
                                Object.values(black).includes(board[pickedPiece[1]-1][pickedPiece[2]-1]))            
    var whitepawn_enpassant = lastMoveBlack[0] === black.Pawn && lastMoveBlack[1] === 1 && lastMoveBlack[3] === pickedPiece[1] && 
                                lastMoveBlack[3] - x === 1 && y === lastMoveBlack[4];
    

    if (whitepawn_enpassant) {
        capturedPiece.push(board[lastMoveBlack[3]][lastMoveBlack[4]])
        board[lastMoveBlack[3]][lastMoveBlack[4]] = EMPTY;
        return true;
    }
    if (startmove_whitepawn || midmove_whitepawn || whitepawn_tocapture) {
        return true;
    }
    return false;
}

function blackPawnMove(x,y) {
    var startmove_blackpawn = y === pickedPiece[2] && pickedPiece[1] === 1 && x === 3 && board[3][y] === EMPTY;
    var midmove_blackpawn = y === pickedPiece[2] && board[x][y] === EMPTY && x - pickedPiece[1] === 1;
    var blackpawn_tocapture = (x===pickedPiece[1]+1 && y===pickedPiece[2]-1 && board[pickedPiece[1]+1][pickedPiece[2]-1] !== EMPTY && 
                                Object.values(white).includes(board[pickedPiece[1]+1][pickedPiece[2]-1])) || 
                                (x===pickedPiece[1]+1 && y===pickedPiece[2]+1 && board[pickedPiece[1]+1][pickedPiece[2]+1] !== EMPTY && 
                                Object.values(white).includes(board[pickedPiece[1]+1][pickedPiece[2]+1]));
    var blackpawn_enpassant = lastMoveWhite[0] === white.Pawn && lastMoveWhite[1] === 6 && lastMoveWhite[3] === pickedPiece[1] &&
                                 x - lastMoveWhite[3] === 1 && y === lastMoveWhite[4];                  
    
    if(blackpawn_enpassant) {
        capturedPiece.push(board[lastMoveWhite[3]][lastMoveWhite[4]])
        board[lastMoveWhite[3]][lastMoveWhite[4]] = EMPTY;
        return true;
    }
    if (startmove_blackpawn || midmove_blackpawn || blackpawn_tocapture) {
        return true;
    }
    return false;
}

function knightMove(piece,x,y) {
    var knight_move = board[x][y] === EMPTY && ((Math.abs(pickedPiece[1]-x) === 1 && Math.abs(pickedPiece[2]-y) === 2 ) || 
                        (Math.abs(pickedPiece[1]-x) === 2 && Math.abs(pickedPiece[2]-y) === 1));
    var blackknight_tocapture = (Object.values(black).includes(piece) && Object.values(white).includes(board[x][y])) && 
                                ((Math.abs(pickedPiece[1]-x) === 1 && Math.abs(pickedPiece[2]-y) === 2 ) || 
                                (Math.abs(pickedPiece[1]-x) === 2 && Math.abs(pickedPiece[2]-y) === 1));
    var whiteknight_tocapture = (Object.values(white).includes(piece) && Object.values(black).includes(board[x][y])) && 
                                ((Math.abs(pickedPiece[1]-x) === 1 && Math.abs(pickedPiece[2]-y) === 2 ) || 
                                (Math.abs(pickedPiece[1]-x) === 2 && Math.abs(pickedPiece[2]-y) === 1));
    
    if (knight_move || blackknight_tocapture || whiteknight_tocapture) {
        return true;
    }
    return false;
}

function bishopMove(piece,x,y) {
    var bishop_move_NW = x === pickedPiece[1] - Math.abs(x-pickedPiece[1]) && y === pickedPiece[2] - Math.abs(x-pickedPiece[1]);
    var bishop_move_NE = x === pickedPiece[1] - Math.abs(x-pickedPiece[1]) && y === pickedPiece[2] + Math.abs(x-pickedPiece[1]);
    var bishop_move_SW = x === pickedPiece[1] + Math.abs(x-pickedPiece[1]) && y === pickedPiece[2] - Math.abs(x-pickedPiece[1]);
    var bishop_move_SE = x === pickedPiece[1] + Math.abs(x-pickedPiece[1]) && y === pickedPiece[2] + Math.abs(x-pickedPiece[1]);
    var whitebishop_tocapture = Object.values(white).includes(piece) && Object.values(black).includes(board[x][y]);
    var blackbishop_tocapture = Object.values(black).includes(piece) && Object.values(white).includes(board[x][y]);
    var NW = [];
    var NE = [];
    var SW = [];
    var SE = [];

    for (var i=1; i<Math.abs(x-pickedPiece[1]); i++){
        if (bishop_move_NW && board[pickedPiece[1] - i][pickedPiece[2] - i] !== EMPTY) {
            NW.push(false);
        }
        else if (bishop_move_NE && board[pickedPiece[1] - i][pickedPiece[2] + i] !== EMPTY) {
            NE.push(false);
        }
        else if (bishop_move_SW && board[pickedPiece[1] + i][pickedPiece[2] - i] !== EMPTY){
            SW.push(false);
        }
        else if (bishop_move_SE && board[pickedPiece[1] + i][pickedPiece[2] + i] !== EMPTY) {
            SE.push(false);
        }
    }
        
    if((board[x][y] === EMPTY || whitebishop_tocapture || blackbishop_tocapture) && 
        (bishop_move_NW || bishop_move_NE || bishop_move_SW || bishop_move_SE) &&
        (!NW.includes(false) && !NE.includes(false) && !SW.includes(false) && !SE.includes(false))) {
        return true;
    }

    return false;
}

function rookMove(piece,x,y) {
    var rook_move_N = x < pickedPiece[1] && y === pickedPiece[2];
    var rook_move_S = x > pickedPiece[1] && y === pickedPiece[2];
    var rook_move_W = x === pickedPiece[1] && y < pickedPiece[2];
    var rook_move_E = x === pickedPiece[1] && y > pickedPiece[2];
    var whiterook_tocapture = Object.values(white).includes(piece) && Object.values(black).includes(board[x][y]);
    var blackrook_tocapture = Object.values(black).includes(piece) && Object.values(white).includes(board[x][y]);
    var N = [];
    var S = [];
    var W = [];
    var E = [];

    for (var i=1; i<Math.abs(x-pickedPiece[1]); i++){
        if (rook_move_N && board[x+i][y] !== EMPTY) {
            N.push(false);
        }
        else if (rook_move_S && board[x-i][y] !== EMPTY) {
            S.push(false);
        }
    }

    for (var i=1; i<Math.abs(y-pickedPiece[2]); i++){
        if (rook_move_W && board[x][y+i] !== EMPTY) {
            W.push(false);
        }
        else if (rook_move_E && board[x][y-i] !== EMPTY) {
            E.push(false);
        }
    }

    if((board[x][y] === EMPTY || whiterook_tocapture || blackrook_tocapture) && 
        (rook_move_N || rook_move_S || rook_move_W || rook_move_E ) &&
        (!N.includes(false) && !S.includes(false) && !W.includes(false) && !E.includes(false))) {
        if(pickedPiece[1] === 0 && pickedPiece[2] === 0) {
            blackRookLeft.push(true)
        }
        else if (pickedPiece[1] === 0 && pickedPiece[2] === 7) {
            blackRookRight.push(true)
        }
        else if (pickedPiece[1] === 7 && pickedPiece[2] === 0) {
            whiteRookLeft.push(true)
        }
        else if (pickedPiece[1] === 7 && pickedPiece[2] === 7) {
            whiteRookRight.push(true)
        }
        return true;
    }
    
    return false;
}

function queenMove(piece,x,y) {
    return Boolean(bishopMove(piece,x,y) || rookMove(piece,x,y))
}

function kingMove(piece,x,y) {
    var king_move_vertical = y === pickedPiece[2] && Math.abs(x-pickedPiece[1]) === 1;
    var king_move_horizontal = x === pickedPiece[1] && Math.abs(y-pickedPiece[2]) === 1;
    var king_move_diagonal = Math.abs(x-pickedPiece[1]) === 1 && Math.abs(y-pickedPiece[2]) === 1;
    var whiteking_tocapture = Object.values(white).includes(piece) && Object.values(black).includes(board[x][y]);
    var blackking_tocapture = Object.values(black).includes(piece) && Object.values(white).includes(board[x][y]);

    if(((board[x][y] === EMPTY || whiteking_tocapture || blackking_tocapture) && 
        (king_move_vertical || king_move_horizontal || king_move_diagonal))){
        if(piece === black.King) {
            blackKingMove.push(true);
        } else if (piece === white.King) {
            whiteKingMove.push(true);
        }
        return true;
        
    }

    return false;
}

//Is Black Check?
function blackIsCheck(x,y) {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            switch(board[i][j]) {
                case white.Pawn:
                    let tmpPicked1 = [...pickedPiece];
                    pickedPiece = [white.Pawn,i,j];
                    let checkByPawn = whitePawnMove(x,y);
                    pickedPiece = [...tmpPicked1];
                    if (!checkByPawn) {
                        continue
                    }
                    else {
                        return true;
                    }
                case white.Knight:
                    let tmpPicked2 = [...pickedPiece];
                    pickedPiece = [white.Knight,i,j];
                    let checkByKnight = knightMove(white.Knight,x,y);
                    pickedPiece = [...tmpPicked2];
                    if (!checkByKnight) {
                        continue
                    }
                    else {
                        return true;
                    }
                case white.Bishop:
                    let tmpPicked3 = [...pickedPiece];
                    pickedPiece = [white.Bishop,i,j];
                    let checkByBishop = bishopMove(white.Bishop,x,y);
                    pickedPiece = [...tmpPicked3];
                    if (!checkByBishop) {
                        continue
                    }
                    else {
                        return true;
                    }
                case white.Rook:
                    let tmpPicked4 = [...pickedPiece];
                    pickedPiece = [white.Rook,i,j];
                    let checkByRook = rookMove(white.Rook,x,y);
                    pickedPiece = [...tmpPicked4];
                    if (!checkByRook) {
                        continue
                    }
                    else {
                        return true;
                    }
                case white.Queen:
                    let tmpPicked5 = [...pickedPiece];
                    pickedPiece = [white.Queen,i,j];
                    let checkByQueen = queenMove(white.Queen,x,y);
                    pickedPiece = [...tmpPicked5];
                    if (!checkByQueen) {
                        continue
                    }
                    else {
                        return true;
                    }
                case white.King:
                    let tmpPicked6 = [...pickedPiece];
                    pickedPiece = [white.King,i,j];
                    let checkByKing = kingMove(white.King,x,y);
                    pickedPiece = [...tmpPicked6];
                    if (!checkByKing) {
                        continue
                    }
                    else {
                        return true;
                    }
                default:
                    continue;
                    
            }

        }
    }
    return false;
}

//Is White Check?
function whiteIsCheck(x,y) {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            switch(board[i][j]) {
                case black.Pawn:
                    let tmpPicked1 = [...pickedPiece];
                    pickedPiece = [black.Pawn,i,j];
                    let checkByPawn = blackPawnMove(x,y);
                    pickedPiece = [...tmpPicked1];
                    if (!checkByPawn) {
                        continue
                    }
                    else {
                        return true;
                    }
                case black.Knight:
                    let tmpPicked2 = [...pickedPiece];
                    pickedPiece = [black.Knight,i,j];
                    let checkByKnight = knightMove(black.Knight,x,y);
                    pickedPiece = [...tmpPicked2];
                    if (!checkByKnight) {
                        continue
                    }
                    else {
                        return true;
                    }
                case black.Bishop:
                    let tmpPicked3 = [...pickedPiece];
                    pickedPiece = [black.Bishop,i,j];
                    let checkByBishop = bishopMove(black.Bishop,x,y);
                    pickedPiece = [...tmpPicked3];
                    if (!checkByBishop) {
                        continue
                    }
                    else {
                        return true;
                    }
                case black.Rook:
                    let tmpPicked4 = [...pickedPiece];
                    pickedPiece = [black.Rook,i,j];
                    let checkByRook = rookMove(black.Rook,x,y);
                    pickedPiece = [...tmpPicked4];
                    if (!checkByRook) {
                        continue
                    }
                    else {
                        return true;
                    }
                case black.Queen:
                    let tmpPicked5 = [...pickedPiece];
                    pickedPiece = [black.Queen,i,j];
                    let checkByQueen = queenMove(black.Queen,x,y);
                    pickedPiece = [...tmpPicked5];
                    if (!checkByQueen) {
                        continue
                    }
                    else {
                        return true;
                    }
                case black.King:
                    let tmpPicked6 = [...pickedPiece];
                    pickedPiece = [black.King,i,j];
                    let checkByKing = kingMove(black.King,x,y);
                    pickedPiece = [...tmpPicked6];
                    if (!checkByKing) {
                        continue
                    }
                    else {
                        return true;
                    }
                default:
                    continue;
            }

        }
    }
    return false;
}

blackRookRight = [];
blackRookLeft = [];
whiteRookRight = [];
whiteRookLeft = [];

function castling(piece,x,y) {
    var castle_left = y === pickedPiece[2]-2 && x === pickedPiece[1];
    var castle_right = y === pickedPiece[2]+2 && x === pickedPiece[1];
    var white_right = !whiteKingMove.includes(true) && !whiteRookRight.includes(true);
    var white_left = !whiteKingMove.includes(true) && !whiteRookLeft.includes(true);
    var black_right = !blackKingMove.includes(true) && !blackRookRight.includes(true);
    var black_left = !blackKingMove.includes(true) && !blackRookLeft.includes(true);
    var white_adjacent_not_check_left = Object.values(white).includes(piece) && 
        !whiteIsCheck(whiteKingPosition[0], whiteKingPosition[1]-1);
    var white_adjacent_not_check_right = Object.values(white).includes(piece) && 
        !whiteIsCheck(whiteKingPosition[0], whiteKingPosition[1]+1);
    var black_adjacent_not_check_left = Object.values(black).includes(piece) && 
        !blackIsCheck(blackKingPosition[0], blackKingPosition[1]-1);
    var black_adjacent_not_check_right = Object.values(black).includes(piece) && 
        !blackIsCheck(blackKingPosition[0], blackKingPosition[1]+1);

    if(board[x][y] === EMPTY && castle_left && black_left && black_adjacent_not_check_left && board[x][y+1] === EMPTY) {
        board[0][3] = black.Rook;
        board[0][0] = EMPTY;
        return true;
    }
    else if(board[x][y] === EMPTY && castle_right && black_right && black_adjacent_not_check_right && board[x][y-1] === EMPTY) {
        board[0][5] = black.Rook;
        board[0][7] = EMPTY;
        return true;
    }
    else if(board[x][y] === EMPTY && castle_left && white_left && white_adjacent_not_check_left && board[x][y+1] === EMPTY) {
        board[7][3] = white.Rook;
        board[7][0] = EMPTY;
        return true;
    }
    else if(board[x][y] === EMPTY && castle_right && white_right && white_adjacent_not_check_right && board[x][y-1] === EMPTY) {
        board[7][5] = white.Rook;
        board[7][7] = EMPTY;
        return true;
    }

    return false;
}

//Draw the Modal for white pawn promotion
function drawWhitePromotion() {
    var modal = document.createElement("div")
    modal.id = "whiteModal"
    document.body.appendChild(modal);
    var whiteModalTable = document.createElement("table")
    whiteModalTable.classList.add("PromotionTable")
    modal.appendChild(whiteModalTable);
    var whiteModalRow = document.createElement("tr")
    whiteModalTable.appendChild(whiteModalRow)
    for (var i=0; i<4 ; i++) {
        var whiteModalCell = document.createElement("td")
        whiteModalCell.classList.add("blackcell")
        whiteModalCell.classList.add("officers")
        whiteModalRow.appendChild(whiteModalCell)
        whiteModalTable.rows[0].cells[i].innerText = whiteOff[i]
    }
}

drawWhitePromotion();

//Show white promotion choices
function whitePawnPromotion() {
    document.getElementById("whiteModal").style.display = "flex";
    var promote_sound = new Audio("assets/promotion.mp4")
    promote_sound.play();
}

////Draw the Modal for black pawn promotion
function drawBlackPromotion() {
    var bmodal = document.createElement("div")
    bmodal.id = "blackModal"
    document.body.appendChild(bmodal);
    var blackModalTable = document.createElement("table")
    blackModalTable.classList.add("PromotionTable")
    bmodal.appendChild(blackModalTable);
    var blackModalRow = document.createElement("tr")
    blackModalTable.appendChild(blackModalRow)
    for (var i=0; i<4 ; i++) {
        var blackModalCell = document.createElement("td")
        blackModalCell.classList.add("whitecell")
        blackModalCell.classList.add("officers")
        blackModalRow.appendChild(blackModalCell)
        blackModalTable.rows[0].cells[i].innerText = blackOff[i]
    }
}

drawBlackPromotion();

//Show black promotion choices
function blackPawnPromotion() {
    document.getElementById("blackModal").style.display = "flex";
    var promote_sound = new Audio("assets/promotion.mp4")
    promote_sound.play();
}

//Promotion Choices for Black and White
var officers = document.querySelectorAll(".officers");
for (var officer of officers) {
    officer.addEventListener('click', promotion)
}

function promotion() {
    pickedPiece[0] = this.textContent;
    document.getElementById("whiteModal").style.display = "none";
    document.getElementById("blackModal").style.display = "none";
    for (var i=0; i<8; i++) {
        if(board[0][i] === white.Pawn) {
            board[0][i] = pickedPiece[0];
            board[1][i] = EMPTY;
            move.pop();
            move.push("white");
            toggleClock(move[0]);
            pickedPiece = [];
            positionKing();
            synchronize();
            capture();
            gameOver();
            return true;
        }
        else if(board[7][i] === black.Pawn) {
            board[7][i] = pickedPiece[0];
            board[6][i] = EMPTY;
            move.pop();
            move.push("black");
            toggleClock(move[0]);
            pickedPiece = [];
            positionKing();
            synchronize();
            capture();
            gameOver();
            return true;
        }
    }
}



//Check for possible moves
function whitePossiblePawnMove() {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            if(whitePawnMove(i,j)){
                capturedPiece.push(board[i][j])
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!whiteIsCheck(whiteKingPosition[0],whiteKingPosition[1])) {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                }
                
            }
                
        }
    }
    return false;
}

function blackPossiblePawnMove() {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            if(blackPawnMove(i,j)) {
                capturedPiece.push(board[i][j])
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!blackIsCheck(blackKingPosition[0],blackKingPosition[1])) {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();

                }
            }
        }
    }
    return false;
}

function possibleKnightMove(piece) {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            if(piece === white.Knight && knightMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!whiteIsCheck(whiteKingPosition[0],whiteKingPosition[1])) {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }   
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                }
            }
            else if(piece === black.Knight && knightMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!blackIsCheck(blackKingPosition[0],blackKingPosition[1])){
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                }
                
            }
        }
    }
    return false;
}

function possibleBishopMove(piece) {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            if(piece === white.Bishop && bishopMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!whiteIsCheck(whiteKingPosition[0],whiteKingPosition[1])) {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }   
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                }
            }
            else if(piece === black.Bishop && bishopMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!blackIsCheck(blackKingPosition[0],blackKingPosition[1])){
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                }
            }
        }
    }
    return false;
}

function possibleRookMove(piece) {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            if(piece === white.Rook && rookMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!whiteIsCheck(whiteKingPosition[0],whiteKingPosition[1])) {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }   
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                }
            }
            else if(piece === black.Rook && rookMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!blackIsCheck(blackKingPosition[0],blackKingPosition[1])){
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                }
            }
        }
    }
    return false;
}

function possibleQueenMove(piece) {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            if(piece === white.Queen && queenMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!whiteIsCheck(whiteKingPosition[0],whiteKingPosition[1])) {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }   
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                }
            }
            else if(piece === black.Queen && queenMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                if(!blackIsCheck(blackKingPosition[0],blackKingPosition[1])){
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    return true;
                }
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                }
            }
        }
    }
    return false;
}

function possibleKingMove(piece) {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            if(piece === white.King && kingMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                positionKing();
                if(!whiteIsCheck(whiteKingPosition[0],whiteKingPosition[1])) {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    positionKing();
                    return true;
                }   
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    positionKing();
                }
            }
            else if(piece === black.King && kingMove(piece,i,j)) {
                capturedPiece.push(board[i][j]);
                board[pickedPiece[1]][pickedPiece[2]] = EMPTY;
                board[i][j] = pickedPiece[0];
                positionKing();
                if(!blackIsCheck(blackKingPosition[0],blackKingPosition[1])){
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    positionKing();
                    return true;
                }
                else {
                    board[pickedPiece[1]][pickedPiece[2]] = pickedPiece[0];;
                    board[i][j] = capturedPiece[capturedPiece.length-1];
                    capturedPiece.pop();
                    positionKing();
                }
            }
        }
    }
    return false;
}


//Check if there are still moves for white
function possibleWhiteMoves() {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            switch(board[i][j]) {
                case white.Pawn:
                    let tmpPicked1 = [...pickedPiece];
                    pickedPiece = [white.Pawn,i,j];
                    let possibleMove1 = whitePossiblePawnMove();
                    pickedPiece = [...tmpPicked1];
                    if (possibleMove1) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case white.Knight:
                    let tmpPicked2 = [...pickedPiece];
                    pickedPiece = [white.Knight,i,j];
                    let possibleMove2 = possibleKnightMove(white.Knight);
                    pickedPiece = [...tmpPicked2];
                    if (possibleMove2) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case white.Bishop:
                    let tmpPicked3 = [...pickedPiece];
                    pickedPiece = [white.Bishop,i,j];
                    let possibleMove3 = possibleBishopMove(white.Bishop);
                    pickedPiece = [...tmpPicked3];
                    if (possibleMove3) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case white.Rook:
                    let tmpPicked4 = [...pickedPiece];
                    pickedPiece = [white.Rook,i,j];
                    let possibleMove4 = possibleRookMove(white.Rook);
                    pickedPiece = [...tmpPicked4];
                    if (possibleMove4) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case white.Queen:
                    let tmpPicked5 = [...pickedPiece];
                    pickedPiece = [white.Queen,i,j];
                    let possibleMove5 = possibleQueenMove(white.Queen);
                    pickedPiece = [...tmpPicked5];
                    if (possibleMove5) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case white.King:
                    let tmpPicked6 = [...pickedPiece];
                    pickedPiece = [white.King,i,j];
                    let possibleMove6 = possibleKingMove(white.King);
                    pickedPiece = [...tmpPicked6];
                    if (possibleMove6) {
                        return true;
                    }
                    else {
                        continue;
                    }
                default:
                    continue;
            }
        }
    }
    return false
}

//Check if there are still moves for black
function possibleBlackMoves() {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            switch(board[i][j]) {
                case black.Pawn:
                    let tmpPicked1 = [...pickedPiece];
                    pickedPiece = [black.Pawn,i,j];
                    let possibleMove1 = blackPossiblePawnMove();
                    pickedPiece = [...tmpPicked1];
                    if (possibleMove1) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case black.Knight:
                    let tmpPicked2 = [...pickedPiece];
                    pickedPiece = [black.Knight,i,j];
                    let possibleMove2 = possibleKnightMove(black.Knight);
                    pickedPiece = [...tmpPicked2];
                    if (possibleMove2) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case black.Bishop:
                    let tmpPicked3 = [...pickedPiece];
                    pickedPiece = [black.Bishop,i,j];
                    let possibleMove3 = possibleBishopMove(black.Bishop);
                    pickedPiece = [...tmpPicked3];
                    if (possibleMove3) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case black.Rook:
                    let tmpPicked4 = [...pickedPiece];
                    pickedPiece = [black.Rook,i,j];
                    let possibleMove4 = possibleRookMove(black.Rook);
                    pickedPiece = [...tmpPicked4];
                    if (possibleMove4) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case black.Queen:
                    let tmpPicked5 = [...pickedPiece];
                    pickedPiece = [black.Queen,i,j];
                    let possibleMove5 = possibleQueenMove(black.Queen);
                    pickedPiece = [...tmpPicked5];
                    if (possibleMove5) {
                        return true;
                    }
                    else {
                        continue;
                    }
                case black.King:
                    let tmpPicked6 = [...pickedPiece];
                    pickedPiece = [black.King,i,j];
                    let possibleMove6 = possibleKingMove(black.King);
                    pickedPiece = [...tmpPicked6];
                    if (possibleMove6) {
                        return true;
                    }
                    else {
                        continue;
                    }
                default:
                    continue;
            }
        }
    }
    return false
}

//End of Game
var timeStatus = setInterval(timeOver, 100);
timeStatus;

function timeOver() {
    if(blacktime[0] <= 0 && blacktime[1] <= 0){
        whiteWins();
        
    } else if(whitetime[0] <= 0 && whitetime[1] <= 0) {
        blackWins();
    }
}

function gameOver() {
    if(blackIsCheck(blackKingPosition[0],blackKingPosition[1]) && !possibleBlackMoves()) {
        whiteWins();
    }
    else if(whiteIsCheck(whiteKingPosition[0],whiteKingPosition[1]) && !possibleWhiteMoves()) {
        blackWins();
    }
}

function whiteWins() {
    let endgame_sound = new Audio("assets/EndGame.mp4");
    endgame_sound.play();
    move.pop();
    blackClockPause();
    whiteClockPause();
    clearInterval(timeStatus);
    document.getElementById("whiteWinner").style.display = "flex";
}

function blackWins() {
    let endgame_sound = new Audio("assets/EndGame.mp4");
    endgame_sound.play();
    move.pop();
    whiteClockPause();
    blackClockPause();
    clearInterval(timeStatus);
    document.getElementById("blackWinner").style.display = "flex";
}

//Draw options to end the game
function drawMenu() {
    var offer = document.createElement("div");
    offer.id = "offer";
    document.body.appendChild(offer);
    var menu = document.createElement("div");
    menu.id = "menu";
    offer.appendChild(menu);
    var blackresigns = document.createElement("button");
    blackresigns.id = "blackresigns";
    blackresigns.innerText = "BLACK RESIGNS";
    menu.appendChild(blackresigns);
    var matchdraw = document.createElement("button");
    matchdraw.id = "matchdraw";
    matchdraw.innerText = "STALEMATE";
    menu.appendChild(matchdraw);
    var whiteresigns = document.createElement("button");
    whiteresigns.id = "whiteresigns";
    whiteresigns.innerText = "WHITE RESIGNS";
    menu.appendChild(whiteresigns);
    var close = document.createElement("button");
    close.id = "close";
    close.innerText = "RETURN";
    menu.appendChild(close);
    
}

drawMenu();

var openbtn = document.getElementById("deal");
openbtn.addEventListener('click', openMenu);

function openMenu() {
   document.getElementById("offer").style.display = "flex"
}

var closebtn = document.getElementById("close");
closebtn.addEventListener('click', closeMenu);

function closeMenu() {
    document.getElementById("offer").style.display = "none"
}

drawWhiteWinner();
drawBlackWinner();
drawDraw();

var blackbtn = document.getElementById("blackresigns");
blackbtn.addEventListener('click', blackResign);

function blackResign() {
    whiteWins();
    document.getElementById("offer").style.display = "none";
}

var whitebtn = document.getElementById("whiteresigns");
whitebtn.addEventListener('click', whiteResign);

function whiteResign() {
    blackWins();
    document.getElementById("offer").style.display = "none";
}

var equalbtn = document.getElementById("matchdraw");
equalbtn.addEventListener('click', staleMate);

function staleMate() {
    let endgame_sound = new Audio("assets/EndGame.mp4");
    endgame_sound.play();
    move.pop();
    whiteClockPause();
    blackClockPause();
    clearInterval(timeStatus);
    document.getElementById("stalemate").style.display = "flex";
    document.getElementById("offer").style.display = "none";
}

//White Winner declaration
function drawWhiteWinner() {
    let terminal = document.createElement("div");
    terminal.id = "whiteWinner"
    terminal.classList.add("terminal");
    document.body.appendChild(terminal);
    let container = document.createElement("div");
    container.classList.add("container");
    terminal.appendChild(container);
    let message = document.createElement("span");
    message.classList.add("message");
    message.innerText = `WHITE WINS!`;
    container.appendChild(message);
    let restart = document.createElement("button");
    restart.id = "restartw"
    restart.classList.add("restart");
    restart.innerText = "PLAY AGAIN!";
    container.appendChild(restart);
    
}

var restartbtnw = document.getElementById("restartw");
restartbtnw.addEventListener('click', refresh);

function refresh() {
    location.reload();
}

//Black Winner declaration
function drawBlackWinner() {
    let terminal = document.createElement("div");
    terminal.id = "blackWinner"
    terminal.classList.add("terminal");
    document.body.appendChild(terminal);
    let container = document.createElement("div");
    container.classList.add("container");
    terminal.appendChild(container);
    let message = document.createElement("span");
    message.classList.add("message");
    message.innerText = `BLACK WINS!`;
    container.appendChild(message);
    let restart = document.createElement("button");
    restart.id = "restartb";
    restart.classList.add("restart");
    restart.innerText = "PLAY AGAIN!";
    container.appendChild(restart);
}

var restartbtnb = document.getElementById("restartb");
restartbtnb.addEventListener('click', refresh);

//Draw declaration
function drawDraw() {
    let terminal = document.createElement("div");
    terminal.id = "stalemate"
    terminal.classList.add("terminal");
    document.body.appendChild(terminal);
    let container = document.createElement("div");
    container.classList.add("container");
    terminal.appendChild(container);
    let message = document.createElement("span");
    message.classList.add("message");
    message.innerText = `IT'S A DRAW!`;
    container.appendChild(message);
    let restart = document.createElement("button");
    restart.id = "restartd";
    restart.classList.add("restart");
    restart.innerText = "PLAY AGAIN!";
    container.appendChild(restart);
}

var restartbtnd = document.getElementById("restartd");
restartbtnd.addEventListener('click', refresh);


