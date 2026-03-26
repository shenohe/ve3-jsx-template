import "./style.less";
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { Layout, Header, Aside, Content, Footer } from "tdesign-vue-next";
import { RouterView, useRouter, useRoute } from "vue-router";
import { useAuthorizer } from "@/hooks";
import Menu from "./components/menu";
import Copyright from "./components/copyright";
import Forbidden from "./components/forbidden";
import Logo from "./components/logo";
import Logout from "./components/logout";
import Version from "./components/version";

export default defineComponent({
  setup(props, context) {
    // 
    const router = useRouter();
    const route = useRoute();
    const authorizer = useAuthorizer();

    // 
    const isAuthorized = computed(() => {
      const meta = route.meta;
      let bool = true;

      if (meta && meta.authority) {
        bool = authorizer(meta.authority);
      }

      return bool;
    });

    // Render
    return () => {
      return (
        <Layout class="agent-layout">
          <Layout class="agent-layout-body">
            <Aside class="agent-layout-sider">
              <Logo />
              <Menu />
              <Version />
            </Aside>
            <Layout class="agent-layout-main">
              <Content class="agent-layout-content bg-white">
                {
                  isAuthorized.value ? (
                    <RouterView key={route.fullPath} />
                  ) : (
                    <Forbidden />
                  )
                }
              </Content>
              <Logout />
              <Footer class="agent-layout-footer">
                <Copyright />
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      )
    };
  }
});