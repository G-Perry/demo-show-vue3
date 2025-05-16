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
        <div>
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleDraweropen('import')"
            >导入配置</el-button
          >
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleDraweropen('export')"
            >生成JSON</el-button
          >
        </div>
      </header>
      <div :class="scene + '_form'">
        <ShForm
          v-model="formData"
          :scene="scene"
          :form-config="formConfig"
          @update-form-config="updateFormConfig"
          @form-item-select="formItemSelect"
        ></ShForm>
      </div>
    </div>
    <div class="three">
      <formItemConfig
        v-model="currentIndex"
        :formConfig="formConfig"
      ></formItemConfig>
    </div>
  </section>
  <el-drawer v-model="drawerVisible" append-to-body :with-header="false">
    <template v-if="drawerType === 'import'">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleGenerateJsonimport"
        style="float: right; margin-bottom: 10px"
        >导入JSON</el-button
      >
      <el-input
        type="textarea"
        placeholder="在此粘贴配置信息"
        :rows="40"
        v-model="importConfigInfo"
      ></el-input>
    </template>
    <template v-if="drawerType === 'export'">
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleGenerateJsonCopy"
        style="position: absolute; right: 30px; top: 30px"
        >复制JSON</el-button
      >
      <!-- <code>
        <pre>{{ formConfig }}</pre>
      </code> -->
      <pre class="code-block"><code v-html="highlightedCode" /></pre>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, unref, reactive, watch, computed } from "vue";
import ShForm from "./ShFormShow.vue";
import formItemConfig from "./formItemConfig.vue";
import { deepClone } from "@/utils/index.js";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // 选择喜欢的主题

let scene = ref("design");
const change = (val) => {};

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
    defaultConfig: {
      defaultValue: undefined,
      label: "输入框",
      prop: "input",
      type: "input",
      placeholder: "请输入XXX",
      rules: [],
      span: 12,
      disabled: false,
    },
  },
  {
    label: "多行文本",
    type: "textarea",
    defaultConfig: {
      defaultValue: undefined,
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
    defaultConfig: {
      defaultValue: undefined,
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
      optionsAsync: true, //异步获取options
      optionsFromDict: false, //options来自字典
      optionsAttrName: {
        value: "id",
        label: "name",
      },
      optionsAsyncApi: "getSelectOptionsApi",
    },
  },
  {
    label: "单选框",
    type: "radio",
    defaultConfig: {
      label: "单选框",
      prop: "radio",
      type: "radio",
      span: 24,
      options: [
        { value: 0, label: "aaa", tagType: "" },
        { value: 1, label: "bbb", tagType: "" },
        { value: 2, label: "ccc", tagType: "" },
        { value: 3, label: "ddd", tagType: "" },
        { value: 4, label: "eee", tagType: "" },
        { value: 5, label: "fff", tagType: "" },
      ],
      defaultValue: undefined,
      rules: [],
      showByTag: false, //以标签形式展示
      optionsAsync: false,
      optionsFromDict: false,
      optionsAsyncApi: "getSelectOptionsApi",
    },
  },
  {
    label: "多选框",
    type: "checkbox",
    defaultConfig: {
      defaultValue: [],
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
    type: "switch",
    defaultValue: true,
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
    defaultConfig: {
      defaultValue: undefined,
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
    defaultConfig: {
      defaultValue: [],
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
    defaultConfig: {
      defaultValue: undefined,
      label: "日期选择器",
      prop: "datePicker",
      type: "datePicker",
      placeholder: "请选择日期",
      span: 12,
      rules: [],
    },
  },
  {
    label: "日期范围选择器",
    type: "datePickerRange",
    defaultConfig: {
      defaultValue: [],
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
    defaultConfig: {
      defaultValue: [],
      label: "日期时间选择器",
      prop: "dateTimePicker",
      type: "dateTimePicker",
      placeholder: "请选择日期和时间",
      span: 12,
      rules: [],
    },
  },
  {
    label: "地址选择器",
    type: "areaPicker",
    defaultConfig: {
      defaultValue: undefined,
      label: "地址选择器",
      prop: "areaPicker",
      type: "areaPicker",
      placeholder: "请选择地址",
      span: 12,
      rules: [],
      depth: 3, //树形数据的深度
    },
  },
  {
    label: "纯文本展示",
    type: "justText",
    defaultConfig: {
      defaultValue: undefined,
      label: "纯文本展示",
      prop: "justText",
      type: "justText",
      defaultText: "X",
      span: 12,
    },
  },
  {
    label: "纯标签展示",
    type: "justTag",
    defaultConfig: {
      defaultValue: undefined,
      label: "纯标签展示",
      prop: "justTag",
      type: "justTag",
      span: 12,
      options: [
        {
          value: 1,
          label: "XXXXXX",
          tagType: "primary",
        },
      ],
      showType: "", //allTags、bindingTags
      showByTag: false,
      optionsAsync: false,
      optionsFromDict: false,
      optionsAsyncApi: "getSelectOptionsApi",
    },
  },
  {
    label: "上传",
    type: "upload",
    defaultConfig: {
      defaultValue: undefined,
      label: "上传",
      prop: "upload",
      type: "upload",
      rules: [],
      span: 12,
    },
  },
  {
    label: "富文本编辑器",
    type: "editor",
    defaultConfig: {
      defaultValue: undefined,
      label: "富文本编辑器",
      prop: "editor",
      type: "editor",
      rules: [],
      span: 24,
    },
  },
  {
    label: "插槽",
    type: "slot",
    defaultConfig: {
      type: "slot",
      slotName: "",
      span: 24,
    },
  },
]);

const formConfig = ref([]);
const formData = ref({});
const handleAdd = (item) => {
  // console.log(item);
  console.log(item.defaultConfig, 111, deepClone(item.defaultConfig));

  formData.value[item.defaultConfig.prop] = item.defaultConfig.defaultValue;
  // formConfig.value.push({ ...item.defaultConfig });
  formConfig.value.push(deepClone(item.defaultConfig));
};
const updateFormConfig = (newConfig) => {
  currentIndex.value = null;
  formConfig.value = newConfig;
};

const currentIndex = ref(null);
const formItemSelect = (item, index) => {
  currentIndex.value = index;
};
let drawerVisible = ref(false);
let drawerType = ref("");
let importConfigInfo = ref("");
const handleDraweropen = (sign: string) => {
  // console.log(formData.value);

  switch (sign) {
    case "import":
      drawerType.value = "import";
      break;
    case "export":
      drawerType.value = "export";
      break;

    default:
      break;
  }
  drawerVisible.value = true;
};
/**
 * 导入json配置
 */
const handleGenerateJsonimport = () => {
  drawerVisible.value = false;
  formConfig.value = eval(`(${importConfigInfo.value})`);
};

// 自定义序列化函数
const serializeWithUndefined = (obj: any, indent: number = 2): string => {
  const replacer = (key: string, value: any) => {
    // 处理 undefined 的值
    return value === undefined ? "undefined" : value;
  };
  // 先转换为 JSON 字符串（处理 undefined）
  const jsonString = JSON.stringify(obj, replacer, indent);
  // 将 "undefined" 字符串替换为 undefined 字面量
  return jsonString.replace(/"undefined"/g, "undefined");
};
// 计算属性：生成带高亮的代码
const highlightedCode = computed(() => {
  const codeString = serializeWithUndefined(formConfig.value);
  return hljs.highlight(codeString, { language: "javascript" }).value;
});

/**
 * 复制formConfig
 */
import { useClipboard } from "@vueuse/core";
import { ElMessage } from "element-plus";
const handleGenerateJsonCopy = async () => {
  const textToCopy = serializeWithUndefined(formConfig.value);
  const { copy, copied, isSupported } = useClipboard({ source: textToCopy });
  if (!unref(isSupported)) {
    // 处理不支持的情况
  } else {
    try {
      await copy(textToCopy); // 动态传入 source
      if (unref(copied)) {
        ElMessage.success("复制成功");
      }
    } catch (err) {
      // 错误处理
    }
  }
};

// 监听整个数组
watch(
  formConfig,
  (newVal) => {
    sessionStorage.setItem("formConfig", JSON.stringify(newVal));
  },
  { deep: true }
);
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
    justify-content: space-between;
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
    // background-color: #fff;
    // padding: 0 10px;
    // overflow: auto;
  }
}
.three {
  flex: 2;
  padding: 10px;
}
.code-block {
  background: #282c34;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  color: #abb2bf; /* 调整文本颜色以匹配主题 */
}

/* 确保 <code> 元素不继承外部样式 */
.code-block code {
  all: unset;
}
</style>
