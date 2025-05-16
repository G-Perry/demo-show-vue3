<script lang="jsx">
import { defineComponent, computed } from "vue";
import draggable from "vuedraggable";
import pcAreaSelect from "@/views/usual/pageTwo/pcComponents/pcAreaSelect.vue";

export default defineComponent({
  name: "PcForm",
  props: {
    formConfig: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    // let arrList = computed(() => props.formConfig);
    // const emit = defineEmits(['update-form-config']);

    const localFormConfig = computed({
      get: () => props.formConfig,
      set: (val) => emit("update-form-config", val),
    });
    const renderForm = () => {
      return (
        <el-form label-position="top">
          <draggable
            v-model={localFormConfig.value}
            class="el-row"
            animation={340}
          >
            {{
              item: ({ element, index }) => renderFormItem(element, index),
            }}
          </draggable>
        </el-form>
      );
    };
    const handleItemDelete = (event, item, index) => {
      event.stopPropagation();
      props.formConfig.splice(index, 1);
    };
    const handleItemClick = (item, index) => {
      // console.log(item, index);
      emit("form-item-select", item, index);
    };
    const renderFormItem = (item, index) => {
      if (item.type === "classifyTitle") {
        return (
          <el-col span={item.span} class="elColItem">
            <div class="mask" onClick={() => handleItemClick(item, index)}>
              <el-icon
                class="deleteIcon"
                onClick={(e) => handleItemDelete(e, item, index)}
              >
                <Delete />
              </el-icon>
            </div>
            <span class="classify_title">{item.label}</span>
          </el-col>
        );
      }
      return (
        <el-col span={item.span} class="elColItem">
          <div class="mask" onClick={() => handleItemClick(item, index)}>
            <el-icon
              class="deleteIcon"
              onClick={(e) => handleItemDelete(e, item, index)}
            >
              <Delete />
            </el-icon>
          </div>
          <el-form-item label={item.label} prop={item.prop}>
            {renderlabelAndInput(item)}
          </el-form-item>
        </el-col>
      );
    };

    const renderlabelAndInput = (item) => {
      switch (item.type) {
        case "input":
          return (
            <el-input
              v-model={props.modelValue[item.prop]}
              placeholder={item.placeholder}
            />
          );
        case "textarea":
          return (
            <el-input
              v-model={props.modelValue[item.prop]}
              placeholder={item.placeholder}
              type="textarea"
              rows={4}
            />
          );
        case "select":
          return (
            <el-select
              v-model={props.modelValue[item.prop]}
              placeholder={item.placeholder}
              multiple={item.multiple || false}
              clearable={item.clearable || false}
              style="width: 100%"
            >
              {item.options.map((option) => (
                <el-option
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </el-select>
          );
        case "radio":
          return (
            <el-radio-group v-model={props.modelValue[item.prop]}>
              {item.options.map((option) => (
                <el-radio key={option.value} label={option.value}>
                  {item.showByTag ? (
                    <el-tag type={option.tagType}>{option.label}</el-tag>
                  ) : (
                    option.label
                  )}
                </el-radio>
              ))}
            </el-radio-group>
          );
        case "checkbox":
          return (
            <el-checkbox-group v-model={props.modelValue[item.prop]}>
              {item.options.map((option) => (
                <el-checkbox key={option.value} label={option.value}>
                  {option.label}
                </el-checkbox>
              ))}
            </el-checkbox-group>
          );
        case "timePicker":
          return (
            <el-time-picker
              v-model={props.modelValue[item.prop]}
              placeholder={item.placeholder}
              style="width: 100%"
              value-format="HH:mm:ss"
            />
          );
        case "datePicker":
          return (
            <el-date-picker
              v-model={props.modelValue[item.prop]}
              placeholder={item.placeholder}
              type="date"
              style="width: 100%"
              value-format="YYYY-MM-DD"
            />
          );
        case "dateTimePicker":
          return (
            <el-date-picker
              v-model={props.modelValue[item.prop]}
              placeholder={item.placeholder}
              type="datetime"
              style="width: 100%"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          );
        case "timePickerRange":
          return (
            <el-time-picker
              v-model={props.modelValue[item.prop]}
              is-range
              rangeSeparator={item.rangeSeparator || "To"}
              start-placeholder={item.startPlaceholder || "Start time"}
              endPlaceholder={item.endPlaceholder || "End time"}
              value-format="HH:mm:ss"
            />
          );
        case "datePickerRange":
          return (
            <el-date-picker
              v-model={props.modelValue[item.prop]}
              type="daterange"
              rangeSeparator={item.rangeSeparator || "To"}
              start-placeholder={item.startPlaceholder || "Start time"}
              endPlaceholder={item.endPlaceholder || "End time"}
              value-format="YYYY-MM-DD"
            />
          );
        // case "dateTimePickerRange":
        //   return (
        //     <el-date-picker
        //       v-model={props.modelValue[item.prop]}
        //       type="datetimerange"
        //       rangeSeparator={item.rangeSeparator || "To"}
        //       start-placeholder={item.startPlaceholder || "Start time"}
        //       endPlaceholder={item.endPlaceholder || "End time"}
        //       value-format="YYYY-MM-DD HH:mm:ss"
        //     />
        //   );
        case "switch":
          return <el-switch v-model={props.modelValue[item.prop]} />;
        case "areaPicker":
          return (
            <pcAreaSelect
              v-model={props.modelValue[item.prop]}
              selectItemConfig={item}
            ></pcAreaSelect>
          );
        case "justText":
          return (
            <div style="display: flex; align-items: center;gap:5px">
              {item.showByTag ? (
                item.options.map((option) => (
                  <el-tag key={option.value} type={option.tagType || "info"}>
                    {option.label}
                  </el-tag>
                ))
              ) : (
                <>
                  <span>{props.modelValue[item.prop] ?? "-"}</span>
                  <span>{item.defaultText}</span>
                </>
              )}
            </div>
          );
        // case "upload":
        //   return <UploadFile v-model={props.modelValue[item.prop]} />;
        default:
          return <div>-</div>;
      }
    };
    return () => renderForm();
  },
});
</script>
<style lang="scss" scoped>
.elColItem {
  position: relative;
  user-select: none;
  padding: 0 10px;
  .mask {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    z-index: 999;
    border: 1px solid #ccc;
    .deleteIcon {
      position: absolute;
      right: 3px;
      bottom: 3px;
      background: #ff4040;
      color: #fff;
      cursor: pointer;
      padding: 3px;
      box-sizing: content-box;
    }
  }
}
// .draggable-list {
//   width: 100%;
// }
</style>
