import State from "./State";

export default class EndState extends State {
  action (): void {
    this.game.state = this.game.putState
    this.game.panel = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]
    this.game.turnTo = 1
  }
  render (ctx: CanvasRenderingContext2D): void {
    const winner = this.game.turnTo === 1 ? 'Blue' : 'Red'
    ctx.fillStyle = 'rgba(255,255,255,.8)'
    ctx.fillRect(0, 0, 500, 500)
    ctx.font = 12 / this.game.graph.scale + 'px sanserif'
    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Click anywhere and start!', 250, 30)
    ctx.font = 24 / this.game.graph.scale + 'px sanserif'
    ctx.fillText('Winner ' + winner, 250, 250)
    ctx.font = 40 / this.game.graph.scale + 'px sanserif'
    ctx.fillText('Game Over', 250, 200)
  }
}