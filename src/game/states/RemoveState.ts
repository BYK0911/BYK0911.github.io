import { isEnd } from "../utils";
import State from "./State";

export default class RemoveState extends State {
  bonus = 0
  action (chess: { r: number, c: number }): void {
    const { r, c } = chess
    if (this.game.panel[r][c] !== this.game.turnTo) {
      this.game.panel[r][c] = 0
      if (isEnd(this.game)) {
        this.game.state = this.game.endState
      } else if (--this.bonus === 0) {
        this.game.state = this.game.moveState
        this.game.turn()
      }
    }
  }
  render (ctx: CanvasRenderingContext2D): void {
    const fs = 12 / this.game.graph.scale
    const y = 20
    ctx.font = fs + 'px sanserif'
    ctx.fillStyle = '#000'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText('Pick Time', 50, y)
    
    ctx.textAlign = 'right'
    ctx.fillText('Turn to: ', 420, y)
    ctx.beginPath()
    ctx.arc(440, y, 6, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = this.game.turnTo === 1 ? 'blue' : 'red'
    ctx.fill()
  }
}