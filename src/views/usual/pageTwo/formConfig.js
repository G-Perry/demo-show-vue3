import { getSelectOptions } from "@/api/usual/index";
export const formConfigs = [
  {
    label: "客户基本信息",
    type: "classifyTitle",
    span: 24,
  },
  {
    label: "客户名称",
    prop: "input",
    type: "input",
    placeholder: "请输入客户名称",
    rules: [
      { required: true, message: "请输入客户名称", trigger: "blur" },
      { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    ],
    span: 12,
  },
  {
    label: "客户来源",
    prop: "select",
    type: "select",
    placeholder: "请选择客户来源",
    span: 12,
    multiple: false,
    clearable: true,
    options: [],
    rules: [
      {
        required: true,
        message: "Please select Activity zone",
        trigger: "change",
      },
    ],
    optionsAsync: true,
    optionsAsyncApi: getSelectOptions,
  },
  {
    label: "分割线",
    type: "classifyTitle",
    span: 24,
  },
  {
    label: "备注",
    prop: "textarea",
    type: "textarea",
    placeholder: "请输入备注",
    span: 24,
    rules: [
      {
        required: true,
        message: "Please input activity form",
        trigger: "blur",
      },
    ],
  },
  {
    label: "单选",
    prop: "radio",
    type: "radio",
    span: 24,
    options: [],
    rules: [
      {
        required: true,
        message: "Please select activity resource",
        trigger: "change",
      },
    ],
    optionsAsync: true,
    optionsAsyncApi: getSelectOptions,
  },
  {
    label: "开关",
    prop: "switch",
    type: "switch",
    span: 12,
  },
  {
    label: "多选",
    prop: "checkbox",
    type: "checkbox",
    span: 24,
    options: [],
    rules: [
      {
        required: true,
        message: "Please select at least one city",
        trigger: "change",
      },
    ],
    show: (formData) => {
      return formData.switch;
    },
    optionsAsync: true,
    optionsAsyncApi: getSelectOptions,
  },
  {
    label: "时间选择器",
    prop: "timePicker",
    type: "timePicker",
    placeholder: "请选择时间",
    rules: [
      {
        required: true,
        message: "Please pick a date",
        trigger: "change",
      },
    ],
    span: 8,
    show: (formData) => {
      return formData.radio == 6;
    },
  },
  {
    label: "时间范围选择器",
    prop: "timePickerRange",
    type: "timePickerRange",
    rangeSeparator: "至",
    startPlaceholder: "开始时间",
    endPlaceholder: "开始时间",
    span: 12,
    rules: [
      {
        required: true,
        message: "Please pick a date",
        trigger: "change",
      },
    ],
  },
  {
    label: "日期选择器",
    prop: "datePicker",
    type: "datePicker",
    placeholder: "请选择日期",
    span: 8,
    rules: [
      {
        required: true,
        message: "Please pick a date",
        trigger: "change",
      },
    ],
  },
  {
    label: "日期范围选择器",
    prop: "datePickerRange",
    type: "datePickerRange",
    rangeSeparator: "至",
    startPlaceholder: "开始日期",
    endPlaceholder: "开始日期",
    span: 12,
    rules: [
      {
        required: true,
        message: "Please pick a date",
        trigger: "change",
      },
    ],
  },
  {
    label: "日期时间选择器",
    prop: "dateTimePicker",
    type: "dateTimePicker",
    placeholder: "请选择日期和时间",
    span: 8,
    rules: [
      {
        required: true,
        message: "Please pick a date",
        trigger: "change",
      },
    ],
  },
  {
    label: "日期时间范围选择器",
    prop: "dateTimePickerRange",
    type: "dateTimePickerRange",
    rangeSeparator: "至",
    startPlaceholder: "开始日期",
    endPlaceholder: "开始日期",
    span: 12,
    rules: [
      {
        required: true,
        message: "Please pick a date",
        trigger: "change",
      },
    ],
  },
];
