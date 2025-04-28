<template>
  <section class="container">
    <div class="one">
      <el-button v-for="item in btns" @click="handleAdd(item)">{{
        item.label
      }}</el-button>
    </div>
    <div class="two">
      <header class="controls">
        <el-radio-group v-model="scene" size="small" @change="change">
          <el-radio-button label="design">DESIGN</el-radio-button>
          <el-radio-button label="pc">PC</el-radio-button>
          <el-radio-button label="mobile">MOBILE</el-radio-button>
          <el-radio-button label="details">DETAILS</el-radio-button>
        </el-radio-group>
      </header>
      <div :class="scene + '_form'">
        <ShForm
          v-model="formData"
          :form-config="formConfig"
          :scene="scene"
        ></ShForm>
      </div>
    </div>
    <div class="three"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import ShForm from "./ShFormShow.vue";
let scene = ref("pc");
const change = (val) => {
  console.log(scene.value, val);
};

const btns = reactive([
  {
    label: "分割线",
    type: "classifyTitle",
    defaultConfig: {
      label: "分割线",
      type: "classifyTitle",
      span: 24,
    },
  },
  {
    label: "输入框",
    type: "input",
    defaultValue: undefined,
    defaultConfig: {
      label: "客户名称",
      prop: "input",
      type: "input",
      placeholder: "请输入客户名称",
      rules: [],
      span: 12,
    },
  },
  {
    label: "多行文本",
    type: "textarea",
    defaultValue: undefined,
    defaultConfig: {
      label: "多行文本",
      prop: "textarea",
      type: "textarea",
      placeholder: "请输入XXX",
      span: 24,
      rules: [],
    },
  },
  {
    label: "选择器",
    type: "select",
    defaultValue: undefined,
    defaultConfig: {
      label: "选择器",
      prop: "select",
      type: "select",
      placeholder: "请选择XXX",
      span: 12,
      multiple: false,
      clearable: true,
      options: [
        { value: 0, label: "aaa" },
        { value: 1, label: "bbb" },
        { value: 2, label: "ccc" },
        { value: 3, label: "ddd" },
        { value: 4, label: "eee" },
        { value: 5, label: "fff" },
      ],
      rules: [],
      optionsAsync: true,
      optionsAsyncApi: "getSelectOptionsApi",
    },
  },
  {
    label: "单选框",
    type: "radio",
    defaultValue: undefined,
    defaultConfig: {
      label: "单选框",
      prop: "radio",
      type: "radio",
      span: 24,
      options: [
        { value: 0, label: "aaa" },
        { value: 1, label: "bbb" },
        { value: 2, label: "ccc" },
        { value: 3, label: "ddd" },
        { value: 4, label: "eee" },
        { value: 5, label: "fff" },
      ],
      rules: [],
      optionsAsync: true,
      optionsAsyncApi: "getSelectOptionsApi",
    },
  },
  {
    label: "多选框",
    type: "checkbox",
    defaultValue: [],
    defaultConfig: {
      label: "多选框",
      prop: "checkbox",
      type: "checkbox",
      span: 24,
      options: [
        { value: 0, label: "aaa" },
        { value: 1, label: "bbb" },
        { value: 2, label: "ccc" },
        { value: 3, label: "ddd" },
        { value: 4, label: "eee" },
        { value: 5, label: "fff" },
      ],
      rules: [],
      optionsAsync: true,
      optionsAsyncApi: "getSelectOptionsApi",
    },
  },
  {
    label: "开关",
    defaultValue: true,
    type: "switch",
    defaultConfig: {
      label: "开关",
      prop: "switch",
      type: "switch",
      span: 12,
    },
  },
  {
    label: "时间选择器",
    type: "timePicker",
    defaultValue: undefined,
    defaultConfig: {
      label: "时间选择器",
      prop: "timePicker",
      type: "timePicker",
      placeholder: "请选择时间",
      rules: [],
      span: 12,
    },
  },
  {
    label: "时间范围选择器",
    type: "timePickerRange",
    defaultValue: [],
    defaultConfig: {
      label: "时间范围选择器",
      prop: "timePickerRange",
      type: "timePickerRange",
      placeholder: "请选择时间范围",
      rangeSeparator: "至",
      startPlaceholder: "开始时间",
      endPlaceholder: "开始时间",
      span: 12,
      rules: [],
    },
  },
  {
    label: "日期选择器",
    type: "datePicker",
    defaultValue: undefined,
    defaultConfig: {
      label: "日期选择器",
      prop: "datePicker",
      type: "datePicker",
      placeholder: "请选择日期",
      span: 8,
      rules: [],
    },
  },
  {
    label: "日期范围选择器",
    type: "datePickerRange",
    defaultValue: [],
    defaultConfig: {
      label: "日期范围选择器",
      prop: "datePickerRange",
      type: "datePickerRange",
      placeholder: "请选择日期范围",
      rangeSeparator: "至",
      startPlaceholder: "开始日期",
      endPlaceholder: "开始日期",
      span: 12,
      rules: [],
    },
  },
  {
    label: "日期时间选择器",
    type: "dateTimePicker",
    defaultValue: [],
    defaultConfig: {
      label: "日期时间选择器",
      prop: "dateTimePicker",
      type: "dateTimePicker",
      placeholder: "请选择日期和时间",
      span: 8,
      rules: [],
    },
  },
]);
const formConfig = ref([]);
const formData = ref({});
const handleAdd = (item) => {
  formData.value[item.defaultConfig.prop] = item.defaultValue;
  formConfig.value.push(item.defaultConfig);
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
}
.one {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .el-button + .el-button {
    margin-left: 0;
  }
}
.two {
  flex: 10;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  //   padding: 10px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  //   justify-content: center;
  .controls {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    background-color: #fff;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }
  .design_form,
  .pc_form {
    width: 98%;
    padding: 0 10px;
    background-color: #fff;
    overflow: auto;
  }
  .mobile_form {
    width: 320px;
    height: 750px;
    background-color: #fff;
    padding: 0 10px;
    overflow: auto;
  }
}
.three {
  flex: 2;
}
</style>
