// Begin main function on load
document.addEventListener("DOMContentLoaded", () => main());

function main(){
    // Bind the update colors functions to the color inputs
    document.getElementById("chessOddColor").addEventListener("change", () => updateColors())
    document.getElementById("chessEvenColor").addEventListener("change", () => updateColors())
    // Create the chess board
    createBoard()
}
function createBoard(){
    // Get the board element
    var board = document.getElementById("chessboard");
    // Set the size of the board
    let size = 8;
    // Loop through the rows
    for(let row=0; row<size; row++){
        // Create a row element
        let rowElement = document.createElement("div");
        // add the class to the row
        rowElement.classList.add("chessRow")
        // For each collumn/cell
        for(let col=0; col<size; col++){
            // Create cell element
            let cell = document.createElement("div");
            // Add the cell class
            cell.classList.add("chessCell")
            // Check of the row is an even number
            // It will add the col and row index, and then devide it by two, if the reaminder is 0 then it is even
            if((col+row) % 2 === 0) cell.classList.add("chessEven");
            else cell.classList.add("chessOdd");
            // Add the cell to the row
            rowElement.appendChild(cell);
        }
        // Add the row to the board
        board.appendChild(rowElement);
    }
    // Update the collors
    updateColors()

}

function updateColors(){
    // Get all odd cells
    let chessOdd =  document.getElementsByClassName("chessOdd");
    // Get all even cells
    let chessEven = document.getElementsByClassName("chessEven")
    // Get the odd color
    let oddColor = document.getElementById("chessOddColor").value;
    // Get the even color
    let evenColor = document.getElementById("chessEvenColor").value;
    // For each odd and even cell, set the background color to the respective color
    for(let i=0; i<chessOdd.length; i++) chessOdd.item(i).style.backgroundColor = oddColor;
    for(let i=0; i<chessEven.length; i++) chessEven.item(i).style.backgroundColor = evenColor;

}