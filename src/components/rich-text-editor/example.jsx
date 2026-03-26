import { defineComponent, ref } from 'vue';
import RichTextEditor from './index.jsx';

export default defineComponent({
  name: 'RichTextEditorExample',
  setup() {
    const content = ref('<p>欢迎使用基于Quill的富文本编辑器！</p><p>你可以：</p><ul><li><strong>加粗文本</strong></li><li><em>斜体文本</em></li><li><u>下划线文本</u></li><li>创建列表</li><li>插入链接和图片</li></ul><p>开始编辑吧！</p>');
    const readonly = ref(false);
    const disabled = ref(false);

    const handleChange = (newContent) => {
      console.log('内容变化:', newContent);
    };

    const handleFocus = (range) => {
      console.log('编辑器聚焦:', range);
    };

    const handleBlur = () => {
      console.log('编辑器失焦');
    };

    const handleReady = (quill) => {
      console.log('编辑器初始化完成:', quill);
    };

    const toggleReadonly = () => {
      readonly.value = !readonly.value;
    };

    const toggleDisabled = () => {
      disabled.value = !disabled.value;
    };

    const clearContent = () => {
      content.value = '';
    };

    const getContent = () => {
      console.log('当前内容:', content.value);
      alert(content.value);
    };

    return () => (
      <div style="padding: 20px;">
        <h2>富文本编辑器示例</h2>

        <div style="margin-bottom: 16px;">
          <button
            onClick={toggleReadonly}
            style="margin-right: 8px; padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;"
          >
            {readonly.value ? '取消只读' : '设为只读'}
          </button>
          <button
            onClick={toggleDisabled}
            style="margin-right: 8px; padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;"
          >
            {disabled.value ? '启用编辑' : '禁用编辑'}
          </button>
          <button
            onClick={clearContent}
            style="margin-right: 8px; padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;"
          >
            清空内容
          </button>
          <button
            onClick={getContent}
            style="padding: 8px 16px; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;"
          >
            获取内容
          </button>
        </div>

        <RichTextEditor
          v-model={content.value}
          placeholder="请输入内容..."
          readonly={readonly.value}
          disabled={disabled.value}
          height="400px"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onReady={handleReady}
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['fullscreen'],
              ['clean']
            ]
          }}
        />

        <div style="margin-top: 20px;">
          <h3>当前内容：</h3>
          <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; white-space: pre-wrap; max-height: 200px; overflow-y: auto;">
            {content.value || '暂无内容'}
          </pre>
        </div>
      </div>
    );
  }
});