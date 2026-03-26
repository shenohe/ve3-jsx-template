import { defineComponent, ref } from "vue";
import { Dialog, Upload, Link } from "tdesign-vue-next";
import { useRequest } from "vue-request";
import dayjs from "dayjs";
import { MessagePlugin } from "tdesign-vue-next";
import { downloadBlobFile, showWarningMessage } from "@/libs/utils";

export default defineComponent({
  props: {
    getTemplate: {
      type: Function,
      default: () => {}
    },
    groupId: {
      type: String,
      default: ''
    },
    pageType: {
      type: String,
      default: ''
    },
    importFunction: {
      type: Function,
      default: () => {}
    }
  }, 
  emits: ['success'],
  setup(props, context) {
    const files = ref([]);
    const visible = ref(false);
    const open = () => {
      files.value = [];
      visible.value = true;
    }
    const handleClose = () => {
      visible.value = false;
    } 
    const handleConfirm = () => {
      console.log(files.value, 'files.value');
      const formData = new FormData();
      formData.append('file', files.value[0].raw);
      importFunction(formData, props.groupId)
    }
    const { run: importFunction, loading: confirmLoading } = useRequest(props.importFunction, {
      manual: true,
      onSuccess: (res) => {
        MessagePlugin.success('导入成功');
        files.value = [];
        context.emit('success');
        handleClose();
        console.log(res, 'res');
      }
    })
    const { run: getTemplate, loading: getTemplateLoading } = useRequest(props.getTemplate, {
      manual: true,
      onSuccess: (res) => {
        console.log(res, 'res');
        downloadBlobFile(res.data, `${dayjs().format('YYYY-MM-DDHH:mm:ss')}_${props.pageType}_上传模版.xlsx`);
      }
    })
    const onBeforeUpload = file => {
      const name = file.name || "";
      const ext = name.substring(name.lastIndexOf(".")).toLowerCase();
      const acceptExts = [".xlsx", ".xls"];
      const acceptTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel"
      ];
      if (
        (!acceptTypes.includes(file.type)) &&
        (!acceptExts.includes(ext))
      ) {
        showWarningMessage("仅支持上传.xlsx、.xls格式的文件");
        return false;
      }
      const isLessThanSizeLimit = file.size / 1024 / 1024 < 10;

      if (!isLessThanSizeLimit) {
        showWarningMessage(`文件大小不允许超过10MB`);
        return false;
      }

      return true;
    };
    // 
    const handleChange = value => {
      console.log(value, 'value');
      files.value = value.map(item => {
        return {
          name: item.name,
          url: URL.createObjectURL(item.raw),
          raw: item.raw,
          size: item.size,
        }
      })
    };
    const handleDownloadTemplate = () => { 
      getTemplate();
    }
    context.expose({
      open
    })
    return () => {
      return (
        <Dialog
          header="批量新增"
          visible={visible.value}
          width="480px"
          confirmBtn={{
            content: "提交",
            theme: "primary",
            disabled: !files.value.length,
            loading: confirmLoading.value
          }}
          cancelBtn={{
            variant: 'outline'
          }}
          onClose={() => handleClose()}
          onConfirm={() => handleConfirm()}
        >
          <div>
            <div class="flex items-center">
              <div class="w-24">1.</div>
              <Link theme="primary" hover="color" disabled={getTemplateLoading.value} onClick={handleDownloadTemplate}>点击下载模板</Link>，填入内容
            </div>
            <div class="flex mt-16 items-center">
              <div class="w-24">2.</div>
              <div>
              <Upload
                files={files.value}
                action=""
                accept=".xlsx,.xls"
                sizeLimit={{ size: 10, unit: 'MB' }}
                autoUpload={false}
                beforeUpload={onBeforeUpload}
                multiple={false}
                onChange={handleChange}
                abridgeName={[10,7]}
                max={1}
                v-slots={{
                  // default: () => {
                  //   return <Link theme="primary" hover="color">上传文件</Link>;
                  // }
                }}
              />
              </div>
            </div>
          </div>
        </Dialog>
      );
    };
  }
}); 