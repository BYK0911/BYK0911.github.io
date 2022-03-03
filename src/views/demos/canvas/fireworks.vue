<template>
  <canvas ref="cvs"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Spark {
  x: number,
  y: number,
  vx: number,
  vy: number,
  l: number,
  r: number,
  g: number,
  b: number
}

const cvs = ref()
const ww = window.innerWidth
const wh = window.innerHeight

const sparks: Spark[] = []
const sparkCount = 500 // 火星数量
const speed = 10 // 初始速度
const kv = .1 // 垂直方向加速度
const kl = -1 // 亮度衰减速度
const light = 120
const size = 3

const boom = (x: number, y: number, l: number, c: number) => {
  const r = Math.random() * 100 + 150
  const g = Math.random() * 100 + 155
  const b = Math.random() * 100 + 100
  for (let i = 0; i < c; i++) {
    const v = Math.random() * speed
    const angle = Math.random() * Math.PI * 2
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const spark = {
      x,
      y,
      vx: v * cos,
      vy: v * sin,
      l,
      r,
      g,
      b
    }
    sparks.push(spark)
  }
}
const drawFrame = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, ww, wh);
  for (let i = 0; i < sparks.length; i++) {
    drawSpark(ctx, sparks[i])
    moveSpark(sparks[i])
  }
  for (let i = 0; i < sparks.length; i++) {
    if (sparks[i].l <= 0) {
      sparks.splice(i, 1);
      i--;
    }
  }
}
const drawSpark = (ctx: CanvasRenderingContext2D, spark: Spark) => {
  const { x, y, r, g, b, l } = spark
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${l / light})`
  ctx.fillRect(x, y, size, size)
}
const moveSpark = (spark: Spark) => {
  spark.l += kl
  if (spark.l <= 0) return
  spark.x += spark.vx
  spark.y += spark.vy
  spark.vy = spark.vy * .95 + kv
  spark.vx *= .96
}

const render = (ctx: CanvasRenderingContext2D) => {
  drawFrame(ctx)
  window.requestAnimationFrame(() => render(ctx))
}
const init = () => {
  const x = ww * (Math.random() * .6 + .2)
  const y = wh * Math.random() / 2
  const l = light * (Math.random() * .5 + .5)
  const delay = Math.random() * 2000
  const c = Math.random() * sparkCount
  boom(x, y, l, c)
  setTimeout(init, delay)
}

onMounted(() => {
  cvs.value.width = ww
  cvs.value.height = wh
  cvs.value.style.width = ww + 'px'
  cvs.value.style.height = wh + 'px'
  const ctx = cvs.value.getContext('2d')
  if (ctx) {
    init()
    render(ctx)
  }
})
</script>

<style scoped lang='scss'>

</style>