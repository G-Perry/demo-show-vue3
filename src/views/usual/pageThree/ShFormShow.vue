<script lang="tsx">
import { defineComponent, ref, computed, onMounted } from "vue";
import Design from "./Design.vue";
// import MobileForm from "./MobileForm.vue";
import DetailForm from "./DetailForm.vue";
import PcForm from "./PcForm.vue";

export default defineComponent({
  name: "ShForm",
  props: {
    formConfig: {
      type: Array,
      default: () => [],
    },
    scene: {
      type: String,
      default: "design", //create edit detail
    },
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  
  setup(props, { emit, expose }) {
    const formRef = ref();
    const resetFields = () => {
      return formRef.value?.resetFields();
    };
    const validate = () => {
      return formRef.value?.validate();
    };
    expose({ resetFields, validate });
    return () => {
      if (props.scene === "details") {
        return <DetailForm />;
      }
      if (props.scene === "mobile") {
        return (
          // <iframe>
          //   <MobileForm
          //     ref={formRef}
          //     formConfig={props.formConfig}
          //     v-model={props.modelValue}
          //   />
          // </iframe>
            // src="http://localhost:9091/mobile/form/preview"
          <iframe
            src={window.location.origin  + "/mobile/form/preview"}
            title="示例网站"
            style="width:100%;height:100%;border:none;box-sizing:border-box;"
          ></iframe>
        );
      }
      if (props.scene === "design") {
        return (
          <Design
            ref={formRef}
            formConfig={props.formConfig}
            v-model={props.modelValue}
            on-update-form-config={(val) => emit("update-form-config", val)}
            on-form-item-select={(item, index) =>
              emit("form-item-select", item, index)
            }
          />
        );
      }
      if (props.scene === "pc") {
        return (
          <PcForm
            ref={formRef}
            formConfig={props.formConfig}
            v-model={props.modelValue}
          />
        );
      }
    };
  },
});
</script>
<style lang="scss">
.classify_title {
  padding-left: 5px;
  font-size: 15px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  position: relative;
  display: block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;

  &::after {
    content: "";
    position: absolute;
    left: 10px;
    top: calc(100% + 6px);
    width: calc(100% - 10px);
    height: 5px;
    background-color: #ccf1eb;
    // background-color: #79bcff93;
    border-radius: 5px;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
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
