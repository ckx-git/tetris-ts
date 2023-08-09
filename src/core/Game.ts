import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";
import { GameStatus, GameViewer, MoveDirection } from "./types";

export class Game {
  // 游戏状态
  private _gameStatus: GameStatus = GameStatus.init
  // 玩家当前操作的方块
  private _curTeris?: SquareGroup
  // 下一个方块
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 })
  // 计时器
  private _timer?: number
  // 自动下落的时间间隔
  private _duration: number = 1000

  // 这里知道何时显示，但不知道如何显示
  constructor(private _viewer: GameViewer) {
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris)
    this._viewer.showNext(this._nextTeris)
  }

  /**
   * 游戏开始
   */
  start() {
    // 改变游戏状态
    if (this._gameStatus === GameStatus.playing) {
      return
    }
    this._gameStatus = GameStatus.playing
    if (!this._curTeris) {
      // 给当前玩家操作的方块赋值
      this.switchTeris()
    }
    this.autoDrop()
  }

  /**
   * 游戏暂停
   */
  pause() {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause
      clearInterval(this._timer)
      this._timer = undefined
    }
  }

  // 向左移动
  controlLeft() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.move(this._curTeris, MoveDirection.left)
    }
  }
  // 向右移动
  controlRight() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.move(this._curTeris, MoveDirection.right)
    }
  }
  // 向下移动
  controlDown() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.moveDirectly(this._curTeris, MoveDirection.down)
    }
  }
  // 旋转
  controlRotate() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.rotate(this._curTeris)
    }
  }

  /**
   * 当前方块自动下落
   */
  private autoDrop() {
    if (this._timer || this._gameStatus !== GameStatus.playing) {
      return
    }
    this._timer = setInterval(() => {
      if (this._curTeris) {
        TerisRule.move(this._curTeris, MoveDirection.down)
      }
    }, this._duration)
  }
  /**
   * 切换方块
   */
  private switchTeris() {
    this._curTeris = this._nextTeris
    this.resetCenterPoint(GameConfig.panelSie.width, this._curTeris)
    this._nextTeris = createTeris({ x: 0, y: 0 })
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris)


    // 数据操作完后，交给显示去处理
    this._viewer.switch(this._curTeris)
    this._viewer.showNext(this._nextTeris)
  }

  /**
   * 设置中心点坐标，使该方块组出线在所在区域的中上方
   * @param width 
   * @param teris 
   */
  private resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1
    const y = 0
    teris.centerPoint = { x, y }

    while (teris.squares.some(it => it.point.y < 0)) {
      teris.squares.forEach(sq => sq.point = {
        x: sq.point.x,
        y: sq.point.y + 1
      })

      // 这种方式可能造成死循环，当panel高度不足以展示一个方块组时
      // TerisRule.move(teris, MoveDirection.down)
    }
  }
}