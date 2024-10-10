import Game from "./Game"

export const calcBonus = (game: Game, r: number, c: number) => {
  const data = game.panel.reduce((res: number[], r: number[]) => [...res, ...r], [])
  const c3 = [[2, 6, 10], [2, 8, 14], [10, 16, 22], [14, 18, 22]]
  const c4 = [[1, 7, 13, 19], [3, 7, 11, 15], [5, 11, 17, 23], [9, 13, 17, 21]]
  const c5 = [[0, 6, 12, 18, 24], [4, 8, 12, 16, 20]]
  const index = r * 5 + c
  const v = data[index]
  const getValue = (_r: number, _c: number) => game.panel[_r] && game.panel[_r][_c] || 0
  const isSame = (...rcs: number[]) => {
    for (let i = 0; i < rcs.length; i += 2) {
      if (getValue(rcs[i], rcs[i + 1]) !== v) return false
    }
    return true
  }

  let bonus = 0
  // square
  if (isSame(r-1, c-1, r-1, c, r, c-1)) bonus += 1
  if (isSame(r-1, c+1, r-1, c, r, c+1)) bonus += 1
  if (isSame(r+1, c-1, r+1, c, r, c-1)) bonus += 1
  if (isSame(r+1, c+1, r+1, c, r, c+1)) bonus += 1
  // row or col
  if (game.panel[r].every(_v => _v === v)) bonus += 2
  if (game.panel.every(r => r[c] === v)) bonus += 2
  // c3
  c3.forEach(arr => {
    if (arr.includes(index) && arr.every(ind => data[ind] === v)) bonus += 1
  })
  // c4
  c4.forEach(arr => {
    if (arr.includes(index) && arr.every(ind => data[ind] === v)) bonus += 2
  })
  // c5
  c5.forEach(arr => {
    if (arr.includes(index) && arr.every(ind => data[ind] === v)) bonus += 3
  })

  return bonus
}

export const isEnd = (game: Game) => {
  if (game.panel.every(r => r.every(v => v !== game.turnTo))) return true
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (game.panel[r][c] && game.panel[r][c] != game.turnTo && (
        r > 0 && game.panel[r-1][c] === 0 ||
        c > 0 && game.panel[r][c-1] === 0 ||
        r < 4 && game.panel[r+1][c] === 0 ||
        c < 4 && game.panel[r][c+1] === 0)
      ) return false
    }
  }
  return true
}