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
    onMounted(() => {
      // console.log("aaa", formRef.value);
      console.log(props.modelValue, 1111);
    });
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
      {
        /* ref={formRef} */
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
