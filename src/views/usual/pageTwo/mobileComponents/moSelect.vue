<template>
  <van-field
    v-model="fieldValue"
    is-link
    readonly
    label="城市"
    placeholder="选择城市"
    @click="showPicker = true"
  />
  <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
    <van-picker
      :model-value="pickerValue"
      :columns="columns"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
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
// const columns = [
//   { text: "杭州", value: "Hangzhou" },
//   { text: "宁波", value: "Ningbo" },
//   { text: "温州", value: "Wenzhou" },
//   { text: "绍兴", value: "Shaoxing" },
//   { text: "湖州", value: "Huzhou" },
// ];

const columns = computed(() => {
  return props.selectItemConfig.options;
});
const fieldValue = ref("");
const showPicker = ref(false);
const pickerValue = ref([]);
const onConfirm = ({ selectedValues, selectedOptions }) => {
  showPicker.value = false;
  pickerValue.value = selectedValues;
  fieldValue.value = selectedOptions[0].text;
};
onMounted(() => {
  setTimeout(() => {
    // console.log(props.selectItemConfig.options);
    console.log(columns);
  }, 1000);
});
</script>

<style scoped></style>
