import { defineStore } from 'pinia';
import { TOKEN_NAME, TENANT_NAME, USER_NAME } from '@/config/index';
import { store, usePermissionStore, useConfigStore } from '@/store';
import { MessagePlugin } from 'tdesign-vue-next';
import router from '@/router';
import { getCurrentAppIdFromRoute } from '@/libs/utils';



export const useUserStore = defineStore('app-touch-user', {
  state: () => ({
    data: {}, // 以 appId 为键的对象结构: { appId1: { token, userInfo }, appId2: { token, userInfo } }
    type: 'object'
  }),
  getters: {
    // 根据当前路由自动获取对应的角色信息
    roles: (state) => {
      const appId = getCurrentAppIdFromRoute();
      if (!appId || appId === 'login' || appId === 'config') return null;
      return state.data[appId]?.userInfo?.roles;
    },
    // 根据当前路由自动获取对应的 token
    getToken: (state) => {
      const appId = getCurrentAppIdFromRoute();
      if (!appId || appId === 'login' || appId === 'config') return null;
      return state.data[appId]?.token;
    },
    // 获取指定 appId 的 token
    getTokenByAppId: (state) => (appId) => {
      return state.data[appId]?.token;
    },
    // 获取指定 appId 的用户信息
    getUserInfoByAppId: (state) => (appId) => {
      return state.data[appId]?.userInfo;
    },
  },
  actions: {
    async login(info) {
      const configStore = useConfigStore(store);
      const appId = info.appId;
      
      if (info.config) {
        configStore.setConfig(JSON.parse(info.config), appId);
      }
      
      // 初始化该 appId 的数据结构
      if (!this.data[appId]) {
        this.data[appId] = {};
      }
      
      this.data[appId].token = info.token;
      this.data[appId].userInfo = info.userInfo;
      
      try {
        const res = {};
        console.log(res, 'res');
      } catch (error) {
        console.log(error, 'error');
        this.logout(appId);
      }
    },
    async getUserInfo() {
      const res = {};
      const tenant = res?.data?.tenants?.[0];
      console.log(tenant, 'tenant');
      if (tenant) {
        localStorage.setItem(TENANT_NAME, JSON.stringify(tenant));
        this.tenantInfo = tenant;
        const userInfo = {};
        console.log(userInfo, 'userInfo');
        this.userInfo = { ...userInfo?.data, roles: ['all'] };
      } else {
        MessagePlugin.error('暂无当前用户信息，请联系商户管理员');
        return
      }
    },
    async logout(appId = null) {
      const targetAppId = appId || getCurrentAppIdFromRoute();
      if (targetAppId && this.data[targetAppId]) {
        delete this.data[targetAppId];
      }
      
      if (targetAppId) {
        router.push(`/${targetAppId}/login`);
      } else {
        router.push('/login');
      }
    },
    async removeToken(appId = null) {
      const targetAppId = appId || getCurrentAppIdFromRoute();
      if (targetAppId && this.data[targetAppId]) {
        this.data[targetAppId].token = '';
      }
    },
    // 清除指定 appId 的所有数据
    clearAppData(appId) {
      if (this.data[appId]) {
        delete this.data[appId];
      }
    }
  },
  persist: {
    afterRestore: (ctx) => {
      if (ctx.store.roles && ctx.store.roles.length > 0) {
        const permissionStore = usePermissionStore();
        permissionStore.initRoutes(ctx.store.roles);
      }
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
