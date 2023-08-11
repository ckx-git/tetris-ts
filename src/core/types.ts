import { Game } from "./Game"
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
   * 显示下一个方块组对象
   * @param teris 
   */
  showNext(teris: SquareGroup): void

  /**
   * 切换当前方块组与下一个方块组对象
   * @param teris 
   */
  switch(teris: SquareGroup): void

  /**
   * 完成游戏界面初始化
   * @param game 
   */
  init(game: Game): void

  /**
   * 显示分数
   * @param score 
   */
  showScore(score: number): void

  onGamePause(): void

  onGameStart(): void

  onGameOver(): void

}