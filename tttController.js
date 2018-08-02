function TttController(row, col, callback)
{
	this.board = new TttModel(row, col);
	this.view = new TttView(this.board, callback);
	this.board.addPlayer("X");
	this.board.addPlayer("O");
}

var playerSelect = document.getElementsByName("playerSelect");
playerSelect[0].addEventListener("change", function()
{
	test.board.newGame();
	updateView(test.board);
});
playerSelect[1].addEventListener("change", function()
{
	test.board.newGame();
	updateView(test.board);
});
playerSelect[2].addEventListener("change", function()
{
	test.board.newGame();
	updateView(test.board);
	makeBestMove(test.board, true);
	updateView(test.board);
});

function playerMove(tableCell, boardModel)
{
	tableCell.addEventListener("click", function(event)
	{
		var playerSelect = document.getElementsByName("playerSelect");
		var row = event.target.parentNode.rowIndex;
		var col = event.target.cellIndex;

		//human vs. human
		if(playerSelect[0].checked)
		{
			var isValid0 = boardModel.makeMove(row, col);
			if(boardModel.isGameOver())
			{
				if(boardModel.isDraw())
				{
					updateView(boardModel);
					alert("The game was a draw. Game will now reset.");
					boardModel.newGame();
					updateView(boardModel);
				}	
				else
				{
					updateView(boardModel);
					alert("Congradulations! Player " + boardModel.playerWin() + " has won.\n" 
						+ "Game will now reset.");
					boardModel.newGame();
					updateView(boardModel);
				}
			}
			else if(!isValid0)
			{
				alert("Your move at: \nrow: " + row + "\n" +
				"column: " + col + "\nWas not a valid move.")
			}
			else
			{
				updateView(boardModel);
			}
		}
		//human vs. computer(Human is X)
		else if(playerSelect[1].checked)
		{
			var isValid1 = boardModel.makeMove(row, col);
			if(boardModel.isGameOver())
			{
				if(boardModel.isDraw())
				{
					updateView(boardModel);
					alert("The game was a draw. Game will now reset.");
					boardModel.newGame();
					updateView(boardModel);
				}	
				else
				{
					updateView(boardModel);
					alert("Congradulations! Player " + boardModel.playerWin() + " has won.\n" 
						+ "Game will now reset.");
					boardModel.newGame();
					updateView(boardModel);
				}
			}
			else if(!isValid1)
			{
				alert("Your move at: \nrow: " + row + "\n" +
				"column: " + col + "\nWas not a valid move.")
			}
			else
			{
				makeBestMove(boardModel, false);
				updateView(boardModel);
				if(boardModel.isGameOver())
				{
					if(boardModel.isDraw())
					{
						alert("The game was a draw. Game will now reset.");
						boardModel.newGame();
						updateView(boardModel);
					}	
					else
					{
						alert("Sorry! AI player " + boardModel.playerWin() + " has won.\n" 
							+ "Game will now reset.");
						boardModel.newGame();
						updateView(boardModel);
					}
				}
			}
		}
		//human vs. computer(Human is O)
		else
		{
			boardModel.currentTurn = 1;
			var isValid2 = boardModel.makeMove(row, col);
			if(boardModel.isGameOver())
			{
				if(boardModel.isDraw())
				{
					updateView(boardModel);
					alert("The game was a draw. Game will now reset.");
					boardModel.newGame();
					updateView(boardModel);
				}	
				else
				{
					updateView(boardModel);
					alert("Congradulations! Player " + boardModel.playerWin() + " has won.\n" 
						+ "Game will now reset.");
					boardModel.newGame();
					updateView(boardModel);
				}
			}
			else if(!isValid2)
			{
				alert("Your move at: \nrow: " + row + "\n" +
				"column: " + col + "\nWas not a valid move.")
			}
			else
			{
				makeBestMove(boardModel, true);
				updateView(boardModel);
				if(boardModel.isGameOver())
				{
					if(boardModel.isDraw())
					{
						alert("The game was a draw. Game will now reset.");
						boardModel.newGame();
						updateView(boardModel);
					}	
					else
					{
						alert("Sorry! AI player " + boardModel.playerWin() + " has won.\n" 
							+ "Game will now reset.");
						boardModel.newGame();
						updateView(boardModel);
					}
				}
			}
		}
	});
}
