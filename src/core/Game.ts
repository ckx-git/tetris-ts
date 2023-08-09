import GameConfig from "./GameConfig";
import { Square } from "./Square";
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
  private _nextTeris: SquareGroup
  // 计时器
  private _timer?: number
  // 自动下落的时间间隔
  private _duration: number = 1000
  // 当前游戏中已存在的已落下的小方块
  // 说明：这里为什么不用SquareGroup? 因为方块组在下落即控制的过程中有意义，已经下落完成后无意义
  private _exists: Square[] = []
  // 积分
  private _score: number = 0

  // 这里知道何时显示，但不知道如何显示
  constructor(private _viewer: GameViewer) {
    // 说明：这行代码没有意义。纯粹为了ts不报错：
    // 因为目前ts只检查属性在声明时或者构造函数中有无直接赋值。在构造函数中通过调用其他函数的赋值是检测不到的。
    // 这里_nextTeris 其实在 createNext中有赋值，但是ts检测不到，会报错。
    this._nextTeris = createTeris({ x: 0, y: 0 })

    this.createNext()
  }

  private createNext() {
    this._nextTeris = createTeris({ x: 0, y: 0 })
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

  restart() {
    if (this._gameStatus !== GameStatus.pause) {
      this._gameStatus = GameStatus.pause
    }
    this.init()
    this.start()
  }

  private init() {
    this._curTeris?.squares.forEach(sq => {
      if (sq.viewer) {
        sq.viewer.remove()
      }
    })
    this._curTeris = undefined

    this._nextTeris.squares.forEach(sq => {
      if (sq.viewer) {
        sq.viewer.remove()
      }
    })

    // 如果之前存在显示的方块，先清除
    this._exists.forEach(sq => {
      if (sq.viewer) {
        sq.viewer.remove()
      }
    })
    this._exists = []
    this.createNext()
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
      TerisRule.move(this._curTeris, MoveDirection.left, this._exists)
    }
  }
  // 向右移动
  controlRight() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.move(this._curTeris, MoveDirection.right, this._exists)
    }
  }
  // 向下移动
  controlDown() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.moveDirectly(this._curTeris, MoveDirection.down, this._exists)
      this.hitBottom()
    }
  }
  // 旋转
  controlRotate() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.rotate(this._curTeris, this._exists)
    }
  }

  private gameOver() {
    this._gameStatus = GameStatus.over
    clearInterval(this._timer)
    this._timer = undefined
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
        if (!TerisRule.move(this._curTeris, MoveDirection.down, this._exists)) {
          this.hitBottom()
        }
      }
    }, this._duration)
  }
  /**
   * 切换方块: 将下个方块组赋给当前，同时重新生成当前方块组
   */
  private switchTeris() {
    this._curTeris = this._nextTeris
    // 在重置中心点并显示之前，清空每个小方块的viewer，避免恰在此时结束游戏时，右边的方块组抖动
    this._curTeris.squares.forEach(sq => {
      if (sq.viewer) {
        sq.viewer.remove()
      }
    })
    this.resetCenterPoint(GameConfig.panelSie.width, this._curTeris)

    // 判断游戏是否结束:
    // 有可能出问题的的情况：当前方块一出现时，就已经和之前的方块重叠了
    if (!TerisRule.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {
      // 游戏结束
      this.gameOver()
      return
    }

    // 生成下一个方块组并显示
    this.createNext()

    // 数据操作完后，交给显示去处理
    this._viewer.switch(this._curTeris)
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
      // 中心点的坐标向下移动
      teris.centerPoint = {
        x: teris.centerPoint.x,
        y: teris.centerPoint.y + 1
      }

      // 这种方式可能造成死循环，当panel高度不足以展示一个方块组时
      // TerisRule.move(teris, MoveDirection.down)
    }
  }

  /**
   * 触底之后的操作
   */
  private hitBottom() {
    // 将当前下落的方块组中包含的方块加入到已存在的方块数组中
    this._exists.push(...this._curTeris!.squares)

    // 处理消除方块
    const num = TerisRule.deleteSquares(this._exists)

    // 增加积分
    this.addScore(num)

    // 切换方块
    this.switchTeris()
  }

  private addScore(lineNum: number) {
    if (lineNum === 0) {
      return;
    }
    else if (lineNum === 1) {
      this._score += 10;
    }
    else if (lineNum === 2) {
      this._score += 25;
    }
    else if (lineNum === 3) {
      this._score += 50;
    }
    else {
      this._score += 100;
    }
    console.log('score:', this._score)
  }
}