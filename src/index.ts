import { Square } from "./core/Square";
import { IViewer } from "./core/types";

class SquareConsoleViewer implements IViewer {
  constructor(
    public square: Square
  ) {

  }

  show(): void {
    console.log(this.square.point.x, this.square.point.y)
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
}

const sq = new Square()
sq.viewer = new SquareConsoleViewer(sq)
sq.point = {
  x: 5,
  y: 6
}
sq.point = {
  x: 8,
  y: 9
}

