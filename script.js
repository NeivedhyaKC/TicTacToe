gameManager = (() =>
{
    let gridCells = document.querySelectorAll(".grid button");
    let XTurn = true;
    let gameComplete = false;
    let guideMessage = document.querySelector("#guideMessage");
    let restart = document.querySelector("#restart");
    let Init = () => 
    {
        for(let i =0;i<gridCells.length;i++)
        {
            gridCells[i].addEventListener("click",()=>{OnCellClicked(i)});
        }
        restart.addEventListener("click",function() {Restart()});
    }
    let OnCellClicked = (id) =>
    {
        if(gameComplete)
        {
            return;
        }
        if(gridCells[id].textContent =="")
        {
            if(XTurn)
            {
                gridCells[id].textContent = "X";
                guideMessage.textContent = "Player O's turn";
            }
            else
            {
                gridCells[id].textContent = "O";
                guideMessage.textContent = "Player X's turn";
            }
            XTurn = !XTurn;
            
            if(CheckForDraw())
            {
                guideMessage.textContent = "It's a draw";
            }
            
            let winStatus = CheckForWin();
            if(winStatus.won)
            {
                guideMessage.textContent = "Player " + winStatus.winner
                + " has won!";
                gameComplete = true;
            }
        }
    }
    let CheckForDraw = () =>
    {
        for(cell of gridCells)
        {
            if(cell.textContent=="")
            {
                return false;
            }
        }
        return true;
    }
    let CheckForWin = () =>
    {
        let winStrings = [];
        winStrings.push(gridCells[0].textContent + gridCells[1].textContent 
        + gridCells[2].textContent);
        winStrings.push(gridCells[3].textContent + gridCells[4].textContent 
            + gridCells[5].textContent);
        winStrings.push(gridCells[6].textContent + gridCells[7].textContent 
            + gridCells[8].textContent);
            
        winStrings.push(gridCells[0].textContent + gridCells[3].textContent 
            + gridCells[6].textContent);
        winStrings.push(gridCells[1].textContent + gridCells[4].textContent 
            + gridCells[7].textContent);
        winStrings.push(gridCells[2].textContent + gridCells[5].textContent 
            + gridCells[8].textContent);

        winStrings.push(gridCells[0].textContent + gridCells[4].textContent 
            + gridCells[6].textContent);
        winStrings.push(gridCells[2].textContent + gridCells[4].textContent 
            + gridCells[7].textContent);

        for(str of winStrings)
        {
            if(str == "XXX")
            {
                return {won:true,winner:"X"};
            }
            else if( str == "OOO")
            {
                return {won:true,winner:"O"};
            }
        }
        return {won:false,winner:"NA"};
    }

    let Restart = () =>
    {
        gameComplete = false;
        XTurn = true;
        guideMessage.textContent = "Player X's turn";
        for(cell of gridCells)
        {
            cell.textContent = "";
        }
    }
    return {Init};
})();

gameManager.Init();