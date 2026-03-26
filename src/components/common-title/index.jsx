import { defineComponent } from "vue";
import { ChevronLeftIcon } from "tdesign-icons-vue-next";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ""
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  // props.showBack &&
  setup(props, context) {
    const router = useRouter();
    const route = useRoute();
    const handleBack = () => {
      router.back();
      context.emit("back");
    };
    return () => {
      return <div class="flex justify-between items-center">
        <div class="flex items-center">
          {context.slots["title-left"]?.()}
          { props.showBack && <ChevronLeftIcon size="24" class="mr-2 cursor-pointer"  onClick={() => handleBack()}/> }
          <div class="text-20 font-medium !leading-[28px]">{props.title || route.meta.title}</div>
          {context.slots["title-right"]?.()}
        </div>
        <div>
          {context.slots.right?.()}

        </div>
      </div>;
    };
  },
});