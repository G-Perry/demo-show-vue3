<template>
  <section class="full_page">
    <div class="son_fit_father">
      <page-header title="XXXX">
        <button class="anfu_btn add">新增</button>
        <button class="anfu_btn edit">修改</button>
        <button class="anfu_btn danger">删除</button>
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
        <el-table :height="tableHeight">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="角色编号" prop="roleId" />
          <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
          <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" />
          <el-table-column label="显示顺序" prop="roleSort" />
          <el-table-column label="显示顺序" prop="roleSort" />
          <el-table-column label="显示顺序" prop="roleSort" />
        </el-table>
        <!-- v-show="total > 0" -->
        <pagination
          ref="footer_pagination"
          class="footer_pagination"
          :total="400"
          :page="1"
          :limit="20"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { setTableHeight } from "@/composables/setTableHeight";
const { tableHeight } = setTableHeight();
</script>

<style lang="scss" scoped>
</style>