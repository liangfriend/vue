<template>
  <div
      class="ds-slider"
      :class="{
      'ds-slider--disabled': disabled,
      'ds-slider--vertical': vertical,
    }"
      :style="sliderStyle"
      @mousedown="onMouseDown"
      @touchstart.prevent="onTouchStart"
  >
    <div class="ds-slider__track"></div>
    <div
        class="ds-slider__fill"
        :style="vertical ? { height: percent + '%' } : { width: percent + '%' }"
    ></div>
    <div
        class="ds-slider__thumb"
        :style="vertical ? { bottom: percent + '%' } : { left: percent + '%' }"
    >
      <!--      <div class="ds-slider__value" v-if="showValue">{{ displayValue }}</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'RangeSlider',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showValue: {
      type: Boolean,
      default: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [Number, String],
      default: 140,
    },
  },
  computed: {
    percent() {
      const range = this.max - this.min || 1;
      const clamped = Math.min(this.max, Math.max(this.min, this.value));
      return ((clamped - this.min) / range) * 100;
    },
    displayValue() {
      return this.value;
    },
    sliderStyle() {
      if (!this.vertical) {
        return {};
      }
      const h = typeof this.height === 'number' ? `${this.height}px` : this.height;
      return {height: h, width: '32px'};
    },
  },
  methods: {
    setByClientX(clientX) {
      if (this.disabled) {
        return;
      }
      const rect = this.$el.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const raw = this.min + ratio * (this.max - this.min);
      const stepped = Math.round(raw / this.step) * this.step;
      const clamped = Math.min(this.max, Math.max(this.min, stepped));
      this.$emit('input', clamped);
      this.$emit('change', clamped);
    },
    onMouseDown(e) {
      this.vertical ? this.setByClientY(e.clientY) : this.setByClientX(e.clientX);
      const move = (ev) => this.vertical ? this.setByClientY(ev.clientY) : this.setByClientX(ev.clientX);
      const up = () => {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      };
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    },
    onTouchStart(e) {
      const touch = e.touches[0];
      this.vertical ? this.setByClientY(touch.clientY) : this.setByClientX(touch.clientX);
      const move = (ev) => this.vertical ? this.setByClientY(ev.touches[0].clientY) : this.setByClientX(ev.touches[0].clientX);
      const end = () => {
        window.removeEventListener('touchmove', move);
        window.removeEventListener('touchend', end);
      };
      window.addEventListener('touchmove', move, {passive: false});
      window.addEventListener('touchend', end);
    },
    setByClientY(clientY) {
      if (this.disabled) {
        return;
      }
      const rect = this.$el.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (rect.bottom - clientY) / rect.height));
      const raw = this.min + ratio * (this.max - this.min);
      const stepped = Math.round(raw / this.step) * this.step;
      const clamped = Math.min(this.max, Math.max(this.min, stepped));
      this.$emit('input', clamped);
      this.$emit('change', clamped);
    },
  },
};
</script>

<style scoped>
.ds-slider {
  position: relative;
  height: 18px;
  width: 100%;
  max-width: 360px;
  cursor: pointer;
}

.ds-slider--vertical {
  width: 32px;
  height: 140px;
}

.ds-slider--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ds-slider__track {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 8px;
  background: #f0f0f0;
  border-radius: 999px;
}

.ds-slider--vertical .ds-slider__track {
  top: 0;
  bottom: 0;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  width: 8px;
  height: 100%;
}

.ds-slider__fill {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 8px;
  background: linear-gradient(90deg, #fe435b 0%, #ff7a8a 100%);
  border-radius: 999px;
  pointer-events: none;
}

.ds-slider--vertical .ds-slider__fill {
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 0;
  background: linear-gradient(180deg, #fe435b 0%, #ff7a8a 100%);
  bottom: 0;
  top: auto;
}

.ds-slider__thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 10px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.ds-slider--vertical .ds-slider__thumb {
  left: 50%;
  top: auto;
  transform: translate(-50%, 50%);
}

.ds-slider__value {
  position: absolute;
  top: -28px;
  padding: 4px 8px;
  background: #fff;
  border: 1px solid #fe435b;
  color: #fe435b;
  font-size: 12px;
  border-radius: 8px;
  transform: translateX(-50%);
  white-space: nowrap;
}

.ds-slider--vertical .ds-slider__value {
  top: 50%;
  left: 28px;
  transform: translateY(-50%);
}
</style>
