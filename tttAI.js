function getBestOutcome(boardModel, isMaximizingPlayer) 
{ 	
	var bestOutcome = 0;
	boardModel.tttBoard = boardModel.getCurrentBoard();
	//base case
	if(boardModel.isGameOver())
	{
		if(boardModel.playerWin() == "O")
			bestOutcome = -1;
		else if(boardModel.playerWin() == "X")
			bestOutcome = 1;    
		else
			bestOutcome = 0;
	}
	//X's turn
	else if(isMaximizingPlayer)
	{
		var currentMax = -1;
		for(var i = 0; i < boardModel.row; i++)
		{
			for(var j = 0; j < boardModel.col; j++)
			{
				if(boardModel.isValidMove(i, j))
				{
					var reducedBoardModel =  new TttModel(boardModel.row, boardModel.col);
					reducedBoardModel.players = boardModel.getCurrentPlayers();
					reducedBoardModel.tttBoard = boardModel.getCurrentBoard();
					reducedBoardModel.currentTurn = 0;
					reducedBoardModel.makeMove(i, j);
					currentMax = Math.max(currentMax, getBestOutcome(reducedBoardModel, false));
				}
			}
		}
		bestOutcome = currentMax;
	}
	//O's turn
	else
	{
		var currentMin = 1;
		for(var i = 0; i < boardModel.row; i++)
		{
			for(var j = 0; j < boardModel.col; j++)
			{
				if(boardModel.isValidMove(i, j))
				{
					var reducedBoardModel =  new TttModel(boardModel.row, boardModel.col);
					reducedBoardModel.players = boardModel.getCurrentPlayers();
					reducedBoardModel.tttBoard = boardModel.getCurrentBoard();
					reducedBoardModel.currentTurn = 1;
					reducedBoardModel.makeMove(i, j);
					currentMin = Math.min(currentMin, getBestOutcome(reducedBoardModel, true));
				}
			}
		}
		bestOutcome = currentMin;
	}

	return bestOutcome;         
}

function getBestMove(boardModel, isMaximizingPlayer) 
{ 	
	function move (col, row, val)
	{
		this.row = col;
		this.col = row;
		this.val = val;
	}
	var bestMove = new move(null, null, null);
	boardModel.tttBoard = boardModel.getCurrentBoard();
	//base case
	if(boardModel.isGameOver())
	{
		if(boardModel.playerWin() == "O")
		{
			bestMove.row = boardModel.prevMove.row;
			bestMove.col = boardModel.prevMove.col;
			bestMove.val = -1;
		}
		else if(boardModel.playerWin() == "X")
		{
			bestMove.row = boardModel.prevMove.row;
			bestMove.col = boardModel.prevMove.col;
			bestMove.val = 1;
		}  
		else
		{	
			bestMove.row = boardModel.prevMove.row;
			bestMove.col = boardModel.prevMove.col;
			bestMove.val = 0;
		}	
	}
	//X's turn
	else if(isMaximizingPlayer)
	{
		var currentMax = -Infinity;
		var currentBestXMove = 0;
		//search board for all valid moves
		for(var i = 0; i < boardModel.row; i++)
		{
			for(var j = 0; j < boardModel.col; j++)
			{
				if(boardModel.isValidMove(i, j))
				{
					var reducedBoardModel =  new TttModel(boardModel.row, boardModel.col);
					reducedBoardModel.players = boardModel.getCurrentPlayers();
					reducedBoardModel.tttBoard = boardModel.getCurrentBoard();
					reducedBoardModel.currentTurn = 0;
					reducedBoardModel.makeMove(i, j);
					var x = getBestMove(reducedBoardModel, false);
					if(currentMax < x.val)
					{
						currentMax = x.val;
						currentBestXMove = new move(i, j, x.val);
					}
				}
			}
		}
		bestMove = new move(currentBestXMove.row, currentBestXMove.col, currentBestXMove.val);
	}
	//O's turn
	else
	{
		var currentMin = Infinity;
		var currentBestOMove = 0;
		for(var i = 0; i < boardModel.row; i++)
		{
			for(var j = 0; j < boardModel.col; j++)
			{
				if(boardModel.isValidMove(i, j))
				{
					var reducedBoardModel =  new TttModel(boardModel.row, boardModel.col);
					reducedBoardModel.players = boardModel.getCurrentPlayers();
					reducedBoardModel.tttBoard = boardModel.getCurrentBoard();
					reducedBoardModel.currentTurn = 1;
					reducedBoardModel.makeMove(i, j);
					var o = getBestMove(reducedBoardModel, true);
					if(currentMin > o.val)
					{
						currentMin = o.val;
						currentBestOMove = new move(i, j, currentMin);
					}
				}
			}
		}
		bestMove = new move(currentBestOMove.row, currentBestOMove.col, currentBestOMove.val);
	}

	return bestMove;         
}

//Improved AI w/ alpha-beta pruning
function getBestMoveV2(boardModel, isMaximizingPlayer, alpha, beta) 
{ 	
	function move (col, row, val)
	{
		this.row = col;
		this.col = row;
		this.val = val
	}
	var bestMove = new move(null, null, null);
	boardModel.tttBoard = boardModel.getCurrentBoard();
	//base case
	if(boardModel.isGameOver())
	{
		if(boardModel.playerWin() == "O")
		{
			bestMove.row = boardModel.prevMove.row;
			bestMove.col = boardModel.prevMove.col;
			bestMove.val = -1;
		}
		else if(boardModel.playerWin() == "X")
		{
			bestMove.row = boardModel.prevMove.row;
			bestMove.col = boardModel.prevMove.col;
			bestMove.val = 1;
		}  
		else
		{	
			bestMove.row = boardModel.prevMove.row;
			bestMove.col = boardModel.prevMove.col;
			bestMove.val = 0;
		}	
	}
	//X's turn
	else if(isMaximizingPlayer)
	{
		var currentBestXMove = new move(null, null, alpha);
		//search board for all valid moves
		for(var i = 0; i < boardModel.row; i++)
		{
			for(var j = 0; j < boardModel.col; j++)
			{
				if(boardModel.isValidMove(i, j))
				{
					//debugger;
					var reducedBoardModel =  new TttModel(boardModel.row, boardModel.col);
					reducedBoardModel.players = boardModel.getCurrentPlayers();
					reducedBoardModel.tttBoard = boardModel.getCurrentBoard();
					reducedBoardModel.currentTurn = 0;
					reducedBoardModel.makeMove(i, j);
					var x = getBestMoveV2(reducedBoardModel, false, alpha, beta);
					if(alpha < x.val)
					{
						alpha = x.val;
						currentBestXMove = new move(i, j, alpha);
					}
					if(alpha >= beta)
					{
						bestMove = new move(currentBestXMove.row, currentBestXMove.col, alpha);
						return bestMove;
					}
					//debugger;
				}
			}
		}
		bestMove = new move(currentBestXMove.row, currentBestXMove.col, currentBestXMove.val);
	}
	//O's turn
	else
	{
		var currentBestOMove = new move(null, null, beta);
		for(var i = 0; i < boardModel.row; i++)
		{
			for(var j = 0; j < boardModel.col; j++)
			{
				if(boardModel.isValidMove(i, j))
				{
					//debugger;
					var reducedBoardModel =  new TttModel(boardModel.row, boardModel.col);
					reducedBoardModel.players = boardModel.getCurrentPlayers();
					reducedBoardModel.tttBoard = boardModel.getCurrentBoard();
					reducedBoardModel.currentTurn = 1;
					reducedBoardModel.makeMove(i, j);
					var o = getBestMoveV2(reducedBoardModel, true, alpha, beta);
					if(beta > o.val)
					{
						beta = o.val;
						currentBestOMove = new move(i, j, beta);
					}
					if(alpha >= beta)
					{
						bestMove = new move(currentBestOMove.row, currentBestOMove.col, beta);
						return bestMove;
					}
					//debugger;
				}
			}
		}
		bestMove = new move(currentBestOMove.row, currentBestOMove.col, currentBestOMove.val);
	}

	return bestMove;         
}

function makeBestMove(boardModel, isMaximizingPlayer) 
{ 	
	//var bestMove = getBestMove(boardModel, isMaximizingPlayer);
	var bestMove = getBestMoveV2(boardModel, isMaximizingPlayer, -Infinity, Infinity);
	boardModel.makeMove(bestMove.row, bestMove.col);
}
