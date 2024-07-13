class Board {
    /**
     * @type {Array<Array<Piece>}
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
    beginBoard(){
  
        for(let i=0; i < 3; i++){
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                if(!((j+i) % 2 === 0)) {
                    this.board[i][j] = new Piece(TEAM.WHITE, i, j, this.whitePices)
                    this.board[i][j].makeElement();
                    this.whitePices++;
                }
            }
        }
        for(let i=this.board.length-1; i > this.board.length-4; i--){
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                if(!((j+i) % 2 === 0)) {
                    this.board[i][j] = new Piece(TEAM.BLACK, i, j, this.blackPices)
                    this.board[i][j].makeElement();
                    this.blackPices++;
                }

            }
        }
        this.updatePlayerStats();
        console.log(this.board)
    }
    updatePlayerStats(){
        document.getElementById("playerOnePieces").innerHTML = this.whitePices;
        document.getElementById("playerTwoPieces").innerHTML = this.blackPices;
        document.getElementById("playerOneBar").style.width = (this.whitePices / 12) * 100 + "%";
        document.getElementById("playerTwoBar").style.width = (this.blackPices / 12) * 100 + "%";
    }
    /**
     * 
     * @param {Number} oldRow 
     * @param {Number} oldCol 
     * @param {Number} newRow 
     * @param {Number} newCol 
     */
    getAndMove(oldRow, oldCol, newRow, newCol){
        let piece = this.getPiece(oldRow, oldCol);
        this.movePiece(piece, newRow, newCol); 
    }
    getPiece(row, col){
        return this.board[row][col]
    }
    /**
     * 
     * @param {Piece} piece 
     * @param {Number} row 
     * @param {Number} col 
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
     * 
     * @param {Piece} piece 
     * @param {Number} newRow 
     * @param {Number} newCol 
     * @returns {boolean}
     */
    validateMove(piece, newRow, newCol){
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
    winGame(){
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
class Piece {
    /**
     * 
     * @param {TEAM} team 
     * @param {Number} row 
     * @param {Number} col 
     * @param {Number} index
     */
    constructor(team, row, col, index){
        this.team = team;
        this.row = row;
        this.col = col;
        this.index = index;
        this.king = false;
    }

    makeElement(){
        console.log("Making Elemnt")
        let cell = document.getElementById(`${this.row}-${this.col}`)
        let element = document.createElement("div");
        element.classList.add("piece")
        element.classList.add(this.team+"-piece")
        element.setAttribute("id", this.getIDString())
        element.draggable = true;
        cell.appendChild(element)
    }
    /**
     * 
     * @returns {HTMLElement}
     */
    getCell(){
        return document.getElementById(this.getIDString());
    }
    /**
     * 
     * @returns {String}
     */
    getIDString(){
        return `${this.team}-piece-${this.index}`
    }
    move(row, col) {
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
    remove(){
        let element = document.getElementById(this.getIDString())
        const animationLen = 0.5
        element.style.animation = `removePiece ${animationLen}s ease`;
        setTimeout(()=>{
            element.remove()
        }, animationLen * 1000)
    }
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
 * @typedef TEAM
 * @property {String} WHITE
 * @property {String} BLACK
 */
const TEAM = Object.freeze({
    WHITE: "white",
    BLACK: "black"
});

export { Board, Piece, TEAM};