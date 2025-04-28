<script lang="jsx">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  unref,
  onMounted,
} from "vue";

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
                  {option.label}
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

        default:
          return <div>-</div>;
      }
    };
    return () => renderForm(props.formConfig);
  },
});
</script>
