import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { useImageLoader } from "@/hooks";
import { useConfigStore } from '@/store';

export default defineComponent({
  setup(props, context) {
    const configStore = useConfigStore();
    const config = configStore.getConfig;
    const appid = configStore.getAppid;
    const loadImage = useImageLoader();
    const logo = config?.app?.logo || config?.oem?.logoImg;
    // Render
    return () => {
      return (
        <RouterLink class="logo" to={`/${appid}/`}>
          {
            logo ? <img src={loadImage(logo)} /> : null
          }
        </RouterLink>
      );
    };
  }
});