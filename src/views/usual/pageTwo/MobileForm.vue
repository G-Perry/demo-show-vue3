<script lang="jsx">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  unref,
  onMounted,
  onBeforeMount,
} from "vue";
import moSelect from "./mobileComponents/moSelect.vue";
import moTimeSelect from "./mobileComponents/moTimeSelect.vue";
import moTimeSelectRange from "./mobileComponents/moTimeSelectRange.vue";
import moDateSelect from "./mobileComponents/moDateSelect.vue";
import moDateSelectRange from "./mobileComponents/moDateSelectRange.vue";
import moDateTimeSelect from "./mobileComponents/moDateTimeSelect.vue";
import {deepClone} from "@/utils/index.js"
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
  setup(props, {  expose }) {
    const formRef = ref();
    let originalModelValue = ref(deepClone(props.modelValue));
    const resetFields = () => {
      for (let key in originalModelValue.value) {
        props.modelValue[key]= originalModelValue.value[key];
      }
      formRef.value?.resetValidation();
    };
    const validate = () => {
      return formRef.value?.validate();
    };
    expose({ resetFields, validate });
    const renderForm = (formConfig) => {
      return (
        <van-form ref={formRef}>
          <van-cell-group border={false}>
            {renderFormItem(formConfig)}
          </van-cell-group>
        </van-form>
      );
    };
    const itemIsShow = (item) => {
      if (item.show) {
        let show = item.show(props.modelValue);
        if (!show) {
          props.modelValue[item.prop] = undefined;
        }
        return show;
      } else {
        return true;
      }
    };

    const renderFormItem = (formConfig) => {
      return formConfig.map((item) => {
        if (itemIsShow(item)) {
          if (item.type === "classifyTitle") {
            return <span class="classify_title">{item.label}</span>;
          }
          return renderlabelAndInput(item);
        }
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
              rules={item.rules}
            />
          );
        case "textarea":
          return (
            <van-field
              v-model={props.modelValue[item.prop]}
              placeholder={item.placeholder}
              name={item.prop}
              label={item.label}
              rules={item.rules}
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
            <van-field
              name={item.prop}
              label={item.label}
              label-align="top"
              rules={item.rules}
            >
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
            <van-field
              name={item.prop}
              label={item.label}
              label-align="top"
              rules={item.rules}
            >
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
        case "timePicker":
          return (
            <moTimeSelect
              v-model={props.modelValue[item.prop]}
              selectItemConfig={item}
            ></moTimeSelect>
          );
        case "datePicker":
          return (
            <moDateSelect
              v-model={props.modelValue[item.prop]}
              selectItemConfig={item}
            ></moDateSelect>
          );
        case "dateTimePicker":
          return (
            <moDateTimeSelect
              v-model={props.modelValue[item.prop]}
              selectItemConfig={item}
            ></moDateTimeSelect>
          );
        case "timePickerRange":
          return (
            <moTimeSelectRange
              v-model={props.modelValue[item.prop]}
              selectItemConfig={item}
            ></moTimeSelectRange>
          );
        case "datePickerRange":
          return (
            <moDateSelectRange
              v-model={props.modelValue[item.prop]}
              selectItemConfig={item}
            ></moDateSelectRange>
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
::v-deep .van-field__label{
  width: auto;
  min-width: 70px;
}
</style>
