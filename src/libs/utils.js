import { MessagePlugin } from "tdesign-vue-next";
import config from "@/config";
import is from "@/libs/is";
import { store } from '@/store';
import { useConfigStore, useUserStore } from '@/store';
import { getToken } from "@/libs/authorization";
import router from "@/router";
/**
* 创建全局唯一标识
*/
export const guid = () => {
  let parts = [];

  for (let index = 1; index <= 32; index++) {
    let n = Math.floor(Math.random() * 16.0).toString(16);

    parts.push(n);

    if ((index == 8) || (index == 12) || (index == 16) || (index == 20)) {
      parts.push("-");
    }
  }

  return parts.join("");
};

// 用于生成指定长度的随机字符串
export const getRandomString = (length = 32) => {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var randomString = "";

  if (window.Uint8Array && window.crypto && window.crypto.getRandomValues) {
    var array = new window.Uint8Array(length * 2);

    window.crypto.getRandomValues(array);

    var bytes = Array.prototype.slice.call(array);

    for (var i = 0; i < length; i++) {
      randomString += chars.charAt(bytes[i] % chars.length);
    }
  }
  else {
    for (var i = 0; i < length; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  return randomString;
};

/**
* 数组或对象克隆（深拷贝）
* @param {Array/Object} value 拷贝数组或对象
*/
export const clone = value => {
  if (!is.array(value) && !is.json(value)) {
    return value;
  }

  let copy = is.array(value) ? [] : {};

  for (let key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      let target = value[key];

      copy[key] = clone(target);
    }
  }

  return copy;
};

/**
* 扁平化处理嵌套结构的列表数据
* @param {Array} list 数据列表
* @param {String} property 数据条目的子数据所对应的键值名称，可选，默认为 children 字段
* @param {Boolean} keep 扁平化处理时是否保留父级数据条目，可选，默认为 false 不保留
* @param {Function} predicate 谓词函数，用于判断是否展开子数据；可选
*/
export const flatten = (list, property = "children", keep = false, predicate) => {
  if (is.boolean(property)) {
    predicate = key;
    keep = property;
    property = "children";
  }

  let array = [];

  list.forEach(item => {
    let children = item[property];

    if (children) {
      if (keep) {
        array.push(item);
      }

      if (is.function(predicate) && !predicate(item)) {
        return;
      }

      array.push.apply(array, flatten(children, property, keep, predicate));
    }
    else {
      array.push(item);
    }
  });

  return array;
};

/**
* 将指定文本内容复制到剪贴板
* @param {String} text 待复制的文本内容
*/
export const clipboard = text => {
  return new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement("textarea");

      textarea.style.position = "absolute";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.border = "none";
      textarea.style.margin = "0";
      textarea.style.padding = "0";
      textarea.style.opacity = "0";
      textarea.value = text;

      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      resolve();
    }
    catch(e) {
      reject(e);
    }
  });
};

/**
* 数值格式化
* @param {Number/String} value 待格式化的数值
*/
const numeric = /^(-?)(\d*)(\.(\d+))?$/;
const nonnegativeinteger = /^\d+$/;
const thousandth = /\B(?=(\d{3})+(?!\d))/g;

export const numerical = (value, precision, suffix = "") => {
  if (typeof precision === "string") {
    suffix = precision;
    precision = undefined;
  }

  let string = String(value);
  let matched = string.match(numeric);

  if (!matched || string === "+" || string === "-") {
    return value ? value : "--";
  }
  else {
    if (nonnegativeinteger.test(precision)) {
      value = Number(value).toFixed(precision);
      string = String(value);
      matched = string.match(numeric);
    }

    let negative = matched[1];
    let int = matched[2] || "0";
    let decimal = matched[4] || "";

    int = int.replace(thousandth, ",");

    if (decimal) {
      decimal = `.${decimal}`;
    }

    return negative + int + decimal + suffix;
  }
};

/**
* URL 处理器
*/
export const urlparser = (url, key, value) => {
  if (is.json(key)) {
    for (let i in key) {
      url = urlparser(url, i, key[i]);
    }

    return url;
  }
  else if (is.undefined(value) || is.null(value)) {
    return url;
  }

  let regexp = new RegExp("(\\\?|&)" + key + "=([^&]+)(&|$)", "i");
  let result = url.match(regexp);

  if (result) {
    return url.replace(regexp, function (arg1, arg2, arg3) {
      return arg1.replace(arg3, encodeURIComponent(value));
    });
  }
  else {
    if (url.indexOf("?") === -1) {
      return url + "?" + key + "=" + encodeURIComponent(value);
    }
    else {
      return url + "&" + key + "=" + encodeURIComponent(value);
    }
  }
};

/**
* 用于加载 script 脚本文件
* @param {String} url URL地址
* @param {String} charset 编码格式
* @param {Function} callback 加载成功回调函数
*/
export const loadScript = function(url, charset, callback) {
  const script = document.createElement("script");

  if (typeof charset === "function") {
    callback = charset;
    charset = "UTF-8";
  }

  if (typeof callback === "function") {
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    }
    else {
      script.onload = function() {
        callback();
      };
    }
  }

  script.setAttribute("type", "text/javascript");
  script.setAttribute("charset", charset);
  script.setAttribute("src", url);

  document.head.appendChild(script);
};

/**
* 路由导航完成后根据当前路由对象的 meta.title 属性设置文档标题。若无 meta.title 属性，则设置成默认值
* @param {Object} route 路由对象
*/
export const setPageTitle = route => {
  let title;
  const configStore = useConfigStore(store);
  const newTitle = configStore.getConfig?.app?.name || configStore.getConfig?.oem?.name;
  if (route.meta && route.meta.title) {
    title = route.meta.title + (newTitle ? " - " + newTitle : "");
  }
  else {
    title = newTitle || '';
  }

  window.document.title = title;
};

/**
* 获取经过阉割后的路由对象，只提取需要的属性
* @param {Object} route 路由对象
* @param {Array} transfer 转换器，用于对路由对象的部分属性进行转换
*/
export const getPureRoute = (route, transfer) => {
  let target = {
    path: route.path,
    meta: {
      ...route.meta
    }
  };

  if (is.function(transfer)) {
    transfer(target);
  }

  if (route.children) {
    target.children = route.children.map(child => getPureRoute(child, transfer));
  }

  return target;
};

/**
* 根据 path 属性查找路由列表中的指定路由对象
* @param {Array} routes 路由列表
* @param {String} path 路由对象的 path 属性
* @param {Array} transfer 转换器，用于对路由对象的部分属性进行转换
*/
export const getRouteByPath = (routes, path, transfer) => {
  let i = 0;
  let length = routes.length;
  let target = {};

  while (i < length) {
    let route = routes[i];

    if (route.path === path) {
      target = getPureRoute(route, transfer);
      break;
    }
    else if (route.children && route.children.length > 0) {
      route = getRouteByPath(route.children, path);

      if (route.path) {
        target = getPureRoute(route, transfer);
        break;
      }
    }

    i++;
  }

  return target;
};

/**
* 根据用户权限过滤可访问页面路由（允许传递额外的谓词函数进行过滤）
* @param {Array} routes 路由列表
* @param {Function} predicate 谓词函数
*/
export const getRegisterRoutes = (routes, predicate) => {
  return routes.filter(route => {
    if (is.function(predicate) && !predicate(route)) {
      return false;
    }

    if (route.children) {
      route.children = getRegisterRoutes(route.children, predicate);

      // // 如果子菜单为空，则不显示当前菜单
      // if (route.children.length === 0) {
      //   return false;
      // }
    }

    return true;
  });
};

/**
* 通过路由配置解析菜单数据
* @param {Array} routes 路由列表
* @param {String} basePath 待解析的菜单列表所处的根路由路径
* @param {Function} transfer 转换器，用于对菜单项目的部分属性进行转换
*/
export const getMenuFromRoutes = (routes, basePath, transfer) => {
  const route = getRouteByPath(routes, basePath, transfer);
  let array = [];

  if (route && route.children) {
    array = getRegisterRoutes(route.children, target => target.meta && target.meta.addToMenu);
  }

  return array;
};

/**
* 根据当前路由对象的 matched 属性获取面包屑数据
* @param {Object} route 当前路由对象
* @param {Function} transfer 迭代转换器
*/
export const getBreadcrumbByRoute = (route, transfer) => {
  return route.matched.filter(route => route.meta && route.meta.addToBreadcrumb).map(route => getPureRoute(route, transfer));
};

/**
* 判断当前访问路由是否匹配白名单列表
* @param {Object} route 当前路由对象
*/
export const isWhitelisted = route => {
  // 检查完全匹配
  if (config.whiteList.includes(route.path)) {
    return true;
  }
  
  // 检查 /appId/login 格式的登录路由
  if (route.path.match(/^\/[^\/]+\/login$/)) {
    return true;
  }
  
  return false;
};

/**
* 判断用户操作/访问权限
* @param {String|Array} value 操作按钮、功能模块或页面的授权标识符或标识符列表
* @param {Array} permissions 用户权限列表
*/
export const authorize = (value, permissions) => {
  const predicate = permission => {
    return is.string(value) ? value === permission : value.includes(permission);
  };

  return permissions.some(predicate);
};

/**
* 显示加载提示
* @param {Object|String} options 消息配置对象或消息字符串
*/
export const showLoading = options => {
  if (!is.json(options)) {
    options = {
      duration: 0,
      content: options ? options : "Loading..."
    };
  }

  const loading = MessagePlugin.loading(options);

  return {
    close: () => {
      MessagePlugin.close(loading);
    }
  };
};

/**
* 显示消息
* @param {Object|String} options 消息配置对象或消息字符串
*/
export const showMessage = options => {
  if (!is.json(options)) {
    options = {
      duration: 3000,
      content: options ? options : "未知错误，请刷新页面后重试"
    };
  }

  const message = MessagePlugin.info(options);

  return {
    close: () => {
      MessagePlugin.close(message);
    }
  };
};

/**
* 显示成功消息
* @param {Object|String} options 消息配置对象或消息字符串
*/
export const showSuccessMessage = options => {
  if (!is.json(options)) {
    options = {
      duration: 3000,
      content: options ? options : "未知消息，请刷新页面后重试"
    };
  }

  const message = MessagePlugin.success(options);

  return {
    close: () => {
      MessagePlugin.close(message);
    }
  };
};

/**
* 显示警告消息
* @param {Object|String} options 消息配置对象或消息字符串
*/
export const showWarningMessage = options => {
  if (!is.json(options)) {
    options = {
      duration: 3000,
      content: options ? options : "未知消息，请刷新页面后重试"
    };
  }

  const message = MessagePlugin.warning(options);

  return {
    close: () => {
      MessagePlugin.close(message);
    }
  };
};

/**
* 显示错误消息
* @param {Object|String} options 消息配置对象或消息字符串
*/
export const showErrorMessage = options => {
  if (!is.json(options)) {
    options = {
      duration: 3000,
      content: options ? options : "未知错误，请刷新页面后重试"
    };
  }

  const message = MessagePlugin.error(options);

  return {
    close: () => {
      MessagePlugin.close(message);
    }
  };
};

export const getDesc = (value, list, field = 'label', defaultValue = '-') => {
  const item = list.find(item => item.value === value);
  return item ? item[field] : defaultValue;
}

export const uploadHandle = async (files, options = {}) => {
  const { showLoading: enableLoading = true, onSuccess } = options;
  
  // 如果传入的是单个文件，转换为数组
  const fileList = Array.isArray(files) ? files : [files];
  
  if (fileList.length === 0) {
    return {
      status: 'fail',
      error: '没有要上传的文件',
      results: []
    };
  }

  let loadingInstance = null;
  
  // 显示loading遮罩
  if (enableLoading) {
    loadingInstance = showLoading('正在准备上传...');
  }

  try {
    // 1. 单次获取签名
    const { data: res } = { res: {}};
    
    const uploadResults = [];
    let successCount = 0;
    let failCount = 0;

    // 2. 逐个上传文件
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      // 更新loading提示
      if (enableLoading && loadingInstance) {
        loadingInstance.close();
        loadingInstance = showLoading(`正在上传第 ${i + 1}/${fileList.length} 个文件...`);
      }

      try {
        // 3. 生成随机不重复的文件名
        const fileExtension = file.name.split('.').pop();
        const randomFileName = `${getRandomString(16)}_${Date.now()}.${fileExtension}`;
        const fullKey = `${res.dir}${randomFileName}`;
        console.log(res, fullKey);
        // 4. 构建表单数据
        let formData = new FormData();
        formData.append("success_action_status", "200");
        formData.append("policy", res.policy);
        formData.append("x-oss-signature", res.signature);
        formData.append("x-oss-signature-version", res.signatureVersion);
        formData.append("x-oss-credential", res.credential);
        formData.append("x-oss-date", res.date);
        formData.append("key", fullKey); // 完整的文件路径
        formData.append("x-oss-security-token", res.securityToken);
        formData.append("callback", res.callback);
        formData.append("file", file.raw || file); // 支持不同的文件对象格式

        // 5. 上传单个文件
        const uploadResponse = await fetch(res.customHost, {
          method: 'POST',
          body: formData,
          headers: {
            "x-oss-forbid-overwrite": "true"
          }
        });

        if (uploadResponse.ok) {
          const info = {
            status: 'success',
            originalName: file.name,
            url: `${res.customHost}/${fullKey}`,
            size: file.size,
            type: file.type
          }
          uploadResults.push(info);
          onSuccess && onSuccess(info);
          successCount++;
        } else {
          throw new Error(`上传失败，HTTP状态: ${uploadResponse.status}`);
        }

      } catch (fileError) {
        console.error(`文件 ${file.name} 上传失败:`, fileError);
        uploadResults.push({
          status: 'fail',
          originalName: file.name,
          error: fileError.message || '上传失败',
          size: file.size,
          type: file.type
        });
        failCount++;
      }
    }

    // 关闭loading
    if (enableLoading && loadingInstance) {
      loadingInstance.close();
    }

    // 6. 返回结果（只要有一个成功就算成功）
    const finalStatus = successCount > 0 ? 'success' : 'fail';
    
    return {
      status: finalStatus,
      response: {
        files: uploadResults?.filter(item => item.status === 'success')?.map(item => {
          return {
            name: item.originalName,
            url: item.url
          }
        }) ?? [],
        results: uploadResults,
        summary: {
          total: fileList.length,
          success: successCount,
          fail: failCount
        },
        ...(finalStatus === 'fail' ? {
          error: failCount === fileList.length ? '所有文件上传失败' : `${failCount} 个文件上传失败`
        } : {})
      }
    };

  } catch (error) {
    console.error('上传过程出错:', error);
    
    // 关闭loading
    if (enableLoading && loadingInstance) {
      loadingInstance.close();
    }
    return {
      status: 'fail',
      response: {
        error: error.message || '上传失败',
        results: fileList.map(file => ({
          status: 'fail',
          originalName: file.name,
          error: '签名获取失败或网络错误',
          size: file.size,
          type: file.type
        })),
        summary: {
          total: fileList.length,
          success: 0,
          fail: fileList.length
        }
      }
    };
  }
};

export const downloadBlobFile = (blob, filename) => {
  if (!blob) {
    return;
  }
  
  // 如果是 Blob 或 File，直接下载
  if (blob instanceof Blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    return;
  }
  // 如果是字符串（base64 或二进制字符串），尝试转换为 Blob
  if (typeof blob === 'string') {
    let byteString, ab, ia;
    // 判断是否为 base64 字符串
    const isBase64 = /^([A-Za-z0-9+/=]+)$/.test(blob.replace(/\s/g, ''));
    try {
      if (isBase64) {
        byteString = atob(blob);
      } else {
        byteString = blob;
      }
      ab = new ArrayBuffer(byteString.length);
      ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      // 默认用 xlsx 类型，可根据需要调整
      const fileBlob = new Blob([ab], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(fileBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      return;
    } catch (e) {
      console.warn('downloadBlobFile: 字符串转Blob失败', e);
      return;
    }
  }
  // 其他类型不支持
  console.warn('downloadBlobFile: 参数不是Blob、File或可识别的字符串', blob);
}

// 动态设置 favicon
export const setFavicon = () => {
  const configStore = useConfigStore(store);
  const favicon = configStore.getConfig?.app?.faviconImg || configStore.getConfig?.oem?.faviconImg;
  console.log(configStore.getConfig, favicon);
  if (!favicon) return;
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  // 根据图片后缀设置 type
  let type = '';
  if (favicon.endsWith('.png')) type = 'image/png';
  else if (favicon.endsWith('.ico')) type = 'image/x-icon';
  else if (favicon.endsWith('.svg')) type = 'image/svg+xml';
  else if (favicon.endsWith('.jpg') || favicon.endsWith('.jpeg')) type = 'image/jpeg';
  else type = '';
  if (type) link.type = type;
  else link.removeAttribute('type');
  // 加防缓存参数
  link.href = `${favicon}${favicon.includes('?') ? '&' : '?'}v=${Date.now()}`;
}
export const createPreviewUrl = (fileItem) => {
  try {
    // 如果已经是完整的URL字符串（http/https/blob），直接返回
    if (typeof fileItem === 'string') {
      if (fileItem.startsWith('http') || fileItem.startsWith('blob:')) {
        return fileItem;
      }
      // 如果是相对路径，需要处理
      return fileItem;
    }
    
    // 如果有url属性，直接使用
    if (fileItem && fileItem.url) {
      return fileItem.url;
    }
    
    // 处理File对象或Blob对象
    let file = null;
    if (fileItem && fileItem.raw instanceof File) {
      file = fileItem.raw;
    } else if (fileItem && fileItem.raw instanceof Blob) {
      file = fileItem.raw;
    } else if (fileItem instanceof File) {
      file = fileItem;
    } else if (fileItem instanceof Blob) {
      file = fileItem;
    }
    
    if (file) {
      // 创建 blob URL
      const blobUrl = URL.createObjectURL(file);
      console.log('Created blob URL:', blobUrl); // 调试用
      return blobUrl;
    }
    
    console.warn('Unable to create preview URL for:', fileItem);
    return '';
    
  } catch (error) {
    console.error('Error creating preview URL:', error, fileItem);
    return '';
  }
};

/**
 * Base64 解码工具函数
 * @param {string} base64String - Base64 编码的字符串
 * @returns {string} 解码后的文本
 */
export const decodeBase64 = (base64String) => {
  try {
    // 安全检查输入
    if (!base64String || typeof base64String !== 'string') {
      console.warn('Base64 解码：输入无效')
      return base64String || ''
    }

    // 处理可能的填充问题
    let paddedBase64 = base64String
    while (paddedBase64 && paddedBase64.length % 4) {
      paddedBase64 += '='
    }
    
    // 在浏览器环境中使用 atob
    if (typeof atob !== 'undefined') {
      const decodedData = atob(paddedBase64)
      // 处理中文字符的 UTF-8 解码
      return decodeURIComponent(escape(decodedData))
    }
    
    // 在 Node.js 环境中使用 Buffer
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(paddedBase64, 'base64').toString('utf-8')
    }
    
    // 手动实现 Base64 解码（备用方案）
    return manualBase64Decode(paddedBase64)
  } catch (error) {
    console.warn('Base64 解码失败:', error)
    return base64String || '' // 解码失败时返回原始字符串
  }
}

/**
 * 手动 Base64 解码实现
 * @param {string} base64 - Base64 字符串
 * @returns {string} 解码后的文本
 */
const manualBase64Decode = (base64) => {
  // 安全检查输入
  if (!base64 || typeof base64 !== 'string') {
    return ''
  }

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let result = ''
  let i = 0
  
  base64 = base64.replace(/[^A-Za-z0-9+/]/g, '')
  
  while (i < base64.length) {
    const encoded1 = chars.indexOf(base64.charAt(i++))
    const encoded2 = chars.indexOf(base64.charAt(i++))
    const encoded3 = chars.indexOf(base64.charAt(i++))
    const encoded4 = chars.indexOf(base64.charAt(i++))
    
    const bitmap = (encoded1 << 18) | (encoded2 << 12) | (encoded3 << 6) | encoded4
    
    result += String.fromCharCode((bitmap >> 16) & 255)
    if (encoded3 !== 64) result += String.fromCharCode((bitmap >> 8) & 255)
    if (encoded4 !== 64) result += String.fromCharCode(bitmap & 255)
  }
  
  // 处理 UTF-8 解码
  try {
    return decodeURIComponent(escape(result))
  } catch (e) {
    return result
  }
}


/**
 * 流式 Base64 文本处理器 - 专门处理服务端格式：data:xxxxx
 * @param {string} url - 请求URL
 * @param {Object} data - 请求数据
 * @param {Function} onTextUpdate - 文本更新回调 (accumulatedText, info)
 * @param {Object} options - 其他选项
 * @returns {Object} 控制对象 { cancel, getIsCompleted }
 */
export const streamBase64Text = (url, data, onTextUpdate, options = {}) => {
  const {
    onStart = () => {},
    onComplete = () => {},
    onError = () => {},
    debug = false,
    timeout = 30000
  } = options

  let accumulatedText = ''
  let isCompleted = false
  let controller = null
  let dataBuffer = ''
  let reader = null

  // 节流 onTextUpdate
  let lastUpdate = 0
  let pendingUpdate = null
  const throttledOnTextUpdate = (text, info) => {
    const now = Date.now()
    if (now - lastUpdate > 50) {
      lastUpdate = now
      onTextUpdate(text, info)
    } else {
      pendingUpdate = { text, info }
      setTimeout(() => {
        if (pendingUpdate) {
          onTextUpdate(pendingUpdate.text, pendingUpdate.info)
          pendingUpdate = null
          lastUpdate = Date.now()
        }
      }, 50)
    }
  }

  // 安全的日志输出函数 - 避免特殊字符导致 vconsole 错误
  const safeLog = (level, message, data = null) => {
    if (!debug) return
    try {
      console[level](`[StreamBase64Text] ${message}`, data)
    } catch (e) {
      console.warn('[StreamBase64Text] 日志输出出错，切换到静默模式')
    }
  }

  if (debug) {
    safeLog('log', '开始请求:', { url, data })
    safeLog('log', '🔍 Source Map 测试 - 这条日志应该显示在 utils/index.js 的正确行号')
  }

  if (typeof AbortController !== 'undefined') {
    controller = new AbortController()
  }

  onStart()

  const timeoutId = setTimeout(() => {
    if (!isCompleted) {
      isCompleted = true
      if (controller) controller.abort()
      onError(new Error('请求超时'))
    }
  }, timeout)
  const userStore = useUserStore(store);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userStore.getToken}`
    },
    body: JSON.stringify(data),
    signal: controller?.signal
  }

  fetch(url, fetchOptions)
    .then(async response => {
      if (debug) safeLog('log', '响应状态:', response.status)
      console.log(response, 'response')
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      if (!response.body) throw new Error('ReadableStream not supported')
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const json = await response.json();
        if (json.code == 4010000) {
          const route = {
            path: "/login",
          };
          router.replace(route);
          return;
        } else {
          MessagePlugin.error(json.message);
        }
        throw new Error(`Network Error! status: ${json.code}`);
      }
      reader = response.body.getReader()
      const decoder = new TextDecoder("utf-8");
      while (!isCompleted) {
        let done, value
        try {
          ({ done, value } = await reader.read())
        } catch (streamError) {
          isCompleted = true;
          // console.log(streamError, 'streamError')
          // throw streamError
        }
        if (isCompleted) {
          clearTimeout(timeoutId)
          onComplete(String(accumulatedText || ''), { reason: 'natural', totalLength: String(accumulatedText || '').length })
          break
        }
        if (!value && !done) continue
        const chunk = decoder.decode(value || new Uint8Array(), { stream: true })
        dataBuffer = (dataBuffer || '') + (chunk || '')
        if (dataBuffer) {
          dataBuffer = processDataLines(dataBuffer)
        }
        if (done) {
          if (dataBuffer) {
            processDataLines(dataBuffer)
            dataBuffer = ''
          }
          isCompleted = true;
          clearTimeout(timeoutId)
          onComplete(String(accumulatedText || ''), { reason: 'natural', totalLength: String(accumulatedText || '').length })
          break
        }
      }
    })
    .catch(error => {
      console.log(error, 'error')
      if (!isCompleted) {
        isCompleted = true
        clearTimeout(timeoutId)
        if (debug) {
          safeLog('error', '请求错误:', error.message)
        }
        onError(error)
      }
    })

  /**
   * 处理数据行的函数
   * @param {string} buffer
   * @returns {string} 剩余未处理的buffer
   */
  const processDataLines = (buffer) => {
    if (!buffer || typeof buffer !== 'string') {
      if (debug) safeLog('warn', '缓冲区为空或无效，跳过处理')
      return ''
    }
    const parts = buffer.split("\n");
    buffer = parts.pop(); // 剩余未处理部分
    
    let currentEventType = 'message' // 默认事件类型为message
    let currentData = ''
    
    for (const line of parts) {
      if (!line) continue
      const trimmedLine = line.trim()
      if (!trimmedLine) continue
      if (debug) safeLog('log', '处理行:', trimmedLine)
      
      // 处理event类型
      if (trimmedLine.startsWith('event:')) {
        currentEventType = trimmedLine.slice(6).trim()
        if (debug) safeLog('log', '检测到事件类型:', currentEventType)
        continue
      }
      
      // 处理data内容
      if (trimmedLine.startsWith('data:')) {
        currentData = trimmedLine.slice(5).trim()
        
        // 如果是error事件类型，直接触发错误回调并结束
        if (currentEventType === 'error') {
          if (!isCompleted) {
            isCompleted = true
            clearTimeout(timeoutId)
            try { reader.cancel && reader.cancel() } catch (e) { if (debug) safeLog('warn', '关闭 reader 时出错:', e.message) }
            // error信息不需要解码，直接透传
            onError(new Error(currentData))
            // onComplete(String(accumulatedText || ''), { reason: 'error', totalLength: String(accumulatedText || '').length })
          }
          break
        }
        
        // 只有message类型才进行正常渲染
        if (currentEventType === 'message') {
          if (!currentData) continue
          try {
            const decodedText = (() => {
              try {
                return decodeBase64(currentData)
              } catch (e) {
                if (debug) safeLog('warn', 'Base64 解码异常，跳过:', e.message)
                return ''
              }
            })()
            if (decodedText && decodedText !== currentData) {
              accumulatedText = String(accumulatedText || '') + String(decodedText || '')
              throttledOnTextUpdate(accumulatedText, {
                isGenerating: !isCompleted,
                newContent: decodedText,
                originalChunk: currentData,
                totalLength: accumulatedText.length
              })
            } else {
              if (debug) safeLog('warn', 'Base64 解码失败或无效，跳过内容长度:')
            }
          } catch (e) {
            if (debug) safeLog('warn', 'Base64 解码异常，跳过:', e.message)
          }
        }
        
        // 重置事件类型为默认值
        currentEventType = 'message'
        continue
      }
      
      // 处理结束标志
      if (trimmedLine === '[DONE]' || trimmedLine === 'data:[DONE]') {
        if (!isCompleted) {
          isCompleted = true
          clearTimeout(timeoutId)
          try { reader.cancel && reader.cancel() } catch (e) { if (debug) safeLog('warn', '关闭 reader 时出错:', e.message) }
          onComplete(String(accumulatedText || ''), { reason: 'marker', totalLength: String(accumulatedText || '').length })
        }
        break
      }
    }
    return buffer // 返回剩余未处理部分
  }

  return {
    cancel: () => {
      if (!isCompleted) {
        clearTimeout(timeoutId)
        if (controller) controller.abort()
        if (reader && reader.cancel) {
          try { reader.cancel() } catch (e) { if (debug) safeLog('warn', '手动取消时关闭 reader 出错:', e.message) }
        }
      }
    },
    /**
     * 获取流是否已完成
     * @returns {boolean}
     */
    getIsCompleted: () => isCompleted
  }
}
// 
/**
* 判断是否是移动端浏览器内核
*/
export const isMobile = () => {
  const userAgent = navigator.userAgent;
  
  // 移动设备关键词检测
  const mobileKeywords = [
    'Mobile', 'Android', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 
    'Windows Phone', 'webOS', 'Opera Mini', 'IEMobile'
  ];
  
  // 检查 User Agent 中是否包含移动设备关键词
  const hasMobileKeyword = mobileKeywords.some(keyword => 
    userAgent.includes(keyword)
  );
  
  // 检查屏幕宽度（作为辅助判断）
  const hasSmallScreen = window.screen && window.screen.width <= 768;
  
  // 检查触摸事件支持
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // 综合判断
  return hasMobileKeyword || (hasSmallScreen && hasTouchSupport);
};
// 从当前路由获取 appId 的工具函数
export const getCurrentAppIdFromRoute = () => {
  const currentRoute = router.currentRoute.value;
  
  // 优先从 query 参数获取
  if (currentRoute.query.appId) {
    return currentRoute.query.appId;
  }
  
  // 从 params 获取
  if (currentRoute.params.appId) {
    return currentRoute.params.appId;
  }
  
  // 从路径提取，但要排除已知的系统路由和路由参数占位符
  const pathAppId = currentRoute.path.match(/^\/([^\/]+)/)?.[1];
  const systemRoutes = ['login', 'config', '404', 'merchant-info', 'product-service-management', 
                       'evaluation-dimension-management', 'personnel-management', 'material-management', 
                       'prompt-management', 'channel-management', 'table-sticker-style-management', 
                       'table-sticker-details', 'data-overview'];
  
  // 如果提取的路径段不是系统路由且不是路由参数占位符，则认为是 appId
  if (pathAppId && 
      !systemRoutes.includes(pathAppId) && 
      !pathAppId.startsWith(':') && // 排除 :appId 这样的占位符
      pathAppId !== 'undefined' && 
      pathAppId !== 'null') {
    return pathAppId;
  }
  
  return null;
};

export default {
  // 
  guid,
  getRandomString,
  clone,
  flatten,
  clipboard,
  numerical,
  urlparser,
  loadScript,
  // 
  setPageTitle,
  // 
  getPureRoute,
  getRouteByPath,
  getRegisterRoutes,
  getMenuFromRoutes,
  getBreadcrumbByRoute,
  // 
  isWhitelisted,
  authorize,
  // 
  showLoading,
  showMessage,
  showSuccessMessage,
  showWarningMessage,
  showErrorMessage,
  downloadBlobFile,
  isMobile
};