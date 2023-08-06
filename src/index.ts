import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'

const sq = new Square()
sq.viewer = new  SquarePageViewer(sq, $('#root'))
sq.color = 'red'
sq.point = {
  x: 3,
  y: 0
}
const sq2 = new Square()
sq2.viewer = new  SquarePageViewer(sq2, $('#root'))
sq2.color = 'red'
sq2.point = {
  x: 4,
  y: 0
}

$('#btnDown').on('click', function() {
  console.log('aaa')
  sq.point = {
    x: sq.point.x,
    y: sq.point.y + 1
  }
  sq2.point = {
    x: sq2.point.x,
    y: sq2.point.y + 1
  }
})
$('#btnRemove').on('click', function() {
  if (sq.viewer) {
    sq.viewer.remove()
  }
})
$('#btnAdd').on('click', function() {
  sq.viewer = new SquarePageViewer(sq, $('#root'))
})