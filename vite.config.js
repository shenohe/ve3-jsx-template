import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteRestart from "vite-plugin-restart";
import svgLoader from 'vite-svg-loader';
// import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { TDesignResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  return {
    base: "/",
    resolve: {
      // 为工程文件目录设置别名
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      },
      // 忽略模块后缀名
      extensions: [".js", ".ts", ".jsx", "tsx", ".mjs", ".json", ".vue"]
    },
    optimizeDeps: {
      exclude: ['autoprefixer']
    },
    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
      viteRestart({
        restart: [
          "vite.config.js"
        ]
      }),
      // visualizer({
      //   open: false
      // }),
      AutoImport({
        resolvers: [
          TDesignResolver({
            library: "vue-next"
          })
        ]
      }),
      Components({
        resolvers: [
          TDesignResolver({
            library: "vue-next"
          })
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      // 将 host 配置为 0.0.0.0，启动本地服务后将自动切换为本机IP地址
      host: "0.0.0.0",
      // 本地服务端口
      port: 3007,
      // 启动本地服务后自动以默认浏览器打开工程
      open: true,
      proxy: {
        '/api': {
          target: 'https://hunyu-agent-app.anthead.net', // 测试环境
          // target: 'https://agent-app.hunyutech.com', // 线上
          // target: 'http://192.168.6.148:7200', // ljw
        // target: 'http://192.168.6.20:7001', // mt
        // target: 'http://172.30.1.201:7001', // dev
        // target: 'http://192.168.5.225:7001', // wgc
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求；设置为 0 可以完全禁用此项
      assetsInlineLimit: 0,
      // 启用 CSS 代码拆分；当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取
      // 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      cssCodeSplit: true,
      // 规定触发警告的 chunk 大小，以 kb 为单位
      chunkSizeWarningLimit: 1024,
      // 
      modulePreload: {
        polyfill: true // 预加载
      },
      // 构建后是否生成 source map 文件
      sourcemap: false,
      // 自定义 Rollup 打包配置
      rollupOptions: {
        input: "index.html",
        output: {
          // 指定入口文件的打包存放路径及名称配置
          entryFileNames: `js/[name].[hash].js`,
          // 指定代码分割产生的 chunk 文件的打包存放路径及名称配置
          chunkFileNames: `js/[name].[hash].js`,
          // // 手动控制分包逻辑（分割 vendors 包，将指定的第三方依赖包单独打包）
          // manualChunks: {
          //   "vue": ["vue"],
          //   "vue-router": ["vue-router"],
          //   "vue-request": ["vue-request"],
          //   "tdesign": ["tdesign-vue-next"],
          //   "tdesign-icons": ["tdesign-icons-vue-next"]
          // },
          // 手动控制分包逻辑（分割 vendors 包，将指定的第三方依赖包单独打包）
          manualChunks(id) {
            // 将 vue 单独分包
            if (id.includes("node_modules/vue/")) {
              return "vue";
            }
            // 将 vue-router 单独分包
            else if (id.includes("node_modules/vue-router/")) {
              return "vue-router";
            }
            // 将 vue-request 单独分包
            else if (id.includes("node_modules/vue-request/")) {
              return "vue-request";
            }
            // 将 tdesign 框架单独分包
            else if (id.includes("node_modules/tdesign-vue-next")) {
              return "tdesign";
            }
            // 将 tdesign-icons 图标库单独分包
            else if (id.includes("node_modules/tdesign-icons-vue-next")) {
              return "tdesign-icons";
            }
          },
          // 指定静态资源文件的打包存放路径及名称配置
          assetFileNames: assetInfo => {
            if (/\.(jpg|jpeg|png|gif|svg|psd|ai|bmp|cdr|dxf|eps|exif|fpx|pcd|pcx|raw|tga|tif|ufo|webp|WMF)$/.test(assetInfo.name)) {
              return `images/[name].[hash].[ext]`;
            }
            else if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
              return `medias/[name].[hash].[ext]`;
            }
            else if (/\.css$/.test(assetInfo.name)) {
              return `css/[name].[hash].[ext]`;
            }
            else {
              return `[ext]/[name].[hash].[ext]`;
            }
          }
        }
      }
    }
  };
});