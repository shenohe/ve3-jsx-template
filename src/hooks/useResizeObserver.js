import { ref, onMounted, onUnmounted } from "vue";

export default function useResizeObserver(callback) {
  const target = ref(null);
  let observer = null;

  const startObserving = () => {
    if (!target.value) {
      return;
    }

    observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        let size = {
          width: 0,
          height: 0
        };

        if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
          const borderBoxSize = entry.borderBoxSize[0];

          size.width = borderBoxSize.inlineSize;
          size.height = borderBoxSize.blockSize;
        }
        else {
          size.width = entry.contentRect.width;
          size.height = entry.contentRect.height;
        }

        callback(size);
      }
    });

    observer.observe(target.value);
  };

  const stopObserving = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  onMounted(() => {
    startObserving();
  });

  onUnmounted(() => {
    stopObserving();
  });

  return {
    target,
    startObserving,
    stopObserving
  };
};