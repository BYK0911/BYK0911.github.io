<template>
  <div class="proj-wrap">
    <div class="proj" v-for="(p, i) in projs" :key="i">
      <h3 class="proj-title"> {{ p.name }} </h3>
      <p> 
        <span class="proj-label">技术栈： </span> {{ p.tech }}
      </p>
      <p> 
        <span class="proj-label"> 项目介绍： </span>
      </p>
      <ul>
        <li v-for="(d, j) in p.description" :key="j">
          <p> {{ d }} </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const projs = [
  {
    name: 'PhotoShop CEP 插件开发',
    tech: 'HTML, CSS, Javascript, ExtendScript',
    description: [
      '该项目是使用 Html5 技术开发一个 PS 面板插件',
      '实现了在 PS 中登录模板工具，并将设计的画板转化为模板文件，导入到模板工具指定的项目中。'
    ]
  },
  {
    name: '模板工具',
    tech: 'Vue2、Axios、VueRoute、Canvas',
    description: [
      '模板工具是部署在Web端的模板管理系统',
      '支持模板在线编辑、预览及导出等功能',
      '模板编辑是模板工具的核心功能，主编辑区使用 Canvas 技术开发完成',
      '实现了拖拽移动、滚轮缩放、拖拽调整大小、吸附、框选、右键菜单、快捷键、操作历史等诸多图形编辑的常用功能。'
    ]
  },
  {
    name: 'MapServer',
    tech: 'Vue3、Axios、Typescript、Canvas',
    description: [
      'MapServer 是室内地图后台系统',
      '用于管理门店的地图相关数据',
      '主要功能包括地图的导入、导出、地图编辑，以及地图样式管理和元素类型管理等功能。'
    ]
  },
  {
    name: 'Mars 后台管理系统',
    tech: 'Vue2、Axios、VueRoute',
    description: ['该系统主要包含门店管理、货架管理、商品管理、陈列管理、拣货管理、权限管理等功能。用于维护商超客户的门店基本数据。']
  },
  {
    name: 'Pigoss 2.x',
    tech: 'Vue、Axios、Canvas、Echarts',
    description: [
      'Pigoss 是一款 IT 运维监控系统',
      '使用 java 开发采集器定时采集设备状态，前端通过各种图表、拓扑、表格等方式展示采集到的数据。'
    ]
  },
  {
    name: 'Pigoss 1.x',
    tech: 'HTML、CSS、JS、Canvas、JSX、Jquery、Bootstrap、Echarts',
    description: [
      'Pigoss 是一款 IT 运维监控系统',
      '使用 java 开发采集器定时采集设备状态，前端通过各种图表、拓扑、表格等方式展示采集到的数据。'
    ]
  },
]
</script>

<style scoped lang='scss'>
.proj-wrap {
  padding: 0 10px;
}
.proj {
  margin: 0;
  padding: 4px 0;
}
.proj-title {
  padding-bottom: 6px;
  border-bottom: 1px solid #ddd;
}
.proj-label {
  font-weight: bold;
}
</style>