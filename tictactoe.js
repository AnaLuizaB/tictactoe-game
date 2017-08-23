var turnX = 1
var turn = 1;
var onePlayerOption = false;
var computerTurn = false;
var gameOver = false;
var draw = false;

var grid = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

$(document).ready(function(){
    newGame();
});

function makeMove(row, column, event) {
  var space = event;
  if(gameOver == false) {
    if ($(space).find('#x').length == 0 && $(space).find('#o').length == 0 ) {
      if(onePlayerOption) {
        $(space).append('<p id="x" class="value">X</p>');
      } else {
        if(turnX){
          $(space).append('<p id="x" class="value">X</p>');
          turnX = false;
        } else {
          $(space).append('<p id="o" class="value">O</p>');
          turnX = true;
        }
      }
    }
  }
  if (grid[row][column] == null) {
    if(onePlayerOption) {
      grid[row][column] = false;
    } else {
      grid[row][column] = turn;
    }

    if (!onePlayerOption) {
      if (turn == 1) turn = -1; else turn = 1;
    }

    if(onePlayerOption) {
      makeAiMove();
      markAiOption();
    }

    showPlayerTurn();
    if(isDraw()) showDraw();
    isGameOver();
  }
}

function isGameOver() {
  for (var i = 0; i < grid.length; i++) {
      if(grid[i][0] == grid[i][1] && grid[i][0]==grid[i][2] && grid[i][0]!=null){
        showWinner(grid[i][0]);
        gameOver = true;
        return grid[i][0];
      }
  }
  for (var i = 0; i < grid.length; i++) {
      if(grid[0][i] == grid[1][i] && grid[0][i]==grid[2][i]  && grid[0][i]!=null){
        showWinner(grid[0][i]);
        gameOver = true;
        return grid[0][i];
      }
  }
  if(grid[0][0]==grid[1][1] && grid[0][0] == grid[2][2]  && grid[0][0]!=null){
    showWinner(grid[0][0]);
    gameOver = true;
    return grid[0][0];
  }

  if(grid[0][2]==grid[1][1] && grid[0][2] == grid[2][0]  && grid[2][0]!=null){
    showWinner(grid[1][1]);
    gameOver = true;
    return grid[1][1];
  }

  return null;
}

function isDraw() {
  draw = true;
  for (var i = 0; i < grid.length; i++) {
    for (var j= 0; j < grid[i].length;j++) {
      if(grid[i][j] == null)
        draw = false;
    }
  }
  return draw;
}

function chooseGameOption() {
  $("#panel-message").append("How do you want to play?").hide().fadeIn(500);
  $("#panel-buttons").append('<button class="panel-button" type="button" name="button" onclick="onePlayer()">One Player</button><button class="panel-button" type="button" name="button" onclick="twoPlayers()">Two Players</button>').hide().fadeIn(1500);
}

function onePlayer() {
  showPlayerTurn();

  onePlayerOption = true;

  if($("#panel").css('display') == 'block')
    $("#panel").fadeOut( "slow" );
  if($("#board").css('display') == 'none')
    $("#board").fadeIn( "slow" );
}

function twoPlayers() {
  showPlayerTurn();

  if($("#board").css('display') == 'none')
    $("#board").fadeIn( "slow" );
  if($("#panel").css('display') == 'block')
    $("#panel").fadeOut( "slow" );
}

function newGame() {
  turnX = Math.round(Math.random());
  gameOver = false;

  clearPanel();
  clearBoard();

  chooseGameOption();
}

function resetGame() {
  gameOver = false;
  turn = 1;
  turnX = 1;

  clearPanel();
  clearBoard();

  showPlayerTurn();

  $("#board").fadeIn("slow");
  $("#panel").fadeOut("slow");
}

function clearPanel() {
  $("#panel-message").empty();
  $("#panel-buttons").empty();
  $("#panel-turn").hide();
}

function clearBoard() {
  for(i = 0; i <= 9; i++){
    $('#box'+i).empty();
  }

  grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  $("#board").hide().fadeOut(1500);
}

function showPlayerTurn() {
  $("#panel-turn").fadeIn( "slow" );
  $("#panel-turn-message").empty();

  if(turnX)
    $("#panel-turn-message").append('Player X turn!');
  else
    $("#panel-turn-message").append('Player O turn!');
}

function showWinner(winner) {
  clearPanel();
  $("#panel").fadeIn("slow");

  if(winner == 1) {
    if(onePlayerOption) {
      $("#panel-message").append("The AI won!").hide().fadeIn(500);
      endGameOptions();
    } else {
      $("#panel-message").append("Player X Won!").hide().fadeIn(500);
      endGameOptions();
    }
  } else {
    $("#panel-message").append("Player O Won!").hide().fadeIn(500);
    endGameOptions();
  }
}

function showDraw(){
  clearPanel();
  $("#panel").fadeIn("slow");

  $("#panel-message").append("It's a draw!").hide().fadeIn(500);
  endGameOptions();
}

function endGameOptions(){
  $("#panel-buttons").append('<button onClick="newGame();" class="panel-button" type="button" name="button">New Game</button>').hide().fadeIn(500);
  $("#panel-buttons").append('<button onClick="resetGame();" class="panel-button" type="button" name="button">Reset Game</button>').hide().fadeIn(500);
}

function markAiOption() {
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length;j++) {
      if(grid[i][j] == true) {
        if(i == 0 && j == 0) {
          if($('#box1').find('#o').length == 0) {
            $('#box1').append('<p id="o" class="value">O</p>');
          }
        }
        if(i == 0 && j == 1) {
          if($('#box2').find('#o').length == 0) {
            $('#box2').append('<p id="o" class="value">O</p>');
          }
        }
        if(i == 0 && j == 2) {
          if($('#box3').find('#o').length == 0) {
            $('#box3').append('<p id="o" class="value">O</p>');
          }
        }
        if(i == 1 && j == 0) {
          if($('#box4').find('#o').length == 0) {
            $('#box4').append('<p id="o" class="value">O</p>');
          }
        }
        if(i == 1 && j == 1) {
          if($('#box5').find('#o').length == 0) {
            $('#box5').append('<p id="o" class="value">O</p>');
          }
        }
        if(i == 1 && j == 2) {
          if($('#box6').find('#o').length == 0) {
            $('#box6').append('<p id="o" class="value">O</p>');
          }
        }
        if(i == 2 && j == 0) {
          if($('#box7').find('#o').length == 0) {
            $('#box7').append('<p id="o" class="value">O</p>');
          }
        }
        if(i == 2 && j == 1) {
          if($('#box8').find('#o').length == 0) {
            $('#box8').append('<p id="o" class="value">O</p>');
          }
        }
        if(i == 2 && j == 2) {
          if($('#box9').find('#o').length == 0) {
            $('#box9').append('<p id="o" class="value">O</p>');
          }
        }
      }
    }
  }
}
// Player vs AI -> Code based at https://blog.vivekpanyam.com/how-to-build-an-ai-that-wins-the-basics-of-minimax-search/
var numNodes = 0;
function getWinner(grid) {
    vals = [true, false];
    var allNotNull = true;
    for (var k = 0; k < vals.length; k++) {
        var value = vals[k];

        var diagonalComplete1 = true;
        var diagonalComplete2 = true;
        for (var i = 0; i < 3; i++) {
            if (grid[i][i] != value) {
                diagonalComplete1 = false;
            }
            if (grid[2 - i][i] != value) {
                diagonalComplete2 = false;
            }
            var rowComplete = true;
            var colComplete = true;
            for (var j = 0; j < 3; j++) {
                if (grid[i][j] != value) {
                    rowComplete = false;
                }
                if (grid[j][i] != value) {
                    colComplete = false;
                }
                if (grid[i][j] == null) {
                    allNotNull = false;
                }
            }
            if (rowComplete || colComplete) {
                return value ? 1 : 0;
            }
        }
        if (diagonalComplete1 || diagonalComplete2) {
            return value ? 1 : 0;
        }
    }
    if (allNotNull) {
        return -1;
    }
    return null;
}
function recurseMinimax(grid, player) {
    numNodes++;
    var winner = getWinner(grid);

    if (winner != null) {
        switch(winner) {
            case 1:
                return [1, grid]
            case 0:
                return [-1, grid]
            case -1:
                return [0, grid];
        }
    } else {
      var nextVal = null;
      var nextBoard = null;

      for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
              if (grid[i][j] == null) {
                  grid[i][j] = player;
                  var value = recurseMinimax(grid, !player)[0];
                  if ((player && (nextVal == null || value > nextVal)) || (!player && (nextVal == null || value < nextVal))) {
                      nextBoard = grid.map(function(arr) {
                          return arr.slice();
                      });
                      nextVal = value;
                  }
                  grid[i][j] = null;
              }
          }
      }
      return [nextVal, nextBoard];
   }
}
function minimaxMove(grid) {
    numNodes = 0;
    return recurseMinimax(grid, true)[1];
}
function makeAiMove() {
    grid = minimaxMove(grid);
    console.log(numNodes);
}
