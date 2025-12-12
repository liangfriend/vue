<template>
  <div class="ds-select" :class="{ 'ds-select--open': open, 'ds-select--disabled': disabled }" ref="root">

    <div class="ds-select__control" :style="{backgroundColor:open?'#FE435B':'rgba(255,255,255,0.3)'}" @click="toggle"
         :title="selectedLabel">
      <span class="ds-select__label" :style="{color:open?'#fff':'#999'}" v-if="selectedLabel">{{ selectedLabel }}</span>
      <span class="ds-select__placeholder" :style="{color:open?'#fff':'#999'}" v-else>{{
          placeholder
        }}</span>
      <span class="ds-select__arrow"><img v-show="!open" src="../assets/arrow_down.svg"/>
      <img v-show="open" src="../assets/arrow_up.svg"/></span>
    </div>
    <transition name="fade">
      <ul class="ds-select__menu hidden-scrollbar" v-show="open">
        <li
            v-for="item in options"
            :key="item.value"
            class="ds-select__option"
            :class="{ 'is-active': item.value === value }"
            @click.stop="select(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropdownSelect',
  props: {
    value: {
      type: [String, Number, Object],
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '更多',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    selectedLabel() {
      const found = this.options.find(o => o.value === this.value);
      return found ? found.label : '';
    },
  },
  methods: {
    toggle() {
      console.log('chicken');
      if (this.disabled) {
        return;
      }
      this.open = !this.open;
    },
    close() {
      console.log('chicken');
      this.open = false;
    },
    select(item) {
      console.log('chicken');
      if (this.disabled) {
        return;
      }
      this.$emit('input', item.value);
      this.$emit('change', item.value);
      this.close();
    },
    handleClickOutside(e) {
      if (!this.$refs.root) {
        return;
      }
      console.log('chicken', e.target);
      if (!this.$refs.root.contains(e.target)) {
        this.close();
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
.ds-select {
  position: relative;
  width: 72px;
  height: 30px;
  font-size: 14px;
  color: #333;
}

.ds-select__control {
  height: 30px;
  border: 1px solid #eee;
  color: #999999;
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
}

.ds-select--disabled .ds-select__control {
  background: #f7f7f7;
  color: #aaa;
  cursor: not-allowed;
}

.ds-select__label {
  white-space: nowrap;
  color: #999999;
  overflow: hidden;
}

.ds-select__placeholder {

}

.ds-select__arrow {
  margin-left: 8px;
  margin-top: 2px;
  font-size: 12px;
  color: #999;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    user-select: none;
  }
}

.ds-select__menu {
  position: absolute;
  height: 200px;
  overflow: auto;
  top: 40px;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  list-style: none;
  padding: 6px 0;
  margin: 0;
  z-index: 20;
}

.ds-select__option {
  padding: 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #606366;
  cursor: pointer;
  transition: background 0.15s;
}

.ds-select__option:hover {
  background: #f6f8ff;
}

.ds-select__option.is-active {
  color: #fe435b;
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.hidden-scrollbar {
  /* 保留滚动功能 */
  overflow: auto;

  /* IE 和 Edge */
  -ms-overflow-style: none;

  /* Firefox */
  scrollbar-width: none;
}

/* Chrome、Safari、Edge（Webkit内核） */
.hidden-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
