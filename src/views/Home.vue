<template>
  <div class="page home">
    <div
      v-for="(item, i) in list"
      :key="i"
      class="img-wrap"
      :style="{ 'background-image': `url(${item.img})` }"
    >
      <div class="description-wrap">
        <div class="label"> {{ item.label }} </div>
        <div class="description"> {{ item.description }} </div>
      </div>
    </div>
    <div class="img-wrap">
      <div class="description-wrap">
        <div class="label"> Flutter 开发 </div>
        <div class="description"> 移动端模板工具 </div>
      </div>
      <div class="flutter-app">
        <img v-for="(img, i) in flutterImgs" :key="i" :src="img" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = [
  {
    label: 'Web应用',
    description: '模板管理系统',
    img: require('../assets/templater_project.png')
  },
  {
    label: 'Web应用',
    description: '可视化拖拉拽模板制作',
    img: require('../assets/templater_editor.png')
  },
  {
    label: '数据可视化',
    description: '电子价签实时监控平台',
    img: require('../assets/dashboard.png')
  },
  {
    label: '数据可视化',
    description: '门店室内地图大屏展现',
    img: require('../assets/map.png')
  },
  {
    label: '后台管理系统',
    description: '地图服务器后台管理系统',
    img: require('../assets/geo_strategy.png')
  },
  {
    label: '后台管理系统',
    description: '地图服务器后台管理系统',
    img: require('../assets/geo_dialog.png')
  },
]

const flutterImgs = [
  require('../assets/flutter_list.png'),
  require('../assets/flutter_editor.png'),
]
</script>

<style scoped lang="scss">
.img-wrap {
  position: relative;
  width: 100%;
  height: 600px;
  background-size: auto 70%;
  background-repeat: no-repeat;
  .description-wrap {
    height: 200px;
    min-width: 320px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 40px 60px;
    .label {
      position: relative;
      font-size: 18px;
      font-weight: bold;
      color: #357;
      display: inline-block;
      padding: 10px 20px 10px;
      background: #def;
      &::after {
        display: block;
        content: '';
        position: absolute;
        transform: translateY(-50%) rotate(45deg);
        width: 32px;
        height: 32px;
        background: #def;
        top: 50%;

        z-index: -1;
      }
    }
    .description {
      font-size: 30px;
      line-height: 80px;
      margin: 0 -20px;
      mix-blend-mode: difference;
      color: #666;
    }
  }

  &:nth-child(odd) {
    background-position: 20% 50%;
    .description-wrap {
      right: 10%;
      background-image: linear-gradient(to right, rgba(100, 100, 100, .2), rgba(100, 100, 100, 0));
      .label::after {
        left: -16px;
      }
    }
  }
  &:nth-child(even) {
    background-position: 80% 50%;
    .description-wrap {
      text-align: right;
      left: 10%;
      background-image: linear-gradient(to left, rgba(100, 100, 100, .2), rgba(100, 100, 100, 0));
      .label::after {
        right: -16px;
      }
    }
  }
}
.flutter-app {
  display: flex;
  justify-content: center;
  width: 60%;
  height: 80%;
}
</style>