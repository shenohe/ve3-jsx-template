import axios from "axios";

// 创建一个新的 axios 实例，确保不携带 cookie
const axiosInstance = axios.create({
  withCredentials: false
});
import qs from "qs";
import config, { TENANT_NAME } from "@/config";
import router from "@/router";
import utils from "@/libs/utils";
import { getToken } from "@/libs/authorization";
import { useUserStore, useConfigStore } from "@/store";

// 跳转至登录页面
const gotoLoginPage = () => {
  const configStore = useConfigStore();
  const appid = configStore.getAppid;
  // 检查当前URL是否已经是登录页面，避免重复拼接redirect
  if (window.location.pathname === '/login') {
    // 如果已经在登录页面，直接跳转到登录页面，不添加redirect
    router.replace({ path: `/${appid}/login` });
    return;
  }
  
  // 获取当前URL参数
  const urlParams = new URLSearchParams(window.location.search);
  let redirectUrl = window.location.pathname;
  
  // 如果当前URL中已经有redirect参数，使用原始的redirect值
  if (urlParams.has('redirect')) {
    redirectUrl = urlParams.get('redirect');
  } else {
    // 如果没有redirect参数，使用当前完整路径
    redirectUrl = window.location.pathname + window.location.search;
  }
  
  // const route = {
  //   path: `/${appid}/login`,
  //   query: {
  //     redirect: redirectUrl
  //   }
  // };
  // router.replace(route);
};

// 全局配置
axiosInstance.defaults.baseURL = config.apiPath;
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.headers.post["Content-Type"] = axiosInstance.defaults.headers.put["Content-Type"] = "application/json";
// 请求拦截器  
axiosInstance.interceptors.request.use(config => {
  const userStore = useUserStore();
  const token = userStore.getToken;
  if (token) {
    config.headers["x-user-token"] = token;
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  
  // 对 GET 请求的参数进行序列化（恢复默认行为）
  if (config.method === "get" && !config.data) {
    config.paramsSerializer = params => qs.stringify(params, {
      arrayFormat: "repeat"
    });
  }
  // 只有当 Content-Type 为 application/x-www-form-urlencoded 时才进行字符串化
  else if ((config.method == "post" || config.method == "put") && config.headers["Content-Type"] == "application/x-www-form-urlencoded") {
    config.data = qs.stringify(config.data);
  }

  // 
  return config;
}, e => {
  // 定义错误消息对象
  let response = {
    code: -1,
    data: null,
    message: "请求异常，请稍后再试"
  };

  if (e.message) {
    response.message = e.message;
  }

  // 弹出错误提示
  utils.showErrorMessage(response.message);

  // 抛出错误
  return Promise.reject(response);
});

// 响应拦截器
axiosInstance.interceptors.response.use(result => {
  const response = result.data;
  // 只在开发环境打印响应日志，避免生产环境日志过多
  // 未登录或登录过期
  if (response.code == 4010000) {
    gotoLoginPage();
    return Promise.reject(response);
  }
  // 判断是否为流文件
  const responseType = result.config && result.config.responseType;
  const contentType = result.headers && result.headers['content-type'];
  if (
    responseType === 'blob' ||
    responseType === 'arraybuffer' ||
    (contentType && (
      contentType.includes('application/octet-stream') ||
      contentType.includes('application/pdf') ||
      contentType.includes('image/')
    ))
  ) {
    // 对于 blob 响应，需要检查是否是错误响应
    if (responseType === 'blob' && result.data instanceof Blob) {
      // 检查 content-type，如果是 JSON，很可能是错误响应
      if (contentType && contentType.includes('application/json')) {
        // 异步读取 blob 内容并检查是否是错误
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function(e) {
            try {
              const jsonData = JSON.parse(e.target.result);
              // 如果是错误响应，按正常错误处理
              if (jsonData.code && jsonData.code !== 0) {
                if (jsonData.code == 4010000) {
                  gotoLoginPage();
                  return reject(jsonData);
                }
                return reject(jsonData);
              }
              // 如果不是错误，返回原始结果
              resolve(result);
            } catch (parseError) {
              // 解析失败，说明不是 JSON 错误，返回原始结果
              resolve(result);
            }
          };
          reader.onerror = function() {
            // 读取失败，返回原始结果
            resolve(result);
          };
          reader.readAsText(result.data);
        });
      }
    }
    return result;
  }
  // 弹出错误提示
  if (![10004001, 0].includes(response.code)) {
    if (response.message !== "该桌贴样式已经绑定桌贴，请先在桌贴中解绑!") {
      utils.showErrorMessage(response.message);
    }
    throw new Error(response.message || '请求失败');
  }

  // 请求成功
  else if (response.code == 0) {
    return response;
  }
  // 其它情况
  else {
    return Promise.reject(response);
  }
}, e => {
  // 定义错误消息对象
  let response = {
    code: -1,
    data: null,
    message: "请求异常，请稍后再试"
  };

  if (e.response && e.response.data && e.response.data.message) {
    response.message = e.response.data.message;
  }
  else if (e.message.includes("timeout") && e.code === "ECONNABORTED") {
    response.message = "请求超时，请检查网络连接";
  }
  else {
    response.message = e.message;
  }

  // 弹出错误提示
  utils.showErrorMessage(response.message);

  // 抛出错误
  return Promise.reject(response);
});

// 
export default axiosInstance;
