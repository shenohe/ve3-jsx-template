

## 目录结构

```
- dist 生产环境目录

- node_modules 项目依赖

- public
  - favicon.ico 网站图标
  - index.html 页面入口文件

- src
  - components 公共组件
  - config 系统配置
  - layouts 系统布局组件
  - libs 公共业务方法或第三方工具库
  - locale 系统语言包配置
  - router 系统路由
  - routes 系统路由菜单配置
  - services 接口服务
  - store 状态管理
  - styles 样式文件目录
  - views 系统页面目录，对应 routes 配置
  - App.vue 根组件
  - main.js 系统入口

- vite.config.js Vite打包构建工具配置
```
# 安装依赖
npm install
npm install --registry=https://registry.npm.taobao.org

# 启动本地开发服务，启动服务前，请根据自身需求修改 vue.config.js 文件中 devServer 的 host 及 port 配置
npm run dev
```

## 发布

```bash
# 构建生产环境
npm run build
```

## 其他

```bash
# 启用本地开发服务，并进行打包文件分析
npm run analyzer

# 代码格式检查
npm run lint
```

## NODE

```bash
# Node 开发版本
Node 18.12.0
```

## 脚手架

```bash
# Vite 脚手架版本
vite 5.4.10
```
