<template>
  <div style="width: 100%;height: 100%;" ref="graphRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import initGame from './game'

const graphRef = ref()
onMounted(() => {
  initGame(graphRef.value)
})
</script>