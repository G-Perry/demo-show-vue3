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
    <van-cascader
      v-model="pickerValue"
      title="请选择所在地区"
      :options="options"
      :field-names="fieldNames"
      @close="showPicker = false"
      @finish="onFinish"
    />
  </van-popup>
</template>

<script setup lang="ts">
import { getAreaTree } from "@/api/usual/index";
import { processTree, findPath } from "@/utils/index.js";
import { computed, onMounted, ref } from "vue";
const props = defineProps({
  modelValue: [String, Number],
  selectItemConfig: {
    type: Object,
    default: () => {},
  },
});
const showPicker = ref(false);
const emit = defineEmits(["update:modelValue"]);

const fieldValue = computed(
  () => findPath(options, props.modelValue)?.join(" / ") || ""
);
const pickerValue = computed(() => props.modelValue);
/**
 * 获取树形数据并对其预处理
 * 将空 children 置为 undefined
 */
let options = [];
const fieldNames = {
  text: "name",
  value: "id",
};
onMounted(() => {
  getAreaTree().then((res: any) => {
    options = processTree(res.data, props.selectItemConfig.depth);
  });
});
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ value }) => {
  showPicker.value = false;
  emit("update:modelValue", value);
};
</script>
