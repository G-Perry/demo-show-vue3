<template>
  <section class="full_page">
    <div class="son_fit_father">
      <page-header title="通用页面模板一">
        <button class="anfu_btn add" @click="handleAdd">新增</button>
        <button
          class="anfu_btn edit"
          :disabled="single"
          @click="handleUpdate(ids,handleUpdateSelfChange)"
        >修改</button>
        <button class="anfu_btn danger" :disabled="multiple" @click="handleDelete(ids)">删除</button>
        <button class="anfu_btn warning">导出</button>
      </page-header>

      <section class="search_bar">
        <el-form ref="queryRef" :inline="true" label-width="68px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input placeholder="请输入角色名称" clearable />
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input placeholder="请输入角色名称" clearable />
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input placeholder="请输入角色名称" clearable />
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input placeholder="请输入角色名称" clearable />
          </el-form-item>
        </el-form>
        <div class="two_btns">
          <el-button type="primary" icon="Search">搜索</el-button>
          <el-button icon="Refresh">重置</el-button>
        </div>
      </section>
      <div class="son_fit">
        <!-- :height="tableHeight" -->
        <el-table
          v-loading="loading"
          :height="tableHeight"
          :data="tableData"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <!-- <el-table-column type="index" width="50" label="序号" align="center"></el-table-column> -->
          <el-table-column width="50" label="序号" align="center" prop="index"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别">
            <template #default="scope">{{ sexMatch(scope.row.sex) }}</template>
          </el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="birth" label="出生日期"></el-table-column>
          <el-table-column prop="identityCard" show-overflow-tooltip label="身份证"></el-table-column>
          <el-table-column prop="phoneNum" label="电话号码"></el-table-column>
          <el-table-column prop="address" label="地址" min-width="300" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" width="90" label="状态">
            <template #default="scope">
              <!-- <common-button></common-button> -->
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusSwitchChange(scope.row)"
              ></el-switch>
              <!-- <el-switch v-model="scope.row.status | statusMatch"></el-switch> -->
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template #default="scope">
              <el-button size="small" @click="handleUpdate(scope.row,handleUpdateSelfChange)">Edit</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- v-show="total > 0" -->
        <pagination
          ref="footer_pagination"
          class="footer_pagination"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <!-- 这边dialog的ref写死 -->
    <add-or-edit-dialog ref="addOrEditDialogRef"></add-or-edit-dialog>
  </section>
</template>

<script setup>
// 引入组件
import addOrEditDialog from "./addOrEditDialog.vue";
// api接口
import {
  getUserList,
  getUserDetailsById,
  userDeleteById,
  updateUserStatusById,
} from "@/api/usual/index";
// 引入组合式函数
import { commonCURD } from "@/composables/commonCURD.js";
const CRUD = commonCURD(); //增删改查
const {
  queryParams,
  loading,
  tableData,
  total,
  ids,
  single,
  multiple,
  handleSelectionChange,
  getList,
  handleAdd,
  handleUpdate,
  handleDelete,
} = CRUD;

// 表格高度自适应
import { setTableHeight } from "@/composables/setTableHeight";
const { tableHeight } = setTableHeight();

let data = {
  pageNum: 1,
  pageSize: 20,
  name: "", //客户名称
  salesPerson: "", //销售
  serviceProject: "", //服务项目
  serviceEngineer: "", //服务工程师
  serviceCompany: "", //服务公司
  servicePeriod: "", //服务期
  createdBy: "", //创建人
  createdAt: "", //创建时间
  modifiedBy: "", //修改人
  modifiedAt: "", //修改时间
};
/*
  传入查询参数，以及对应api接口方法
  请求参数,列表api接口,单条详情api接口，删除api接口
  顺序不能换
*/
CRUD.initDataOrApi(data, getUserList, getUserDetailsById, userDeleteById);

const sexMatch = computed(() => {
  return function (sexNum) {
    return sexNum == 1 ? "男" : "女";
  };
});

// const sexMatch = computed(() => {
//   return author.books.length > 0 ? 'Yes' : 'No'
// })

function handleUpdateSelfChange(proxy, response) {
  proxy.$refs.addOrEditDialogRef.form = response.row;
  proxy.$refs.addOrEditDialogRef.open = true;
  proxy.$refs.addOrEditDialogRef.title = "修改";
  proxy.$refs.addOrEditDialogRef.address = response.row.address.split(" ");
}

const { proxy } = getCurrentInstance();
function handleStatusSwitchChange(row) {
  proxy.$modal
    .confirm(
      "此操作将" +
        (row.status == 0 ? "禁用 " : "启用 ") +
        row.name +
        " 的账号, 是否继续?",
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
    .then(() => {
      let data = {
        id: [row.id],
        status: row.status == 0 ? 0 : 1,
      };
      updateUserStatusById(data).then((res) => {
        res.code == 200 && this.getList();
      });
      proxy.$modal.msgSuccess("修改成功");
    })
    .catch(() => {
      row.status = row.status == 0 ? 1 : 0;
      proxy.$modal.msg("操作取消");
    });
}

// 暴露getlist方法
defineExpose({ getList });
getList();
</script>

<style lang="scss" scoped>
</style>