// 通用增、改、删、查、dialog 逻辑
// 父元素中引用
export function commonCURD() {
  const { proxy } = getCurrentInstance();
  // 接口请求参数
  let queryParams = ref({});
  // 初始化请求参数,列表api接口,单条详情api接口，删除api接口
  let getListApi, getDetailsApi, deleteApi;
  function initDataOrApi(QueryParams, GetListApi, GetDetailsApi, DeleteApi) {
    queryParams.value = QueryParams;
    getListApi = GetListApi;
    getDetailsApi = GetDetailsApi;
    deleteApi = DeleteApi;
  }

  // 用于表格单选、多选
  const ids = ref([]);
  const single = ref(true);
  const multiple = ref(true);
  /** 选择条数  */
  function handleSelectionChange(selection) {
    ids.value = selection.map((item) => item.id);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
  }

  // 表格相关的数据
  const loading = ref(true);
  const tableData = ref([]);
  const total = ref(0);
  /** 查询列表 */
  function getList() {
    loading.value = true;
    getListApi(queryParams.value).then((res) => {
      if (res.code == 200) {
        tableData.value = res.rows;
        total.value = res.total;
        loading.value = false;
      }
    });
  }

  // 初始的form数据，用于reset
  let originalForm = {};
  onMounted(() => {
    originalForm = JSON.parse(
      JSON.stringify(proxy.$refs.addOrEditDialogRef.form)
    );
  });
  // 重置表单
  function reset() {
    proxy.$refs.addOrEditDialogRef.form = JSON.parse(
      JSON.stringify(originalForm)
    );
    proxy.resetForm("addOrEditFormRef");
  }
  // 打开新增表单
  function handleAdd() {
    reset();
    proxy.$refs.addOrEditDialogRef.open = true;
    proxy.$refs.addOrEditDialogRef.title = "新增";
  }
  // 打开修改表单
  function handleUpdate(data, funChange) {
    reset();
    const Id = Array.isArray(data) ? data : data.id;
    getDetailsApi(Id).then((response) => {
      if (funChange) {
        funChange(proxy, response);
      } else {
        proxy.$refs.addOrEditDialogRef.form = response.row;
        proxy.$refs.addOrEditDialogRef.open = true;
        proxy.$refs.addOrEditDialogRef.title = "修改";
      }
    });
  }
  /** 删除按钮操作 */
  function handleDelete(data) {
    const Ids = Array.isArray(data) ? data : [data.id];
    proxy.$modal
      .confirm('是否确认删除用户编号为"' + Ids + '"的数据项？')
      .then(function () {
        return deleteApi(Ids);
      })
      .then(() => {
        getList();
        proxy.$modal.msgSuccess("删除成功");
      })
      .catch(() => {});
  }

  // 通过返回值暴露所管理的状态
  return {
    initDataOrApi,
    queryParams,
    loading,
    tableData,
    total,
    getList,
    ids,
    single,
    multiple,
    handleSelectionChange,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
}

// dialog本身引用
export function handleInDialog() {
  const { proxy } = getCurrentInstance();

  let form = ref({}); //响应式form
  let originalForm = {}; //初始的form数据
  const open = ref(false); //控制dialog的打开和关闭

  // 初始化form数据,新增api接口,修改api接口
  let addApi, updateApi;
  function initDataOrApi(formData, AddApi, UpdateApi) {
    form.value = originalForm = formData;
    addApi = AddApi;
    updateApi = UpdateApi;
  }
  // 重置表单
  function reset() {
    form.value = JSON.parse(JSON.stringify(originalForm));
    proxy.resetForm("addOrEditFormRef");
  }
  // 提交表单按钮
  function submitForm() {
    proxy.$refs["addOrEditFormRef"].validate((valid) => {
      if (valid) {
        if (form.value.id != undefined) {
          updateApi(form.value).then((response) => {
            if (response.code == 200) {
              proxy.$modal.msgSuccess("修改成功");
              open.value = false;
              proxy.$parent.getList();
            }
          });
        } else {
          addApi(form.value).then((response) => {
            if (response.code == 200) {
              proxy.$modal.msgSuccess("新增成功");
              open.value = false;
              proxy.$parent.getList();
            }
          });
        }
      }
    });
  }
  // 取消按钮
  function cancel() {
    open.value = false;
    reset();
  }
  return { initDataOrApi, open, form, submitForm, cancel };
}
