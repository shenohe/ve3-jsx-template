import "./index.less";
import { defineComponent, ref, computed } from "vue";
import { useControlled } from "@/hooks";
import { Upload } from "tdesign-vue-next";
import utils from "@/libs/utils";
import { uploadHandle } from "@/libs/utils";

const getFileNameByUrl = fileUrl => {
  try {
    const url = new URL(fileUrl);
    const path = url.pathname;
    const fileName = path.substring(path.lastIndexOf("/") + 1);

    return fileName;
  }
  catch(e) {
    return "unkonw";
  }
};

export default defineComponent({
  props: {
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    accept: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    sizeLimit: {
      type: Number,
      default: 10
    },
    sizeLimitUnit: {
      type: String,
      default: "MB"
    },
    fileSuccessBack: {
      type: Function,
      default: () => {}
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'file'
    }
  },
  emits: ["update:modelValue", "change", "success", "waitingUploadFilesChange"],
  setup(props, { slots, emit, expose }) {
    const waitingUploadFiles = ref([]);
    // 是否为受控模式
    const isControlled = useControlled("modelValue");
    const uploadRef = ref(null);
    // 值（defaultValue 非受控模式，value 受控模式）
    const defaultValue = ref(props.defaultValue);
    const files = computed(() => {
      const urls = isControlled.value ? props.modelValue : defaultValue.value;
      if (!urls || urls.length == 0) {
        return [];
      }
      return urls.map(url => {
        return {
          name: getFileNameByUrl(url),
          url
        };
      });
    });
    // 
    const onBeforeUpload = file => {
      if (props.accept) {
        const acceptTypes = props.accept.split(",").map(type => type.trim());
        const isAccepted = acceptTypes.some(type => {
          if (type.endsWith("/*")) {
            // 通配符类型，如 image/*
            return file.type.startsWith(type.slice(0, -1));
          }
          return file.type === type;
        });
        if (!isAccepted) {
          utils.showWarningMessage(`仅支持上传${acceptTypes.join("、")}格式的文件`);
          return false;
        }
      }
      const isLessThanSizeLimit = file.size / 1024 / 1024 < props.sizeLimit;

      if (!isLessThanSizeLimit) {
        utils.showWarningMessage(`文件大小不允许超过${props.sizeLimit}MB`);
        return false;
      }

      return true;
    };

    // 
    const onFormatResponse = (response = {}) => {
     // 获取上传结果 - 检查两种可能的数据结构
     const results = response?.response?.results || response?.results || [];
     // 如果是多文件上传（有多个结果）
     if (results.length > 1) {
        const successFiles = results.filter(item => item.status === 'success').map(item => ({
          name: item.originalName,
          url: item.url
        }));
        
        // 根据 TDesign 文档，多文件上传时应该返回 files 数组
        return {
          status: 'success',
          files: successFiles  // 直接返回 files，不需要包装在 response 中
        };
     } else if (results.length === 1) {
        // 单文件上传
        const info = results[0];
        
        if (info.status === 'success') {
          return {
            status: 'success',
            url: info.url,
            name: info.originalName
          };
        } else {
          return {
            status: 'fail',
            error: info.error || '上传失败'
          };
        }
     } else {
        // 没有结果数据，可能是其他格式
        return {
          status: 'fail',
          error: '上传失败，未获取到文件信息'
        };
      }
    };

    // 
    const handleChange = value => {
      let newValue = [];

      if (value && value.length > 0) {
        // 使用 Set 来去重，避免多文件上传时的重复
        const urlSet = new Set();
        
        value.forEach(target => {
          // 如果是新上传的文件（有 raw 属性）
          if (target.raw) {
            // 检查是否有多文件上传的 files 数组（直接在 response 根级别）
            if (target.response?.files && Array.isArray(target.response.files)) {
              // 多文件上传，只在第一个文件项中处理所有文件URL
              // 通过检查是否已经处理过这批文件来避免重复
              const fileUrls = target.response.files.map(file => file.url);
              if (fileUrls.length > 0 && !fileUrls.some(url => urlSet.has(url))) {
                fileUrls.forEach(url => urlSet.add(url));
              }
            }
            // 单文件上传，直接返回 URL
            else {
              const url = target.response?.url || target.response?.data;
              if (url) urlSet.add(url);
            }
          }
          // 如果是已存在的文件（直接返回 URL）
          else if (target.url) {
            urlSet.add(target.url);
          }
        });
        
        newValue = Array.from(urlSet);
      }
      
      // 获取当前值用于比较
      const currentValue = isControlled.value ? props.modelValue : defaultValue.value;
      // 只有当新值与当前值不同时才触发更新
      if (JSON.stringify(newValue) !== JSON.stringify(currentValue)) {
        if (!isControlled.value) {
          defaultValue.value = newValue;
        }
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    };

    const requestMethod = (files) => {
      let uploadFiles = files;
      if (!props.autoUpload && waitingUploadFiles.value.length > 0) {
        uploadFiles = [...waitingUploadFiles.value];
        waitingUploadFiles.value = [];
      }
      return uploadHandle(uploadFiles, {
        onSuccess: props.fileSuccessBack
      });
    }
    
    const uploadFiles = (files) => {
      if (files.length > 0) {
        waitingUploadFiles.value = files;
      }
      uploadRef.value?.uploadFiles();
    }
    
    const onWaitingUploadFilesChange = (context) => {
      console.log('context', context);
      emit('waitingUploadFilesChange', context.files);
    }
    
    const onSuccess = (context) => {
      emit('success', context);
    }
    
    expose({
      uploadFiles
    })
    
    // Render
    return () => {
      return (
        <Upload
          ref={uploadRef}
          theme={props.theme}
          // defaultFiles={defaultFiles.value} // 使用 defaultFiles 而不是 files
          files={files.value}
          accept={props.accept}
          sizeLimit={{ size: props.sizeLimit, unit: props.sizeLimitUnit }}
          max={props.max}
          requestMethod={requestMethod}
          autoUpload={props.autoUpload}
          beforeUpload={onBeforeUpload}
          formatResponse={onFormatResponse}
          multiple={props.multiple}
          disabled={props.disabled}
          onChange={handleChange}
          uploadAllFilesInOneRequest
          abridgeName={[10,7]}
          onSuccess={onSuccess}
          onWaitingUploadFilesChange={onWaitingUploadFilesChange}
          v-slots={{
            default: slots.default,
            fileListDisplay: slots.fileListDisplay,
            tips: slots.tips
          }}
        />
      );
    };
  }
});