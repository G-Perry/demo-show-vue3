<script lang="tsx">
const isMobile =
  /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
import { defineComponent, ref, computed, onMounted } from "vue";
import PcForm from "./PcForm.vue";
import MobileForm from "./MobileForm.vue";
import DetailForm from "./DetailForm.vue";

export default defineComponent({
  name: "ShForm",
  props: {
    formConfig: {
      type: Array,
      default: () => [],
    },
    scene: {
      type: String,
      default: "edit", //create edit detail
    },
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { expose }) {
    // console.log(props.modelValue, 1111);
    const formRef = ref();
    // onMounted(() => {
    //   // console.log("aaa", formRef.value);
    //   console.log(props.modelValue, 1111);
    // });
    const resetFields = () => {
      return formRef.value?.resetFields();
    };
    const validate = () => {
      return formRef.value?.validate();
    };
    expose({ resetFields, validate });
    return () => {
      if (props.scene === "detail") {
        return <DetailForm />;
      }
      return isMobile ? (
        <MobileForm
          ref={formRef}
          formConfig={props.formConfig}
          v-model={props.modelValue}
        />
      ) : (
        <PcForm
          ref={formRef}
          formConfig={props.formConfig}
          v-model={props.modelValue}
        />
      );
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
