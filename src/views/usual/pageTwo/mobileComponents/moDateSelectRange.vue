<template>
  <van-field
    :model-value="fieldValue"
    :label="props.selectItemConfig.label"
    :placeholder="props.selectItemConfig.placeholder"
    is-link
    :rules="props.selectItemConfig.rules"
    readonly
    @click="showPicker = true"
  />
  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-picker-group
      title="选择日期"
      :tabs="['开始日期', '结束日期']"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    >
      <van-date-picker :formatter="formatter" :model-value="startTime" />
      <van-date-picker :formatter="formatter" :model-value="endTime" />
    </van-picker-group>
  </van-popup>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  selectItemConfig: {
    type: Object,
    default: () => {},
  },
});
const showPicker = ref(false);
const emit = defineEmits(["update:modelValue"]);
const formatter = (type, option) => {
  if (type === "year") {
    option.text += "年";
  }
  if (type === "month") {
    option.text += "月";
  }
  if (type === "day") {
    option.text += "日";
  }
  return option;
};
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // 月份从0开始
const day = currentDate.getDate();

const fieldValue = computed(() =>
  props.modelValue ? props.modelValue.join(" - ") : ""
);
const startTime = computed(() =>
  typeof props.modelValue[0] === "string"
    ? props.modelValue[0].split("-")
    : [year, month, day]
);
const endTime = computed(() =>
  typeof props.modelValue[1] === "string"
    ? props.modelValue[1].split("-")
    : [year, month, day]
);
const onConfirm = (arr) => {
  showPicker.value = false;
  emit("update:modelValue", [
    arr[0].selectedValues.join("-"),
    arr[1].selectedValues.join("-"),
  ]);
  //   console.log(aaa);
};
</script>
