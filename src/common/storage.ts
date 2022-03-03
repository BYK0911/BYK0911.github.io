
import { topics } from '../docs/doc';

const defaultDocs = [
  require('../docs/1645433309313.json'),
  require('../docs/1645433358746.json'),
  require('../docs/1645433467140.json'),
  require('../docs/1645433524733.json'),
  require('../docs/1645435264368.json'),
  require('../docs/1646029388219.json'),
  require('../docs/1646043364532.json'),
  require('../docs/1646043487123.json'),
  require('../docs/1646043652524.json'),
  require('../docs/1646043731876.json'),
  require('../docs/1646288680934.json'),
];

function set (key: string | number, value: unknown): void {
  const content = { value }
  localStorage.setItem(key + '', JSON.stringify(content))
}

function get (key: string): unknown {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value).value : null
}

const _docs = get('docs') as unknown[] || []
const _topics = get('topics') as unknown[] || []

defaultDocs.forEach(d => {
  if (!_docs.includes(d.value.id)) {
    set(d.value.id, d.value)
    _docs.push(d.value.id)
  }
  topics.value.forEach(t => {
    if (_topics.indexOf(t) === -1) {
      _topics.push(t)
    }
  })
})

set('docs', _docs)
set('topics', _topics)

export default {
  set,
  get
}