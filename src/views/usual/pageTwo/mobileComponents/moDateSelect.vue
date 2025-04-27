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
    <!-- <van-time-picker
      :model-value="pickerValue"
      title="选择时间"
      :columns-type="['hour', 'minute', 'second']"
      :formatter="formatter"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    /> -->
    <van-date-picker
      :model-value="pickerValue"
      title="选择日期"
      :formatter="formatter"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps({
  modelValue: String,
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

const fieldValue = computed(() => props.modelValue);
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // 月份从0开始
const day = currentDate.getDate();
const pickerValue = computed(() => {
  return props.modelValue ? props.modelValue.split("-") : [year, month, day];
});
const onConfirm = ({ selectedValues }) => {
  showPicker.value = false;
  emit("update:modelValue", selectedValues.join("-"));
};
</script>
