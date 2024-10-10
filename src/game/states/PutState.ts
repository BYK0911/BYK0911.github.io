import Game from "../Game";
import State from "./State";
import { calcBonus } from "../utils";

const isPutFinished = (game: Game) => {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (game.panel[r][c] === 0) return
    }
  }

  return true
}

export default class PutState extends State {
  bonus = 0
  action (chess: { r: number, c: number }): void {
    const { r, c } = chess
    this.game.panel[r][c] = this.game.turnTo
    if (isPutFinished(this.game)) {
      this.game.turnTo = 2
      this.game.state = this.game.pickState
    } else {
      this.bonus += calcBonus(this.game, r, c)
      if (this.bonus === 0) {
        this.game.turn()
      } else {
        this.bonus--
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
    ctx.fillText('Put Time', 50, y)
    ctx.textAlign = 'right'
    ctx.fillText('Turn to: ', 420, y)
    ctx.beginPath()
    ctx.arc(440, y, 6, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = this.game.turnTo === 1 ? 'blue' : 'red'
    ctx.fill()
  }
}