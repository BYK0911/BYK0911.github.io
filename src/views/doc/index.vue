<template>
  <div class="page">
    <div class="section">
      <div class="search-bar">
        <el-input style='width: 260px; margin-right: 10px;' v-model="keyword" @keydown.enter="filter"></el-input>
        <el-button style="vertical-align: top;" @click="filter"> 搜索 </el-button>
      </div>
      
      <div class="flex">
        <div class="flex-main list-wrap">
          <div class="no-data" v-if="!docs.length"> 没有找到相关的文章 </div>
          <div class="item" v-else v-for="d in docs" :key="d.id">
            <div class="item-title text-ellipsis" @click="to(d.id)"> {{ d.title }} </div>
            <div class="item-detail" @click="to(d.id)"> {{ d.content }}</div>
            <div class="item-statistics flex">
              <span class="flex-item"> like: 0 </span>
              <span class="flex-item"> dislike: 0 </span>
              <span class="flex-main" style="text-align: right"> {{ d.keywords.join(', ')}} </span>
            </div>
          </div>
        </div>
        <div class="flex-item section-aside">
          <div class="panel">
            <div class="panel-header">
              <div class="panel-header__title"> 标签 </div>
            </div>
            <div class="panel-body">
              <div class="tags">
                <div class="tag" @click="handleTagChange('')"> 全部 </div>
                <div class="tag" :class="{ 'is-active': activeTag === tag }" v-for="tag in tags" :key="tag" @click="handleTagChange(tag)"> {{ tag }} </div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-header">
              <div class="panel-header__title"> 专栏 </div>
            </div>
            <div class="panel-body">
              <div
                class="spectial-column text-ellipsis"
                v-for="item in topics"
                :key="item"
                @click="toTopic(item)"
              > {{ item }} </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel-header">
              <div class="panel-header__title"> 最近更新 </div>
            </div>
            <div class="panel-body">
              <div
                class="spectial-column text-ellipsis"
                v-for="item in recent"
                :key="item.id"
                @click="to(item.id)"
              > {{ item.title }} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button title="写文章" class="btn-edit" type="primary" :icon="Edit" circle @click="createDoc"></el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, Ref } from 'vue';
import { Edit } from '@element-plus/icons-vue'
import storage from '@/common/storage';
import createMd from 'markdown-it'

interface Doc {
  title: string,
  content: string,
  topic: string,
  keywords: string[],
  id: string
}

const md = createMd()
const tags = ['vue', 'javascript', 'canvas', 'html', 'css', 'typescript', 'git', 'flutter', 'node']
const activeTag = ref()
const docIds = storage.get('docs') as string[] | null || []
const allDocs: Doc[] = docIds.map(id => {
  const doc = storage.get(id) as Doc
  const div = document.createElement('div')
  div.innerHTML = md.render(doc.content)
  doc.content = div.textContent || ''
  return doc
})
const docs: Ref<Doc[]> = ref([])
const topics = storage.get('topics') as string[] | null || []

const router = useRouter()
const keyword = ref('')
const recent = allDocs.slice(-5)

const createDoc = () => {
  const timestamp = +new Date()
  router.push({ path: '/doc/' + timestamp + '/edit' })
}
const to = (id: string) => {
  router.push({ path: '/doc/' + id })
}
const toTopic = (id: string) => {
  const d = docs.value.filter((d: Doc) => d.topic === id)[0]
  if (d) {
    router.push({ path: '/doc/' + d.id})
  }
}

const filter = () => {
  docs.value = allDocs.filter(item => {
    const rx = new RegExp(keyword.value, 'i')
    const rx2 = new RegExp(`^${activeTag.value}$`, 'i')
    return (rx.test(item.title) || item.keywords.some(s => rx.test(s)))
    && (!activeTag.value || item.keywords.some(s => rx2.test(s)))
  })
}
const handleTagChange = (tag: string) => {
  activeTag.value = tag
  filter()
}
filter()
</script>

<style scoped lang='scss'>
.search-bar {
  text-align: right;
  margin: 10px 0;
}
.tags {
  margin: -5px;
}
.tag {
  cursor: pointer;
  &:hover,
  &.is-active {
    color: #5af;
  }
}

.section-aside {
  width: 260px;
  margin-left: 20px;
}
.list-wrap {
  background: #fff;
  padding: 0 10px;
}
.item {
  border-bottom: 1px solid #eee;
  padding: 10px;
  cursor: pointer;
}
.item-title {
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    color: #58d;
  }
}
.item-detail {
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  margin-bottom: 20px;
}
.item-statistics span:not(:first-child) {
  margin-left: 20px;
}

.spectial-column {
  margin-bottom: 10px;
  color: #666;
  &:hover {
    color: #59f;
    text-decoration: underline;
    cursor: pointer;
  }
}
.btn-edit {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>