// 谓词函数，用于检测变量类型
/* ---------------------------------------------------------------------------------------------------- */
const userAgent = window.navigator.userAgent.toLowerCase();

const funProto = Function.prototype;
const objProto = Object.prototype;

const getPrototypeOf = Object.getPrototypeOf;

const objToString = objProto.toString;
const hasOwnProperty = objProto.hasOwnProperty;
const funToString = funProto.toString;

// 检查是否为移动端设备
export function isMobile() {
  return /phone|pad|pod|iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone/i.test(userAgent);
};

// 检查是否为 iOS 设备
export function isIOS() {
  return /iphone|ipad|ipod|ios|macintosh|mac os/i.test(userAgent);
};

// 检查是否为 Android 设备
export function isAndroid() {
  return /android/i.test(userAgent);
};

// 检查是否为微信客户端环境
export function isWechat() {
  return /MicroMessenger/i.test(userAgent);
};

// 检查是否为支付宝客户端环境
export function isAlipay() {
  return /AlipayClient/i.test(userAgent || window.navigator.vendor || window.opera);
};

// 检查给定的值是否是 dom 元素
export function isElement(value) {
  return !!(value && value.nodeType === 1);
};

// 检查给定的值是否是 undefined
export function isUndefined(value) {
  return value === void 0;
};

// 检查给定的值是否是 null
export function isNull(value) {
  return value === null;
};

// 检查给定的值是否是 NaN，这和原生的 isNaN 函数不一样，如果变量是 undefined，原生的 isNaN 函数也会返回 true
export function isNaN(value) {
  return window.isNaN(value) && value !== value;
};

// 检查给定的值是否是数值
export function isNumber(value) {
  return objToString.call(value) === "[object Number]" && !isNaN(value);
};

// 检查给定的值是否是整数
export function isInteger(value) {
  return isNumber(value) && Number.isInteger(value);
};

// 检查给定的值是否是字符串
export function isString(value) {
  return objToString.call(value) === "[object String]";
};

// 检查给定的值是否是布尔值
export function isBoolean(value) {
  return value === true || value === false || objToString.call(value) === "[object Boolean]";
};

// 检查给定的值是否是正则表达式
export function isRegExp(value) {
  return objToString.call(value) === "[object RegExp]";
};

// 检查给定的值是否是日期对象
export function isDate(value) {
  return objToString.call(value) === "[object Date]" && !isNaN(value.getTime());
};

// 检查给定的值是否是函数
export function isFunction(value) {
  return objToString.call(value) === "[object Function]" || typeof value === "function";
};

// 检查给定的值是否是数组
export function isArray(value) {
  return objToString.call(value) === "[object Array]";
};

// 检查给定的值是否是对象
export function isObject(value) {
  return !!value && typeof value === "object";
};

// 检查给定的值是否是纯对象，纯对象是指通过 {} 或 new Object() 声明的对象
export function isPlainObject(value) {
  if (!value || objToString.call(value) !== "[object Object]") {
    return false;
  }

  var prototype = getPrototypeOf(value);

  if (prototype === null) {
    return true;
  }

  var constructor = hasOwnProperty.call(prototype, "constructor") && prototype.constructor;

  return typeof constructor === "function" && funToString.call(constructor) === funToString.call(Object);
};

// 以默认导出的形式导出所有谓词函数
/* ---------------------------------------------------------------------------------------------------- */
export default {
  mobile: isMobile,
  ios: isIOS,
  android: isAndroid,
  wechat: isWechat,
  alipay: isAlipay,
  element: isElement,
  undefined: isUndefined,
  null: isNull,
  nan: isNaN,
  number: isNumber,
  integer: isInteger,
  string: isString,
  boolean: isBoolean,
  regexp: isRegExp,
  date: isDate,
  function: isFunction,
  array: isArray,
  object: isObject,
  json: isPlainObject
};