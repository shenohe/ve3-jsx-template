import { defineComponent } from "vue";
import { Button } from "tdesign-vue-next";
import { useRouter } from "vue-router";
import Result from "@/components/result";
import { useConfigStore } from "@/store";

export default defineComponent({
  setup(props, context) {
    // 
    const router = useRouter();
    const configStore = useConfigStore();
    const appid = configStore.getAppid;
    // 
    const gotoHomePage = () => router.push({ path: `/${appid}` });

    // Render
    return () => {
      return (
        <Result
          style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: calc(100vh - 112px); margin:0; padding: 0; overflow: hidden;"
          status="404"
          title="404 Not Found"
          description="很抱歉，您当前访问的页面不存在！"
          v-slots={{
            extra: () => (
              <Button theme="primary" onClick={gotoHomePage}>返回首页</Button>
            )
          }}
        />
      );
    };
  }
});