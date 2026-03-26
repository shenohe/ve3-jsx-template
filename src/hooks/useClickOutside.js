import { onMounted, onUnmounted } from 'vue';

/**
 * 检测点击事件是否在指定元素外的 hook
 * @param {Ref} elementRef - 指定元素的 ref
 * @param {Function} callback - 点击外部时的回调函数
 * @param {Object} options - 配置选项
 * @param {boolean} options.disabled - 是否禁用监听，默认 false
 * @param {string} options.eventType - 监听的事件类型，默认 'click'
 */
export function useClickOutside(elementRef, callback, options = {}) {
  const { disabled = false, eventType = 'click' } = options;

  const handleClickOutside = (event) => {
    // 如果禁用或者元素不存在，直接返回
    if (disabled || !elementRef.value) {
      return;
    }

    // 检查点击的目标是否在指定元素内
    const target = event.target;
    const element = elementRef.value;

    // 安全检查：确保 element 和 target 都是有效的 DOM 元素
    if (!element || !target) {
      return;
    }

    // 获取实际的 DOM 元素（处理 Vue 组件实例的情况）
    const domElement = element.$el || element;
    
    // 确保 domElement 是一个有效的 DOM 元素且具有 contains 方法
    if (!domElement || typeof domElement.contains !== 'function') {
      return;
    }

    // 如果点击的目标不是指定元素，也不是其子元素，则触发回调
    try {
      if (!domElement.contains(target)) {
        callback(event);
      }
    } catch (error) {
      // 如果 contains 方法执行出错，使用备用方案
      console.warn('useClickOutside: contains method failed, using fallback', error);
      
      // 备用方案：检查元素是否相同
      if (domElement !== target) {
        // 简单的父子关系检查
        let parent = target.parentNode;
        let isInside = false;
        
        while (parent) {
          if (parent === domElement) {
            isInside = true;
            break;
          }
          parent = parent.parentNode;
        }
        
        if (!isInside) {
          callback(event);
        }
      }
    }
  };

  onMounted(() => {
    if (!disabled) {
      document.addEventListener(eventType, handleClickOutside, true);
    }
  });

  onUnmounted(() => {
    document.removeEventListener(eventType, handleClickOutside, true);
  });

  // 返回一个手动控制的方法
  const enable = () => {
    document.addEventListener(eventType, handleClickOutside, true);
  };

  const disable = () => {
    document.removeEventListener(eventType, handleClickOutside, true);
  };

  return {
    enable,
    disable
  };
} 