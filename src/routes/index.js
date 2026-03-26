// 生成带 appId 前缀的路由
const generateAppRoutes = (appId = ':appId') => {
  return [
    {
      path: `/${appId}/login`,
      meta: {
        title: "登录",
        icon: "",
        authority: "",
        addToMenu: false,
        addToBreadcrumb: false
      },
      component: () => import("@/pages/login")
    },
    {
      path: `/${appId}`,
      meta: {
        title: "首页",
        icon: "",
        authority: "",
        addToMenu: false,
        addToBreadcrumb: false
      },
      redirect: (to) => {
        // 使用路由参数中的实际 appId 值，而不是占位符
        const actualAppId = to.params.appId;
        return `/${actualAppId}/data-overview`;
      },
      component: () => import("@/layout"),
      children: [
        {
          path: `/${appId}/data-overview`,
          name: "data-overview",
          meta: {
            title: "数据总览",
            icon: "overview",
            authority: "",
            addToMenu: true,
          },
          component: () => import("@/pages/data-overview")
        },
      ]
    }
  ];
};

export default [
  {
    path: "/config",
    redirect: "/login"
  },
  {
    path: "/login",
    meta: {
      title: "登录",
      icon: "",
      authority: "",
      addToMenu: false,
      addToBreadcrumb: false
    },
    component: () => import("@/pages/login")
  },
  // 旧版本兼容路由（不带 appId 前缀）
  {
    path: "/",
    meta: {
      title: "首页",
      icon: "",
      authority: "",
      addToMenu: false,
      addToBreadcrumb: false
    },
    redirect: "/data-overview",
    component: () => import("@/layout"),
    children: [
      {
        path: "/data-overview",
        name: "data-overview-old",
        meta: {
          title: "数据总览",
          icon: "overview",
          authority: "",
          addToMenu: true,
        },
        component: () => import("@/pages/data-overview")
      },
    ]
  },
  // 新版本带 appId 前缀的路由
  ...generateAppRoutes(),
  {
    path: "/404",
    meta: {
      title: "404",
      icon: "",
      authority: "",
      addToMenu: false,
      addToBreadcrumb: false
    },
    component: () => import("@/pages/404")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
];
