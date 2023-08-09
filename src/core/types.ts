import { SquareGroup } from "./SquareGroup"

export interface Point {
  readonly x: number
  readonly y: number
}

// 单个方块的显示类
export interface IViewer {
  /**
   * 显示
   */
  show(): void

  /**
   * 移除，不再显示
   */
  remove(): void
}

/**
 * 形状
 */
export type Shape = Point[]

// 移动方向
export enum MoveDirection {
  left,
  right,
  down
}

// 游戏状态
export enum GameStatus {
  init, // 未开始
  playing, // 进行中
  pause, // 暂停中
  over // 游戏结束
}

export interface GameViewer {
  /**
   * 
   * @param teris 下一个方块对象
   */
  showNext(teris: SquareGroup): void

  /**
   * 
   * @param teris 切换的方块对象
   */
  switch(teris: SquareGroup): void
}