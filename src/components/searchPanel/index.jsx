import { defineComponent, ref, watch } from "vue";
import { Input, Select, Button, DatePicker, Row, Col, DateRangePicker } from "tdesign-vue-next";
import { SearchIcon } from "tdesign-icons-vue-next";
import RefreshIcon from '@/images/svgs/refresh.svg?component'

export default defineComponent({
  emits: ["search", "reset"],
  props: {
    gutter: {
      type: Number,
      default: 16
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showReset: {
      type: Boolean,
      default: true
    },
    showButton: {
      type: Boolean,
      default: true
    },
    searchList: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    labelAlign: {
      type: String,
      default: "left"
    }
  },
  setup(props, context) {
    const initSearchList = ref([]);
    const handleSearch = () => {
      context.emit("search", initFormData());
    };
    const handleReset = () => {
      // 重置所有字段为默认值
      initSearchList.value.forEach(item => {
        item.value = item.defaultValue || '';
        if (item.type === 'DATEPICKER_RANGE') {
          item.value = [];
        }
      });
      context.emit("reset", initFormData());
    };
    const initFormData = () => {
      const formData = {};
      initSearchList.value.forEach(item => {
        if (item.value !== undefined && item.value !== null && item.value !== '' && item.type !== 'DATEPICKER_RANGE') {
          formData[item.name] = item.value
        }
        if (item.type === 'DATEPICKER_RANGE' && item.value.length > 0) {
          formData[item.firstField] = item.value[0]
          formData[item.secondField] = item.value[1]
        }
      });
      return formData;
    }
    watch(() => props.searchList, (newVal) => {
      initSearchList.value = newVal.map(item => ({
        ...item,
        value: item.defaultValue || ''
      }));
      console.log(initSearchList.value, 'initSearchList');
    }, {
      immediate: true,
      deep: true
    });
    return () => (
      <>
        <Row class="search-panel gap-y-[16px] py-20" type="flex" align="center" gutter={props.gutter || 16}>
          {
            initSearchList.value?.map((item) => (
              <Col class="search-panel-item" span={item.span || 4 }>
                <div class={`flex ${props.labelAlign === "top" ? "flex-col" : "flex-row"} items-center`}>
                  <div class="search-panel-item-label flex-shrink-0 text-right pr-12" style={{ width: item.labelWidth || props.labelWidth + "px" }}>{item.label}</div>
                  {
                    (item.type === "INPUT" || !item.type) && (
                      <Input 
                        modelValue={item.value} 
                        onUpdate:modelValue={(value) => item.value = value}
                        placeholder={item.attrs?.placeholder || item.placeholder || '请输入'}
                        {...item?.attrs}
                      />
                    )
                  }
                  {
                    item.type === "SELECT" && (
                      <Select 
                        modelValue={item.value}
                        onUpdate:modelValue={(value) => item.value = value}
                        placeholder={item.attrs?.placeholder || item.placeholder || '请选择'}
                        options={item.options || []}
                        {...item?.attrs}
                      />
                    )
                  }
                  {
                    item.type === "DATEPICKER" && (
                      <DatePicker 
                        class="flex-1"
                        modelValue={item.value}
                        onUpdate:modelValue={(value) => item.value = value}
                        placeholder={item.attrs?.placeholder || item.placeholder || '请选择'}
                        {...item?.attrs}
                      />
                    )
                  }
                  {
                    item.type === "DATEPICKER_RANGE" && (
                      <DateRangePicker
                        class="flex-1"
                        modelValue={item.value}
                        onUpdate:modelValue={(value) => item.value = value}
                        placeholder={item.attrs?.placeholder || item.placeholder || '请选择'}
                        {...item?.attrs}
                      />
                    )
                  }
                </div>
              </Col>
            ))
          }
          {
            props.showButton && 
            <Col span={12}>
              <Row type="flex" justify="end" class="gap-x-[16px]">
                {
                  props.showReset && (
                    <Button variant="outline" onClick={handleReset} v-slots={{
                      icon: () => {
                        return (
                          <RefreshIcon class="size-12 mr-4" />
                        )
                      }
                    }}>重置</Button>
                  )
                }
                {
                  props.showSearch && (
                    <Button theme="primary" onClick={handleSearch} v-slots={{
                      icon: () => {
                        return (
                          <SearchIcon />
                        )
                      }
                    }}>搜索</Button>
                  )
                }
              </Row>
            </Col>
          }
        </Row>
      </>
    );
  },
});