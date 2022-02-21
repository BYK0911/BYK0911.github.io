<template>
<div class="md-editor-wrap page flex-v">
  <div class="header flex-item flex">
    <el-input class="doc-title flex-main" v-model="doc.title"></el-input>
    <div class="btn-group flex-itme">
      <el-button @click="save"> 保存 </el-button>
    </div>
  </div>
  <div class="flex-main flex">
    <md-editor v-model="doc.content" :onSave="save" class="flex-main"></md-editor>
    <el-form class="flex-item doc-info" label-position="top">
      <el-form-item label="专栏：">
        <el-select
          allow-create
          filterable
          default-first-option
          clearable
          placeholder="请选择或输入一个专栏名称"
          v-model="doc.topic"
          @change="createTopic"
        >
          <el-option v-for="o in topics" :key="o" :value="o" :label="o"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：">
          <el-input class="tag-input" v-model="newTag" @keydown.enter="createTag">
            <template #append>
              <el-button :icon="Plus" @click="createTag"></el-button>
            </template>
          </el-input>
          <div class="tag-wrap">
            <template v-if="doc.keywords.length">
              <div class="tag" v-for="tag in doc.keywords" :key="tag">
              {{ tag }}
              <span class="remove" @click="removeTag(tag)">X</span>
              </div>
            </template>
            <div v-else class="no-data"> 暂无标签 </div>
          </div>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import MdEditor from '@/components/md-editor/index.vue'
import { reactive, ref } from 'vue'
import storage from '@/common/storage'

interface Doc {
  title: string,
  content: string,
  topic: string,
  keywords: string[],
  id: string
}
const route = useRoute()
const id = route.params.id as string
const _doc = storage.get(id) as Doc | null
const doc = reactive(_doc || {
  id,
  title: 'Untitled',
  content: '',
  topic: '',
  keywords: []
})
const newTag = ref('')
const topics = (storage.get('topics') || []) as string[]
const createTopic = () => {
  if (!doc.topic) return
  if (!topics.includes(doc.topic)) {
    topics.push(doc.topic)
    storage.set('topics', topics)
  }
}
const createTag = () => {
  if (!newTag.value) return
  !doc.keywords.includes(newTag.value) && doc.keywords.push(newTag.value)
  newTag.value = ''
}
const removeTag = (tag: string) => {
  const i = doc.keywords.indexOf(tag)
  if (i > -1) {
    doc.keywords.splice(i, 1)
  }
}
const save = () => {
  const docs: string[] = (storage.get('docs') || []) as string[]
  if (!docs.includes(id)) {
    docs.push(id)
    storage.set('docs', docs)
  }
  storage.set(id, doc)
  ElMessage({
    message: '保存成功.',
    type: 'success',
    duration: 1000
  })
}
</script>

<style scoped lang='scss'>
.md-editor-wrap {
  height: 100%;
  padding: 10px;
}
.header {
  // background: #fff;
  margin-bottom: 10px;
  // padding: 10px;
}
.doc-title {
  width: 500px;
  &:deep .el-input__inner {
    border: none;
    background: transparent;
    font-size: 16px;
    font-weight: bold;
  }
}
.doc-info {
  width: 300px;
  margin-left: 10px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
}
.tag-input:deep .el-input__inner {
  border-radius: 4px 0 0 0;
}
.tag-wrap {
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  margin-top: -1px;
  border-radius: 0 0 4px 4px;
}
.tag {
  position: relative;
  line-height: 18px;
  &:hover .remove {
    display: block;
  }
}
.remove {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  transform: translate(50%, -50%);
  color: #5af;
  cursor: pointer;
}
</style>