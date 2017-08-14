var turnX = true;
var turn = 1;
var gameOption;
var gameOver = false;

var grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

$(".box").click(function(){
  if(gameOver == false) {
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
  } else {
    console.log("The game is over!");
  }
});

$(document).ready(function(){
    newGame();
});

function chooseGameOption() {
  $("#panel-message").append("How do you want to play?").hide().fadeIn(1500);
  $("#panel-buttons").append('<button class="panel-button" type="button" name="button">One Player</button><button class="panel-button" type="button" name="button" onclick="twoPlayers()">Two Players</button>').hide().fadeIn(1500);
}

function twoPlayers() {
  if($("#board").css('display') == 'none')
    $("#board").fadeIn( "slow" );
  if($("#panel").css('display') == 'block')
    $("#panel").fadeOut( "slow" );
}

function newGame() {
  console.log("New game was selected!");

  gameOver = false;

  clearPanel();
  clearBoard();

  chooseGameOption();
}

function clearPanel() {
  $("#panel-message").empty();
  $("#panel-buttons").empty();
}

function clearBoard() {
  for(i = 0; i <= 9; i++){
    $('#box'+i).empty();
  }

  grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  $("#board").hide().fadeOut(1500);
}

function showWinner(winner) {
  clearPanel();
  $("#panel").fadeIn("slow");

  if(winner == 1) {
    $("#panel-message").append("Player X Won!").hide().fadeIn(1500);
    endGameOptions();
  } else {
    $("#panel-message").append("Player O Won!").hide().fadeIn(1500);
    endGameOptions();
  }
}

function endGameOptions(){
  $("#panel-buttons").append('<button onClick="newGame();" class="panel-button" type="button" name="button">New Game</button>').hide().fadeIn(1000);
}

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
        gameOver = true;
        return;
      }
  }
  for (var i = 0; i < grid.length; i++) {
      if(grid[0][i] == grid[1][i] && grid[0][i]==grid[2][i]  && grid[0][i]!=0){
        showWinner(grid[0][i]);
        gameOver = true;
        return;
      }
  }
  if(grid[0][0]==grid[1][1] && grid[0][0] == grid[2][2]  && grid[0][0]!=0){
    showWinner(grid[0][0]);
    gameOver = true;
    return;
  }

  if(grid[0][2]==grid[1][1] && grid[0][2] == grid[2][0]  && grid[2][0]!=0){
    showWinner(grid[1][1]);
    gameOver = true;
    return;
  }
}
