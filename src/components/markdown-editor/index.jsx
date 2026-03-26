import { defineComponent, ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue';
import { MessagePlugin, Button } from 'tdesign-vue-next';
import CopyIcon from '@/images/svgs/copy.svg?component';
import './style.less';

export default defineComponent({
  name: 'MarkdownEditor',
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
    showLineNumbers: {
      type: Boolean,
      default: true
    },
    autoAddLineNumbers: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: [String, Number],
      default: '200px'
    },
    maxHeight: {
      type: [String, Number],
      default: '500px'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const editorRef = ref(null);
    const contentEditableRef = ref(null);
    const content = ref(props.modelValue || '');
    const isComposing = ref(false);

    // 高亮更新定时器
    let highlightTimer = null;

    // 监听外部值变化
    watch(() => props.modelValue, (newVal) => {
      if (newVal !== content.value) {
        content.value = newVal || '';
        updateContentEditable();
      }
    });

    // 计算行数组
    const lines = computed(() => {
      const text = content.value || '';
      // 如果内容为空，返回空数组，不显示行号
      if (!text) {
        return [];
      }
      return text.split('\n');
    });

    // 获取纯文本内容（修复换行重复问题）
    function getPlainText(element) {
      if (!element) return '';

      // 克隆节点以避免修改原始DOM
      const clone = element.cloneNode(true);
      
      console.log('🔍 getPlainText 开始处理:', {
        originalHTML: element.innerHTML,
        cloneHTML: clone.innerHTML
      });

      // 特殊处理：如果编辑器只有一个<br>标签且没有其他内容，说明是空编辑器状态
      if (clone.innerHTML === '<br>' || clone.innerHTML === '<br/>') {
        console.log('🔍 检测到空编辑器状态的<br>标签，返回空字符串');
        return '';
      }

      // 先处理br标签，将它们转换为换行符
      const brElements = clone.querySelectorAll('br');
      console.log('🔍 找到br标签数量:', brElements.length);
      
      for (let i = 0; i < brElements.length; i++) {
        const br = brElements[i];
        console.log('🔍 处理br标签:', i, br.outerHTML);
        br.parentNode.insertBefore(document.createTextNode('\n'), br);
        br.remove();
      }

      // 再处理div和p标签
      const divElements = clone.querySelectorAll('div, p');
      console.log('🔍 找到div/p标签数量:', divElements.length);
      
      for (let i = 0; i < divElements.length; i++) {
        const div = divElements[i];
        const tagName = div.tagName.toLowerCase();
        console.log('🔍 处理div/p标签:', i, tagName, div.outerHTML);
        
        // 检查div/p是否为空或只包含br（避免重复换行）
        const divContent = div.innerHTML.trim();
        const isEmptyOrBrOnly = !divContent || divContent === '<br>' || divContent === '<br/>';
        
        console.log('🔍 div内容分析:', {
          divContent,
          isEmptyOrBrOnly,
          textContent: JSON.stringify(div.textContent)
        });
        
        // 如果div不是第一个元素且不为空，在前面添加换行符
        const prevSibling = div.previousSibling;
        const needsNewlineBefore = prevSibling && 
          (prevSibling.nodeType === Node.TEXT_NODE || prevSibling.nodeType === Node.ELEMENT_NODE) &&
          !isEmptyOrBrOnly;
          
        if (needsNewlineBefore) {
          console.log('🔍 在div前添加换行符');
          div.parentNode.insertBefore(document.createTextNode('\n'), div);
        }
        
        // 将div的内容替换其本身
        while (div.firstChild) {
          div.parentNode.insertBefore(div.firstChild, div);
        }
        div.remove();
      }

      // 获取最终的纯文本内容
      let text = clone.textContent || clone.innerText || '';
      
      // 不清理用户主动输入的连续换行符，保持原样
      // text = text.replace(/\n{3,}/g, '\n\n'); // 移除此行，保留用户输入的所有换行
      
      console.log('🔍 getPlainText 最终结果:', {
        finalText: JSON.stringify(text),
        lineCount: text.split('\n').length
      });

      return text;
    }

    // Markdown语法高亮函数（彻底解决跨行匹配）
    function highlightMarkdown(text) {
      if (!text) return '';

      return text
        // 转义HTML字符
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // 标题 - 按行处理，彻底避免跨行匹配
        .split('\n')
        .map(line => {
          // 只处理当前行，绝对不涉及其他行
          const headerMatch = line.match(/^(#{1,6})(\s+)(.*)$/);
          if (headerMatch) {
            const [, markers, space, content] = headerMatch;
            return `<span class="md-header-marker">${markers}</span><span class="md-header-space">${space}</span><span class="md-header-text">${content}</span>`;
          }
          
          // 处理只有#标记的情况
          const headerOnlyMatch = line.match(/^(#{1,6})(\s*)$/);
          if (headerOnlyMatch) {
            const [, markers, space] = headerOnlyMatch;
            return `<span class="md-header-marker">${markers}</span>${space}`;
          }
          
          return line;
        })
        .join('\n')
        // 其他语法元素 - 严格限制在单行内
        .replace(/(\*\*)([^*\n\r]+?)(\*\*)/g, '<span class="md-bold-marker">$1</span><span class="md-bold-text">$2</span><span class="md-bold-marker">$3</span>')
        .replace(/(?<!\*)(\*)([^*\n\r]+?)(\*)(?!\*)/g, '<span class="md-italic-marker">$1</span><span class="md-italic-text">$2</span><span class="md-italic-marker">$3</span>')
        .replace(/(```)([\s\S]*?)(```)/g, '<span class="md-code-marker">$1</span><span class="md-code-content">$2</span><span class="md-code-marker">$3</span>')
        .replace(/(`+)([^`\n\r]+?)(`+)/g, '<span class="md-inline-code-marker">$1</span><span class="md-inline-code-content">$2</span><span class="md-inline-code-marker">$3</span>')
        .replace(/(\[)([^\]\n\r]+?)(\])(\()([^)\n\r]+?)(\))/g, '<span class="md-link-bracket">$1</span><span class="md-link-text">$2</span><span class="md-link-bracket">$3</span><span class="md-link-paren">$4</span><span class="md-link-url">$5</span><span class="md-link-paren">$6</span>')
        // 列表项和引用也按行处理
        .split('\n')
        .map(line => {
          // 无序列表
          const listMatch = line.match(/^(\s*)([-*+])(\s+)(.*)$/);
          if (listMatch) {
            const [, indent, marker, space, content] = listMatch;
            return `${indent}<span class="md-list-marker">${marker}</span><span class="md-list-space">${space}</span><span class="md-list-text">${content}</span>`;
          }
          
          // 有序列表
          const orderedMatch = line.match(/^(\s*)(\d+\.)(\s+)(.*)$/);
          if (orderedMatch) {
            const [, indent, marker, space, content] = orderedMatch;
            return `${indent}<span class="md-ordered-marker">${marker}</span><span class="md-list-space">${space}</span><span class="md-list-text">${content}</span>`;
          }
          
          // 引用
          const quoteMatch = line.match(/^(>\s*)(.*)$/);
          if (quoteMatch) {
            const [, marker, content] = quoteMatch;
            return `<span class="md-quote-marker">${marker}</span><span class="md-quote-text">${content}</span>`;
          }
          
          return line;
        })
        .join('\n')
        // 最后转换换行符
        .replace(/\n/g, '<br>');
    }

    // 更新contentEditable内容（仅在外部值变化时调用）
    function updateContentEditable() {
      if (!contentEditableRef.value) return;

      const highlightedHtml = highlightMarkdown(content.value);

      // 设置内容，区分空内容和有内容的情况
      if (highlightedHtml && highlightedHtml.trim() && highlightedHtml !== '<br>') {
        contentEditableRef.value.innerHTML = highlightedHtml;
      } else {
        // 如果内容为空，保持空状态
        if (!content.value) {
          contentEditableRef.value.innerHTML = '';
        } else {
          contentEditableRef.value.innerHTML = '<br>';
        }
      }
    }

    // 光标位置状态
    const cursorPosition = ref({ line: 0, column: 0 });
    const lastContent = ref('');

    // 获取当前光标的行号和列号（修复空行处理）
    function getCursorLineAndColumn() {
      if (!contentEditableRef.value) return { line: 0, column: 0 };
      
      const selection = window.getSelection();
      if (!selection.rangeCount) return { line: 0, column: 0 };
      
      const range = selection.getRangeAt(0);
      
      // 获取完整的纯文本内容，用于行数计算
      const fullText = getPlainText(contentEditableRef.value);
      const allLines = fullText.split('\n');
      
      // 获取光标前的内容
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(contentEditableRef.value);
      preCaretRange.setEnd(range.startContainer, range.startOffset);
      
      // 创建临时容器获取纯文本
      const tempContainer = document.createElement('div');
      tempContainer.appendChild(preCaretRange.cloneContents());
      const textBeforeCursor = getPlainText(tempContainer);
      
      // 计算行号和列号
      const linesBeforeCursor = textBeforeCursor.split('\n');
      const line = linesBeforeCursor.length - 1;
      const column = linesBeforeCursor[linesBeforeCursor.length - 1].length;
      
      console.log('📍 getCursorLineAndColumn:', {
        line,
        column,
        textBeforeCursor: JSON.stringify(textBeforeCursor),
        linesBeforeCursor,
        fullText: JSON.stringify(fullText),
        allLines,
        totalLinesInContent: allLines.length
      });
      
      return { line, column };
    }

    // 将光标设置到指定行号和列号（重新实现）
    function setCursorToLineAndColumn(targetLine, targetColumn) {
      if (!contentEditableRef.value) return false;
      
      const plainText = getPlainText(contentEditableRef.value);
      const lines = plainText.split('\n');
      
      console.log('🎯 setCursorToLineAndColumn 开始:', {
        targetLine,
        targetColumn,
        plainText: JSON.stringify(plainText),
        lines: lines,
        totalLines: lines.length
      });
      
      // 边界检查
      const actualLine = Math.min(Math.max(0, targetLine), lines.length - 1);
      const lineText = lines[actualLine] || '';
      const actualColumn = Math.min(Math.max(0, targetColumn), lineText.length);
      
      console.log('🎯 边界检查后:', {
        actualLine,
        actualColumn,
        lineText: JSON.stringify(lineText),
        lineTextLength: lineText.length
      });
      
      // 使用新的方法：遍历DOM直接找到对应位置
      let currentLine = 0;
      let currentColumn = 0;
      let found = false;
      
      const walker = document.createTreeWalker(
        contentEditableRef.value,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: function(node) {
            if (node.nodeType === Node.TEXT_NODE) {
              return NodeFilter.FILTER_ACCEPT;
            }
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'br') {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_SKIP;
          }
        },
        false
      );
      
      let targetNode = null;
      let targetOffset = 0;
      
      while (walker.nextNode() && !found) {
        const node = walker.currentNode;
        
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          
          for (let i = 0; i < text.length; i++) {
            if (currentLine === actualLine && currentColumn === actualColumn) {
              targetNode = node;
              targetOffset = i;
              found = true;
              break;
            }
            
            if (text[i] === '\n') {
              currentLine++;
              currentColumn = 0;
            } else {
              currentColumn++;
            }
          }
          
          // 检查文本节点末尾
          if (!found && currentLine === actualLine && currentColumn === actualColumn) {
            targetNode = node;
            targetOffset = text.length;
            found = true;
          }
          
        } else if (node.tagName.toLowerCase() === 'br') {
          if (currentLine === actualLine && currentColumn === actualColumn) {
            // 光标应该在br之前
            targetNode = node;
            targetOffset = 0;
            found = true;
            break;
          }
          currentLine++;
          currentColumn = 0;
        }
      }
      
      console.log('🎯 DOM遍历结果:', {
        found,
        currentLine,
        currentColumn,
        targetNode: targetNode ? {
          type: targetNode.nodeType === Node.TEXT_NODE ? 'TEXT' : 'BR',
          text: targetNode.nodeType === Node.TEXT_NODE ? JSON.stringify(targetNode.textContent) : 'BR'
        } : null,
        targetOffset
      });
      
      // 设置光标
      if (found && targetNode) {
        try {
          const range = document.createRange();
          const selection = window.getSelection();
          
          if (targetNode.nodeType === Node.TEXT_NODE) {
            range.setStart(targetNode, targetOffset);
          } else {
            // BR元素
            range.setStartBefore(targetNode);
          }
          
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
          
          console.log('✅ 光标设置成功');
          return true;
        } catch (e) {
          console.error('❌ 设置光标失败:', e);
        }
      }
      
      console.error('❌ 未找到目标位置');
      return false;
    }

    // 智能高亮更新（基于行列定位，添加调试日志）
    function updateContentEditableWithCursor() {
      if (!contentEditableRef.value) return;

      // 检查是否有焦点并保存当前光标位置
      const hasFocus = document.activeElement === contentEditableRef.value;
      let savedPosition = { line: 0, column: 0 };
      
      console.log('🔄 updateContentEditableWithCursor 开始:', { hasFocus });
      
      if (hasFocus) {
        savedPosition = getCursorLineAndColumn();
        cursorPosition.value = savedPosition;
        console.log('💾 保存的光标位置:', savedPosition);
      }

      // 更新高亮前记录DOM状态
      console.log('🔄 更新高亮前DOM innerHTML:', contentEditableRef.value.innerHTML);

      // 更新高亮
      const highlightedHtml = highlightMarkdown(content.value);
      if (highlightedHtml && highlightedHtml.trim() && highlightedHtml !== '<br>') {
        contentEditableRef.value.innerHTML = highlightedHtml;
      } else {
        contentEditableRef.value.innerHTML = '<br>';
      }

      console.log('🔄 更新高亮后DOM innerHTML:', contentEditableRef.value.innerHTML);

      // 恢复光标位置
      if (hasFocus) {
        nextTick(() => {
          try {
            contentEditableRef.value.focus();
            console.log('🔄 开始恢复光标位置到:', savedPosition);
            const restored = setCursorToLineAndColumn(savedPosition.line, savedPosition.column);
            if (!restored) {
              console.warn('❌ 光标恢复失败，尝试设置到行末');
              // 尝试设置到当前行的末尾
              setCursorToLineAndColumn(savedPosition.line, 9999);
            } else {
              console.log('✅ 光标恢复成功');
            }
          } catch (e) {
            console.error('❌ 光标恢复过程失败:', e);
            contentEditableRef.value.focus();
          }
        });
      }
    }





    // 检测文本是否包含需要高亮的Markdown语法（修复跨行匹配）
    function needsHighlighting(text) {
      if (!text) return false;
      
      // 检测常见的Markdown语法模式，与highlightMarkdown函数保持一致
      const patterns = [
        /^#{1,6}\s/m,                    // 标题
        /\*\*[^*\n\r]+\*\*/,             // 粗体 - 限制在单行内
        /(?<!\*)\*[^*\n\r]+\*(?!\*)/,    // 斜体 - 限制在单行内
        /`[^`\n\r]+`/,                   // 行内代码 - 限制在单行内
        /```[\s\S]*?```/,                // 代码块 - 保持多行匹配
        /\[[^\]\n\r]+\]\([^)\n\r]+\)/,   // 链接 - 限制在单行内
        /^[\s]*[-*+]\s/m,                // 无序列表
        /^[\s]*\d+\.\s/m,                // 有序列表
        /^>\s/m                          // 引用
      ];
      
      return patterns.some(pattern => pattern.test(text));
    }

    // 处理输入（基于行列定位优化版）
    const handleInput = (fastUpdate = false, skipCursorUpdate = false) => {
      if (isComposing.value || !contentEditableRef.value) return;

      try {
        const plainText = getPlainText(contentEditableRef.value);

        // 只有当内容真正改变时才更新
        if (plainText !== content.value) {
          // 只有在非跳过模式下才记录当前光标位置，避免覆盖预设位置
          if (!skipCursorUpdate) {
            const currentPos = getCursorLineAndColumn();
            cursorPosition.value = currentPos;
          }
          
          // 更新内容
          const oldContent = content.value;
          content.value = plainText;
          lastContent.value = oldContent;
          
          emit('update:modelValue', plainText);
          emit('change', plainText);

          // 如果内容被完全清空，确保编辑器状态正确
          if (!plainText) {
            contentEditableRef.value.innerHTML = '';
            cursorPosition.value = { line: 0, column: 0 };
            return;
          }

          // 清除之前的定时器
          if (highlightTimer) {
            clearTimeout(highlightTimer);
          }

          // 智能判断是否需要高亮更新
          if (needsHighlighting(plainText)) {
            // 包含Markdown语法，需要高亮
            const delay = fastUpdate ? 200 : 600;
            highlightTimer = setTimeout(() => {
              updateContentEditableWithCursor();
            }, delay);
          } else {
            // 不包含Markdown语法，直接保持当前光标位置
            // 不触发高亮更新，保持流畅的输入体验
          }
        }

        // 处理空内容的显示状态
        // 只有在内容完全为空且编辑器获得焦点时才可能需要<br>来保持可编辑状态
        if (!plainText && document.activeElement === contentEditableRef.value) {
          // 完全空内容且有焦点，检查是否需要<br>来保持可编辑状态
          if (contentEditableRef.value.innerHTML === '') {
            contentEditableRef.value.innerHTML = '<br>';
            return;
          }
        } else if (!plainText && contentEditableRef.value.innerHTML !== '') {
          // 完全空内容且没有焦点，保持空状态
          contentEditableRef.value.innerHTML = '';
          return;
        }
      } catch (error) {
        console.error('处理输入失败:', error);
      }
    };

    // 处理粘贴（修复换行符和高亮问题）
    const handlePaste = async (event) => {
      event.preventDefault();

      try {
        let pastedText = '';

        // 尝试从剪贴板获取文本
        if (event.clipboardData) {
          pastedText = event.clipboardData.getData('text') || '';
        } else {
          // 备用方法：使用现代剪贴板API
          try {
            pastedText = await navigator.clipboard.readText();
          } catch (clipboardError) {
            console.warn('无法访问剪贴板:', clipboardError);
            MessagePlugin.warning('无法访问剪贴板，请使用 Ctrl+V 粘贴');
            return;
          }
        }

        if (!pastedText) {
          console.log('没有获取到粘贴内容');
          return;
        }

        console.log('📋 粘贴处理开始:', {
          originalPastedText: JSON.stringify(pastedText),
          length: pastedText.length,
          lineCount: pastedText.split('\n').length
        });
        
        // 统一换行符格式 - 将\r\n和\r都转换为\n
        let normalizedText = pastedText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        console.log('📋 统一换行符后:', JSON.stringify(normalizedText));
        
        // 记录粘贴前的编辑器状态
        console.log('📋 粘贴前编辑器状态:', {
          currentContent: JSON.stringify(content.value),
          editorHTML: contentEditableRef.value.innerHTML
        });

        let processedText = normalizedText;

        // 只有在启用自动添加行号且内容看起来像列表时才添加行号
        if (props.autoAddLineNumbers && shouldAddLineNumbers(normalizedText)) {
          processedText = addLineNumbersToPastedContent(normalizedText);
          console.log('📋 添加行号后:', JSON.stringify(processedText));
        }

        // 确保编辑器处于正确状态
        if (contentEditableRef.value.innerHTML === '<br>' || !content.value.trim()) {
          contentEditableRef.value.innerHTML = '';
          content.value = '';
          console.log('📋 清空编辑器状态');
        }

        // 使用insertTextAtCursor函数插入文本
        console.log('📋 准备插入文本:', JSON.stringify(processedText));
        insertTextAtCursor(processedText);
        
        // 插入后立即触发高亮更新
        setTimeout(() => {
          const plainText = getPlainText(contentEditableRef.value);
          console.log('📋 插入后文本内容:', JSON.stringify(plainText));
          
          // 更新内容状态
          content.value = plainText;
          emit('update:modelValue', plainText);
          emit('change', plainText);
          
          // 立即触发高亮更新
          if (needsHighlighting(plainText)) {
            console.log('📋 触发高亮更新');
            updateContentEditableWithCursor();
          }
        }, 50);

      } catch (error) {
        console.error('粘贴失败:', error);
        MessagePlugin.error('粘贴失败，请重试');
      }
    };

    // 判断是否应该为内容添加行号
    function shouldAddLineNumbers(text) {
      const lines = text.split('\n').filter(line => line.trim());

      // 如果只有一行，不添加行号
      if (lines.length <= 1) return false;

      // 如果已经有行号，不重复添加
      const hasLineNumbers = lines.some(line => line.match(/^\s*\d+\.\s/));
      if (hasLineNumbers) return false;

      // 如果看起来像列表内容（多行且每行都有实际内容），则添加行号
      const meaningfulLines = lines.filter(line => line.trim().length > 0);
      return meaningfulLines.length >= 2;
    }

    // 为粘贴内容添加行号
    function addLineNumbersToPastedContent(text) {
      const lines = text.split('\n');
      let lineNumber = 1;

      return lines.map((line) => {
        // 只为有内容的行添加行号
        if (line.trim() && !line.match(/^\s*\d+\.\s/)) {
          return `${lineNumber++}. ${line}`;
        }
        return line;
      }).join('\n');
    }

    // 复制内容
    const copyContent = async () => {
      try {
        // 确保内容不为空
        if (!content.value) {
          MessagePlugin.warning('没有内容可复制');
          return;
        }

        // 检测是否在iframe环境中
        const isInIframe = window.self !== window.top;

        // 优先使用现代剪贴板API，在iframe中可能受限
        if (navigator.clipboard && navigator.clipboard.writeText) {
          try {
            await navigator.clipboard.writeText(content.value);
            MessagePlugin.success('复制成功');
            return;
          } catch (clipboardError) {
            console.warn('剪贴板API失败，尝试降级方案:', clipboardError);
            // 在iframe中剪贴板API可能失败，继续使用降级方案
          }
        }

        // 降级方案：使用传统方法
        const textarea = document.createElement('textarea');
        textarea.value = content.value;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';

        // 在iframe环境中，尝试添加到top document以提高兼容性
        const targetDocument = isInIframe && window.top.document ? window.top.document : document;
        targetDocument.body.appendChild(textarea);

        try {
          // 确保 textarea 可以获得焦点
          textarea.focus();
          textarea.select();
          textarea.setSelectionRange(0, textarea.value.length);

          // 尝试使用 execCommand
          const successful = document.execCommand('copy');
          if (successful) {
            MessagePlugin.success('复制成功');
          } else {
            throw new Error('execCommand failed');
          }
        } catch (execError) {
          console.warn('execCommand 复制失败:', execError);

          // 在iframe环境中的特殊处理
          if (isInIframe) {
            // 尝试通过用户交互的方式复制
            try {
              // 创建一个临时的可编辑div
              const tempDiv = document.createElement('div');
              tempDiv.contentEditable = true;
              tempDiv.style.position = 'fixed';
              tempDiv.style.left = '-999999px';
              tempDiv.style.top = '-999999px';
              tempDiv.style.opacity = '0';
              tempDiv.textContent = content.value;
              document.body.appendChild(tempDiv);

              const range = document.createRange();
              range.selectNodeContents(tempDiv);
              const selection = window.getSelection();
              selection.removeAllRanges();
              selection.addRange(range);

              // 触发复制命令
              const copySuccess = document.execCommand('copy');
              document.body.removeChild(tempDiv);

              if (copySuccess) {
                MessagePlugin.success('复制成功');
                return;
              }
            } catch (tempDivError) {
              console.warn('临时div复制也失败:', tempDivError);
            }
          }

          // 最后的降级方案：手动选择文本提示用户
          textarea.select();
          MessagePlugin.warning('请手动按 Ctrl+C 复制内容');
        } finally {
          // 确保移除临时元素
          if (textarea.parentNode) {
            targetDocument.body.removeChild(textarea);
          }
          // 如果编辑器不是禁用状态，恢复焦点
          if (!props.disabled && contentEditableRef.value) {
            contentEditableRef.value.focus();
          }
        }
      } catch (err) {
        console.error('复制功能出错:', err);
        MessagePlugin.error('复制失败，请手动选择文本复制');
      }
    };

    // 手动触发高亮更新（用于特殊情况）
    const forceHighlightUpdate = () => {
      if (highlightTimer) {
        clearTimeout(highlightTimer);
      }
      updateContentEditableWithCursor();
    };

    // 处理键盘事件（基于行列定位优化版）
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        insertTextAtCursor('  ');
      } else if (event.key === 'Enter') {
        // 防止在disabled状态下换行
        if (props.disabled) {
          event.preventDefault();
          return;
        }
        
        // 记录换行前的位置
        const beforeEnterPos = getCursorLineAndColumn();
        
        // 允许浏览器处理换行，不阻止默认行为
        // 使用更短的延迟确保换行生效
        setTimeout(() => {
          try {
            // 获取换行后的实际内容
            const newContent = getPlainText(contentEditableRef.value);
            
            // 如果内容确实发生了变化（增加了换行符），更新状态
            if (newContent !== content.value) {
              content.value = newContent;
              emit('update:modelValue', newContent);
              emit('change', newContent);
              
              // 计算新的光标位置
              const newLinePos = {
                line: beforeEnterPos.line + 1,
                column: 0
              };
              cursorPosition.value = newLinePos;
            }
            
            // 延迟高亮更新，避免立即覆盖换行效果
            if (highlightTimer) {
              clearTimeout(highlightTimer);
            }
            
            if (needsHighlighting(content.value)) {
              highlightTimer = setTimeout(() => {
                updateContentEditableWithCursor();
              }, 800); // 增加延迟时间，确保换行稳定
            }
          } catch (error) {
            console.error('处理换行失败:', error);
          }
        }, 20); // 缩短初始延迟
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        // 处理删除键
        setTimeout(() => {
          handleInput(true);
          
          // 更新光标位置
          const currentPos = getCursorLineAndColumn();
          cursorPosition.value = currentPos;

          if (!content.value) {
            // 如果内容被完全删除（包括换行符），重置为完全空状态
            contentEditableRef.value.innerHTML = '';
            content.value = '';
            cursorPosition.value = { line: 0, column: 0 };
            
            // 设置光标到空编辑器的开始位置
            setTimeout(() => {
              const selection = window.getSelection();
              const range = document.createRange();
              range.setStart(contentEditableRef.value, 0);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
            }, 10);
          }
        }, 10);
      } else if (event.key === 'Escape') {
        // ESC键强制触发高亮更新
        forceHighlightUpdate();
      } else {
        // 其他按键，实时更新光标位置记录
        setTimeout(() => {
          const currentPos = getCursorLineAndColumn();
          cursorPosition.value = currentPos;
        }, 10);
      }
    };

    // 在光标位置插入文本
    function insertTextAtCursor(text) {
      if (!contentEditableRef.value || !text) return;

      try {
        contentEditableRef.value.focus();

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);

          // 删除选中的内容
          range.deleteContents();

          // 创建文本节点并插入
          const textNode = document.createTextNode(text);
          range.insertNode(textNode);

          // 将光标移动到插入文本的末尾
          range.setStartAfter(textNode);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);

          // 触发输入事件
          setTimeout(() => {
            handleInput();
          }, 10);
        }
      } catch (error) {
        console.error('插入文本失败:', error);
      }
    }

    // 处理输入法开始
    const handleCompositionStart = () => {
      isComposing.value = true;
    };

    // 处理输入法结束
    const handleCompositionEnd = () => {
      isComposing.value = false;
      handleInput();
    };



    // 处理点击事件（优化版）
    const handleClick = () => {
      if (contentEditableRef.value && !props.readonly && !props.disabled) {
        contentEditableRef.value.focus();

        // 更新光标位置记录
        setTimeout(() => {
          const currentPos = getCursorLineAndColumn();
          cursorPosition.value = currentPos;
        }, 10);

        // 如果编辑器完全为空（没有任何内容包括换行符），确保有正确的光标位置
        if (!content.value) {
          setTimeout(() => {
            const selection = window.getSelection();
            const range = document.createRange();
            
            // 对于完全空的编辑器，设置光标到编辑器开始位置
            if (contentEditableRef.value.childNodes.length === 0) {
              // 完全空的情况，直接设置光标到编辑器开始
              range.setStart(contentEditableRef.value, 0);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
              cursorPosition.value = { line: 0, column: 0 };
            } else {
              const firstChild = contentEditableRef.value.firstChild;
              if (firstChild && firstChild.tagName === 'BR') {
                range.setStartBefore(firstChild);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                cursorPosition.value = { line: 0, column: 0 };
              } else if (firstChild) {
                range.setStart(firstChild, 0);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                cursorPosition.value = { line: 0, column: 0 };
              } else {
                range.setStart(contentEditableRef.value, 0);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                cursorPosition.value = { line: 0, column: 0 };
              }
            }
          }, 10);
        }
      }
    };

    // 处理获得焦点事件（优化版）
    const handleFocus = () => {
      if (props.disabled) {
        contentEditableRef.value.blur();
        return;
      }
      
      if (!content.value) {
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection.rangeCount === 0) {
            const range = document.createRange();
            // 对于完全空的编辑器，直接设置光标到开始位置
            range.setStart(contentEditableRef.value, 0);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            cursorPosition.value = { line: 0, column: 0 };
          }
        }, 10);
      } else {
        // 获得焦点时更新光标位置记录
        setTimeout(() => {
          const currentPos = getCursorLineAndColumn();
          cursorPosition.value = currentPos;
        }, 10);
      }
    };

    // 处理失去焦点事件（优化版）
    const handleBlur = () => {
      // 失去焦点时立即更新高亮，让用户看到最终效果
      if (highlightTimer) {
        clearTimeout(highlightTimer);
      }
      
      // 短延迟确保blur事件处理完成
      setTimeout(() => {
        // 不保存光标位置，因为已经失去焦点
        const highlightedHtml = highlightMarkdown(content.value);
        if (highlightedHtml && highlightedHtml.trim() && highlightedHtml !== '<br>') {
          contentEditableRef.value.innerHTML = highlightedHtml;
        } else {
          // 如果内容为空，保持空状态，不设置<br>
          if (!content.value) {
            contentEditableRef.value.innerHTML = '';
          } else {
            contentEditableRef.value.innerHTML = '<br>';
          }
        }
      }, 50);
    };

    // 滚动同步相关
    const editorInputContainerRef = ref(null);
    const lineNumbersRef = ref(null);

    // 同步行号滚动
    function syncLineNumbersScroll() {
      if (editorInputContainerRef.value && lineNumbersRef.value) {
        const scrollTop = editorInputContainerRef.value.scrollTop;
        lineNumbersRef.value.scrollTop = scrollTop;
      }
    }

    // 处理编辑器滚动事件
    const handleEditorScroll = () => {
      syncLineNumbersScroll();
    };

    // 组件挂载后初始化
    onMounted(() => {
      if (contentEditableRef.value) {
        // 如果没有初始内容，保持完全空状态，不设置<br>
        if (!props.modelValue) {
          contentEditableRef.value.innerHTML = '';
          content.value = '';
        } else {
          // 有初始内容时才更新显示
          updateContentEditable();
        }

        // 如果有初始内容，确保正确显示
        if (props.modelValue) {
          nextTick(() => {
            updateContentEditable();
          });
        }
      }

      // 添加滚动事件监听器
      if (editorInputContainerRef.value) {
        editorInputContainerRef.value.addEventListener('scroll', handleEditorScroll);
      }
    });

    // 组件卸载前清理
    onBeforeUnmount(() => {
      if (editorInputContainerRef.value) {
        editorInputContainerRef.value.removeEventListener('scroll', handleEditorScroll);
      }
    });

    // 计算样式
    const editorStyle = computed(() => {
      const style = {};
      if (props.minHeight) {
        if (typeof props.minHeight === 'number') {
          style.minHeight = `${props.minHeight}px`;
        } else if (typeof props.minHeight === 'string' && props.minHeight.includes('calc(')) {
          // 如果包含 calc() 函数，直接使用原值
          style.minHeight = props.minHeight;
        } else {
          // 其他字符串值（如 '200px', '50%' 等）直接使用
          style.minHeight = props.minHeight;
        }
      }
      if (props.maxHeight) {
        if (typeof props.maxHeight === 'number') {
          style.maxHeight = `${props.maxHeight}px`;
        } else if (typeof props.maxHeight === 'string' && props.maxHeight.includes('calc(')) {
          // 如果包含 calc() 函数，直接使用原值
          style.maxHeight = props.maxHeight;
        } else {
          // 其他字符串值（如 '500px', '80vh' 等）直接使用
          style.maxHeight = props.maxHeight;
        }
      }
      if (props.resizable) {
        style.resize = 'vertical';
        style.overflow = 'auto';
      }
      return style;
    });

    return {
      editorRef,
      contentEditableRef,
      editorInputContainerRef,
      lineNumbersRef,
      content,
      lines,
      handleInput,
      handlePaste,
      handleKeyDown,
      handleCompositionStart,
      handleCompositionEnd,
      handleClick,
      handleFocus,
      handleBlur,
      copyContent,
      editorStyle
    };
  },

  render() {
    return (
      <div class={['markdown-editor', { 'readonly': this.readonly, 'disabled': this.disabled, 'resizable': this.resizable }]} ref="editorRef">
        <div class="editor-header">
          <div class="editor-title">
          </div>
          <div class="editor-actions">
            <Button
              onClick={this.copyContent}
              title="复制"
              variant="outline"
              v-slots={{
                icon: () => {
                  return (
                    <CopyIcon />
                  )
                }
              }}
            >
              复制
            </Button>
          </div>
        </div>

        <div class="editor-content" style={this.editorStyle}>
          {this.showLineNumbers && (
            <div class="line-numbers" ref="lineNumbersRef">
              {this.lines.map((_, index) => (
                <div key={index} class="line-number">
                  {index + 1}
                </div>
              ))}
            </div>
          )}

          <div class="editor-input-container" ref="editorInputContainerRef">
            <div
              ref="contentEditableRef"
              class={['content-editable', { 'disabled': this.disabled }]}
              contentEditable={!this.readonly && !this.disabled}
              onInput={this.handleInput}
              onPaste={this.handlePaste}
              onKeydown={this.handleKeyDown}
              onCompositionstart={this.handleCompositionStart}
              onCompositionend={this.handleCompositionEnd}
              onClick={this.handleClick}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              data-placeholder={this.disabled ? '编辑器已禁用' : this.placeholder}
              spellcheck={false}
              tabindex={this.disabled ? -1 : 0}
            />
          </div>
        </div>
      </div>
    );
  }
});