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
            console.log(i)
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                if(!((j+i) % 2 === 0)) this.board[i][j] = new Piece(TEAM.WHITE, i, j)
            }
        }
        for(let i=this.board.length-1; i > this.board.length-4; i--){
            console.log(i)
            for(let j=0; j < this.board[i].length; j++){
                console.log(j)
                if(!((j+i) % 2 === 0)) this.board[i][j] = new Piece(TEAM.BLACK, i, j)
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

}
/**
 * @typedef TEAM
 * @property {Number} WHITE
 * @property {Number} BLACK
 */
const TEAM = Object.freeze({
    WHITE: Symbol(0),
    BLACK: Symbol(1),
});

new Board().beginBoard()
console.log("Done")