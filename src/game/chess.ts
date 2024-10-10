
import * as HsGraph from '@hs/graph'
export default class Chess extends HsGraph.Node {
  type = 'Chess'
  r = 0
  c = 0

  constructor (r: number, c: number) {
    super()
    this.r = r
    this.c = c
    this.x = c * 100 + 50
    this.y = r * 100 + 50
  }

  render () {}

  contain (x: number, y: number) {
    const m = this.globalTransform
    const _m = new HsGraph.Matrix(m).invert() as HsGraph.Matrix
    const { x: _x, y: _y } = new HsGraph.Vector(x, y).transform(_m.data)

    return _x > -40 && _x < 40 && _y > -40 && _y < 40
  }
}