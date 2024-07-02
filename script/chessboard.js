document.addEventListener("DOMContentLoaded", () => createBoard());
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
            if((col+row) % 2 === 0) cell.classList.add("even");
            else cell.classList.add("odd");
            rowElement.appendChild(cell);
        }
        board.appendChild(rowElement);
    }

}