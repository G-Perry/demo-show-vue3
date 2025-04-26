<template>
  <van-field
    :model-value="fieldValue"
    :label="props.selectItemConfig.label"
    :placeholder="props.selectItemConfig.placeholder"
    is-link
    readonly
    @click="showPicker = true"
  />
  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-picker
      :model-value="pickerValue"
      :columns-field-names="{ text: 'label' }"
      :columns="columns"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps({
  modelValue: [String, Number],
  selectItemConfig: {
    type: Object,
    default: () => {},
  },
});
const showPicker = ref(false);
const emit = defineEmits(["update:modelValue"]);
const columns = computed(() => {
  return props.selectItemConfig.options;
});
const currentOption = computed(() =>
  props.selectItemConfig.options.find((item) => item.value === props.modelValue)
);

const fieldValue = computed(() => currentOption.value?.label ?? "");
const pickerValue = computed(() =>
  currentOption.value?.value ? [currentOption.value.value] : []
);
const onConfirm = ({ selectedValues }) => {
  showPicker.value = false;
  emit("update:modelValue", selectedValues[0]);
};
</script>