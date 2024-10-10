import { calcBonus, isEnd } from "../utils";
import State from "./State";

export default class MoveState extends State {
  activeChess: { r: number, c: number } | null = null

  action (chess: { r: number, c: number }): void {
    const { r, c } = chess
    if (this.game.panel[r][c]  === this.game.turnTo) {
      this.activeChess = { r, c }
    } else if (this.game.panel[r][c] === 0 && this.activeChess) {
      const { r: or, c: oc } = this.activeChess
      if (Math.abs(or - r) + Math.abs(oc - c) != 1) return

      this.activeChess = null
      this.game.panel[or][oc] = 0
      this.game.panel[r][c] = this.game.turnTo
      const bonus = calcBonus(this.game, r, c)
      if (bonus > 0) {
        this.game.removeState.bonus = bonus
        this.game.state = this.game.removeState
      } else if (isEnd(this.game)) {
        this.game.state = this.game.endState
      } else {
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
    ctx.fillText('Move Time', 50, y)
    
    ctx.textAlign = 'right'
    ctx.fillText('Turn to: ', 420, y)
    ctx.beginPath()
    ctx.arc(440, y, 6, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = this.game.turnTo === 1 ? 'blue' : 'red'
    ctx.fill()
  }
}