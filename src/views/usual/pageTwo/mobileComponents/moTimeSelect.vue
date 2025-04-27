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
    <van-time-picker
      :model-value="pickerValue"
      title="选择时间"
      :columns-type="['hour', 'minute', 'second']"
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

const fieldValue = computed(() => props.modelValue);
const pickerValue = computed(() =>
  props.modelValue ? props.modelValue.split(":") : []
);
const onConfirm = ({ selectedValues }) => {
  showPicker.value = false;
  emit("update:modelValue", selectedValues.join(":"));
};
</script>
