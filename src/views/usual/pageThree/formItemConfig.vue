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
        v-if="
          !['switch', 'radio', 'checkbox', 'justText'].includes(
            currentItem.type
          )
        "
      >
        <el-input v-model="currentItem.placeholder" />
      </el-form-item>
    </template>
    <template v-if="currentItem.type === 'input'">
      <el-form-item label="是否禁用">
        <el-switch v-model="currentItem.disabled" />
      </el-form-item>
    </template>
    <template v-if="currentItem.type === 'areaPicker'">
      <el-form-item label="树形数据深度（默认三级）">
        <el-radio-group v-model="currentItem.depth">
          <el-radio :label="1">1</el-radio>
          <el-radio :label="2">2</el-radio>
          <el-radio :label="3">3</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
    <template v-if="currentItem.type === 'radio'">
      <el-form-item label="异步获取数据">
        <el-switch
          v-model="currentItem.optionsAsync"
          @change="(e) => handleSwitchChange(e, 'optionsAsync')"
        />
      </el-form-item>
      <template v-if="!currentItem.optionsAsync">
        <el-form-item label="以Tag形式展示">
          <el-switch
            v-model="currentItem.showByTag"
            @change="(e) => handleSwitchChange(e, 'showByTag')"
          />
        </el-form-item>
        <el-form-item label="自定义数据">
          <table>
            <colgroup>
              <col style="width: 50px" />
              <col style="width: 100px" />
              <col style="width: 120px" v-if="currentItem.showByTag" />
              <col style="width: 30px" />
            </colgroup>
            <thead>
              <tr>
                <th>value</th>
                <th>label</th>
                <th v-if="currentItem.showByTag">tag</th>
                <th>
                  <el-button link @click="handleOptions('add')">
                    <el-icon><Plus /></el-icon>
                  </el-button>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in currentItem.options">
                <tr>
                  <td>
                    <el-input
                      placeholder="value"
                      v-model="item.value"
                      size="small"
                    />
                  </td>
                  <td>
                    <el-input
                      placeholder="label"
                      v-model="item.label"
                      size="small"
                    />
                  </td>
                  <td v-if="currentItem.showByTag">
                    <el-select
                      v-model="item.tagType"
                      size="small"
                      class="abcddd"
                    >
                      <el-option label="primary" value="primary">
                        <el-tag type="primary" size="small">Tag 1</el-tag>
                      </el-option>
                      <el-option label="success" value="success">
                        <el-tag type="success" size="small">Tag 2</el-tag>
                      </el-option>
                      <el-option label="info" value="info">
                        <el-tag type="info" size="small">Tag 3</el-tag>
                      </el-option>
                      <el-option label="warning" value="warning">
                        <el-tag type="warning" size="small">Tag 4</el-tag>
                      </el-option>
                      <el-option label="danger" value="danger">
                        <el-tag type="danger" size="small">Tag 5</el-tag>
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button link @click="handleOptions('delete', index)">
                      <el-icon><Minus /></el-icon>
                    </el-button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </el-form-item>
      </template>
    </template>
    <template v-if="currentItem.type === 'justText'">
      <el-form-item label="默认展示字符">
        <el-input v-model="currentItem.defaultText" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

interface FormItemConfig {
  label: string;
  type: string;
  span: number;
  placeholder?: string;
  prop?: string;
  depth?: number;
  disabled?: boolean;
  optionsAsync?: boolean;
  showByTag?: boolean;
  options?: any[];
  defaultText?: string;
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
const handleOptions = (type: string, index?: number) => {
  switch (type) {
    case "add":
      currentItem.value.options.push({
        value: "",
        label: "",
      });
      break;
    case "delete":
      currentItem.value.options.splice(index, 1);
      break;

    default:
      break;
  }
};
const handleSwitchChange = (val: boolean, signal: string) => {
  // console.log(val);
  // if (val) {
  //   currentItem.value.options = [];
  // }
  switch (signal) {
    case "showByTag":
      if (!val) {
        currentItem.value.options.forEach((item) => {
          item.tagType = "";
        });
      }
      break;

    default:
      break;
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 0 3px;
}
th {
  font-size: 12px;
  height: 28px;
  line-height: 28px;
  background-color: #f2f2f2;
}
</style>
