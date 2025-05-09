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
import moSelect from "@/views/usual/pageTwo/mobileComponents/moSelect.vue";
import moTimeSelect from "@/views/usual/pageTwo/mobileComponents/moTimeSelect.vue";
import moTimeSelectRange from "@/views/usual/pageTwo/mobileComponents/moTimeSelectRange.vue";
import moDateSelect from "@/views/usual/pageTwo/mobileComponents/moDateSelect.vue";
import moDateSelectRange from "@/views/usual/pageTwo/mobileComponents/moDateSelectRange.vue";
import moDateTimeSelect from "@/views/usual/pageTwo/mobileComponents/moDateTimeSelect.vue";
import moAreaSelect from "@/views/usual/pageTwo/mobileComponents/moAreaSelect.vue";
// import { deepClone } from "@/utils/index.js";

export default defineComponent({
  name: "MobileForm",
  setup() {
    const formConfig = computed(() =>
      JSON.parse(sessionStorage.getItem("formConfig"))
    );
    const modelValue = computed(() => {});

    const formRef = ref();
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
        let show = item.show(modelValue.value);
        if (!show) {
          modelValue.value[item.prop] = undefined;
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
          // v-model={modelValue.value[item.prop]}
          return (
            <van-field
              name={item.prop}
              label={item.label}
              placeholder={item.placeholder}
              rules={item.rules}
            />
          );
        case "textarea":
          // v-model={modelValue.value[item.prop]}
          return (
            <van-field
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
          // v-model={modelValue.value[item.prop]}
          return <moSelect selectItemConfig={item}></moSelect>;
        case "radio":
          // v-model={modelValue.value[item.prop]}
          return (
            <van-field
              name={item.prop}
              label={item.label}
              label-align="top"
              rules={item.rules}
            >
              {{
                input: () => (
                  <van-radio-group shape="dot" class="mobile-radio-group">
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
          // v-model={modelValue.value[item.prop]}
          return (
            <van-field
              name={item.prop}
              label={item.label}
              label-align="top"
              rules={item.rules}
            >
              {{
                input: () => (
                  <van-checkbox-group shape="square" class="mobile-radio-group">
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
          // v-model={modelValue.value[item.prop]}
          return <moTimeSelect selectItemConfig={item}></moTimeSelect>;
        case "datePicker":
          // v-model={modelValue.value[item.prop]}
          return <moDateSelect selectItemConfig={item}></moDateSelect>;
        case "dateTimePicker":
          // v-model={modelValue.value[item.prop]}
          return <moDateTimeSelect selectItemConfig={item}></moDateTimeSelect>;
        case "timePickerRange":
          // v-model={modelValue.value[item.prop]}
          return (
            <moTimeSelectRange selectItemConfig={item}></moTimeSelectRange>
          );
        case "datePickerRange":
          // v-model={modelValue.value[item.prop]}
          return (
            <moDateSelectRange selectItemConfig={item}></moDateSelectRange>
          );
        case "areaPicker":
          // v-model={modelValue.value[item.prop]}
          return <moAreaSelect selectItemConfig={item}></moAreaSelect>;
        case "switch":
          // v-model={modelValue.value[item.prop]}
          return (
            <van-field name={item.prop} label={item.label}>
              {{
                input: () => <van-switch size="20px" />,
              }}
            </van-field>
          );

        default:
          return <div>-</div>;
      }
    };
    return () => renderForm(formConfig.value);
  },
});
</script>
<style lang="scss">
#app {
  border-radius: 15px;
  border: 1px solid #ccc;
  background-color: #f7f8fa;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.mobile-radio-group {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(80px, 30%, 200px), 1fr));
  gap: 10px;
}
:deep(.van-field__label) {
  width: auto;
  min-width: 70px;
}
.classify_title {
  padding-left: 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  position: relative;
  display: block;
  width: 100%;
  // margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 10px;

  &::after {
    content: "";
    position: absolute;
    left: 20px;
    top: calc(100% + 6px);
    width: calc(100% - 40px);
    height: 5px;
    background-color: #ccf1eb;
    // background-color: #79bcff93;
    border-radius: 5px;
  }

  &::before {
    content: "";
    position: absolute;
    left: 12px;
    top: calc(100% + 3px);
    width: 8em;
    height: 8px;
    background-color: #00b899;
    // background-color: #409eff;
    border-radius: 0 10px 0 10px;
    z-index: 1;
  }
}
</style>
