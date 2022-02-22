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
          (((TetrisNextBlock.row + x) >= Tetrisfield.length) ||
          (Tetrisfield[TetrisNextBlock.row + x][TetrisNextBlock.col + y]) || 
            ((TetrisNextBlock.col + y ) >= Tetrisfield[0].length) ||
            ((TetrisNextBlock.col + y) < 0)
          ))
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
            if (gameover) return;
            Tetrisfield[TetrisNextBlock.row + x][TetrisNextBlock.col + y] = TetrisNextBlock.name;            
          }
        }
      }

      for(let row = Tetrisfield.length-1; row >=0;){
        if (Tetrisfield[row].every(cell => !!cell)){
            for(let r = row; r>=0; r--){
              for(let c = 0; c < Tetrisfield[r].length; c++){
                Tetrisfield[r][c]= Tetrisfield[r-1][c];
              }
            }
        }
        else {
          row--;
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
              [1,1,1],
              [0,0,0]

            ],
      'J' : [
              [0,0,1],
              [1,1,1],
              [0,0,0]
            ],
      'L' : [
              [1,0,0],
              [1,1,1],
              [0,0,0]
            ],
      'S' : [
              [0,1,1],
              [1,1,0],
              [0,0,0]
            ],
      'Z' : [
              [1,1,0],
              [0,1,1],
              [0,0,0]
            ],
      'T' : [
              [0,1,0],
              [1,1,1],
              [0,0,0]
            ],
      'O' : [
              [1,1],
              [1,1]
              
            ]
    };

    const TetrisBlockcolour = {

      'I' : 'cyan', 
      'J' : 'blue',
      'L' : 'lime',
      'O' : 'orange',
      'S' : 'red',
      'T' : 'yellow',
      'Z' : 'magenta'
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
    
    document.addEventListener("keydown", (e) => {
        console.log(e.key)      
        if (gameover)
          return;

        if (e.key === "ArrowLeft") { //vänster pil
          console.log("Vänster")
          const col = TetrisNextBlock.col;
          TetrisNextBlock.col--;
          if (!validmove()) {
            TetrisNextBlock.col = col;
          }
        } else if (e.key === "ArrowRight") //höger pil
        {
          const col = TetrisNextBlock.col;
          TetrisNextBlock.col++;
          if (!validmove()) {
            TetrisNextBlock.col = col;
          }
        }

        if (e.key === "ArrowDown") {//nedåt pil
          const row = TetrisNextBlock.row;
          TetrisNextBlock.row++;
          if (!validmove()) {
            TetrisNextBlock.row = row;
          }
        }

        if(e.key === "ArrowUp") {// rotera tetrisblock 90 grader
          const matrix = TetrisNextBlock.matrix;

          const N = TetrisNextBlock.matrix.length -1;
          const result = TetrisNextBlock.matrix.map((row,i) =>
          row.map((val, j) => TetrisNextBlock.matrix[N-j][i]));

          TetrisNextBlock.matrix = result;
          if(!validmove()){
            TetrisNextBlock.matrix = matrix;
          }
      }
    }
    );


    reqTetUpdate = requestAnimationFrame(cyclic);
    