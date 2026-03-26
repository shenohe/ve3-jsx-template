import { Dialog, Form, FormItem, Input,  Radio, RadioGroup } from "tdesign-vue-next";
import { defineComponent, ref } from "vue";
import { useRequest } from 'vue-request';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "新建分组"
    },
    type: {
      type: String,
      default: "material"
    },
    saveGroup: {
      type: Function,
      default: () => {}
    },
    tabValue: {
      type: String,
      default: "image"
    }
  },
  emits: ['success'],
  setup(props, context) {
    const visible = ref(false);
    const open = () => {
      formData.value = {
        name: "",
        type: ""
      };
      visible.value = true;
      setTimeout(() => {
        formRef.value?.clearValidate();
      });
    }
    const { run: saveGroup, loading: confirmLoading } = useRequest(props.saveGroup, {
      manual: true,
      onSuccess: () => {
        handleClose();
        context.emit('success');
      }
    });
    const formRef = ref(null);
    const formData = ref({
      name: "",
      type: ""
    });
    const rules = ref({
      name: [{ required: true, message: "请输入分组名称" }],
      type: [{ required: true, message: "请选择类型" }]
    });
    const handleClose = () => {
      visible.value = false;
    }
    const handleSubmit = ({ validateResult, firstError }) => {
      console.log(validateResult, firstError);
      if (validateResult === true) {
        const params = {
          ...formData.value,
        }
        if (props.type === "material") {
          params.type = props.tabValue;
        }
        saveGroup(params);
      }
    }
    const handleConfirm = () => {
      formRef.value?.submit();
    }
    context.expose({
      open
    })
    return () => {
      return (
        <Dialog
          header={props.title}
          visible={visible.value}
          width="480px"
          confirmBtn="保存"
          confirmLoading={confirmLoading.value}
          onClose={() => handleClose()}
          onConfirm={() => handleConfirm()}
          cancelBtn={{
            variant: 'outline'
          }}
        >
          <Form 
            data={formData.value}
            ref={formRef}
            rules={rules}
            onSubmit={handleSubmit}
            
          >
            <FormItem label="名称" name="name" requiredMark={false} labelWidth="40px">
              <Input v-model={formData.value.name} class="border-none !h-40 bg-theme-input radius-10" maxlength={10}/>
            </FormItem>
            {/* {
              props.type === "material" && (
                <FormItem label="类型" name="type">
                  <RadioGroup v-model={formData.value.type}>
                    <Radio value="image">图片</Radio>
                    <Radio value="video">视频</Radio>
                  </RadioGroup>
                </FormItem>
              )
            } */}
          </Form>
        </Dialog>
      )
    }
  }
})