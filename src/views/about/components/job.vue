<template>
  <div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in timeline"
        :key="index"
        :timestamp="item.timestamp"
        placement="top"
      >
        <p class="item" v-if="item.content"> {{ item.content }} </p>
        <h3 class="item" v-if="item.title"> {{ item.title }} </h3>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
const timeline = [
  {
    timestamp: '至今',
    position: '前端开发leader',
    content: '主导多个项目的开发、带新人、推进前端技术更新'
  },
  {
    timestamp: '2021-12',
    position: 'Web前端开发',
    content: '使用flutter开发移动端模板工具演示应用'
  },
  {
    timestamp: '2021-11',
    position: 'Web前端开发',
    content: 'Mars 后台管理系统开发'
  },
  {
    timestamp: '2021-8',
    position: 'Web前端开发',
    content: '模板工具2.0版本开发、迭代更新'
  },
  {
    timestamp: '2020-7',
    position: 'Web前端开发',
    content: '模板工具1.0版本开发、迭代更新'
  },
  {
    timestamp: '2019-6',
    position: 'Web前端开发',
    title: '入职汉朔科技股份有限公司'
  },
  {
    timestamp: '2019-6',
    position: 'Web前端开发',
    content: '重构运维监控系统及后期迭代更新'
  },
  {
    timestamp: '2018-4',
    position: 'Web前端开发',
    content: '运维监控系统拓扑视图开发、大屏展现/数据可视化'
  },
  {
    timestamp: '2017-4',
    position: 'Web前端开发',
    title: '入职网利友联（北京）科技有限公司'
  },
]
</script>

<style scoped lang='scss'>
.item {
  margin: 0;
  padding: 4px 0;
}
</style>