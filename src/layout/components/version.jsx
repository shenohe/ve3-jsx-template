import { VERSION } from '@/config';
import { defineComponent } from 'vue';

export default defineComponent({
  setup(props, context) {
    return () => {
      return <div class="text-12 text-[#666] mb-12 px-20">v{VERSION}</div>;
    };
  },
});