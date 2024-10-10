import Game from "../Game";

export default abstract class State {
  constructor (public game: Game) {}
  
  abstract action (...args: any): void
  abstract render (ctx: CanvasRenderingContext2D): void
}