<template>
  <section class="page_header">
    <div class="header_title">{{title}}</div>
    <div class="right_btns">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "默认标题",
  },
});

// console.log(props.title);
</script>

<style scoped>
.page_header {
  height: 40px;
  box-sizing: border-box;
  /* border-bottom: 1px solid #ddd; */
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.header_title {
  font-family: PingFang-SC-Bold;
  font-weight: 700;
  font-size: 22px;
  color: #1f2d3d;
}
/* .right_btns {
} */
</style>