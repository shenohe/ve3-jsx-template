import "./index.less";
import { defineComponent } from "vue";
import { InfoCircleFilledIcon, ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon } from "tdesign-icons-vue-next";
import ResultException from "./result-exception";

export default defineComponent({
  props: {
    status: {
      type: String,
      default: "info"
    },
    icon: {
      type: Function,
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    extra: {
      type: String,
      default: undefined
    }
  },
  setup(props, context) {
    // Render
    return () => {
      let children = [];

      // 图标
      let icon;

      if (context.slots.icon) {
        icon = context.slots.icon();
      }
      else if (["info", "warning", "success", "error"].indexOf(props.status) > -1) {
        if (props.status == "info") {
          icon = (
            <InfoCircleFilledIcon />
          );
        }
        else if (props.status == "warning") {
          icon = (
            <ErrorCircleFilledIcon />
          );
        }
        else if (props.status == "success") {
          icon = (
            <CheckCircleFilledIcon />
          );
        }
        else if (props.status == "error") {
          icon = (
            <CloseCircleFilledIcon />
          );
        }
      }
      else {
        icon = (
          <ResultException status={props.status} width={300} />
        );
      }

      children.push(
        <div class="result-icon">
          {icon}
        </div>
      );

      // 标题
      children.push(
        <div class="result-title">
          {context.slots.title?.() ?? props.title}
        </div>
      );

      // 描述信息
      if (context.slots.description || props.description) {
        children.push(
          <div class="result-description">
            {context.slots.description?.() ?? props.description}
          </div>
        );
      }

      // 内容
      if (context.slots.default) {
        children.push(
          <div class="result-content">
            {context.slots.default?.()}
          </div>
        );
      }

      // 额外内容
      if (context.slots.extra || props.extra) {
        children.push(
          <div class="result-extra">
            {context.slots.extra?.() ?? props.extra}
          </div>
        );
      }

      // 
      return (
        <div class={props.status ? `result result-${props.status}` : `result`}>
          {children}
        </div>
      );
    };
  }
});