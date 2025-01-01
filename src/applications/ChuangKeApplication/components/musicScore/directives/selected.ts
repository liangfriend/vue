//专用于musicScore
const drag = {
  mounted(el, binding) {
    const { mouseDownFn } = binding.value || {}; // 解构绑定值

    // 定义鼠标按下事件
    const mouseDownHandler = (e) => {
      if (window.musicScore.selected) {
        window.musicScore.selected.style.outline = ''; // 首先移除上一个元素的高亮边框
        window.musicScore.selected = null;
      }
      window.musicScore.selected = el;
      // 设置高亮边框
      el.style.outline = '2px solid #4096ff';
      el.style.outlineOffset = '-2px';

      // 如果有回调函数，调用回调并传递事件
      if (typeof mouseDownFn === 'function') {
        mouseDownFn(e);
      }

      // 阻止事件冒泡，防止触发 document 的事件
      e.stopPropagation();
    };
    // 绑定事件到元素
    el._dragMouseDownHandler = mouseDownHandler;
    el.addEventListener('mousedown', mouseDownHandler);

  },

  unmounted(el) {
    // 卸载时移除事件监听器
    el.removeEventListener('mousedown', el._dragMouseDownHandler);

    delete el._dragMouseDownHandler;
  },
};

export default drag;
