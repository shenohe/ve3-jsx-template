import "./index.less";
import { defineComponent, ref } from "vue";
import { useResizeObserver } from "@/hooks";
import { ViewColumnIcon, WifiIcon, BatteryFilledIcon } from "tdesign-icons-vue-next";

export default defineComponent({
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    // 
    const scale = ref(1);
    const resizeObserver = useResizeObserver(size => {
      scale.value = size.height / 736;
    });

    // Render
    return () => {
      return (
        <div ref={resizeObserver.target} class="app-viewer-wrapper">
          <div class="app-viewer" style={{ transform: `scale(${scale.value})` }}>
            <div class="app-viewer-header">
              <div class="time">11.30</div>
              <div class="statusbar">
                <ViewColumnIcon />
                <WifiIcon />
                <BatteryFilledIcon />
              </div>
            </div>
            <div class="app-viewer-body">
              <iframe src={props.src}></iframe>
            </div>
          </div>
        </div>
      );
    };
  }
});