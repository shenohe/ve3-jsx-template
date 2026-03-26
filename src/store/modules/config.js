import { defineStore } from 'pinia';
import { store } from '@/store';
import { MessagePlugin } from 'tdesign-vue-next';
import { getCurrentAppIdFromRoute } from '@/libs/utils';

export const useConfigStore = defineStore('app-touch-config', {
  state: () => ({
    data: {}, // 以 appId 为键的对象结构: { appId1: { config }, appId2: { config } }
    type: 'object'
  }),
  getters: {
    // 根据当前路由自动获取对应的配置
    getConfig: (state) => {
      const appId = getCurrentAppIdFromRoute();
      if (!appId || appId === 'login' || appId === 'config') return {};
      return state.data[appId] || {};
    },
    // 根据当前路由自动获取 appId
    getAppid: () => {
      const appId = getCurrentAppIdFromRoute();
      return (appId && appId !== 'login' && appId !== 'config') ? appId : null;
    },
    // 获取指定 appId 的配置
    getConfigByAppId: (state) => (appId) => {
      return state.data[appId] || {};
    },
  },
  actions: {
    setConfig(config, appId) {
      if (!appId) return;
      
      if (!this.data[appId]) {
        this.data[appId] = {};
      }
      this.data[appId] = { ...this.data[appId], ...config };
    },
    // 清除指定 appId 的配置
    clearConfig(appId) {
      if (appId && this.data[appId]) {
        delete this.data[appId];
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['data', 'type'],
      },
    ],
  },
});

export function getConfigStore() {
  return useConfigStore(store);
}
