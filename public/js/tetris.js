const canvas = document.getElementById("Tetris");
const context = canvas.getContext("2d");
const grid = 30;

    function getTetrisNextBlock()
    {
      const sequence = ["I","J","O","L","S","T","Z"];
      const rand = Math.floor(Math.random()*7);
      const name = sequence.splice(rand,1)[0];
      const matrix = TetrisBlock[name];
      const col = 4;
      const row = -1;

      return { name:name, matrix:matrix, col:col, row:row};      
    }

    function validmove()
    {
      for(let x = 0; x < TetrisNextBlock.matrix.length; x++)
      {
        for(let y = 0; y < TetrisNextBlock.matrix[x].length; y++)
        {
          if((TetrisNextBlock.matrix[x][y]) && 
          ((TetrisNextBlock.row + x) >= Tetrisfield.length) ||
          (Tetrisfield[TetrisNextBlock.row + x][TetrisNextBlock.col + y]) || 
            ((TetrisNextBlock.col + y ) >= Tetrisfield[0].length) ||
            ((TetrisNextBlock.col + y) < 0)
          )
          {
          return false;
          }
        }
      }
      return true;
    }

    function placeTetris()
    {
      for(let x = 0; x < TetrisNextBlock.matrix.length; x++)
      {
        for(let y = 0; y < TetrisNextBlock.matrix[x].length; y++)
        {
          if(TetrisNextBlock.matrix[x][y])
          {
            if(TetrisNextBlock.row < 0)
            {
            displaygameover();
            }
            Tetrisfield[TetrisNextBlock.row + x][TetrisNextBlock.col + y] = TetrisNextBlock.name;            
          }
        }
      }
      TetrisNextBlock = getTetrisNextBlock();
    }

    function displaygameover()
    {
      cancelAnimationFrame(reqTetUpdate);
      gameover = true;

      context.fillStyle = "black";
      context.globalAlpha = 0.75;
      context.fillRect(0, canvas.height/2 - 30, canvas.width, 60);

      context.fillStyle = "white";
      context.globalAlpha = 1;
      context.font = "30px monospace";
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText("Game over!", canvas.width/2, canvas.height/2);
    }
    

    const TetrisBlock = {
      'I' : [
              [0,0,0],
              [1,1,1]
            ],
      'J' : [
              [0,0,1],
              [1,1,1]
            ],
      'L' : [
              [1,0,0],
              [1,1,1]
            ],
      'S' : [
              [0,1,1],
              [1,1,0]
            ],
      'Z' : [
              [1,1,0],
              [0,1,1]
            ],
      'T' : [
              [0,1,0],
              [1,1,1]
            ],
      'O' : [
              [1,1],
              [1,1]
            ]
    };

    const TetrisBlockcolour = {

      'I' : 'cyan', 
      'J' : 'blue',
      'L' : 'green',
      'O' : 'purple',
      'S' : 'red',
      'T' : 'yellow',
      'Z' : 'orange'
    };

    const Tetrisfield = [];

    for(let row = 0; row < 10; row++)
    {
      Tetrisfield[row] = [];
      for(let col = 0; col < 10; col++)
      {
        Tetrisfield[row][col] = 0;
      }
    }


    let reqTetUpdate = null;
    let gameover = false;
    let TetrisNextBlock = getTetrisNextBlock();
    let count = 0;

    function cyclic()
    {
      reqTetUpdate = requestAnimationFrame(cyclic);
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      
      for(let x = 0; x < 10; x++)
      {
        for(let y = 0; y < 10; y++)
        {
          if(Tetrisfield[x][y])
          {
          context.fillStyle = TetrisBlockcolour[Tetrisfield[x][y]]; 
          context.fillRect(y*grid, x*grid, grid-1, grid-1);
          }
        }
      }

      if(TetrisNextBlock)
      {
        if(++count > 30)
        {
          count = 0;
          TetrisNextBlock.row++;

          if(!validmove())
          {
            TetrisNextBlock.row--;
            placeTetris();

          }
        }
        
        context.fillStyle = TetrisBlockcolour[TetrisNextBlock.name];
        for(let x = 0; x < TetrisNextBlock.matrix.length; x++)
          {
            for(let y = 0; y < TetrisNextBlock.matrix[x].length; y++)
            {
              if (TetrisNextBlock.matrix[x][y]) 
              {
                context.fillRect((y + TetrisNextBlock.col)*grid,(x+TetrisNextBlock.row)*grid, grid-1, grid-1);
              }
            }
          }
      }      
    }
    
    document.addEventListener("keydown",
    function(e)
    {
      if(gameover) return;

      if(e.key === 37) //vänster pil
      {
        const col = TetrisNextBlock.col;
        TetrisNextBlock.col--;
        if(!validmove())
        {
          TetrisNextBlock.col = col;
        }
      }

      if(e.key === 39) //höger pil
      {
        const col = TetrisNextBlock.col;
        TetrisNextBlock.col++;
        if(!validmove())
        {
          TetrisNextBlock.col = col;
        }
      }

      if(e.key === 40) //nedåt pil
      {
        const row = TetrisNextBlock.row;
        TetrisNextBlock.row++;
        if(!validmove())
        {
          TetrisNextBlock.row = row;
        }
      }
    }
    );


    reqTetUpdate = requestAnimationFrame(cyclic);
    