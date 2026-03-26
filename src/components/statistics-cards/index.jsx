import { defineComponent, markRaw, computed } from "vue";
import { AddIcon, EditIcon, DeleteIcon, CheckCircleIcon } from "tdesign-icons-vue-next";
import "./index.less";

export default defineComponent({
  name: "StatisticsCards",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    animated: {
      type: Boolean,
      default: true
    },
    animationDelay: {
      type: Number,
      default: 200
    },
    animationDuration: {
      type: Number,
      default: 1500
    },
    infoData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, context) {
    // 内部数据状态
    const statisticsData = computed(() => {
      return props.data.map(item => ({
        title: item.title,
        value: props.infoData[item.value] || 0,
        targetValue: props.infoData[item.value] || 0,
        icon: item.icon
      }));
    });
    
    // 默认图标映射
    const defaultIcons = {
      add: markRaw(AddIcon),
      edit: markRaw(EditIcon),
      delete: markRaw(DeleteIcon),
      check: markRaw(CheckCircleIcon)
    };
    
    // 数字动画效果
    const animateNumbers = () => {
      if (!props.animated) return;
      
      statisticsData.value.forEach((item, index) => {
        const duration = props.animationDuration;
        const startTime = Date.now();
        const startValue = 0;
        const endValue = item.targetValue || item.value;
        
        // 重置为0开始动画
        item.value = 0;
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // 使用缓动函数
          const easeOut = 1 - Math.pow(1 - progress, 3);
          item.value = Math.round(startValue + (endValue - startValue) * easeOut);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        // 延迟启动动画，让卡片依次动画
        setTimeout(() => {
          animate();
        }, index * props.animationDelay);
      });
    };
    // 暴露方法给父组件
    context.expose({
      startAnimation: animateNumbers,
    });
    
    return () => (
      <div class="statistics-cards">
        {statisticsData.value.map((item) => (
          <div class="statistics-card">
            <div class="statistics-title flex items-center justify-between">
              <div>{item.title}</div>
              {
                item.icon &&
                <item.icon
                  class="size-28"
                />
              }
            </div>
            <div class="statistics-value">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    );
  }
});