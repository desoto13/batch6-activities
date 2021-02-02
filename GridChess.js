var moves = []
var tile = []

function printID(e) {
    e = e || window.event;
    e = e.target || e.srcElement;
    let el = document.getElementById(e.id);
    let piece = el.innerHTML;    

    if (piece != "" && moves.length == 0) {
        el.classList.toggle("blue");
        moves.push(piece);
        tile.push(el);
    }
    else if (piece == "" && moves.length != 0) {
        el.innerHTML = moves[0];
        tile[0].classList.toggle("blue");
        tile[0].innerHTML = "";
        moves.pop();
        tile.pop();
    }
    else if (piece == "" && moves.length == 0) {
        null;
    }
    else if (piece != "" && moves.length != 0) {
        el.innerHTML = moves[0];
        tile[0].classList.toggle("blue");
        tile[0].innerHTML = "";
        moves.pop();
        tile.pop();
    }
}