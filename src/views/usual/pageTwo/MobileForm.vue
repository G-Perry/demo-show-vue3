<script lang="jsx">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  unref,
  onMounted,
} from "vue";
import moSelect from "./mobileComponents/moSelect.vue";

export default defineComponent({
  name: "MobileForm",
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
        <van-form>
          <van-cell-group border={false}>
            {renderFormItem(formConfig)}
          </van-cell-group>
        </van-form>
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
          return <span class="classify_title">{item.label}</span>;
        }
        return renderlabelAndInput(item);
      });
    };

    const renderlabelAndInput = (item) => {
      switch (item.type) {
        case "input":
          return (
            <van-field
              v-model={props.modelValue[item.prop]}
              name={item.prop}
              label={item.label}
              placeholder={item.placeholder}
            />
          );
        case "textarea":
          return (
            <van-field
              v-model={props.modelValue[item.prop]}
              placeholder={item.placeholder}
              name={item.prop}
              label={item.label}
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              show-word-limit
            />
          );
        case "select":
          return (
            <moSelect
              v-model={props.modelValue[item.prop]}
              selectItemConfig={item}
            ></moSelect>
          );
        case "radio":
          return (
            <van-field name={item.prop} label={item.label} label-align="top">
              {{
                input: () => (
                  <van-radio-group
                    v-model={props.modelValue[item.prop]}
                    shape="dot"
                    class="mobile-radio-group"
                  >
                    {item.options.map((option) => (
                      <van-radio key={option.value} name={option.value}>
                        {option.label}
                      </van-radio>
                    ))}
                  </van-radio-group>
                ),
              }}
            </van-field>
          );
        case "checkbox":
          return (
            <van-field name={item.prop} label={item.label} label-align="top">
              {{
                input: () => (
                  <van-checkbox-group
                    v-model={props.modelValue[item.prop]}
                    shape="square"
                    class="mobile-radio-group"
                  >
                    {item.options.map((option) => (
                      <van-checkbox key={option.value} name={option.value}>
                        {option.label}
                      </van-checkbox>
                    ))}
                  </van-checkbox-group>
                ),
              }}
            </van-field>
          );
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
        case "dateTimePickerRange":
          return (
            <el-date-picker
              v-model={props.modelValue[item.prop]}
              type="datetimerange"
              rangeSeparator={item.rangeSeparator || "To"}
              start-placeholder={item.startPlaceholder || "Start time"}
              endPlaceholder={item.endPlaceholder || "End time"}
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          );
        case "switch":
          return (
            <van-field name={item.prop} label={item.label}>
              {{
                input: () => (
                  <van-switch
                    v-model={props.modelValue[item.prop]}
                    size="20px"
                  />
                ),
              }}
            </van-field>
          );

        default:
          return <div>-</div>;
      }
    };
    return () => renderForm(props.formConfig);
  },
});
</script>
<style scoped>
.mobile-radio-group {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(80px, 30%, 200px), 1fr));
  gap: 10px;
}
</style>
