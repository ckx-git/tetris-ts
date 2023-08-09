import { Square } from "./Square";
import { Point, Shape } from "./types";

/**
 * 组合方块
 */
export class SquareGroup {
  private _squares: readonly Square[]

  public get squares() {
    return this._squares
  }

  public get shape() {
    return this._shape
  }

  public get centerPoint(): Point {
    return this._centerPoint
  }

  // 中心点的实际逻辑坐标
  public set centerPoint(v: Point) {
    this._centerPoint = v
    // 根据中心点的逻辑坐标设置小方块对象实际逻辑的坐标
    this.setSquarePoints()
  }

  /**
   * 根据中心点坐标，以及形状，设置每一个小方块的坐标
   */
  private setSquarePoints() {
    this._shape.forEach((p, i) => {
      // 每个小方块的坐标为中心坐标与形状的坐标相加
      this._squares[i].point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y
      }
    })
  }
  constructor(
    private _shape: Shape,
    private _centerPoint: Point,
    private _color: string
  ) {
    // 设置小方块的数组
    const arr: Square[] = []
    this._shape.forEach(p => {
      const sq = new Square()
      sq.color = this._color
      
      arr.push(sq) // 因为_square是只读的数组，所以先添加到arr
    })
    this._squares = arr
    // 每个小方块的坐标
    this.setSquarePoints()
  }

  /**
   * 旋转方向是否为顺时针
   */
  protected isClock = true

  // 旋转之后的形状
  afterRotateShape(): Shape {
    // 顺时针 x,y => x: -y, y:x
    if (this.isClock) {
      return this._shape.map(p => {
        const newPoint: Point = {
          x: -p.y,
          y: p.x
        }
        return newPoint
      })
    }
    // 逆时针 x,y => x: y, y: -x
    else {
      return this.shape.map(p => {
        const newPoint: Point = {
          x: p.y,
          y: -p.x
        }
        return newPoint
      })
    }
  }

  // 旋转
  rotate() {
    const newShape = this.afterRotateShape()
    this._shape = newShape
    this.setSquarePoints()
  }
}