import { SquareGroup } from "../SquareGroup";
import { GameViewer } from "../types";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'

export class GamePageViewer implements GameViewer {
  showNext(teris: SquareGroup): void {
     teris.squares.forEach(sq => {
      sq.viewer = new SquarePageViewer(sq, $('#next'))
    })
  }

  switch(teris: SquareGroup): void {
    teris.squares.forEach(sq => {
      sq.viewer?.remove()
      sq.viewer = new SquarePageViewer(sq, $('#panel'))
    })
  }
  
}