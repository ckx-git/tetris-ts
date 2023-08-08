import { createTeris } from "./core/Teris";
import { TerisRule } from "./core/TerisRule";
import { MoveDirection } from "./core/types";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'

// 创建方块组
const teris = createTeris({ x: 3, y: 2 })

teris.squares.forEach(sq => {
  sq.viewer = new SquarePageViewer(sq, $('#root'))
})

$('#btnDown').on('click', function () {
  // TerisRule.move(teris, MoveDirection.down)
  TerisRule.moveDirectly(teris, MoveDirection.down)

  // 更改中心点坐标
  // const targetPoint = {
  //   x: teris.centerPoint.x,
  //   y: teris.centerPoint.y + 1
  // }
  // TerisRule.move(teris, targetPoint)
})
$('#btnUp').on('click', function () {
  // 更改中心点坐标
  const targetPoint = {
    x: teris.centerPoint.x,
    y: teris.centerPoint.y - 1
  }
  if (TerisRule.canIMove(teris.shape, targetPoint)) {
    teris.centerPoint = {
      x: teris.centerPoint.x,
      y: teris.centerPoint.y - 1
    }
    console.log(teris.centerPoint)
  }
})
$('#btnLeft').on('click', function () {
  TerisRule.move(teris, MoveDirection.left)
})
$('#btnRight').on('click', function () {
  TerisRule.move(teris, MoveDirection.right)
})