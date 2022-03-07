import storage from '../common/storage'

const docs = [
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

const topics = [
  "Canvas 绘图",
  "Vue",
  "Adobe CEP 插件开发"
]

const _docs = storage.get('docs') as unknown[] || []
const _topics = storage.get('topics') as unknown[] || []

docs.forEach(d => {
  // 更新默认文档
  storage.set(d.value.id, d.value)

  // 将文档添加到文档列表中
  if (!_docs.includes(d.value.id)) {
    _docs.push(d.value.id)
  }
  
})

// 更新专栏列表
topics.forEach(t => {
  if (_topics.indexOf(t) === -1) {
    _topics.push(t)
  }
})

storage.set('docs', _docs)
storage.set('topics', _topics)
