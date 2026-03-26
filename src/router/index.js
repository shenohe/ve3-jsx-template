import { createRouter, createWebHistory } from "vue-router";
import routes from "@/routes";
import authorization from "@/libs/authorization";
import utils from "@/libs/utils";
import { useConfigStore } from '@/store/modules/config';
import { useUserStore } from '@/store/modules/user';
import { store } from '@/store';



// 路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "",
  linkExactActiveClass: "",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  }
});

// 重定向至首页
const gotoHomePage = (next) => {
  next({
    path: "/",
    replace: true
  });
};

// 重定向至登录页面
const gotoLoginPage = (to, next, appId = null) => {
  const configStore = useConfigStore(store);
  const targetAppId = appId || configStore.getAppid;
  
  if (targetAppId) {
    next({
      path: `/${targetAppId}/login`,
      replace: true
    });
  } else {
    next({
      path: "/login",
      replace: true
    });
  }
};

// 系统保留路由前缀（用于区分 appId 与固定路由）
const reservedRoutePrefixes = new Set([
  'login',
  'config',
  '404',
  'data-overview',
  'merchant-info',
  'product-service-management',
  'evaluation-dimension-management',
  'personnel-management',
  'material-management',
  'prompt-management',
  'channel-management',
  'table-sticker-style-management',
  'table-sticker-details'
]);

// 获取用户信息
const getUserDetails = async (next) => {
  // 如果已经获取用户信息，则直接进入
  // if (true) {
  //   next();
  // }
  // // 反之优先获取用户信息，再进行下一步
  // else {
  //   try {
  //     // 获取用户信息

  //     // 
  //     next();
  //   }
  //   catch(e) {
  //     console.log(e)
  //   }
  // }
};

// 路由前置守卫
router.beforeEach((to, from, next) => {
  const configStore = useConfigStore(store);
  const userStore = useUserStore(store);
  
  // 从路由路径中提取 appId
  const pathAppId = to.path.match(/^\/([^\/]+)/)?.[1];
  const queryOrParamAppId = to.query.appId || to.params.appId;
  let urlAppId = queryOrParamAppId || pathAppId;
  
  // 验证 appId 有效性，排除占位符和无效值
  if (urlAppId && (urlAppId.startsWith(':') || urlAppId === 'undefined' || urlAppId === 'null')) {
    urlAppId = null;
  }
  
  // 当 appId 来自路径首段时，过滤系统保留路由
  if (!queryOrParamAppId && urlAppId && reservedRoutePrefixes.has(urlAppId)) {
    urlAppId = null;
  }

  const storeAppId = configStore.getAppid;
  
  // 处理 /config 路由
  if (to.path === '/config') {
    next();
    return;
  }
  
  // 处理带 appId 前缀的路由
  if (urlAppId && !reservedRoutePrefixes.has(urlAppId)) {
    // 如果是 login 路由，直接放行
    if (to.path.endsWith('/login')) {
      next();
      return;
    }
    
    // 检查该 appId 的配置是否存在
    const configForAppId = configStore.getConfigByAppId(urlAppId);
    if (!configForAppId || Object.keys(configForAppId).length === 0) {
      // 模板模式下不再强依赖 /config 页面，缺少配置时统一进入该 appId 的登录页
      gotoLoginPage(to, next, urlAppId);
      return;
    }
    
    // 检查该 appId 是否有对应的 token
    const tokenForAppId = userStore.getTokenByAppId(urlAppId);
    
    if (tokenForAppId) {
      // 有 token，允许访问
      next();
    } else {
      // 没有 token，跳转到登录页
      if (utils.isWhitelisted(to)) {
        next();
      } else {
        gotoLoginPage(to, next, urlAppId);
      }
    }
    return;
  }
  
  // 处理旧版本路由（不带 appId 前缀）
  const token = userStore.getToken;
  
  // 获取当前路由实际对应的 appId（基于路由上下文）
  const routeBasedAppId = storeAppId;
  
  // 如果有有效的 appId 且没有 URL 中的 appId，重定向到带 appId 前缀的路由
  if (routeBasedAppId && !urlAppId && to.path !== '/login' && to.path !== '/config' && to.path !== '/404') {
    const newPath = `/${routeBasedAppId}${to.path}`;
    next({
      path: newPath,
      query: to.query,
      hash: to.hash,
      replace: true
    });
    return;
  }
  
  // 已登陆
  if (token) {
    next();
  }
  // 未登陆
  else {
    // 如果当前访问页面存在于白名单中，则直接进入
    if (utils.isWhitelisted(to)) {
      next();
    }
    // 反之重定向至登录页面
    else {
      gotoLoginPage(to, next);
    }
  }
});

// 路由后置守卫
router.afterEach((to, from) => {
  // 更新网页标题
  utils.setPageTitle(to);
});

// 
export default router;
