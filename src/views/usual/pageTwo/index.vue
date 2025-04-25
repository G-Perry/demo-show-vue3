<template>
  <div style="width: 100%; height: 100%; background-color: #fff; padding: 10px;overflow: auto;">
    <ShForm ref="formRef" v-model="formData" :formConfig="formConfig"></ShForm>
    <el-button type="success" @click="submitForm">提 交</el-button>
    <el-button type="success" @click="resetForm">重 置</el-button>
  </div>
</template>

<script setup lang="ts">
import { formConfigs } from "./formConfig";
import { ref, reactive, onMounted } from "vue";
import ShForm from "./ShForm.vue";
const formRef = ref(); // 表单 Ref
const formConfig = ref(formConfigs);
const formData = ref({
  input: undefined,
  select: undefined,
  textarea: undefined,
  radio: undefined,
  checkbox: [],
  timePicker: undefined,
  datePicker: undefined,
  dateTimePicker: undefined,
  timePickerRange: [],
  datePickerRange: [],
  dateTimePickerRange: [],
  switch: true,
});

const submitForm = async () => {
  console.log(formData.value);
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    console.log("submit!");
  } catch (error) {
    console.log("error submit!", error);
  }
};
function resetForm() {
  if (!formRef.value) return;
  formRef.value.resetFields();
}
const fetchOptions = (item) => {
  item.optionsAsyncApi().then((res) => {
    item.options = res.data;
  });
};
onMounted(async () => {
  for (const item of formConfig.value) {
    if (item.optionsAsync) {
      await fetchOptions(item);
    }
  }
});
</script>

<style lang="scss">
.classify_title {
  padding-left: 5px;
  font-size: 15px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 20px;

  &::after {
    content: "";
    position: absolute;
    left: 10px;
    top: calc(100% + 6px);
    width: calc(100% - 10px);
    height: 5px;
    background-color: #ccf1eb;
    // background-color: #79bcff93;
    border-radius: 5px;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: calc(100% + 3px);
    width: 8em;
    height: 8px;
    background-color: #00b899;
    // background-color: #409eff;
    border-radius: 0 10px 0 10px;
    z-index: 1;
  }
}
</style>
