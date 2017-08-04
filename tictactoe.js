var turnX = true;
var turn = 1;

var grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

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
        alert(grid[i][0]+" Wins");
        return;
      }
  }
  for (var i = 0; i < grid.length; i++) {
      if(grid[0][i] == grid[1][i] && grid[0][i]==grid[2][i]  && grid[0][i]!=0){
        alert(grid[0][i]+" Wins");
        return;
      }
  }
  if(grid[0][0]==grid[1][1] && grid[0][0] == grid[2][2]  && grid[0][0]!=0){
    alert(grid[0][0]+" Wins");
    return;
  }

  if(grid[0][2]==grid[1][1] && grid[0][2] == grid[2][0]  && grid[2][0]!=0){
    alert(grid[1][1]+" Wins");
    return;
  }
}

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
