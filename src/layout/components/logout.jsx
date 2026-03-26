import { defineComponent, ref, nextTick, onMounted, watch } from "vue";
import { Dialog, Button, Popup } from "tdesign-vue-next";
import { useImageLoader } from '@/hooks'
import { useRouter } from "vue-router";
import { useUserStore, useConfigStore } from '@/store';
import { VERSION } from '@/config';
import { ChevronDownIcon } from "tdesign-icons-vue-next";
import { useRequest } from 'vue-request';

export default defineComponent({
  setup(props, context) {
    const loadImage = useImageLoader();
    const userStore = useUserStore();
    const configStore = useConfigStore();
    const appid = configStore.getAppid;
    const userInfo = userStore.getUserInfoByAppId(appid);
    const popupVisible = ref(false);
    const visible = ref(false);
    const loading = ref(false);
    const router = useRouter();
    const handleLogout = () => {
      // loading.value = true;
      userStore.logout();
    };
    const merchantInfo = ref({});
    const triggerWidth = ref(0);
    const triggerRef = ref(null);
    const updateTriggerWidth = () => {
      nextTick(() => {
        console.log(triggerRef.value?.offsetWidth, 'triggerRef.value');
        if (triggerRef.value) {
          triggerWidth.value = triggerRef.value.offsetWidth;
          const popup = document.querySelector('.logout-popup');
          if (popup) {
            popup.style.width = `${triggerWidth.value}px`;
          }
        }
      });
    };

    onMounted(() => {
      updateTriggerWidth();
    });

    watch(()=> popupVisible.value, () => {
      if ( popupVisible.value) {
        updateTriggerWidth();
      }
    }, { immediate: true, deep: true });
    return () => {
      return (
        <>
          <div class="flex items-center absolute right-180 top-12 gap-8 h-32">
            {
              merchantInfo.value?.logo_url ? <img src={merchantInfo.value?.logo_url} class="size-32 rounded-full" alt="" /> : null
            }
            {
              merchantInfo.value?.name ? <div>{merchantInfo.value?.name}</div> : null
            }
          </div>
          <Popup
            v-model:visible={popupVisible.value}
            overlayClassName="logout-popup"
            trigger="click"
            v-slots={{
              content: () => {
                return (
                  <div class="flex items-center p-[8px] cursor-pointer w-full justify-center" onClick={() => {
                    visible.value = true;
                    popupVisible.value = false;
                  }}>
                    <img src={loadImage('logout.png')} alt="" class="size-[12px] mr-[6px]" />
                    <div class="text-[var(--td-text-color-secondary)] leading-[20px] text-[14px]">退出登录</div>
                  </div>
                )
              }
            }}  
          >
          <div 
            ref={triggerRef}
            class="text-[#222428] cursor-pointer flex items-center fixed top-[12px] right-[24px] bg-white rounded-[8px] px-[12px] py-[6px]"
          >
            <div class="mr-[12px]">{ userInfo?.name || userInfo?.username || userInfo?.mobile }</div>
            <ChevronDownIcon />
          </div>
        </Popup>

          {/* <div class="tetx-12 text-[#666] mb-12 px-20">v{VERSION}</div> */}
          <Dialog 
            visible={visible.value}
            confirmBtn={
              {
                theme: "danger",
                content: "确认",
                loading: loading.value
              }
            }
            header="退出登录"
            onConfirm={handleLogout}
            onClose={() => visible.value = false}
            cancelBtn={{
              variant: "outline"
            }}
          >
            <div>确认退出吗</div>
          </Dialog>
        </>
      );
    };
  },
});