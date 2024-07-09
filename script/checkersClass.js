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
