<template>
  <!-- 添加或修改用户配置对话框 -->
  <el-dialog :title="title" v-model="open" width="600px" append-to-body>
    <el-form :model="form" :rules="rules" ref="addOrEditFormRef" label-width="90px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          v-model="form.birth"
          style="width: 100%"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="籍贯" prop="address">
        <el-cascader
          v-model="address"
          :options="cityData"
          clearable
          separator=" "
          :props="{ label: 'title', value: 'title', children: 'children' }"
          filterable
          @change="handleCascaderChange"
        ></el-cascader>
        <el-tooltip
          placement="right"
          effect="light"
          content="<span slot='content'></span>
            如果打开'修改dialog'时显示空白，原因如下：
            <br />mock模拟生成的籍贯地址数据，与cascader组件所绑定的地址数据层级对应有区别
          </span>"
          raw-content
        >
          <el-icon style="margin-left: 10px" v-show="title == '修改'">
            <Warning />
          </el-icon>
          <!-- -->
          <!-- <i class="el-icon-warning-outline" style="margin-left: 10px" v-show="title == '修改'"></i> -->
        </el-tooltip>
      </el-form-item>
      <el-form-item label="身份证号" prop="identityCard">
        <el-input v-model="form.identityCard" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="form.phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
// api接口
import { userAdd, userEdit } from "@/api/usual/index";
// 引入组合式函数
import { handleInDialog } from "@/composables/commonCURD";
const { initDataOrApi, form, open, submitForm, cancel } = handleInDialog();
const title = ref("");

// 初始化form数据、请求方法
let formData = {
  name: "",
  sex: 1,
  birth: "",
  address: "",
  identityCard: "",
  phoneNum: "",
  status: 1,
};
/*
传入查询参数，以及对应api接口方法
form数据,新增api接口,修改api接口
顺序不能换
*/
initDataOrApi(formData, userAdd, userEdit);
// 暴露属性，用于ref获取
// defineExpose({ open, title, form });
// 表单校验
// 自定义的身份证号校验函数
var validateIdentityCard = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入身份证号"));
  } else if (!/^\d{17}[\d|X|x]$/.test(value)) {
    // 字符串的开头必须是 17 个连续的数字。
    // 接下来可以是一个数字（0-9）或者是字母 X（大小写不限）。
    // 字符串的总长度应该是 18。
    callback(new Error("身份证号格式不正确"));
  } else {
    callback();
  }
};
const rules = ref({
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    {
      min: 2,
      max: 20,
      message: "用户名长度在 3 到 20 个字符之间",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-Z\u4e00-\u9fa5\s]+$/,
      message: "姓名只能包含字母、汉字和空格",
      trigger: "blur",
    },
  ],
  birth: [
    {
      type: "string",
      required: true,
      message: "请选择出生日期",
      trigger: "change",
    },
  ],
  address: [
    {
      type: "string",
      required: true,
      message: "请选择籍贯",
      trigger: "change",
    },
  ],
  identityCard: [
    { required: true, message: "请输入身份证号", trigger: "blur" },
    {
      validator: validateIdentityCard,
      trigger: "blur",
    },
  ],
  phoneNum: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      // 必须以数字 1 开头。
      // 第二位是 3、4、5、6、7、8、9 中的一个。
      // 后面必须是连续的 9 个数字。
      message: "手机号格式不正确",
      trigger: "blur",
    },
  ],
});

// 表单中籍贯相关的处理
import cityDataJson from "./cityDataJson";
const cityData = computed(() => {
  return cityDataJson;
});
const address = ref([]);
function handleCascaderChange() {
  // if (address.value) {
  form.value.address = address.value.join(" ");
  // }
}
defineExpose({ open, title, form, address });
</script>

<style lang="scss" scoped>
</style>