import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./utils";

// 这里是用相对坐标表示的形状
// T形
export const TShape: Shape = [
  { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }
]
// L形
export const LShape: Shape = [
  { x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }
]
// 反向L
export const LMirrorShape: Shape = [
  { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }
];
// S形
export const SShape: Shape = [
  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }
];
// 反向S
export const SMirrorShape: Shape = [
  { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }
];
// 正方形
export const SquareShape: Shape = [
  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }
];
// 长条形
export const LineShape: Shape = [
  { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
];

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
export function createTeris(centerPoint: Point) {
  let index = getRandom(0, shapes.length)
  const shape = shapes[index]
  index = getRandom(0, colors.length)
  const color = colors[index]
  return new SquareGroup(shape, centerPoint, color)
}
