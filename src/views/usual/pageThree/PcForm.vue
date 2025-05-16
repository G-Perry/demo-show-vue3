<script lang="jsx">
import { defineComponent, ref } from "vue";
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
  setup(props, { expose }) {
    // console.log(44444);
    const formRef = ref();
    const resetFields = () => {
      return formRef.value?.resetFields();
    };
    const validate = () => {
      return formRef.value?.validate();
    };
    expose({ resetFields, validate });
    const buildRules = (formConfig) => {
      let rules = {};
      formConfig.forEach((item) => {
        if (Array.isArray(item.rules) && item.rules.length) {
          rules[item.prop] = item.rules;
        }
      });
      return rules;
    };
    const renderForm = (formConfig) => {
      return (
        <el-form
          ref={formRef}
          label-position="top"
          model={props.modelValue}
          rules={buildRules(formConfig)}
        >
          <el-row gutter={20}>{renderFormItem(formConfig)}</el-row>
        </el-form>
      );
    };
    const itemIsShow = (item) => {
      // if (item.show) {
      //   return item.show(props.modelValue) ? true : false;
      // } else {
      //   return true;
      // }
      if (item.show) {
        let show = item.show(props.modelValue);
        if (!show) {
          props.modelValue[item.prop] = undefined;
        }
        return show ? "block" : "none";
      } else {
        return "block";
      }
    };
    const itemIsDisabled = (item) => {
      // console.log(item)
      // 检查属性是否存在
      if (!item.hasOwnProperty("disabled")) {
        // console.log('属性不存在')
        // return '属性不存在'
        return false;
      }
      const propValue = item["disabled"];
      // 检查属性类型
      if (typeof propValue === "boolean") {
        // console.log('是布尔值: ' + propValue)
        // return '是布尔值: ' + propValue
        return propValue;
      } else if (typeof propValue === "function") {
        // console.log('是方法: ' + propValue)
        // return '是方法'
        return propValue(props.modelValue);
      }
      // else {
      // return '既不是布尔值也不是方法'
      // }
      // return false
    };
    const renderFormItem = (formConfig) => {
      return formConfig.map((item) => {
        if (item.type === "classifyTitle") {
          return (
            <el-col span={item.span}>
              <span class="classify_title">{item.label}</span>
            </el-col>
          );
        }
        return (
          // itemIsShow(item) && (
          //   <el-col span={item.span}>
          //     <el-form-item label={item.label} prop={item.prop}>
          //       {renderlabelAndInput(item)}
          //     </el-form-item>
          //   </el-col>
          // )
          <el-col span={item.span}>
            <el-form-item
              label={item.label}
              prop={item.prop}
              style={{
                display: itemIsShow(item),
              }}
            >
              {renderlabelAndInput(item)}
            </el-form-item>
          </el-col>
        );
      });
    };

    const renderlabelAndInput = (item) => {
      switch (item.type) {
        case "input":
          return (
            <el-input
              v-model={props.modelValue[item.prop]}
              placeholder={item.placeholder}
              disabled={itemIsDisabled(item)}
              onInput={(e) => item.onInput?.(e, props.modelValue)}
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
              disabled={itemIsDisabled(item)}
              onChange={(e) => item.onChange?.(e, props.modelValue)}
            >
              {item.options.map((option) => (
                <el-option
                  key={option[item.optionsAttrName.value]}
                  label={option[item.optionsAttrName.label]}
                  value={option[item.optionsAttrName.value]}
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
                    <el-tag type={option.tagType || option.colorType || "info"}>
                      {option.label}
                    </el-tag>
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
    return () => renderForm(props.formConfig);
  },
});
</script>
