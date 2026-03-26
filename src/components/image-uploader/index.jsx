import "./index.less";
import { defineComponent, ref, computed } from "vue";
import { useControlled } from "@/hooks";
import { Upload } from "tdesign-vue-next";
// import { IconImage, IconEdit, IconLoading } from "tdesign-icons-vue-next";
import utils from "@/libs/utils";
import authorization from "@/libs/authorization";

export default defineComponent({
  props: {
    defaultValue: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      default: ""
    },
    accept: {
      type: String,
      default: "image/png, image/gif, image/jpeg, application/pdf"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "点击上传"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, context) {
    // 是否为受控模式
    const isControlled = useControlled("modelValue");

    // 值（defaultValue 非受控模式，value 受控模式）
    const defaultValue = ref(props.defaultValue);
    const files = computed(() => {
      const url = isControlled.value ? props.modelValue : defaultValue.value;

      if (!url) {
        return [];
      }

      return [
        { name: "unknow", url: url }
      ];
    });

    // 
    const onBeforeUpload = file => {
      const isValid = ["image/png", "image/jpeg", "application/pdf"].indexOf(file.type) > -1;

      if (!isValid) {
        utils.showWarningMessage("仅支持上传PNG,JPG,JPEG,PDF格式的文件");
      }

      const isLessThanTenM = file.size / 1024 / 1024 < 10;

      if (!isLessThanTenM) {
        utils.showWarningMessage("文件大小不允许超过10MB");
      }

      return isValid && isLessThanTenM;
    };

    // 
    const onFormatResponse = (response = {}) => {
      if (!response.url) {
        response.status = "fail";
        response.error = "上传失败";
      }

      return response;
    };

    // 
    const handleChange = value => {
      let newValue = "";

      if (value && value.length > 0) {
        const file = value[0];

        if (file.response && file.response.url) {
          newValue = file.response.url;
        }
      }

      if (!isControlled.value) {
        defaultValue.value = newValue;
      }

      context.emit("update:modelValue", newValue);
      context.emit("change", newValue);
    };

    // Render
    return () => {
      return (
        <Upload
          class="image-uploader"
          theme="image"
          files={files.value}
          locale={{ triggerUploadText: { image: props.placeholder } }}
          accept={props.accept}
          sizeLimit={{ size: 10, unit: "MB" }}
          action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
          autoUpload={true}
          showImageFileName={false}
          beforeUpload={onBeforeUpload}
          formatResponse={onFormatResponse}
          disabled={props.disabled}
          onChange={handleChange}
        />
      );
    };
  }
});