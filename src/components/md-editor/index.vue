<template>
  <div class="md-wrap flex-v">
    <div class="toolbar flex-item flex">
      <div class="flex-main">
        <!-- <el-button>
          <span class="iconfont icon-save"></span>
        </el-button>
        <div class="divider"></div> -->
        <el-button @click="md.bold"> B </el-button>
        <el-button @click="md.italic"> I </el-button>
        <el-button @click="md.strikethrouge">
          <span class="strike-through"> S </span>
        </el-button>
        <el-dropdown trigger="click" popper-class="dropdown">
          <el-button> H </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="md.h(1)"> <h1> H1 </h1> </el-dropdown-item>
              <el-dropdown-item @click="md.h(2)"> <h2> H2 </h2> </el-dropdown-item>
              <el-dropdown-item @click="md.h(3)"> <h3> H3 </h3> </el-dropdown-item>
              <el-dropdown-item @click="md.h(4)"> <h4> H4 </h4> </el-dropdown-item>
              <el-dropdown-item @click="md.h(5)"> <h5> H5 </h5> </el-dropdown-item>
              <el-dropdown-item @click="md.h(6)"> <h6> H6 </h6> </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <el-button @click="md.underline">
          <span class="underline"> U </span>
        </el-button> -->
        <div class="divider"></div>
        <el-button @click="md.quote">
          <span class="iconfont icon-quote"></span>
        </el-button>
        <el-button @click="md.mark">
          <span class="iconfont icon-mark"></span>
        </el-button>
        <el-button @click="md.link">
          <span class="iconfont icon-link1"></span>
        </el-button>
        <el-button @click="md.ul">
          <span class="iconfont icon-unorderedlist"></span>
        </el-button>
        <el-button @click="md.ol">
          <span class="iconfont icon-orderedlist"></span>
        </el-button>
        <el-button @click="md.image">
          <span class="iconfont icon-i-img"></span>
        </el-button>
        <!-- <el-button @click="md.mark">
          <span class="iconfont icon-table"></span>
        </el-button> -->
        <el-button @click="md.code">
          <span class="iconfont icon-code"></span>
        </el-button>
      </div>
      <div class="flex-item">
        <el-button @click="preview" :icon="View"></el-button>
        <el-button :icon="InfoFilled"></el-button>
      </div>
    </div>
    <div class="flex-main flex">
      <textarea ref="textareaRef" class="flex-main md-editor" v-model="value" @input="handleChange"></textarea>
      <template v-if="previewVisible">
        <div class="resizer flex-item"></div>
        <div ref="previewRef" class="flex-item md-preview markdown-body"></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import md from './md'
import { registerHotkey, cancelHotkey } from './hotkey'
import {
  View,
  InfoFilled
} from '@element-plus/icons-vue'
import createMarkdownIt from 'markdown-it'

const props = defineProps(['modelValue', 'onSave'])
const emit = defineEmits(['update:modelValue'])

const mdit = createMarkdownIt()
const textareaRef = ref()
const previewVisible = ref(true)
const previewRef = ref()
const value = ref(props.modelValue)

const preview = () => {
  previewVisible.value = !previewVisible.value
  if (previewVisible.value) {
    nextTick(() => {
      previewRef.value.innerHTML = mdit.render(value.value)
    })
  }
}
const handleChange = () => {
  emit('update:modelValue', value.value)
  if (previewVisible.value) {
    if (previewRef.value) {
      previewRef.value.innerHTML = mdit.render(value.value)
    } else {
      nextTick(() => {
        previewRef.value.innerHTML = mdit.render(value.value)
      })
    }
  }
}

registerHotkey()
if (props.onSave) {
  md.onSave(props.onSave)
}

onMounted(() => {
  md.setDOM(textareaRef.value)
  md.onChange((v: string) => {
    value.value = v
    handleChange()
  })
  if (previewVisible.value) {
    nextTick(() => {
      previewRef.value.innerHTML = mdit.render(value.value)
    })
  }
})
onBeforeUnmount(cancelHotkey)
</script>

<style scoped lang='scss'>
.el-button {
  width: 32px;
  padding: 8px 0;
  text-align: center;
  border: none;
  font-size: 16px;
  margin-left: 0;
}
.divider {
  display: inline-block;
  width: 1px;
  height: 20px;
  background: #ccc;
  vertical-align: middle;
  margin: 0 10px;
}
.underline {
  text-decoration: underline;
}
.strike-through {
  text-decoration: line-through;
}
.md-wrap {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.toolbar {
  padding: 4px 10px;
  background: #fff;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid #ddd;
}
.md-preview {
  width: 50%;
  background: #fff;
  padding: 10px;
  border-radius: 0 0 4px 0;
}
.resizer {
  width: 10px;
  cursor: ew-resize;
}
.md-editor {
  background: #fff;
  outline: none;
  padding: 10px;
  border: none;
  resize: none;
  border-radius: 0 0 0 4px;
  &:last-child {
    border-radius: 0 0 4px 4px;
  }
}
</style>

<style>
.dropdown h1,
.dropdown h2,
.dropdown h3,
.dropdown h4,
.dropdown h5,
.dropdown h6 {
  margin: 0;
}
</style>

<style scoped lang="scss">
@import url(./index.css);
</style>