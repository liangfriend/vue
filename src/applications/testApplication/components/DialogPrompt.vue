<template>
  <div v-if="visible" class="dialog-mask">
    <div class="dialog" role="dialog" aria-modal="true">
      <button class="close" @click="close" aria-label="close">×</button>
      <div class="title">{{ title }}</div>
      <div class="actions">
        <button class="btn btn-ghost" @click="close">继续编辑</button>
        <button class="btn btn-primary" @click="$emit('smart')">智能补充</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogPrompt',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    visible() {
      return this.value;
    },
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
  },
};
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: none; /* 遮罩不可点，但允许内部窗口可点 */
}

.dialog {
  pointer-events: auto;
  width: 468px;
  height: 212px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  padding: 28px 32px 32px;
  position: relative;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.close {
  position: absolute;
  right: 30px;
  top: 30px;
  color: #000;
  border: none;
  background: transparent;
  line-height: 1;
  cursor: pointer;
}

.title {
  font-size: 22px;
  font-weight: 700;
  color: #414141;
  margin: 32px 0 24px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 60px;
}

.btn {
  min-width: 132px;
  height: 40px;
  border-radius: 6px;
  font-size: 20px;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn-ghost {
  background: #fff;
  color: #fe5065;
  border-color: #fe5065;
}

.btn-primary {
  background: #fe5065;
  color: #fff;
}
</style>
