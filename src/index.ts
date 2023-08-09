import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from 'jquery'

let game = new Game(new GamePageViewer())
// game.start()


$('#btnRestart').on('click', function() {
  game.restart()
})

$('#btnStart').on('click', function() {
  game.start()
})
$('#btnPause').on('click', function() {
  game.pause()
})
$("#btnLeft").on('click', function(){
  game.controlLeft();
})

$("#btnRight").on('click', function(){
  game.controlRight();
})

$("#btnDown").on('click', function(){
  game.controlDown();
})

$("#btnRotate").on('click', function(){
  game.controlRotate();
})