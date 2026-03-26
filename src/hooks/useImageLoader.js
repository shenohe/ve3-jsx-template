// 优化后的 useImageLoader
const imageCache = new Map();

export default function useImageLoader() {
  return (path) => {
    if (!path) return '';
    
    // 检查缓存
    if (imageCache.has(path)) {
      return imageCache.get(path);
    }
    
    let result;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      result = path;
    } else {
      result = new URL(`/src/images/${path}`, import.meta.url).href;
    }
    
    // 缓存结果
    imageCache.set(path, result);
    return result;
  };
}
