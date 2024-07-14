/**
 * A class representing a chess/checkers board
 * This handles logic of the board and will contain an array of pices
 */
class Board {
    /**
     * An array containing all pices in the board
     * - 8x8 array containing {@link Piece} objects
     * - If a piece is null there is no piece at that location
     * @see {@link Piece}
     * @type {Array<Array<?Piece>}
     */
    board = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
    ]
    whitePices = 0;
    blackPices = 0;

    /**
     * Iterate through the array of pices, while creating html elements
     * - Creates a {@link Piece} at the index from the {@link board} array
     * - Calls {@link Piece.makeElement()} to make the html element
     * - This happens twice for White and Black teams
     * - After creating elements it will call {@link updatePlayerStats()}
     * @see {@link board}
     * @see {@link Piece}
     */
    beginBoard(){
        // Iterate through top 3 rows
        for(let i=0; i < 3; i++){
            // Iterate through all colums
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                // If the index is even, make a white piece
                if(!((j+i) % 2 === 0)) {
                    this.board[i][j] = new Piece(TEAM.WHITE, i, j, this.whitePices)
                    this.board[i][j].makeElement();
                    this.whitePices++;
                }
            }
        }
        // Iterate through bottom 3 rows
        for(let i=this.board.length-1; i > this.board.length-4; i--){
            // Iterate through all colums
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                // If the index is even, make a black piece
                if(!((j+i) % 2 === 0)) {
                    this.board[i][j] = new Piece(TEAM.BLACK, i, j, this.blackPices)
                    this.board[i][j].makeElement();
                    this.blackPices++;
                }

            }
        }
        this.updatePlayerStats();
    }
    /**
     * Updates the player stats
     * - It will get the following elements and update them with the respective values
     * - "playerOnePieces" number of remaining pieces
     * - "playerTwoPieces" number of remaining pieces
     * - "playerOneBar" progress bar of remaining pieces
     * - "playerTwoBar" progress bar of remaining pieces
     */
    updatePlayerStats(){
        document.getElementById("playerOnePieces").innerHTML = this.whitePices;
        document.getElementById("playerTwoPieces").innerHTML = this.blackPices;
        document.getElementById("playerOneBar").style.width = (this.whitePices / 12) * 100 + "%";
        document.getElementById("playerTwoBar").style.width = (this.blackPices / 12) * 100 + "%";
    }
    /**
     * Get a cell based on the row and column, and move it to the new row and column
     * @param {Number} oldRow - Row before moving
     * @param {Number} oldCol - Column before moving
     * @param {Number} newRow - Row after moving
     * @param {Number} newCol - Column after moving
     * @see {@link getPiece} - Calls this get the piece object
     * @see {@link movePiece} - Calls this to move the piece 
     */
    getAndMove(oldRow, oldCol, newRow, newCol){
        let piece = this.getPiece(oldRow, oldCol);
        this.movePiece(piece, newRow, newCol); 
    }
    /**
     * Get a piece from the table based on the row and column
     * @param {Number} row - row to get the piece from  
     * @param {Number} col - column to get the piece from
     * @returns {?Piece} - Piece object or null if there is no piece at that location
     */
    getPiece(row, col){
        return this.board[row][col]
    }
    /**
     * Move a piece from one location to another
     * - This function will handle if the pice exits, if the move is valid, and if the move is a valid capture
     * - If the move is valid it will call {@link Piece.move()} to move the piece and update {@link board} with the move
     * - After moved it will check if there is a winner
     * @param {Piece} piece 
     * @param {Number} row 
     * @param {Number} col 
     * 
     * @see {@link getPiece} - Calls this get the piece object
     * @see {@link validateMove} - Calls this to validate the move
     * @see {@link Piece.getCell()} - Calls this to get the cell element
     * @see {@link Piece.move()} - Calls this to move the piece
     * @see {@link winGame} - Calls this to check if there is a winner
     * @returns {void}
     */
    async movePiece(piece, row, col){
        if(this.getPiece(row,col)) return;
        if(!this.validateMove(piece, row, col)) {
            const animationLen = 0.5
            piece.getCell().style.animation = `invalidMove ${animationLen}s`;
            setTimeout(() => {
                piece.getCell().style.animation = "";
            }, animationLen * 1000);
            return;
        };
        this.board[row][col] = piece
        this.board[piece.row][piece.col] = null
        await piece.move(row, col)
        if(this.whitePices == 0 || this.blackPices == 0) this.winGame();
    }

    /**
     * Validate the move based on the current location and destination
     * - This function will check if the move is valid based on the following rules
     * - If the piece is a king, it can move 1 row in any direction
     * - If the piece is a white piece, it can move 1 row down
     * - If the piece is a black piece, it can move 1 row up
     * - If the piece is a white or black piece, it can move 1 column left or right
     * 
     * @param {Piece} piece - Piece object to validate the move of
     * @param {Number} newRow - Row to move the piece to
     * @param {Number} newCol - Column to move the piece to
     * @returns {boolean} - True if the move is valid, false if not
     * @see {@link Piece.remove()} - Removes the piece if jumped over
     * @see {@link Piece}
     */
    validateMove(piece, newRow, newCol){
        // TODO: Add In Depth Comments
        let rowVect=0;
        if(piece.king) rowVect = Math.abs(newRow-piece.row);
        else if(piece.team == TEAM.WHITE) rowVect = newRow-piece.row 
        else if(piece.team == TEAM.BLACK) rowVect = piece.row-newRow;
        console.log(rowVect);
        if(rowVect == 1 && Math.abs(piece.col - newCol) == 1) return true;
        else if(rowVect == 2 && Math.abs(piece.col - newCol) == 2) {
            let jumpedRow;
            let jumpedCol;
            if(piece.king){
                if(piece.row-newRow==-2) jumpedRow = piece.row+1;
                else if(piece.row-newRow==2) jumpedRow = piece.row-1; 
                console.log(jumpedRow)
            }
            else if(piece.team == TEAM.WHITE) jumpedRow = piece.row+1;
            else if(piece.team == TEAM.BLACK) jumpedRow = piece.row-1;
            if(piece.col < newCol) jumpedCol = piece.col+1;
            else if(piece.col > newCol) jumpedCol = piece.col-1;
            let jumpedPiece = this.getPiece(jumpedRow, jumpedCol);
            jumpedPiece.remove();
            if(jumpedPiece){
                console.log("removing piece at: " + jumpedRow + ", " + jumpedCol)
                if(jumpedPiece.team == TEAM.WHITE) this.whitePices--;
                else if(jumpedPiece.team == TEAM.BLACK) this.blackPices--;
                console.log(this.whitePices,this.blackPices)
                this.board[jumpedRow][jumpedCol] = null;
                console.log("Jumping")
                console.log(jumpedPiece)
                this.updatePlayerStats();
                return true;
            }else {
                return false;
            }
            
        }
        else return false;
    }
    /**
     * This function will be called when the user wins the game
     * - This function will update the player stats and display the win screen
     */
    winGame(){
        // TODO: Add in depth comments
        console.log("Win")
        let playerName = "";
        let playerColor = "";
        if(this.whitePices == 0) {
            playerName = document.getElementById("playerTwoName").value;
            playerColor = document.getElementById("bottomPlayerColor").value;
            if(playerName == "") playerName = "Player Two";
        }else if(this.blackPices == 0) {
            playerName = document.getElementById("playerOneName").value;
            playerColor = document.getElementById("topPlayerColor").value;
            if(playerName == "") playerName = "Player One";
        }
        let winScreen = document.getElementById("winScreen");
        let winName = document.getElementById("winName");
        winName.innerHTML = playerName+" wins!"
        console.log(winScreen)
        winScreen.style.backgroundColor = playerColor;
        winScreen.style.visibility = "visible";
    }
}

/**
 * Class for a piece, this will contain a row, column and an index (piece number)
 */
class Piece {
    /**
     * Create a new piece for the board
     * @param {String} team - {@link TEAM} of the piece 
     * @param {Number} row - Row of the piece
     * @param {Number} col - Column of the piece
     * @param {Number} index - Index of the piece (Piece Number)
     */
    constructor(team, row, col, index){
        this.team = team;
        this.row = row;
        this.col = col;
        this.index = index;
        this.king = false;
    }

    /**
     * Make an element by getting the cell and making an element
     */
    makeElement(){
        console.log("Making Element")
        let cell = document.getElementById(`${this.row}-${this.col}`)
        let element = document.createElement("div");
        element.classList.add("piece")
        element.classList.add(this.team+"-piece")
        element.setAttribute("id", this.getIDString())
        element.draggable = true;
        cell.appendChild(element)
    }
    /**
     * Get the HTML element based on the ID
     * @returns {HTMLElement} - HTML element of the piece
     * @see {@link getIDString} - Returns the ID of the piece
     */
    getCell(){
        return document.getElementById(this.getIDString());
    }
    /**
     * Generate the ID string of the element
     * @returns {String}
     * @example `return ${this.team}-piece-${this.index}`
     */
    getIDString(){
        return `${this.team}-piece-${this.index}`
    }
    /**
     * Move the piece to a new location
     * - This will apply an animation to the cell to the new location
     * @example `translate(${deltaCol * 125}%, ${deltaRow * 120}%)`
     * @param {Number} row - New row location
     * @param {Number} col - New column location
     * @returns {Promise<void>} - Promise that resolves when the piece is moved
     * @see {@link getIDString} - get the element
     * @see {@link promote} - Attempt to promote the piece
     */
    move(row, col) {
        // TODO: Add in depth comments
        const startRow = this.row;
        const startCol = this.col;
        this.row = row;
        this.col = col;
        
        let element = document.getElementById(this.getIDString());
        
        element.style.transition = 'transform 0.5s ease';
        
        const deltaRow = row - startRow;
        const deltaCol = col - startCol;
        
        element.style.transform = `translate(${deltaCol * 125}%, ${deltaRow * 120}%)`;
        
        return new Promise(resolve => {
            setTimeout(() => {
                let cell = document.getElementById(`${this.row}-${this.col}`);
                element.style.transform = ''; 
                cell.appendChild(element);
                this.promote();
                resolve();
            }, 500);
        });        
    }
    /**
     * Remove the element from the board
     * - Applies the folowing animation
     * @example `removePiece ${0.5}s ease`
     */
    remove(){
        let element = document.getElementById(this.getIDString())
        const animationLen = 0.5
        element.style.animation = `removePiece ${animationLen}s ease`;
        setTimeout(()=>{
            element.remove()
        }, animationLen * 1000)
    }
    /**
     * Check if a piece can be promoted 
     * - This will check if the piece is a king and if it is in the correct row (row 0 for black, 7 for white)
     * - If it is a king it will add the king class to the element
     */
    promote(){
        console.log("Row: ", this.row)
        console.log("Col: ",this.col)
        console.log("King: ",this.king)
        if(this.king) return; 
        else if(this.team == "black" && this.row == 0) this.king = true;
        else if(this.team == "white" && this.row == 7) this.king = true;
        
        if(this.king) {
            console.log("Is King")
            let element = document.getElementById(this.getIDString());
            console.log(element)
            element.classList.add("pieceKing")
        }
    }
}
/**
 * Types of different teams
 * @typedef TEAM
 * @property {String} WHITE
 * @property {String} BLACK
 */
const TEAM = Object.freeze({
    WHITE: "white",
    BLACK: "black"
});

export { Board, Piece, TEAM};