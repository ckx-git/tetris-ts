import { Game } from "../Game";
import GameConfig from "../GameConfig";
import { SquareGroup } from "../SquareGroup";
import { GameStatus, GameViewer } from "../types";
import PageConfig from "./PageConfig";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'

export class GamePageViewer implements GameViewer {
  onGameInit(): void {
    this.msgDom.hide()
  }
  onGamePause(): void {
    this.msgDom.show()
    this.msgDom.find('p').html('游戏暂停')
  }
  onGameStart(): void {
    this.msgDom.hide()
  }
  onGameOver(): void {
    this.msgDom.show()    
    this.msgDom.find('p').html('游戏结束')
  }
  private panelDom = $('#panel')
  private nextDom = $('#next')
  private scoreDom = $('#score')
  private msgDom = $('#msg')

  // 游戏初始化
  init(game: Game): void {
    // 1.设置宽高
    this.panelDom.css({
      width: GameConfig.panelSie.width * PageConfig.SquareSize.width,
      height: GameConfig.panelSie.height * PageConfig.SquareSize.height
    })
    this.nextDom.css({
      width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
      height: GameConfig.nextSize.height * PageConfig.SquareSize.height
    })

    // 2.注册键盘事件
    $(document).on('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        game.controlLeft()
      }
      else if (e.key === 'ArrowRight') {
        game.controlRight()
      }
      else if (e.key === 'ArrowUp') {
        game.controlRotate()
      }
      else if (e.key === 'ArrowDown') {
        game.controlDown()
      }
      else if (e.key === ' ') {
        if (game.gameStatus === GameStatus.playing) {
          game.pause()
        }
        else if (game.gameStatus === GameStatus.pause || game.gameStatus === GameStatus.init) {
          game.start()
        }
      }
    })

    this.onGameInit()
  }
  showNext(teris: SquareGroup): void {
     teris.squares.forEach(sq => {
      sq.viewer = new SquarePageViewer(sq, this.nextDom)
    })
  }

  switch(teris: SquareGroup): void {
    teris.squares.forEach(sq => {
      sq.viewer?.remove()
      sq.viewer = new SquarePageViewer(sq, this.panelDom)
    })
  }
  
  showScore(score: number): void {
    this.scoreDom.html(score.toString())
  }
}