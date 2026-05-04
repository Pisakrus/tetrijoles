createBoard(game);

game.state.board[3][5] = 1
game.state.board[4][5] = 1
game.state.board[5][5] = 2
game.state.board[3][4] = 3

createCanvas(game)
DrawCanvasBoard(game)
