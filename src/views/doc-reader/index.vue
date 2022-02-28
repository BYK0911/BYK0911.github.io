<template>
  <div class="page">
    <div class="section flex">
      <div class="flex-item section-aside">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-header__title">最近更新</div>
          </div>
          <div class="panel-body">
            <div
              class="spectial-column text-ellipsis"
              v-for="item in recent"
              :key="item.id"
              @click="open(item)"
            >{{ item.title }}</div>
          </div>
        </div>
        <div class="panel" v-if="topic.length">
          <div class="panel-header">
            <div class="panel-header__title">系列文章</div>
          </div>
          <div class="panel-body">
            <div
              class="spectial-column text-ellipsis"
              :class="{ 'is-active': item.id === doc.id }"
              v-for="item in topic"
              :key="item.id"
              @click="open(item)"
            >{{ item.title }}</div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-header">
            <div class="panel-header__title">目录</div>
          </div>
          <div class="panel-body">
            <div
              v-for="(h, i) in catelogue"
              :style="{ 'padding-left': (h.level - 1) * 20 + 'px', 'margin-bottom': '10px' }"
              :key="i"
            >
              <a class="link-plain" :href="'#anchor_' + i">{{ h.text }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-main doc-wrap">
        <div class="doc-title">{{ doc.title }}</div>
        <div class="tags">
          文章标签：
          <div class="tag" v-for="tag in doc.keywords" :key="tag">{{ tag }}</div>
        </div>
        <div class="doc-detail markdown-body" ref="docContent"></div>
        <div class="next-page link" v-if="nextDoc">
          下一节：
          <span @click="nextDoc ? open(nextDoc) : () => { }">{{ nextDoc.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import storage from '@/common/storage';
import createMd from 'markdown-it'

interface Doc {
  id: string,
  topic: string,
  title: string,
  content: string,
  keywords: string[]
}
const md = createMd()
const docs = (storage.get('docs') as string[] | null || []).map(id => storage.get(id) as Doc)
const docContent = ref()
const route = useRoute()
const router = useRouter()
const recent = docs.slice(-5)
const doc = ref(docs.filter(d => d.id === route.params.id)[0])
const topic = ref(doc.value.topic ? docs.filter(d => d.topic === doc.value.topic) : [])
const open = (d: typeof doc.value) => {
  router.push({ path: '/doc/' + d.id })
  doc.value = d
  topic.value = doc.value.topic ? docs.filter(d => d.topic === doc.value.topic) : []
  docContent.value.innerHTML = md.render(doc.value.content)
  geneCatalogue()
  createAnchor()
}
const catelogue: Ref<{ text: string, level: number }[]> = ref([]);
const geneCatalogue = () => {
  const headers = docContent.value.querySelectorAll('h1, h2, h3, h4, h5, h6')
  catelogue.value = []
  headers.forEach((h: HTMLElement) => {
    catelogue.value.push({
      text: h.textContent || '',
      level: +h.tagName.slice(1)
    })
  })
}
const createAnchor = () => {
  const headers = docContent.value.querySelectorAll('h1, h2, h3, h4, h5, h6')
  headers.forEach((h: HTMLElement, i: number) => {
    const a = document.createElement('a')
    a.id = 'anchor_' + i
    h.prepend(a)
  })
}

onMounted(() => {
  docContent.value.innerHTML = md.render(doc.value.content)
  geneCatalogue()
  createAnchor()
})

const nextDoc = computed(() => {
  const index = topic.value.indexOf(doc.value);
  if (index > -1 && index + 1 < topic.value.length) {
    return topic.value[index + 1]
  }
  return null
})
</script>

<style scoped lang='scss'>
.section-aside {
  overflow: auto;
  width: 260px;
  margin-right: 20px;
}
.doc-wrap {
  position: relative;
  min-height: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 10px 20px;
  padding-bottom: 50px;
}
.doc-title {
  padding: 10px 0;
  font-size: 28px;
  font-weight: bold;
}
.tags {
  padding: 10px;
  background: #f8f8f8;
  border-radius: 4px;
  margin-bottom: 10px;
}

.spectial-column {
  margin-bottom: 10px;
  color: #666;
  &:hover,
  &.is-active {
    color: #59f;
    text-decoration: underline;
    cursor: pointer;
  }
}
.next-page {
  position: absolute;
  bottom: 20px;
  right: 20px;
  text-align: right;
}
</style>

<style lang="scss">
@import url(../../components/md-editor/index.css);
</style>