import "./style.less";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button, Checkbox, Form, FormItem, Input, MessagePlugin } from "tdesign-vue-next";
import { MobileIcon, LockOnIcon } from "tdesign-icons-vue-next";
import { useUserStore } from "@/store";
import { usePermissionStore } from "@/store/modules/permssions";

export default defineComponent({
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();

    const formRef = ref(null);
    const loading = ref(false);
    const appId = ref("demo");
    const formData = reactive({
      mobile: "",
      password: "",
      remember: true
    });

    const getAppIdFromRoute = () => {
      const routeAppId = route.params.appId || route.query.appId;
      if (typeof routeAppId === "string" && routeAppId.trim()) {
        return routeAppId.trim();
      }

      const cachedAppId = localStorage.getItem("LOGIN_APP_ID");
      if (cachedAppId && cachedAppId !== "undefined" && cachedAppId !== "null") {
        return cachedAppId;
      }

      return "demo";
    };

    const rules = {
      mobile: [{ required: true, message: "请输入手机号", type: "error" }],
      password: [{ required: true, message: "请输入密码", type: "error" }]
    };

    const handleSubmit = async ({ validateResult }) => {
      if (validateResult !== true) {
        return;
      }

      if (!/^1\d{10}$/.test(formData.mobile)) {
        MessagePlugin.error("请输入正确的 11 位手机号");
        return;
      }

      if (formData.password.length < 6) {
        MessagePlugin.error("密码长度至少 6 位");
        return;
      }

      loading.value = true;

      try {
        const currentAppId = getAppIdFromRoute();
        const mockToken = `mock_token_${Date.now()}`;
        const mockConfig = {
          app: {
            name: "模板系统",
            logo: "",
            faviconImg: ""
          }
        };

        await userStore.login({
          appId: currentAppId,
          token: mockToken,
          config: JSON.stringify(mockConfig),
          userInfo: {
            name: "模板用户",
            mobile: formData.mobile,
            roles: ["all"]
          }
        });

        await permissionStore.initRoutes(["all"]);

        localStorage.setItem("LOGIN_APP_ID", currentAppId);
        if (formData.remember) {
          localStorage.setItem("LOGIN_MOBILE", formData.mobile);
        } else {
          localStorage.removeItem("LOGIN_MOBILE");
        }

        MessagePlugin.success("登录成功（模拟）");
        router.replace(`/${currentAppId}/data-overview`);
      } catch (error) {
        MessagePlugin.error("登录失败，请重试");
      } finally {
        loading.value = false;
      }
    };

    const submitForm = () => {
      formRef.value?.submit();
    };

    onMounted(() => {
      appId.value = getAppIdFromRoute();
      const cachedMobile = localStorage.getItem("LOGIN_MOBILE");
      if (cachedMobile) {
        formData.mobile = cachedMobile;
      }
    });

    // Render
    return () => (
      <div class="login-page">
        <div class="login-panel">
          <div class="login-header">
            <h1 class="title">欢迎登录</h1>
            <p class="subtitle">当前应用：{appId.value}</p>
          </div>

          <Form
            ref={formRef}
            data={formData}
            rules={rules}
            labelWidth={0}
            onSubmit={handleSubmit}
          >
            <FormItem name="mobile">
              <Input
                v-model={formData.mobile}
                size="large"
                clearable
                maxlength={11}
                placeholder="请输入手机号"
                prefixIcon={() => <MobileIcon />}
              />
            </FormItem>

            <FormItem name="password">
              <Input
                v-model={formData.password}
                size="large"
                type="password"
                clearable
                maxlength={32}
                placeholder="请输入密码"
                prefixIcon={() => <LockOnIcon />}
                onEnter={submitForm}
              />
            </FormItem>

            <div class="login-actions">
              <Checkbox v-model={formData.remember}>记住手机号</Checkbox>
            </div>

            <Button
              block
              size="large"
              theme="primary"
              loading={loading.value}
              onClick={submitForm}
            >
              模拟登录
            </Button>
          </Form>
        </div>
      </div>
    );
  }
});
