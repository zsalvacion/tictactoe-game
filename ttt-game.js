function createTable(rows, columns)
{
	var ttt_grid = document.createElement("table");
	ttt_grid.id = "ttt_grid";
	for(var i = 0; i < rows; i++)
	{
		var tr = document.createElement("tr");
		ttt_grid.appendChild(tr);
		ttt_grid.className = "game-grid-view"

		for (var j = 0; j < columns; j++)
		{
			var td = document.createElement("td");
			td.appendChild(document.createTextNode("test"));
			tr.appendChild(td); 
			td.className = "game-grid-cell";
		}
	}

	return ttt_grid;
}

function setCellText(row, col, str)
{
	document.getElementById("ttt_grid").rows[row].cells[col].textContent = str;
}


document.body.appendChild(createTable(3, 3));
setCellText(0, 0, "X");
setCellText(1, 2, "O");