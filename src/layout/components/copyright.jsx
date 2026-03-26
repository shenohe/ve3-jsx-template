import { defineComponent } from "vue";

export default defineComponent({
  setup(props, context) {
    // 
    const year = new Date().getFullYear();

    // Render
    return () => {
      return (
        <p>杭州魂域科技有限公司 2025-{year} All Rights Reserved</p>
      );
    };
  }
});