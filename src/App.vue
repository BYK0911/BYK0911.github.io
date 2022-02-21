<template>
<div class="flex-v workspace">
  <header-bar class="flex-item"></header-bar>
  <div class="flex-main">
    <router-view/>
  </div>
</div>
</template>

<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue';
</script>

<style lang="scss">
#app,
.workspace {
  width: 100%;
  height: 100%;
}
</style>