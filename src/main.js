

import '@tdesign-vue-next/chat/es/style/index.css'; // 引入chat组件的少量全局样式变量
import "tdesign-vue-next/es/style/index.css";
import { createApp } from "vue";
import App from "@/App";
import router from "@/router";
import { store } from "@/store";
import "@/style/index.less"

// Add passive event listener support for better performance
if (typeof window !== 'undefined') {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
        return true;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  // Override addEventListener to add passive option for scroll/touch events
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (supportsPassive && typeof options === 'undefined' && 
        (type === 'scroll' || type === 'touchstart' || type === 'touchmove' || type === 'wheel')) {
      options = { passive: true };
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
}

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");