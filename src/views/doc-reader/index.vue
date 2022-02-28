<template>
  <div class="page">
    <div class="section flex">
      <div class="flex-item section-aside">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-header__title"> 最近更新 </div>
          </div>
          <div class="panel-body">
            <div
              class="spectial-column text-ellipsis"
              v-for="item in recent"
              :key="item.id"
              @click="open(item)"
            > {{ item.title }} </div>
          </div>
        </div>
        <div class="panel" v-if="topic.length">
          <div class="panel-header">
            <div class="panel-header__title"> 系列文章 </div>
          </div>
          <div class="panel-body">
            <div
              class="spectial-column text-ellipsis"
              :class="{'is-active': item.id === doc.id }"
              v-for="item in topic"
              :key="item.id"
              @click="open(item)"
            > {{ item.title }} </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-header">
            <div class="panel-header__title"> 目录 </div>
          </div>
          <div class="panel-body">
            <div class="no-data"> 暂无数据 </div>
          </div>
        </div>
      </div>
      <div class="flex-main doc-wrap">
        <div class="doc-title"> {{ doc.title }} </div>
        <div class="tags">
          文章标签：
          <div class="tag" v-for="tag in doc.keywords" :key="tag"> {{ tag }} </div>
        </div>
        <div class="doc-detail markdown-body" ref="docContent"></div>
        <div class="next-page link" v-if='nextDoc'>
          下一节：<span @click="nextDoc ? open(nextDoc) : ()=>{}"> {{ nextDoc.title }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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
}

onMounted(() => {
  docContent.value.innerHTML = md.render(doc.value.content)
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
  width: 260px;
  margin-right: 20px;
}
.doc-wrap {
  min-height: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 10px 20px;
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
  margin: 20px 0;
  text-align: right;
}
</style>

<style lang="scss">
@import url(../../components/md-editor/index.css);
</style>