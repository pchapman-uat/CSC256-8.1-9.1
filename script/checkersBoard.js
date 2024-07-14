// Import the board from the checkers class JS file
import { Board } from "./checkersClass.js";

// Begin main function on load
document.addEventListener("DOMContentLoaded", () => main());

// Default color values
const defaultColors = {
    odd: "#000000",
    even: "#ffffff",
    topPlayer: "#ffffff",
    bottomPlayer: "#000000"
};
// Checkers board object
let checkersBoard = new Board();
// Last dragged cell
/**
 * @type {String} id of the last cell that was dragged
 */
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
/**
 * Create the board on the page
 * - This adds event listeners to all cells:
 * - "dragover"
 * - "dragend"
 * - "dragleave"
 */
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
            // Add the event listeners to the cell
            cell.addEventListener("dragover", (e) => onDragOver(e, cell))
            cell.addEventListener("dragend", () => handleDrop(lastDraggedCell, row, col))
            cell.addEventListener("dragleave", (e) => onDragEnd(e, cell))
            // Add the cell id
            cell.setAttribute("id", `${row}-${col}`)
            // Add the cell to the row
            rowElement.appendChild(cell);
        }
        // Add the row to the board
        board.appendChild(rowElement);
    }
    // Begin the board
    checkersBoard.beginBoard();
    // Reset the colors
    resetColors()
}

/**
 * When cell is dragged over add the hover cell class and update the class cell ID
 * @param {DragEvent} e - Event for the drag
 * @param {HTMLDivElement} cell - Cell for the element that was dragged ontop of
 */
function onDragOver(e, cell){
    e.preventDefault();
    lastDraggedCell = cell.id;
    cell.classList.add("hoverCell")
}
/**
 * When cell is no longer being dragged over, remove the hoveCell class
 * @param {DragEvent} e - Unused, can be null
 * @param {HTMLDivElement} cell - Cell for the element that was dragged ontop of
 */
function onDragEnd(e, cell){
    cell.classList.remove("hoverCell")
}
/**
 * When the peice is droped calucate the new row from the cell ID, and move the piece
 * @param {String} id - ID of the cell last dragged over
 * @param {Number} oldRow - Old row of the cell
 * @param {Number} oldCol - Old column of the cell
 * @see {@link Board.getAndMove()} - Move the piece
 */
function handleDrop(id, oldRow, oldCol){
    console.log("Dropped")
    console.log("From: " + oldRow + ", " + oldCol)
    let newRow = parseInt(id.split("-")[0]);
    let newCol = parseInt(id.split("-")[1]);
    console.log("To: " + newRow + ", " + newCol)
    checkersBoard.getAndMove(oldRow, oldCol, newRow, newCol)
    document.getElementById(id).classList.remove("hoverCell")
}
/**
 * Update the colors of the cells
 * @see {@link setAllColor()} - Set the color of all cells
 * @see {@link setGradient()} - Caluate a gradient color for all cells
 */
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

    document.getElementById("playerOneBar").style.backgroundColor = topPlayerColor;
    document.getElementById("playerTwoBar").style.backgroundColor = bottomPlayerColor;

    // For each odd and even cell, set the background color to the respective color
    setAllColor(chessOdd, oddColor);
    setAllColor(chessEven, evenColor);
    setGradient(topPlayerPieces, topPlayerColor);
    setGradient(bottomPlayerPieces, bottomPlayerColor);
    
}

/**
 * Reset the colors using the default values
 * @param {?PointerEvent} e - Event for the click
 * @see {@link updateColors()} - Update the colors
 * @see {@link defaultColors} - Default colors
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
 * Set all cells to have the color string
 * @param {HTMLCollectionOf<Element>} elements - HTML elements
 * @param {String} color - Color string to set the cells to 
 */
function setAllColor(elements, color){
    for(let i=0; i<elements.length; i++) elements.item(i).style.backgroundColor = color;
}
/**
 * Set all cells to have a gradient color
 * @param {HTMLCollection<Element} elements - HTML elements
 * @param {String} color - String of the color to calulate the gradient (HEX value)
 * @see {@link radialGradient()} - Caluate a gradient color for all cells
 */
function setGradient(elements, color){
    for(let i=0; i<elements.length; i++) elements.item(i).style.backgroundImage = radialGradient(color);
}

/**
 * Caluate a gradient color for all cells
 * @param {String} color - Color string to calulate the gradient
 * @see {@link parseHex} - Parse a hex color string
 * @returns {String} - CSS Gradient String
 */
function radialGradient(color){
    // Get the amount to add or subtract
    let amnt = 75
    // Parse the hex value
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
/**
 * @typedef rgb
 * @param {Number} r - Red value
 * @param {Number} g - Green value
 * @param {Number} b - Blue value
 */
/**
 * Creates a rgb object from a hex string
 * @param {String} hex - Hex string
 * @returns {?rgb} - rgb object or null if invalid
 */
function parseHex(hex){
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    // Code found online
    hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    // Ret
    return hex ? {
        r: parseInt(hex[1], 16),
        g: parseInt(hex[2], 16),
        b: parseInt(hex[3], 16)
      } : null;
}