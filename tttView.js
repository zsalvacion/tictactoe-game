function TttView(boardModel, callback)
{
	this.row = boardModel.row;
	this.col = boardModel.col;
	this.grid = document.createElement("table");
	this.grid.id = "ttt_grid";
	for(var i = 0; i < this.row; i++)
	{
		var tr = document.createElement("tr");
		this.grid.appendChild(tr);
		this.grid.className = "game-grid-view"

		for (var j = 0; j < this.col; j++)
		{
			var td = document.createElement("td");
			callback(td, boardModel);
			td.appendChild(document.createTextNode(""));
			tr.appendChild(td); 
			td.className = "game-grid-cell"; 
		}
	}
}

function updateView(boardModel)
{
	var grid = document.getElementById("ttt_grid");
	for(var i = 0; i < boardModel.row; i++)
	{
		for (var j = 0; j < boardModel.col; j++)
		{
			grid.rows[i].cells[j].textContent = boardModel.getPlayer(i, j);
		}
	}
}
