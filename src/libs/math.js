// 求和
const sum = function() {
  let result = 0;

  for (let i = 0, length = arguments.length; i < length; i++) {
    const arg = arguments[i];

    if (!arg) {
      continue;
    }

    let value;

    switch(typeof arg) {
      case "number":
        value = arg;
        break;
      case "object":
        if (arg instanceof Array) {
          value = sum.apply(null, arg);
        }
        else {
          value = arg.valueOf();
        }
        break;
      case "function":
        value = arg();
        break;
      case "string":
        value = parseFloat(arg);
        break;
      case "boolean":
        value = NaN;
        break;
    }

    if (typeof value === "number" && !isNaN(value)) {
      result = plus(result, value);
    }
    else {
      throw new Error("math.sum: can not convert " + arg + " to number");
    }
  }

  return result;
};

// 加法运算
const plus = function(value, other) {
  let valueDigits = 0;
  let otherDigits = 0;

  try {
    valueDigits = value.toString().split(".")[1].length;
  }
  catch(e) {

  }

  try {
    otherDigits = other.toString().split(".")[1].length;
  }
  catch(e) {

  }

  const zoom = Math.pow(10, Math.max(valueDigits, otherDigits));

  return (mult(value, zoom) + mult(other, zoom)) / zoom;
};

// 减法运算
const minus = function(value, other) {
  let valueDigits = 0;
  let otherDigits = 0;

  try {
    valueDigits = value.toString().split(".")[1].length;
  }
  catch(e) {

  }

  try {
    otherDigits = other.toString().split(".")[1].length;
  }
  catch(e) {

  }

  const zoom = Math.pow(10, Math.max(valueDigits, otherDigits));

  return (mult(value, zoom) - mult(other, zoom)) / zoom;
};

// 乘法运算
const mult = function(value, other) {
  let digits = 0;

  value = value.toString();
  other = other.toString();

  try {
    digits += value.split(".")[1].length;
  }
  catch(e) {

  }

  try {
    digits += other.split(".")[1].length;
  }
  catch(e) {

  }

  return Number(value.replace(".", "")) * Number(other.replace(".", "")) / Math.pow(10, digits);
};

// 除法运算
const div = function(value, other) {
  let valueDigits = 0;
  let otherDigits = 0;

  value = value.toString();
  other = other.toString();

  try {
    valueDigits = value.split(".")[1].length;
  }
  catch(e) {

  }

  try {
    otherDigits = other.split(".")[1].length;
  }
  catch(e) {

  }

  return mult(Number(value.replace(".", "")) / Number(other.replace(".", "")), Math.pow(10, otherDigits - valueDigits));
};

// 导出所有
export default {
  plus,
  minus,
  mult,
  div
};