<template>
  <!-- <div>{{ localIndex }}</div> -->
  <el-form v-if="localIndex !== null" label-position="top">
    <el-form-item label="名称">
      <el-input v-model="currentItem.label" />
    </el-form-item>
    <el-form-item label="占位">
      <el-input v-model.number="currentItem.span" />
    </el-form-item>
    <template v-if="currentItem.type !== 'classifyTitle'">
      <el-form-item label="字段名">
        <el-input v-model="currentItem.prop" />
      </el-form-item>
      <el-form-item
        label="提示"
        v-if="!['switch', 'radio', 'checkbox'].includes(currentItem.type)"
      >
        <el-input v-model="currentItem.placeholder" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

interface FormItemConfig {
  label: string;
  type: string;
  span: number;
  placeholder?: string;
  prop?: string;
}

const props = defineProps({
  formConfig: Array as () => FormItemConfig[],
  modelValue: Number, // 当前索引
});

const emit = defineEmits(["update:modelValue"]);

// 通过计算属性实现双向绑定
const localIndex = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// 当前选中的对象（直接关联到父组件数组的引用）
const currentItem = computed(() => props.formConfig[localIndex.value]);
</script>

<style scoped></style>
