import { defineComponent, ref } from "vue";
import { Dialog, Button, Textarea, Link } from "tdesign-vue-next";
import FileUploader from "@/components/attachment-uploader";
import { useImageLoader } from "@/hooks";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '感谢您的反馈'
    },
    needUpload: {
      type: Boolean,
      default: true
    },
    showTypeList: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const visible = ref(false);
    const loadImage = useImageLoader();
    const textareaValue = ref('');
    const typeList = [
      {
        name: '有害/不安全',
        type: '1'
      },
      {
        name: '虚假信息',
        type: '2'
      },
      {
        name: '没有帮助',
        type: 'ot3her'
      },
      {
        name: '其他',
        type: '4'
      }
    ]
    const open = () => {
      visible.value = true;
    };
    const close = () => {
      visible.value = false;
    };
    const loading = ref(false);
    const confirm = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        close();
        context.emit('confirm');
      }, 1000);
    }
    context.expose({
      open
    });
    return () => {
      return <Dialog
        visible={visible.value}
        onClose={close}
        header={props.title}
        cancelBtn={null}
        confirmBtn={null}
        width="512px"
        v-slots={{
          footer: () => <div class="flex justify-end">
            <Button class="min-w-[44px] h-[28px] !transition-none rounded-[4px]" theme="default" variant="text" onClick={ close}>取消</Button>
            <Button class="min-w-[44px] h-[28px] !transition-none rounded-[4px]" theme="danger" disabled={!textareaValue.value} loading={loading.value} onClick={confirm}>提交</Button>
          </div>
        }}
      >
        <div>
          <div class="">
            <Textarea v-model={textareaValue.value} placeholder="请输入您的意见或建议" autosize={{ minRows: 7, maxRows: 7 }}/>
          </div>
          {
            props.needUpload ? (
              <div class="mt-[20px]">
                <FileUploader 
                  multiple={false}
                  accept="image/jpeg,image/png"
                  max={1}
                  sizeLimit={5}
                  sizeLimitUnit="MB"
                v-slots={{
                  default: () => <div class="flex items-center gap-[24px]">
                    <div class="flex items-center gap-[4px]">
                      <img src={loadImage("upload.png")} alt="" class="size-[16px]"/>
                      <Link theme="primary" hover="color" active="color" href="javascript:;">上传图片</Link>
                    </div>
                    <div onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('click');
                    }} class="text-[#666]">请上传1张，大小不超过5M的图片</div>
                  </div>
                }}/>
              </div>
            ) : (
              <></>
            )
          }
        </div>
      </Dialog>     
    };
  }
});