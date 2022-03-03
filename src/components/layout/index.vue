<template>
<div class="workspace">
  <header-bar></header-bar>
  <router-view/>
</div>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar.vue';
</script>

<style lang="scss">
#app,
.workspace {
  width: 100%;
  height: 100%;
}
</style>