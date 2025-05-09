<template>
  <el-cascader
    :model-value="props.modelValue"
    @change="$emit('update:modelValue', $event)"
    :placeholder="props.selectItemConfig.placeholder"
    :options="options"
    :props="cascaderProps"
    clearable
    filterable
    style="width: 100%"
  />
</template>

<script lang="ts" setup>
import { getAreaTree } from "@/api/usual/index";
import { processTree } from "@/utils/index.js";

import { ref, onMounted } from "vue";
const props = defineProps({
  modelValue: [String, Number],
  selectItemConfig: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["update:modelValue"]);

const cascaderProps = {
  children: "children",
  label: "name",
  value: "id",
  isLeaf: "leaf",
  emitPath: false, // 用于 cascader 组件：在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
};

let options = ref([]);
onMounted(() => {
  getAreaTree().then((res: any) => {
    // options.value = res.data;
    options.value = processTree(res.data, props.selectItemConfig.depth);
  });
});
</script>
