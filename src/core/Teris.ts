import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./utils";

// 这写都是随意选定中心点后，用相对坐标表示的形状

// T形
export class TShape extends SquareGroup {

  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(
      [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],
      _centerPoint, _color
    )
  }
}
// L形
export class LShape extends SquareGroup {

  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(
      [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
      _centerPoint, _color
    );
  }
}
// 反向L
export class LMirrorShape extends SquareGroup {

  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(
      [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
      _centerPoint, _color
    );
  }
}
// S形
export class SShape extends SquareGroup {

  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(
      [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }],
      _centerPoint, _color
    );
  }

  rotate() {
    super.rotate();
    this.isClock = !this.isClock; // 顺时针、逆时针切换旋转
  }
}
// 反向S
export class SMirrorShape extends SquareGroup {

  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(
      [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
      _centerPoint, _color
    )
  }

  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}
// 正方形
export class SquareShape extends SquareGroup {

  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(
      [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
      _centerPoint, _color
    );
  }
  // 正方形旋转后效果一下
  afterRotateShape() {
    return this.shape;
  }
}
// 长条形
export class LineShape extends SquareGroup {

  constructor(
    _centerPoint: Point,
    _color: string
  ) {
    super(
      [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
      _centerPoint, _color
    );
  }

  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}


// 所有形状
export const shapes = [
  TShape,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape
]
// 所有颜色
export const colors = [
  "red",
  "#fff",
  "green",
  "blue",
  "orange"
]

// 随机生成既定的方块组
/**
 * 随机产生一个既定的方块组，即俄罗斯方块（颜色随机、形状随机）
 * @param centerPoint 
 */
export function createTeris(centerPoint: Point) {
  let index = getRandom(0, shapes.length)
  const shape = shapes[index]
  index = getRandom(0, colors.length)
  const color = colors[index]
  return new shape(centerPoint, color)
}
