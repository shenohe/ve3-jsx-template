import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './style.less';

export default defineComponent({
  name: 'RichTextEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容...'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: '300px'
    },
    minHeight: {
      type: [String, Number],
      default: '200px'
    },
    maxHeight: {
      type: [String, Number],
      default: '600px'
    },
    theme: {
      type: String,
      default: 'snow'
    },
    modules: {
      type: Object,
      default: () => ({
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
      })
    }
  },
  emits: ['update:modelValue', 'change', 'ready', 'focus', 'blur'],
  setup(props, { emit }) {
    const editorRef = ref(null);
    const quillEditor = ref(null);
    const content = ref(props.modelValue || '');
    const isFullscreen = ref(false);

    // 监听外部值变化
    watch(() => props.modelValue, (newVal) => {
      if (newVal !== content.value && quillEditor.value) {
        content.value = newVal || '';
        const delta = quillEditor.value.clipboard.convert(newVal || '');
        quillEditor.value.setContents(delta, 'api');
      }
    });

    // 监听只读状态变化
    watch(() => props.readonly, (newVal) => {
      if (quillEditor.value) {
        quillEditor.value.enable(!newVal && !props.disabled);
      }
    });

    // 监听禁用状态变化
    watch(() => props.disabled, (newVal) => {
      if (quillEditor.value) {
        quillEditor.value.enable(!newVal && !props.readonly);
      }
    });

    // 计算编辑器样式
    const editorStyle = computed(() => {
      const style = {};
      if (props.height) {
        style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
      }
      if (props.minHeight) {
        style.minHeight = typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight;
      }
      if (props.maxHeight) {
        style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight;
      }
      return style;
    });

    // 计算工具栏配置
    const toolbarOptions = computed(() => {
      if (props.disabled || props.readonly) {
        return false;
      }
      return props.modules.toolbar;
    });

    // 添加全屏按钮到工具栏
    const addFullscreenButton = () => {
      if (!quillEditor.value || props.disabled || props.readonly) return;

      const toolbar = quillEditor.value.getModule('toolbar');
      if (!toolbar) return;

      // 查找fullscreen按钮位置并替换
      const fullscreenButton = toolbar.container.querySelector('.ql-fullscreen');
      if (fullscreenButton) {
        // 设置按钮图标
        updateFullscreenButtonIcon();

        // 移除默认的点击事件并添加自定义事件
        fullscreenButton.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFullscreen();
        };
      }
    };

    // 初始化Quill编辑器
    const initQuillEditor = () => {
      if (!editorRef.value) return;

      const quillConfig = {
        theme: props.theme,
        placeholder: props.placeholder,
        readOnly: props.readonly || props.disabled,
        modules: {
          ...props.modules,
          toolbar: toolbarOptions.value
        }
      };

      // 创建Quill实例
      quillEditor.value = new Quill(editorRef.value, quillConfig);

      // 设置初始内容
      if (props.modelValue) {
        const delta = quillEditor.value.clipboard.convert(props.modelValue);
        quillEditor.value.setContents(delta, 'api');
      }

      // 绑定事件
      quillEditor.value.on('text-change', handleTextChange);
      quillEditor.value.on('selection-change', handleSelectionChange);

      // 添加全屏按钮
      nextTick(() => {
        setTimeout(() => {
          addFullscreenButton();
        }, 100);
      });

      // 发出ready事件
      nextTick(() => {
        emit('ready', quillEditor.value);
      });
    };

    // 处理文本变化
    const handleTextChange = () => {
      if (!quillEditor.value) return;

      const html = quillEditor.value.root.innerHTML;
      const text = quillEditor.value.getText();

      // 过滤掉空的p标签
      const cleanHtml = html.replace(/<p><br><\/p>/g, '').replace(/^<p><\/p>$/, '');

      content.value = cleanHtml;

      // 发出变化事件
      emit('update:modelValue', cleanHtml);
      emit('change', cleanHtml);
    };

    // 处理选择变化
    const handleSelectionChange = (range) => {
      if (!quillEditor.value) return;

      if (range) {
        emit('focus', range);
      } else {
        emit('blur');
      }
    };

    // 获取纯文本内容
    const getText = () => {
      return quillEditor.value ? quillEditor.value.getText() : '';
    };

    // 获取HTML内容
    const getHTML = () => {
      return quillEditor.value ? quillEditor.value.root.innerHTML : '';
    };

    // 设置内容
    const setContent = (content) => {
      if (quillEditor.value && content) {
        const delta = quillEditor.value.clipboard.convert(content);
        quillEditor.value.setContents(delta, 'api');
      }
    };

    // 插入文本
    const insertText = (text, formats = {}) => {
      if (quillEditor.value) {
        const range = quillEditor.value.getSelection();
        quillEditor.value.insertText(range?.index || 0, text, formats, 'api');
      }
    };

    // 清空内容
    const clear = () => {
      if (quillEditor.value) {
        quillEditor.value.setText('', 'api');
      }
    };

    // 聚焦编辑器
    const focus = () => {
      if (quillEditor.value) {
        quillEditor.value.focus();
      }
    };

    // 失焦编辑器
    const blur = () => {
      if (quillEditor.value) {
        quillEditor.value.blur();
      }
    };

    // 启用/禁用编辑器
    const enable = (enabled = true) => {
      if (quillEditor.value) {
        quillEditor.value.enable(enabled);
      }
    };

    // 切换全屏
    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value;

      if (isFullscreen.value) {
        // 进入全屏
        document.body.style.overflow = 'hidden';
      } else {
        // 退出全屏
        document.body.style.overflow = '';
      }

      // 更新按钮图标
      nextTick(() => {
        updateFullscreenButtonIcon();
      });
    };

    // 更新全屏按钮图标
    const updateFullscreenButtonIcon = () => {
      if (!quillEditor.value) return;

      const toolbar = quillEditor.value.getModule('toolbar');
      if (!toolbar) return;

      const fullscreenButton = toolbar.container.querySelector('.ql-fullscreen');
      if (fullscreenButton) {
        const isFullscreenMode = isFullscreen.value;
        fullscreenButton.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" style="fill: currentColor;">
            <path d="${isFullscreenMode
              ? 'M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z'
              : 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z'}"/>
          </svg>
        `;
        fullscreenButton.title = isFullscreenMode ? '退出全屏' : '全屏编辑';
      }
    };

    // 退出全屏（ESC键）
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isFullscreen.value) {
        toggleFullscreen();
      }
    };

    // 组件挂载后初始化
    onMounted(() => {
      nextTick(() => {
        initQuillEditor();
        // 添加ESC键监听
        document.addEventListener('keydown', handleEscapeKey);
      });
    });

    // 组件卸载前清理
    onBeforeUnmount(() => {
      if (quillEditor.value) {
        quillEditor.value.off('text-change', handleTextChange);
        quillEditor.value.off('selection-change', handleSelectionChange);
        quillEditor.value = null;
      }
      // 移除ESC键监听
      document.removeEventListener('keydown', handleEscapeKey);
      // 恢复body样式
      if (isFullscreen.value) {
        document.body.style.overflow = '';
      }
    });

    return {
      editorRef,
      quillEditor,
      content,
      editorStyle,
      isFullscreen,
      getText,
      getHTML,
      setContent,
      insertText,
      clear,
      focus,
      blur,
      enable,
      toggleFullscreen
    };
  },
  render() {
    return (
      <div class={[
        'rich-text-editor',
        {
          'readonly': this.readonly,
          'disabled': this.disabled,
          'fullscreen': this.isFullscreen
        }
      ]}>
        <div
          ref="editorRef"
          class="quill-editor"
          style={this.isFullscreen ? {} : this.editorStyle}
        />
      </div>
    );
  }
});