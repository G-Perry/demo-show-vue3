// 按照惯例，组合式函数名以“use”开头
export function setTableHeight() {
  // 被组合式函数封装和管理的状态
  const tableHeight = ref(0);
  const { proxy } = getCurrentInstance();

  // 组合式函数可以随时更改其状态。
  function updateTableHeight() {
    tableHeight.value = 0;
    nextTick(() => {
      if (proxy.$refs.footer_pagination == undefined) {
        tableHeight.value = proxy.$refs.just_table.offsetHeight;
      } else {
        tableHeight.value = proxy.$refs.footer_pagination.$el.offsetTop;
      }
    });
  }
  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => {
    updateTableHeight();
    window.addEventListener("resize", updateTableHeight);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", updateTableHeight);
  });

  // 通过返回值暴露所管理的状态
  return { tableHeight };
}
