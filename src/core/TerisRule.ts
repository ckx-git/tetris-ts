import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { MoveDirection, Point, Shape } from "./types";

// 自定义类型辅助函数
function isPoint(obj: any): obj is Point {
  if (typeof obj.x === 'undefined') {
    return false
  }
  return true
}


/**
 * 该类中提供一系列函数，根据游戏规则判断各种情况
 */
export class TerisRule {
  /**
   * 判断某个形状的方块组合，能否移动到目标位置。如果移动后超出了边界，则不能移动
   */
  static canIMove(shape: Shape, targetPoint: Point): boolean {
    // 假设：中心点已经移动到了目标位置，算出每个小方块的坐标
    const targetSquarePoints: Point[] = shape.map(p => ({
      x: p.x + targetPoint.x,
      y: p.y + targetPoint.y
    }))
    // 是否超出边界判断
    const result = targetSquarePoints.some( p => {
      return (p.x < 0 || p.x > GameConfig.panelSie.width - 1)
       || (p.y < 0 || p.y > GameConfig.panelSie.height - 1)
    })
    
    return !result
  }

  // 函数重载
  static move(teris: SquareGroup, targetPoint: Point): boolean
  static move(teris: SquareGroup, direction: MoveDirection): boolean
  static move(teris: SquareGroup, targetPointOrDirection: Point | MoveDirection): boolean {
    // 如果是Point, 则移动到指定位置
    if (isPoint(targetPointOrDirection)) {
      if (TerisRule.canIMove(teris.shape, targetPointOrDirection)) {
        teris.centerPoint = targetPointOrDirection
        return true
      }
      return false
    }
    // 如果是direction, 则自动一格一格移动到不能移动为止
    else {
      // 向下、左、右移动 
      const direction = targetPointOrDirection
      let targetPoint: Point
      if (direction === MoveDirection.down) {
        targetPoint = {
          x: teris.centerPoint.x,
          y: teris.centerPoint.y + 1
        }
      }
      else if (direction === MoveDirection.left) {
        targetPoint = {
          x: teris.centerPoint.x - 1,
          y: teris.centerPoint.y
        }
      }
      else {
        targetPoint = {
          x: teris.centerPoint.x + 1,
          y: teris.centerPoint.y
        }
      }
      return this.move(teris, targetPoint)
    }
    
  }

  /**
   * 将当前方块组，移动到目标方向上不能移动为止
   * @param teris 
   * @param direction 
   */
  static moveDirectly(teris: SquareGroup, direction: MoveDirection) {
    // 简写形式
    while(this.move(teris, direction)) {}

    // while (true) {
    //   if (!this.move(teris, direction)) {
    //     break
    //   }
    // }
  }

  static rotate(teris: SquareGroup): boolean {
    const newShape = teris.afterRotateShape()
    if (TerisRule.canIMove(newShape, teris.centerPoint)) {
      teris.rotate()
      return true
    }
    return false
  }
}