import { defineComponent, ref, watch, nextTick } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import "./style.less";

export default defineComponent({
  name: "TagInputEditor",
  props: {
    tagList: { type: Array, required: true },
    tagColor: { type: String, default: "#117F92" },
    allowRepeat: { type: Boolean, default: false },
    maxLength: { type: Number, default: 5000 },
    modelValue: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const insertedTags = ref(new Set());
    const editableRef = ref(null);
    const lastRange = ref(null);
    // 初始化内容
    watch(() => props.modelValue, (val) => {
      if (editableRef.value && val !== getCurrentText()) {
        parseAndSetContent(val || "");
      }
    }, { immediate: true });

    // 解析模板内容并设置到编辑器中，同时标记已存在的标签
    const parseAndSetContent = (template) => {
      if (!editableRef.value) return;
      const editor = editableRef.value;
      editor.innerHTML = '';
      const tagRegex = /\{[^}]+\}/g;
      let lastIndex = 0;
      let match;
      insertedTags.value.clear();
      while ((match = tagRegex.exec(template)) !== null) {
        if (match.index > lastIndex) {
          const textNode = document.createTextNode(template.slice(lastIndex, match.index));
          editor.appendChild(textNode);
        }
        const tagText = match[0];
        const span = createTagElement(tagText);
        editor.appendChild(span);
        insertedTags.value.add(tagText);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < template.length) {
        const textNode = document.createTextNode(template.slice(lastIndex));
        editor.appendChild(textNode);
      }
    };

    // 创建标签元素
    const createTagElement = (tagText) => {
      const span = document.createElement('span');
      span.className = 'prompt-tag';
      span.textContent = tagText;
      span.contentEditable = false;
      span.style.color = props.tagColor;
      span.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        insertedTags.value.delete(tagText);
        span.remove();
        updateFormDetail();
      });
      return span;
    };

    // 插入标签
    const handlePromptClick = (item) => {
      if (!props.allowRepeat && insertedTags.value.has(item.name)) {
        MessagePlugin.warning('该标签已添加');
        return;
      }
      const editor = editableRef.value;
      if (!editor) return;
      const span = createTagElement(item.name);
      insertedTags.value.add(item.name);
      editor.focus();
      setTimeout(() => {
        try {
          let range;
          if (restoreSelection()) {
            const selection = window.getSelection();
            range = selection.getRangeAt(0);
          } else {
            range = document.createRange();
            range.selectNodeContents(editor);
            range.collapse(false);
          }
          range.insertNode(span);
          range.setStartAfter(span);
          range.collapse(true);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (error) {
          editor.appendChild(span);
          const range = document.createRange();
          range.setStartAfter(span);
          range.collapse(true);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
        updateFormDetail();
      }, 50);
    };

    // 获取当前纯文本内容
    const getCurrentText = () => {
      return editableRef.value ? editableRef.value.innerText || '' : '';
    };
    // 更新内容并 emit
    const updateFormDetail = () => {
      if (editableRef.value) {
        const text = editableRef.value.innerText || '';
        emit('update:modelValue', text);
        if (!text) insertedTags.value.clear();
      }
    };
    // 输入事件
    const handleInput = (e) => {
      const text = e.currentTarget.innerText;
      if (text.length > props.maxLength) {
        e.currentTarget.innerText = text.slice(0, props.maxLength);
        MessagePlugin.warning(`最多只能输入${props.maxLength}字`);
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(e.currentTarget);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        updateFormDetail();
        syncInsertedTags();
      }
    };
    // 同步标签
    const syncInsertedTags = () => {
      if (!editableRef.value) return;
      const tags = editableRef.value.querySelectorAll('.prompt-tag');
      const newSet = new Set();
      tags.forEach(tag => {
        newSet.add(tag.textContent);
      });
      insertedTags.value = newSet;
    };
    // 保存光标
    const saveSelection = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (editableRef.value && editableRef.value.contains(range.commonAncestorContainer)) {
          lastRange.value = range.cloneRange();
        }
      }
    };
    // 恢复光标
    const restoreSelection = () => {
      if (lastRange.value) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(lastRange.value);
        return true;
      }
      return false;
    };
    // 判断标签是否已插入
    const isTagInserted = (tagName) => {
      return insertedTags.value.has(tagName);
    };

    // 渲染
    return () => (
      <div>
        <div class="flex w-full gap-8 justify-end mb-10">
          {props.tagList.map((item) => {
            const inserted = isTagInserted(item.name);
            return (
              <a
                class="t-link"
                style={inserted && !props.allowRepeat ? { color: '#999', cursor: 'not-allowed' } : { color: props.tagColor, cursor: 'pointer' }}
                onClick={() => handlePromptClick(item)}
                disabled={inserted && !props.allowRepeat}
              >
                {item.name}
              </a>
            );
          })}
        </div>
        <div class="relative w-full">
          <div
            ref={editableRef}
            contentEditable={true}
            class="w-full rounded-10 p-12 !h-400 overflow-y-auto text-14 leading-6 outline-none bg-[#F6F6F9]"
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
            placeholder="请输入提示词详情..."
            onInput={handleInput}
            onKeyup={saveSelection}
            onClick={saveSelection}
            onMouseup={saveSelection}
            onPaste={e => {
              e.preventDefault();
              const text = (e.clipboardData || window.clipboardData).getData('text');
              const currentText = e.currentTarget.innerText;
              let insertText = text;
              if ((currentText.length + text.length) > props.maxLength) {
                insertText = text.slice(0, props.maxLength - currentText.length);
                MessagePlugin.warning(`最多只能输入${props.maxLength}字`);
              }
              document.execCommand('insertText', false, insertText);
              saveSelection();
              syncInsertedTags();
            }}
          >
          </div>
        </div>
      </div>
    );
  }
}); 