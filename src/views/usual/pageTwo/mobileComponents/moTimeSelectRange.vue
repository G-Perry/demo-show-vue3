<template>
  <van-field
    :model-value="fieldValue"
    :label="props.selectItemConfig.label"
    :placeholder="props.selectItemConfig.placeholder"
    is-link
    readonly
    :rules="props.selectItemConfig.rules"
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
    <van-picker-group
      title="选择时间"
      :tabs="['开始时间', '结束时间']"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    >
      <van-time-picker
        :columns-type="['hour', 'minute', 'second']"
        :formatter="formatter"
        :model-value="startTime"
      />
      <van-time-picker
        :columns-type="['hour', 'minute', 'second']"
        :formatter="formatter"
        :model-value="endTime"
      />
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
// const startTime = ref(["12", "00"]);
// const endTime = ref(["12", "00"]);
const showPicker = ref(false);
const emit = defineEmits(["update:modelValue"]);
const formatter = (type, option) => {
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

const fieldValue = computed(() =>
  props.modelValue ? props.modelValue.join(" - ") : ""
);
const startTime = computed(() =>
  typeof props.modelValue[0] === "string" ? props.modelValue[0].split(":") : []
);
const endTime = computed(() =>
  typeof props.modelValue[1] === "string" ? props.modelValue[1].split(":") : []
);
const onConfirm = (arr) => {
  showPicker.value = false;
  emit("update:modelValue", [
    arr[0].selectedValues.join(":"),
    arr[1].selectedValues.join(":"),
  ]);
  //   console.log(aaa);
};
</script>
