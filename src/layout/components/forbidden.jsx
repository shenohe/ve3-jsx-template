import { defineComponent } from "vue";
import { Space, Button } from "tdesign-vue-next";
import { useRouter } from "vue-router";
import Result from "@/components/result";
import { useConfigStore } from "@/store";

export default defineComponent({
  setup(props, context) {
    // 
    const router = useRouter();
    const configStore = useConfigStore();
    const appid = configStore.getAppid;
    const gotoHomePage = () => {
      router.push({ path: `/${appid}` });
    };

    const gotoPrevPage = () => {
      if (window.history.length === 1) {
        router.push({ path: `/${appid}` });
      }
      else {
        router.back();
      }
    };

    // 渲染
    return () => {
      return (
        <Result
          style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: calc(100vh - 112px); margin:0; padding: 0; overflow: hidden;"
          status="403"
          title="403 Forbidden"
          description="很抱歉，您没有访问该页面的权限，请联系管理员！"
          v-slots={{
            extra: () => (
              <Space gutter={16}>
                <Button theme="primary" onClick={gotoHomePage}>返回首页</Button>
                <Button theme="default" onClick={gotoPrevPage}>上一页</Button>
              </Space>
            )
          }}
        />
      )
    };
  }
});