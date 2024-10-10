import * as HsGraph from '@hs/graph'
export default class Panel extends HsGraph.Node {
  render (ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(50, 50)
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      ctx.moveTo(i * 100, 0)
      ctx.lineTo(i * 100, 400)
      ctx.moveTo(0, i * 100)
      ctx.lineTo(400, i * 100)
    }
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  }
}