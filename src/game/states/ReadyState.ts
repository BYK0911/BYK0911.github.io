import State from "./State";

export default class ReadyState extends State {
  action (): void {
    this.game.state = this.game.putState
  }
  render (ctx: CanvasRenderingContext2D): void {
    const fs = 12 / this.game.graph.scale
    ctx.font = fs + 'px sanserif'
    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Click anywhere and start!', 250, 20)
  }
}