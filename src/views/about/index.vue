<template>
  <div class="page">
    <div class="section">
      <div class="profile flex">
        <div class="avator flex-item">
          <div class="avator__inner">
            <img src="@/assets/avator.png" alt="avator" />
          </div>
        </div>
        <div class="flex-main" style="padding: 10px 20px;">
          <p style="font-size: 26px; margin-bottom: 10px;">
            <span class="col"> 包宇坤 </span>
            <span style="font-size: 14px; padding-left: 40px;"> Web前端开发工程师 </span>
          </p>
          <div style="color: #666;">
            <p class="text-ellipsis">个人简介：先随便写点什么，后期想起来了再改吧！</p>
            <p>
              <span class="col">电话：18519745983</span>
              <span class="col">邮箱：bykmail1992@163.com</span>
            </p>
            <p>
              <span class="col">年龄：30</span>
              <span class="col">码龄：5年</span>
              <span class="col">学历：统招本科</span>
              <span class="col">英语水平：六级</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="panel-left flex-item">
          <div class="flex-item panel">
            <div class="panel-header">
              <div class="panel-header__title">技能标签</div>
            </div>
            <div class="panel-body">
              <div class="tag" v-for="tag in skills" :key="tag">{{ tag }}</div>
            </div>
          </div>
          <div class="flex-item panel">
            <div class="panel-header">
              <div class="panel-header__title">个人项目</div>
            </div>
            <div class="panel-body">
              <div
              class="proj text-ellipsis"
              v-for="(item, i) in projs"
              :key="i"
              @click="open(item.href)"
            >{{ item.label }}</div>
            </div>
          </div>
          <div class="flex-item panel">
            <div class="panel-header">
              <div class="panel-header__title">个人爱好</div>
            </div>
            <div class="panel-body">
              <p style="margin-top: 0;">学习使我快乐！学习使我强大！</p>
              <p>偶尔写个字，画个画</p>
              <p>睡前看会儿书，特别催眠</p>
              <p>偶尔去趟健身房撸撸铁</p>
              <p>偶尔也会打打游戏，吃鸡、王者</p>
              <p>听歌、看电影。。。</p>
            </div>
          </div>
        </div>
        <div class="flex-main panel">
          <div class="panel-header">
            <div class="tabs">
              <div
                class="tab"
                :class="{ 'is-active': tab.name === currentTab.name }"
                v-for="tab in tabs"
                :key="tab.name"
                @click="toggleTab(tab)"
              >{{ tab.label }}</div>
            </div>
          </div>
          <div class="panel-body">
            <component :is="cmps[currentTab.component as keyof typeof cmps]"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Job from './components/job.vue'
import Education from './components/edu.vue'
import Project from './components/proj.vue'

const skills = ['Vue', 'Typescript', 'Canvas', 'Webpack', 'HTML5', 'CSS3', 'Javascript', 'Flutter', 'Git', 'Node']
const tabs = [
  { name: 'job', label: '工作经历', component: 'Job' },
  { name: 'proj', label: '项目经验', component: 'Project' },
  { name: 'edu', label: '教育经历', component: 'Education' },
]
const cmps = {
  Education,
  Job,
  Project
}
const projs = [
  {
    label: '在线模板制作',
    href: 'https://byk0911.github.io/esl-templater/#/home'
  },
  {
    label: '使用canvas2d绘图模拟3d效果',
    href: 'https://byk0911.github.io/v3d/dist/'
  },
]

const currentTab = reactive({
  name: 'job',
  label: '工作经历',
  component: 'Job'
})
const toggleTab = (tab: { name: string, label: string, component: string }) => {
  currentTab.name = tab.name
  currentTab.label = tab.label
  currentTab.component = tab.component
}
const open = (href: string) => {
  window.open(href)
}
</script>

<style scoped lang='scss'>
.profile {
  background: #fff;
  margin: 20px 0;
  height: 200px;
  overflow: visible;
}
.avator {
  width: 200px;
  text-align: center;
  overflow: visible;
  &__inner {
    display: inline-block;
    width: 140px;
    height: 140px;
    border-radius: 70px;
    transform: translateY(-20px);
    overflow: hidden;
    background: #f0f0f0;
    border: 3px solid #eee;
    img {
      width: 100%;
    }
  }
}
.col {
  display: inline-block;
  width: 200px;
}
.col:not(:first-child) {
  margin-left: 40px;
}
.panel-left {
  width: 300px;
  margin-right: 20px;
}
.tab {
  display: inline-block;
  margin: 0 20px;
  font-size: 16px;
  cursor: pointer;
  color: #999;
  &:first-child {
    margin-left: 0;
  }
  &.is-active {
    color: #444;
  }
}
.proj {
  margin-bottom: 10px;
  color: #666;
  &:hover {
    color: #59f;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>