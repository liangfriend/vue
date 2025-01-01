//专用于whiteBoard组件内
//需设置当前元素为absolute或relative布局
const drag = {
  // 在元素挂载时（mounted）
  mounted(el, binding) {
    // 初始化变量
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // 当鼠标按下时，开始拖拽
    const onMouseDown = (e) => {
      isDragging = true;
      // 计算鼠标按下时和元素的位置差值（即偏移量）
      offsetX = e.clientX - el.getBoundingClientRect().left;
      offsetY = e.clientY - el.getBoundingClientRect().top;
      // 禁止选中文本，防止拖拽时选中文本
      // document.body.style.userSelect = 'none';

      // 给 document 绑定鼠标移动和鼠标松开事件
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    // 在鼠标移动时，更新元素位置
    const onMouseMove = (e) => {
      if (isDragging) {
        // 计算新位置，并更新元素的位置
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
      }
    };

    // 当鼠标松开时，停止拖拽
    const onMouseUp = () => {
      isDragging = false;
      // 移除移动和松开的事件监听
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // 恢复用户选择文本的功能
      document.body.style.userSelect = '';
    };

    // 绑定鼠标按下事件，启动拖拽
    el.addEventListener('mousedown', onMouseDown);

    // 如果需要支持拖拽时，清除事件绑定
    el._onMouseDown = onMouseDown;
  },

  // 在元素卸载时（unmounted）
  unmounted(el) {
    // 卸载时，移除事件监听器，避免内存泄漏
    el.removeEventListener('mousedown', el._onMouseDown);
  }
};
export default drag;