import { IViewer } from "../types";

export class SquarePageViewer implements IViewer {
  private dom?: JQuery<HTMLElement>

  show(): void {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }

}