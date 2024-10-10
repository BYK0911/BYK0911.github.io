import * as HsGraph from '@hs/graph'
import Panel from './panel'
import Chess from './chess'
import ReadyState from './states/ReadyState'
import State from './states/State'
import PutState from './states/PutState'
import PickState from './states/PickState'
import MoveState from './states/MoveState'
import RemoveState from './states/RemoveState'
import EndState from './states/EndState'

const drawChess = (ctx: CanvasRenderingContext2D, x: number, y: number, value: number) => {
  if (value === 0) return
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y , 10, 0, Math.PI * 2)
  ctx.closePath()
  const gr = ctx.createRadialGradient(x - 2, y - 2, 3, x, y, 13)
  gr.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gr.addColorStop(1, 'rgba(0, 0, 0, 1)')
  ctx.fillStyle = value === 1 ? 'blue' : 'red'
  ctx.fill()
  ctx.fillStyle = gr
  ctx.fill()
  ctx.restore()
}

export default class Game {
  state: State
  readyState = new ReadyState(this)
  putState = new PutState(this)
  pickState = new PickState(this)
  moveState = new MoveState(this)
  removeState = new RemoveState(this)
  endState = new EndState(this)
  turnTo = 1 // 1: 黑棋，2：红棋
  graph: HsGraph.Graph = new HsGraph.Graph({ backgroundColor: '#f5f6f7' })

  // 棋盘，0：空，1：黑，2：红
  panel = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]

  constructor (dom: HTMLElement) {
    this.state = this.readyState
    this.init(dom)
  }

  init (dom: HTMLElement) {
    this.graph.add(new Panel())
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        this.graph.add(new Chess(r, c))
      }
    }
    this.graph.mount(dom)
    this.resetViewport()
    this.graph.on('click', (e: HsGraph.GraphEvent) => {
      if (e.target || this.state == this.readyState) {
        this.state.action(e.target)
        this.graph.update(true, true)
      }
    })
    this.graph.on('rendered', (ctx: CanvasRenderingContext2D) => {
      ctx.save()
      ctx.translate(this.graph.x, this.graph.y)
      ctx.rotate(this.graph.rotation)
      ctx.scale(this.graph.scale, this.graph.scale)
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          drawChess(ctx, c * 100 + 50, r * 100 + 50, this.panel[r][c])
        }
      }
      this.state.render(ctx)
      ctx.restore()
    })
    this.graph.on('mousemove', (e: HsGraph.GraphEvent) => this.graph.setCursor(e.target ? 'pointer' : ''))
    this.graph.update(true, true)
  }

  turn () {
    this.turnTo = this.turnTo === 1 ? 2 : 1
  }

  resetViewport () {
    const w = 500
    const h = 500
    const s = this.graph.scale = Math.min(this.graph.width / w, this.graph.height / h)
    this.graph.x = (this.graph.width - s * w) / 2
    this.graph.y = (this.graph.height - s * h) / 2
  }
}