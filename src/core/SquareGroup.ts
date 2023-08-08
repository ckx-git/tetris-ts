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

  public get centerPoint(): Point {
    return this._centerPoint
  }

  // 中心点的实际坐标
  public set centerPoint(v: Point) {
    this._centerPoint = v
    // 同时设置小方块对象的坐标
    this._shape.forEach((p, i) => {
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
      sq.point = { // 每个小方块的坐标为中心坐标与形状的坐标相加
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y
      }
      arr.push(sq) // 因为_square是只读的数组，所以先添加的arr
    })
    this._squares = arr
  }
}