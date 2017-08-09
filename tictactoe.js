var turnX = true;
var turn = 1;
var gameOption;

var grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

var delayMillis = 3000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second

  function showAll(){
    if($("#board").css('display') == 'none')
      $("#board").fadeIn( "slow" );
    if($("#panel").css('display') == 'none')
      $("#panel").fadeIn( "slow" );
  };

  function showBoard(){
    if($("#board").css('display') == 'none')
      $("#board").fadeIn( "slow" );
    if($("#panel").css('display') == 'block')
      $("#panel").fadeOut( "slow" );
  };

  function showPanel(){
    if($("#panel").css('display') == 'none')
      $("#panel").fadeIn( "slow" );
    if($("#board").css('display') == 'block')
      $("#board").fadeOut( "slow" );
  };
}, delayMillis);

$(document).ready(function(){
    chooseGameOption();
})

function chooseGameOption() {
  $("#panel-message").append("How do you want to play?").hide().fadeIn(1500);
  $("#panel-buttons").append('<button class="panel-button" type="button" name="button">One Player</button><button class="panel-button" type="button" name="button" onclick="twoPlayersOption()">Two Players</button>').hide().fadeIn(1500);
}

function onePlayerOption() {

}

function appendBoard() {
  $("#tictactoe-game").empty();
  $("#tictactoe-game").hide().append('<div id="board"><div class="internal-shadow"><div style="padding-top: 2.5px;"><div class="line"><div onclick="makeMove(0,0)" id="box1" value="1" class="box"></div><div onclick="makeMove(0,1)" id="box2" value="2" class="box"></div><div onclick="makeMove(0,2)" id="box3" value="3" class="box"></div></div><div class="line"><div onclick="makeMove(1,0)" id="box4" value="4" class="box"></div><div onclick="makeMove(1,1)" id="box5" value="5" class="box"></div><div onclick="makeMove(1,2)" id="box6" value="6" class="box"></div></div><div class="line"><div onclick="makeMove(2,0)" id="box7" value="7" class="box"></div><div onclick="makeMove(2,1)" id="box8" value="8" class="box"></div><div onclick="makeMove(2,2)" id="box9" value="9" class="box"></div></div></div></div></div>').fadeIn(1500);
}

function twoPlayersOption() {
  if($("#board").css('display') == 'none')
    $("#board").fadeIn( "slow" );
  if($("#panel").css('display') == 'block')
    $("#panel").fadeOut( "slow" );
}

function resetGame() {

}

function showWinner(winner) {
  $("#panel-message").empty();
  $("#panel-buttons").empty();

  if($("#panel").css('display') == 'none')
    $("#panel").fadeIn( "slow" );

  if(winner == -1) {
    $("#panel-message").append("Player One Won!").hide().fadeIn(1500);
    $("#panel-buttons").append('<button class="panel-button" type="button" name="button">Restart</button>').hide().fadeIn(1000);
    $("#panel-buttons").append('<button class="panel-button" type="button" name="button">New Game</button>').hide().fadeIn(1000);
  } else {
    $("#panel-message").append("Player Two Won!").hide().fadeIn(1500);
    $("#panel-buttons").append('<button class="panel-button" type="button" name="button">Restart</button>').hide().fadeIn(1000);
    $("#panel-buttons").append('<button class="panel-button" type="button" name="button">New Game</button>').hide().fadeIn(1000);
  }
}


function fadeTest() {
  chooseGameOption();
}

$(".box").click(function(){
  if ($(this).find('#x').length == 0 && $(this).find('#o').length == 0 ) {
    if(turnX){
      $(this).append('<p id="x" class="value">X</p>');
      turnX = false;
    } else {
      $(this).append('<p id="o" class="value">O</p>');
      turnX = true;
    }
  } else {
    console.log("Occupied space!");
  }
});

function makeMove(row, column) {
  if (grid[row][column] == 0) {
    grid[row][column] = turn;

    if (turn == 1) {
      turn = -1;
    } else {
      turn = 1;
    }
    isGameOver();
  }
}

function isGameOver() {
  for (var i = 0; i < grid.length; i++) {
      if(grid[i][0] == grid[i][1] && grid[i][0]==grid[i][2] && grid[i][0]!=0){
        showWinner(grid[i][0]);
        return;
      }
  }
  for (var i = 0; i < grid.length; i++) {
      if(grid[0][i] == grid[1][i] && grid[0][i]==grid[2][i]  && grid[0][i]!=0){
        showWinner(grid[0][i]);
        return;
      }
  }
  if(grid[0][0]==grid[1][1] && grid[0][0] == grid[2][2]  && grid[0][0]!=0){
    showWinner(grid[0][0]);
    return;
  }

  if(grid[0][2]==grid[1][1] && grid[0][2] == grid[2][0]  && grid[2][0]!=0){
    showWinner(grid[1][1]);
    return;
  }
}
