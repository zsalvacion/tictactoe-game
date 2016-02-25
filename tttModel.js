/**
* Creates a new tic tac toe model
* @class
*/
function TttModel(row, col)
{
	this.row = row;
	this.col = col;
	this.tttBoard = [];
	for(var i = 0; i < row; i++)
	{
		this.tttBoard.push([]);
		for(var j = 0; j < col; j++)
		{
			this.tttBoard[i].push("");
		}
	}
	this.currentTurn = 0;
	this.players = [];
	this.prevMove =
	{
		row: undefined,
		col: undefined
	}
}

var tttModel = 
{
	constructor: TttModel,
	/**
	* Accepts a string
	* @function
	*
	* @param {string} playerName - Player identifier.
	*/
	addPlayer: function(playerName)
	{
		this.players.push(playerName);
	},	
	/**
	* Checks if move at specified row and column is valid and then returns true if it is valid.
	* @function
	*
	* @param {int} row - Tic tac toe board's row number.
	* @param {int} col - Tic tac toe board's column number.
	*/
	isValidMove: function(row, col)
	{
	
		return (row < this.row && col < this.col) && (row < this.row && col < this.col) && this.tttBoard[row][col] == "";

	},
	/**
	* Checks all possible win conditions and returns the player string of the winner, if one exists. Otherwise return empty string.
	* @function
	*/
	playerWin: function()
	{
		var winner = "";
		if((this.tttBoard[0][0] == this.tttBoard[1][1]) && (this.tttBoard[0][0] == this.tttBoard[2][2]) && this.tttBoard[0][0] != "")
		{
			winner = this.tttBoard[0][0];
		}
		if((this.tttBoard[0][2] == this.tttBoard[1][1]) && (this.tttBoard[0][2] == this.tttBoard[2][0]) && this.tttBoard[0][2] != "")
		{
			winner = this.tttBoard[0][2];
		}
		for(var i = 0; i < this.tttBoard.length; i++)
		{
			if((this.tttBoard[i][0] == this.tttBoard[i][1]) && (this.tttBoard[i][0]== this.tttBoard[i][2]) && this.tttBoard[i][0] != "")
			{
				winner = this.tttBoard[i][0];
			}
			if((this.tttBoard[0][i] == this.tttBoard[1][i]) && (this.tttBoard[0][i] == this.tttBoard[2][i]) && this.tttBoard[0][i] != "")
			{
				winner = this.tttBoard[0][i];
			}
		}
		return winner;
	},
	/**
	* Checks if there is no winner and then if the board is full. Returns true if the game ends in a draw.
	* @function
	*/
	isDraw: function()
	{
		var isDraw = true;
		if(this.playerWin() === "")
		{
			for(var i = 0; i < this.row; i++)
			{
				for(var j = 0; j < this.col; j++)
				{
					if(this.tttBoard[i][j] == "")
					{
						isDraw = false;
					}
				}
			}
		}
		else
		{
			isDraw = false;
		}

		return isDraw;
	},
	/**
	* Checks if there is a win or draw.
	* @function
	*/
	isGameOver: function()
	{
		return this.playerWin() != "" || this.isDraw() == true
	},
	/**
	* Checks if move is valid, then makes move. Returns true if success.
	* @function
	*
	* @param {int} row - Tic tac toe board's row number.
	* @param {int} col - Tic tac toe board's column number.
	*/
	makeMove: function(row, col)
	{
		var isValid = this.isValidMove(row, col);
		if(isValid)
		{
			this.tttBoard[row][col] = this.players[this.currentTurn % this.players.length];
			this.prevMove.row = row;
			this.prevMove.col = col;
			this.currentTurn++;
		}
		return isValid;
	},
	/**
	* Returns the player string at the specified row and column.
	* @function
	*
	* @param {int} row - Tic tac toe board's row number.
	* @param {int} col - Tic tac toe board's column number.
	*/
	getPlayer: function(row, col)
	{
		return this.tttBoard[row][col];
	},
	/**
	* Sets board state to inputted board.
	* @function
	*
	* @param {Object} row - Tic tac toe board's row number.
	*/
	setBoard: function(newBoard)
	{
		var boardCopy = [];
		for (var i = 0; i < this.row; i++)
		{
			boardCopy[i] = newBoard[i].slice();
		}
		this.tttBoard = boardCopy;
	},
	/**
	* Retrieves current board state.
	* @function
	*/
	getCurrentBoard: function()
	{
		var boardCopy = [];
		for (var i = 0; i < this.row; i++)
		{
			boardCopy[i] = this.tttBoard[i].slice();
		}
		return boardCopy;
	},
	/**
	* Retrieves current players.
	* @function
	*/
	getCurrentPlayers: function()
	{
		return this.players.slice();
	},
	/**
	* Sets current turn to correct turn.
	* @function
	*/
	setCurrentTurn: function()
	{
		var turnCounter = 0;
		for(var i = 0; i < this.row; i++)
		{
			for(var j = 0; j < this.col; j++)
			{
				if(this.tttBoard[i][j] != "")
				{
					turnCounter++;
				}
			}
		}
		this.currentTurn = turnCounter;
	},
	/**
	* Clears the board and resets the game.
	* @function
	*/
	newGame: function()
	{
		for(var i = 0; i < this.row; i++)
		{
			for(var j = 0; j < this.col; j++)
			{
				this.tttBoard[i][j] = "";
			}
		}
		this.currentTurn = 0;
	}
};
TttModel.prototype = tttModel;

