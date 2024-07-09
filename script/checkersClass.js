class Board {
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
        for(let i=0; i < 3; i++){
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                if(!((j+i) % 2 === 0)) {
                    this.board[i][j] = new Piece(TEAM.WHITE, i, j)
                    this.board[i][j].makeElement();
                }
            }
        }
        for(let i=this.board.length-1; i > this.board.length-4; i--){
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                if(!((j+i) % 2 === 0)) {
                    this.board[i][j] = new Piece(TEAM.BLACK, i, j)
                    this.board[i][j].makeElement();
                }

            }
        }
        console.log(this.board)
    }
}
class Piece {
    /**
     * 
     * @param {TEAM} team 
     * @param {Number} row 
     * @param {Number} col 
     */
    constructor(team, row, col){
        this.team = team;
        this.row = row;
        this.col = col;
    }

    makeElement(){
        console.log("Making Elemnt")
        let cell = document.getElementById(`${this.row}-${this.col}`)
        let element = document.createElement("div");
        element.classList.add("piece")
        element.classList.add(this.team+"-piece")
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