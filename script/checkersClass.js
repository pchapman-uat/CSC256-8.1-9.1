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
    beginBoard(){
        let whitePices = 0;
        let blackPices = 0;
        for(let i=0; i < 3; i++){
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                if(!((j+i) % 2 === 0)) {
                    this.board[i][j] = new Piece(TEAM.WHITE, i, j, whitePices)
                    this.board[i][j].makeElement();
                    whitePices++;
                }
            }
        }
        for(let i=this.board.length-1; i > this.board.length-4; i--){
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                if(!((j+i) % 2 === 0)) {
                    this.board[i][j] = new Piece(TEAM.BLACK, i, j, blackPices)
                    this.board[i][j].makeElement();
                    blackPices++;
                }

            }
        }
        console.log(this.board)
    }
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
    movePiece(piece, row, col){
        if(this.getPiece(row,col)) return;
        this.board[row][col] = piece
        this.board[piece.row][piece.col] = null
        piece.move(row, col)
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
     * @returns {String}
     */
    getIDString(){
        return `${this.team}-piece-${this.index}`
    }
    move(row, col){
        this.row = row;
        this.col = col;
        let cell = document.getElementById(`${this.row}-${this.col}`)
        let element = document.getElementById(this.getIDString())
        cell.appendChild(element)
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