document.addEventListener("DOMContentLoaded", () => main());

function main(){
    document.getElementById("chessOddColor").addEventListener("change", () => updateColors())
    document.getElementById("chessEvenColor").addEventListener("change", () => updateColors())
    createBoard()
}
function createBoard(){
    console.log("Making Board")
    var board = document.getElementById("chessboard");
    let size = 8;
    for(let row=0; row<size; row++){
        let rowElement = document.createElement("div");
        rowElement.classList.add("chessRow")
        for(let col=0; col<size; col++){
            let cell = document.createElement("div");
            cell.classList.add("chessCell")
            if((col+row) % 2 === 0) cell.classList.add("chessEven");
            else cell.classList.add("chessOdd");
            rowElement.appendChild(cell);
        }
        board.appendChild(rowElement);
    }
    updateColors()

}

function updateColors(){
    let chessOdd =  document.getElementsByClassName("chessOdd");
    let chessEven = document.getElementsByClassName("chessEven")
    let oddColor = document.getElementById("chessOddColor").value;
    let evenColor = document.getElementById("chessEvenColor").value;
    for(let i=0; i<chessOdd.length; i++) chessOdd.item(i).style.backgroundColor = oddColor;
    for(let i=0; i<chessEven.length; i++) chessEven.item(i).style.backgroundColor = evenColor;

}