import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { setFavicon } from "@/libs/utils";
export default defineComponent({
  name: "App",
  setup() {
    setFavicon();
    return () => {
      return (
        <RouterView />
      );
    }; 
  }
});