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
      :tabs="['选择日期', '选择时间']"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    >
      <van-date-picker :formatter="formatter" :model-value="date" />
      <van-time-picker
        :columns-type="['hour', 'minute', 'second']"
        :formatter="formatter"
        :model-value="time"
      />
    </van-picker-group>
  </van-popup>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
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
  if (type === "hour") {
    option.text += "时";
  }
  if (type === "minute") {
    option.text += "分";
  }
  if (type === "second") {
    option.text += "秒";
  }
  return option;
};
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // 月份从0开始
const day = currentDate.getDate();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes();

const fieldValue = computed(() => (props.modelValue ? props.modelValue : ""));
const dateTime = computed(() => {
  return props.modelValue
    ? props.modelValue?.split(" ")
    : [
        [year, month, day],
        [hour, minute, "00"],
      ];
});
const date = computed(() =>
  typeof dateTime.value[0] === "string"
    ? dateTime.value[0].split("-")
    : dateTime.value[0]
);
const time = computed(() =>
  typeof dateTime.value[1] === "string"
    ? dateTime.value[1].split(":")
    : dateTime.value[1]
);
const onConfirm = (arr) => {
  showPicker.value = false;
  emit(
    "update:modelValue",
    [arr[0].selectedValues.join("-"), arr[1].selectedValues.join(":")].join(" ")
  );
};
</script>
