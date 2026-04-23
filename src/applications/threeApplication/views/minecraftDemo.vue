<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const UNIT = 48
const HALF = UNIT / 2
const MOVE_SPEED = 2
const LOOK_SENSITIVITY = 0.3

// 相机状态：位置 + 左右看(yaw) + 上下看(pitch)
const camX = ref(0)
const camY = ref(0)
const camZ = ref(400)
const camYaw = ref(0)
const camPitch = ref(0)

// 简单方块网格：5x5 地板 + 几面墙
const worldWidth = 5
const worldDepth = 5
const blocks = ref<
  Array<{
    x: number
    y: number
    z: number
    color: string
  }>
>([])

function initWorld() {
  const colors = ['#8B4513', '#228B22', '#1E90FF', '#B8860B', '#CD5C5C', '#4B0082']
  for (let gz = 0; gz < worldDepth; gz++) {
    for (let gx = 0; gx < worldWidth; gx++) {
      blocks.value.push({
        x: gx * UNIT,
        y: 0,
        z: gz * UNIT,
        color: colors[(gx + gz) % colors.length],
      })
    }
  }
  // 加几堵墙
  for (let i = 0; i < 5; i++) {
    blocks.value.push({ x: i * UNIT, y: UNIT, z: 0, color: '#696969' })
    blocks.value.push({ x: 0, y: UNIT, z: i * UNIT, color: '#808080' })
    blocks.value.push({ x: 4 * UNIT, y: UNIT, z: i * UNIT, color: '#A9A9A9' })
    blocks.value.push({ x: i * UNIT, y: UNIT, z: 4 * UNIT, color: '#778899' })
  }
}
initWorld()

// 将相机变换应用到场景：场景做逆向变换 = 等效于相机移动
const sceneTransform = computed(() => {
  return `translate3d(${-camX.value}px, ${-camY.value}px, ${-camZ.value}px) rotateY(${-camYaw.value}deg) rotateX(${-camPitch.value}deg)`
})

const keys = ref<Record<string, boolean>>({})
function onKeyDown(e: KeyboardEvent) {
  keys.value[e.code] = true
}
function onKeyUp(e: KeyboardEvent) {
  keys.value[e.code] = false
}

const mouseDown = ref(false)
const lastMouse = ref({ x: 0, y: 0 })
function onMouseDown(e: MouseEvent) {
  if (e.button === 0) {
    mouseDown.value = true
    lastMouse.value = { x: e.clientX, y: e.clientY }
  }
}
function onMouseMove(e: MouseEvent) {
  if (mouseDown.value) {
    const dx = (e.clientX - lastMouse.value.x) * LOOK_SENSITIVITY
    const dy = (e.clientY - lastMouse.value.y) * LOOK_SENSITIVITY
    lastMouse.value = { x: e.clientX, y: e.clientY }
    // 负号：鼠标右拖 → 视角向右转（第一人称）
    camYaw.value = (camYaw.value - dx + 360) % 360
    camPitch.value = Math.max(-89, Math.min(89, camPitch.value - dy))
  }
}
function onMouseUp(e: MouseEvent) {
  if (e.button === 0) mouseDown.value = false
}

let raf: number
function tick() {
  const yawRad = (camYaw.value * Math.PI) / 180
  const forwardX = Math.sin(yawRad)
  const forwardZ = -Math.cos(yawRad)
  const rightX = Math.cos(yawRad)
  const rightZ = Math.sin(yawRad)

  if (keys.value['KeyW']) {
    camX.value += forwardX * MOVE_SPEED
    camZ.value += forwardZ * MOVE_SPEED
  }
  if (keys.value['KeyS']) {
    camX.value -= forwardX * MOVE_SPEED
    camZ.value -= forwardZ * MOVE_SPEED
  }
  if (keys.value['KeyA']) {
    camX.value -= rightX * MOVE_SPEED
    camZ.value -= rightZ * MOVE_SPEED
  }
  if (keys.value['KeyD']) {
    camX.value += rightX * MOVE_SPEED
    camZ.value += rightZ * MOVE_SPEED
  }
  if (keys.value['Space']) camY.value -= MOVE_SPEED
  if (keys.value['ShiftLeft']) camY.value += MOVE_SPEED

  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  tick()
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  window.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="demo-wrap">
    <div class="hint">
      WASD 移动 · 空格/Shift 上下 · 鼠标左键拖拽 环顾
    </div>
    <div class="viewport" :class="{ grabbing: mouseDown }">
      <div
        class="scene"
        :style="{ transform: sceneTransform }"
      >
        <div
          v-for="(b, i) in blocks"
          :key="i"
          class="block"
          :style="{ '--bx': b.x + 'px', '--by': b.y + 'px', '--bz': b.z + 'px', '--color': b.color }"
        >
          <div class="face front" />
          <div class="face back" />
          <div class="face left" />
          <div class="face right" />
          <div class="face top" />
          <div class="face bottom" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-wrap {
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  overflow: hidden;
}
.hint {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  z-index: 10;
  pointer-events: none;
}
.viewport {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #87CEEB 0%, #98D8E8 60%, #6B8E6B 100%);
  perspective: 800px;
  perspective-origin: 50% 50%;
  cursor: grab;
  overflow: hidden;
}
.viewport.grabbing {
  cursor: grabbing;
}
.scene {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  transform-origin: 0 0 0;
}

.block {
  position: absolute;
  left: 0;
  top: 0;
  width: v-bind('UNIT + "px"');
  height: v-bind('UNIT + "px"');
  transform-style: preserve-3d;
  transform: translate3d(var(--bx), var(--by), var(--bz));
}

.face {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--color);
  border: 1px solid rgba(0, 0, 0, 0.3);
  backface-visibility: hidden;
  transform-origin: center center;
}
.face.front {
  transform: translateZ(v-bind('HALF + "px"'));
}
.face.back {
  transform: rotateY(180deg) translateZ(v-bind('HALF + "px"'));
}
.face.left {
  transform: rotateY(-90deg) translateZ(v-bind('HALF + "px"'));
}
.face.right {
  transform: rotateY(90deg) translateZ(v-bind('HALF + "px"'));
}
.face.top {
  transform: rotateX(90deg) translateZ(v-bind('HALF + "px"'));
}
.face.bottom {
  transform: rotateX(-90deg) translateZ(v-bind('HALF + "px"'));
}
</style>
