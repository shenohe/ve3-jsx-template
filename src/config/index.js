/**
* @type {object}
* @description 异步请求的基础路径，为空时表示使用相对域名
*/
export const apiPath = import.meta.env.VITE_API_PATH;

/**
* @type {string}
* @description 系统名称，用于在浏览器 Tab 标签中显示网页标题
*/
export const title = "全自动口碑裂变系统";

/**
* @type {array}
* @description 访问白名单，即无需登录即可访问的路由 path 或 name 列表
*/
export const whiteList = ["/login", "/404", '/config'];

export const TOKEN_NAME = 'TOKEN';
export const TENANT_NAME = 'TENANT';
export const USER_NAME = 'USER';
export const VERSION = '1.0.0';
/**
* @description 默认输出所有配置
*/
export default {
  apiPath,
  title,
  whiteList
};