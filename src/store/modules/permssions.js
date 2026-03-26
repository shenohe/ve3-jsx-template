import { defineStore } from 'pinia';
import router from '@/router';
import routes from '@/routes';
import { store } from '@/store';

function filterPermissionsRouters(routes, roles) {
  const res = [];
  const removeRoutes = [];
  routes.forEach((route) => {
    const children = [];
    route.children?.forEach((childRouter) => {
      const roleCode = childRouter.meta?.roleCode || childRouter.name;
      if (roles.indexOf(roleCode) !== -1) {
        children.push(childRouter);
      } else {
        removeRoutes.push(childRouter);
      }
    });
    if (children.length > 0) {
      route.children = children;
      res.push(route);
    }
  });
  return { accessedRouters: res, removeRoutes };
}

export const usePermissionStore = defineStore('app-touch-permission', {
  state: () => ({
    whiteListRouters: ['/login', '/service-agreement', '/privacy-agreement'],
    routers: [],
    removeRoutes: [],
    roleBtn: [],
  }),
  actions: {
    async initRoutes(roles) {
      let accessedRouters = [];

      let removeRoutes = [];
      // special token
      if (roles.includes('all')) {
        accessedRouters = routes;
      } else {
        const res = filterPermissionsRouters(routes, roles);
        accessedRouters = res.accessedRouters;
        removeRoutes = res.removeRoutes;
      }
      this.routers = accessedRouters;
      this.removeRoutes = removeRoutes;

      removeRoutes.forEach((item) => {
        if (router.hasRoute(item.name)) {
          router.removeRoute(item.name);
        }
      });
    },
    async restore() {
      this.removeRoutes.forEach((item) => {
        router.addRoute(item);
      });
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
