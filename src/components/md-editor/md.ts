import { callbacks } from './hotkey'

let dom: HTMLTextAreaElement

const setDOM = (_dom: HTMLTextAreaElement): void => {
  dom = _dom
}

const insert = (i: number, insertion: string) => {
  dom.value = dom.value.slice(0, i) + insertion + dom.value.slice(i)
}

const focus = (i: number): void => {
  dom.focus()
  dom.setSelectionRange(i, i)
  changeHandlers.forEach(cb => {
    cb(dom.value)
  })
}

const getRange = (): [number, number] => {
  return [dom.selectionStart, dom.selectionEnd]
}

const getLineStart = (s: number): number => {
  for (let i = s; i > 0; i--) {
    if (dom.value[i] === '\n') {
      return i + 1
    }
  }

  return 0
}

const bold = (): void => {
  const [s, e] = getRange()
  insert(s, '**')
  insert(e + 2, '**')
  focus(e + 2)
}

const italic = (): void => {
  const [s, e] = getRange()
  insert(s, '*')
  insert(e + 1, '*')
  focus(e + 1)
}
const mark = (): void => {
  const [s, e] = getRange()
  insert(s, '`')
  insert(e + 1, '`')
  focus(e + 1)
}
const underline = (): void => {
  const [s, e] = getRange()
  insert(s, '++')
  insert(e + 2, '++')
  focus(e + 2)
}
const strikethrouge = (): void => {
  const [s, e] = getRange()
  insert(s, '~~')
  insert(e + 2, '~~')
  focus(e + 2)
}
const code = (): void => {
  const [s, e] = getRange()
  insert(s, '\n```\n')
  insert(e + 5, '\n```\n')
  focus(e + 5)
}
const link = (): void => {
  const [s, e] = getRange()
  const i = getLineStart(s)
  const content = dom.value.slice(i, e) || 'link'
  const _link = `[${content}](https://byk0911.github.io/)`
  dom.value = dom.value.slice(0, i) + _link + dom.value.slice(e)
  focus(i + _link.length)
}
const image = (): void => {
  const [s, e] = getRange()
  const content = dom.value.slice(s, e) || 'image'
  const _link = `![${content}](${require('@/assets/logo.png')})`
  dom.value = dom.value.slice(0, s) + _link + dom.value.slice(e)
  focus(s + _link.length)
}
const h = (n: number): void => {
  const [s, e] = getRange()
  const hn = '#'.repeat(n)
  const i = getLineStart(s)
  insert(i, hn + ' ')
  focus(e + n + 1)
}

const quote = (): void => {
  const [s, e] = getRange()
  const i = getLineStart(s)
  
  insert(i, '> ')
  focus(e + 2)
}

const ul = (): void => {
  const [s, e] = getRange()
  const i = getLineStart(s)
  
  insert(i, '* ')
  focus(e + 2)
}

const ol = (): void => {
  const [s, e] = getRange()
  const i = getLineStart(s)
  
  insert(i, '1. ')
  focus(e + 3)
}

interface CallBackFunction {
  (v: string):void
}
const changeHandlers: Array<CallBackFunction> = []
const onChange = (cb: (v: string) => void): void => {
  changeHandlers.push(cb)
}
export default {
  setDOM,
  onChange,
  bold,
  italic,
  underline,
  strikethrouge,
  quote,
  mark,
  h,
  link,
  code,
  ul,
  ol,
  image,
  
  onSave (cb: ()=> void): void {
    callbacks.onSave.push(cb)
  }
}