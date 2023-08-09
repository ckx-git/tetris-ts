import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from 'jquery'

let game = new Game(new GamePageViewer())
game.start()

$('#btnStart').on('click', function() {
  console.log('s')
  game.start()
})
$('#btnPause').on('click', function() {
  console.log('p')
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