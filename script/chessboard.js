import { Board } from "./checkersClass.js";

// Begin main function on load
document.addEventListener("DOMContentLoaded", () => main());

const defaultColors = {
    odd: "#000000",
    even: "#ffffff",
    topPlayer: "#ffffff",
    bottomPlayer: "#000000"
};
let checkersBoard = new Board();
var lastDraggedCell = null;
function main(){
    // Bind the update colors functions to the color inputs
    document.getElementById("chessOddColor").addEventListener("input", () => updateColors())
    document.getElementById("chessEvenColor").addEventListener("input", () => updateColors())
    document.getElementById("topPlayerColor").addEventListener("input", () => updateColors())
    document.getElementById("bottomPlayerColor").addEventListener("input", () => updateColors())
    document.getElementById("resetColors").addEventListener("click", (e) => resetColors(e))
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
            cell.addEventListener("dragover", (e) => lastDraggedCell = cell.id)
            cell.addEventListener("dragend", () => handleDrop(lastDraggedCell, row, col))
            cell.setAttribute("id", `${row}-${col}`)
            // Add the cell to the row
            rowElement.appendChild(cell);
        }
        // Add the row to the board
        board.appendChild(rowElement);
    }
    checkersBoard.beginBoard();
    resetColors()
}


function handleDrop(id, oldRow, oldCol){
    console.log("Dropped")
    console.log("From: " + oldRow + ", " + oldCol)
    let newRow = parseInt(id.split("-")[0]);
    let newCol = parseInt(id.split("-")[1]);
    console.log("To: " + newRow + ", " + newCol)
    checkersBoard.movePiece
}
function updateColors(){
    console.log("Updating colors")
    // Get all odd cells
    let chessOdd =  document.getElementsByClassName("chessOdd");
    // Get all even cells
    let chessEven = document.getElementsByClassName("chessEven")
    // Get the odd color
    let oddColor = document.getElementById("chessOddColor").value;
    // Get the even color
    let evenColor = document.getElementById("chessEvenColor").value;
    // Get all top player pices
    let topPlayerPieces = document.getElementsByClassName("white-piece");
    // Get all bottom player pices
    let bottomPlayerPieces = document.getElementsByClassName("black-piece");
    // Get the white piece color
    let topPlayerColor = document.getElementById("topPlayerColor").value;
    console.log(topPlayerColor)
    // Get the black piece color
    let bottomPlayerColor = document.getElementById("bottomPlayerColor").value;
    // For each odd and even cell, set the background color to the respective color
    setAllColor(chessOdd, oddColor);
    setAllColor(chessEven, evenColor);
    setGradient(topPlayerPieces, topPlayerColor);
    setGradient(bottomPlayerPieces, bottomPlayerColor);
    
}

/**
 * 
 * @param {PointerEvent} e - Can be null
 */
function resetColors(e){
    if(e) e.preventDefault();
    document.getElementById("chessOddColor").value = defaultColors.odd;
    document.getElementById("chessEvenColor").value = defaultColors.even;
    document.getElementById("topPlayerColor").value = defaultColors.topPlayer;
    document.getElementById("bottomPlayerColor").value = defaultColors.bottomPlayer;
    updateColors()
}
/**
 * 
 * @param {HTMLCollectionOf<Element>} elements 
 * @param {String} color 
 */
function setAllColor(elements, color){
    for(let i=0; i<elements.length; i++) elements.item(i).style.backgroundColor = color;
}
function setGradient(elements, color){
    for(let i=0; i<elements.length; i++) elements.item(i).style.backgroundImage = radialGradient(color);
}


function radialGradient(color){
    let amnt = 75
    color = parseHex(color) 
    // If value is < amnt add amnt, else subtract amnt
    let color2 = {
        r: color.r < amnt ? color.r + amnt : color.r - amnt,
        g: color.g < amnt ? color.g + amnt : color.g - amnt,
        b: color.b < amnt ? color.b + amnt : color.b - amnt
    }
    let result = `radial-gradient(rgb(${color.r}, ${color.g}, ${color.b}), rgba(${color2.r}, ${color2.g}, ${color2.b}))`
    console.log(result)
    return result;
}
function parseHex(hex){
    hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return hex ? {
        r: parseInt(hex[1], 16),
        g: parseInt(hex[2], 16),
        b: parseInt(hex[3], 16)
      } : null;
}