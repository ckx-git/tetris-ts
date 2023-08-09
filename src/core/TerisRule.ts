import GameConfig from "./GameConfig";
import { Square } from "./Square";
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
   * 判断某个形状的方块组合，能否移动到目标位置：
   * 1.如果移动后超出了边界，则不能移动
   * 2.如果移动后与已有方块产生了重叠，也不能移动
   */
  static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {
    // 假设：中心点已经移动到了目标位置，算出每个小方块的坐标
    const targetSquarePoints: Point[] = shape.map(p => ({
      x: p.x + targetPoint.x,
      y: p.y + targetPoint.y
    }))
    
    // 1.判断是否超出边界
    let result = targetSquarePoints.some( p => {
      return (p.x < 0 || p.x > GameConfig.panelSie.width - 1)
       || (p.y < 0 || p.y > GameConfig.panelSie.height - 1)
    })
    if (result) {
      return false
    }

    // 2.判断是否与已有方块有重叠
    result = targetSquarePoints
      .some(p => exists.some(sq => sq.point.x === p.x && sq.point.y === p.y))
    if (result) {
      return false
    }
    
    return true
  }

  // 函数重载
  static move(teris: SquareGroup, targetPoint: Point, exists: Square[]): boolean
  static move(teris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean
  static move(teris: SquareGroup, targetPointOrDirection: Point | MoveDirection, exists: Square[]): boolean {
    // 如果是Point, 则移动到指定位置
    if (isPoint(targetPointOrDirection)) {
      if (TerisRule.canIMove(teris.shape, targetPointOrDirection, exists)) {
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
      return this.move(teris, targetPoint, exists)
    }
    
  }

  /**
   * 将当前方块组，移动到目标方向上不能移动为止
   * @param teris 
   * @param direction 
   */
  static moveDirectly(teris: SquareGroup, direction: MoveDirection, exists: Square[]) {
    // 简写形式
    while(this.move(teris, direction, exists)) {}

    // while (true) {
    //   if (!this.move(teris, direction)) {
    //     break
    //   }
    // }
  }

  // 旋转
  static rotate(teris: SquareGroup, exists: Square[]): boolean {
    const newShape = teris.afterRotateShape()
    if (TerisRule.canIMove(newShape, teris.centerPoint, exists)) {
      teris.rotate()
      return true
    }
    return false
  }

  /**
   * 返回已存在方块数组中，所有y坐标为y值的方块
   * @param exists 
   * @param y 
   */
  private static getLineSquares(exists: Square[], y: number) {
    return exists.filter(sq => sq.point.y === y)
  }

  /**
   * 消除方块：从已存在的方块中进行消除，并返回消除的行数
   * @param exists 
   * @returns 
   */
  static deleteSquares(exists: Square[]): number {
    // 1.获得所有y坐标的数组
    const ys = exists.map(sq => sq.point.y)

    // 2.获得最大和最小的y坐标
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)
    
    // 3.循环判断每一行是否可消除
    let num = 0
    for (let y = minY; y <= maxY; y++) {
      if (this.deleteLine(exists, y)) {
        num++
      }
    }

    return num
  }

  /**
   * 消除一行： 在已存在方块中消除的某一行
   * @param exists 
   * @param y 
   */
  private static deleteLine(exists: Square[], y: number): boolean {
    // 返回已存在方块数组中，所有y坐标等于y值的方块
    const squares = exists.filter(sq => sq.point.y === y)

    // 如果改行的方块数和面板的宽度相等，则该行已满可以删除
    if (squares.length === GameConfig.panelSie.width) {
      // 1.从界面中消除这一行
      squares.forEach(sq => {
        if (sq.viewer) {
          sq.viewer.remove()
        }
      })

      // 2.消除后，所有y坐标比y值小的方块都下移一行 即 point.y + 1
      exists.filter(sq => sq.point.y < y).forEach(sq => {
        sq.point = {
          x: sq.point.x,
          y: sq.point.y + 1
        }
      })

      // 3.从exists数组删除数据
      squares.forEach(sq => {
        const index = exists.indexOf(sq)
        exists.splice(index, 1)
      })

      return true
    }
    return false
  }
}