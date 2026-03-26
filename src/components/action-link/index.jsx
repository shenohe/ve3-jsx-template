import { defineComponent } from "vue";
import { Link, Popconfirm } from "tdesign-vue-next";

export default defineComponent({
  props: {
    linkList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const renderItem = (item, index) => {
      if (item.type === "popconfirm") {
        return (
          <Popconfirm 
            key={index}
            content={item.attrs?.popProps?.content || "确定要删除吗？"} 
            {...item.attrs?.popProps}
          >
            <Link 
              theme={item.theme || "primary"}
              hover="color" 
              variant="text" 
              {...item.attrs}
            >
              {item.label}
            </Link>
          </Popconfirm>
        )
      } else if (item.type === "slot") {
        // 在render函数内部正确调用插槽
        const slotContent = context.slots[item.name];
        return slotContent ? slotContent() : null;
      } else if (item.custom) {
        return item.custom()
      } else {
        return (
          <Link 
            key={index}
            theme={item.theme || "primary"}
            hover="color" 
            variant="text" 
            {...item.attrs}
          >
            {item.label}
          </Link>
        )
      }
    };

    return () => (
      <div class="flex items-center gap-8 justify-end flex-wrap">
        {props.linkList.map((item, index) => renderItem(item, index))}
      </div>
    );
  }
})