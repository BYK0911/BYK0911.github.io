<template>
<div class="header flex">
  <div class="logo flex-item"> YuKun.Bao </div>
  <div class="nav flex-main">
    <router-link to="/">作品展示</router-link>
    <router-link to="/doc">工作笔记</router-link>
    <router-link to="/about">个人简介</router-link>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  height: 50px;
  line-height: 48px;
  background:#e0e0e0;
  border-bottom: 1px solid #ccc;
}
.logo {
  width: 200px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.nav {
  text-align: right;
  padding: 0 20px;
}
</style>

<style scoped lang="scss">
.nav a {
  font-weight: bold;
  margin: 0 14px;
  padding: 4px;
  font-size: 14px;
  color: #2c3e50;
  text-decoration: none;

  &.router-link-exact-active {
    border-bottom: 2px solid #42b983;
  }
}
</style>