import { SquareGroup } from "./core/SquareGroup";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'

const group = new SquareGroup(
  [ { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 } ],
  { x: 4, y: 5 },
  'red'
)

group.squares.forEach(sq => {
  sq.viewer = new SquarePageViewer(sq, $('#root'))
})

$('#btnDown').on('click', function() {
  // 更改中心点坐标
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y + 1
  }
  console.log(group.centerPoint)
})
$('#btnUp').on('click', function() {
  // 更改中心点坐标
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y - 1
  }
  console.log(group.centerPoint)
})
$('#btnLeft').on('click', function() {
  // 更改中心点坐标
  group.centerPoint = {
    x: group.centerPoint.x - 1,
    y: group.centerPoint.y
  }
  console.log(group.centerPoint)
})
$('#btnRight').on('click', function() {
  // 更改中心点坐标
  group.centerPoint = {
    x: group.centerPoint.x + 1,
    y: group.centerPoint.y
  }
  console.log(group.centerPoint)
})