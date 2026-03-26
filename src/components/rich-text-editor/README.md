# RichTextEditor 富文本编辑器

基于 Quill.js 封装的 Vue3 富文本编辑器组件。

## 功能特性

- 🎨 基于 Quill.js，功能强大且稳定
- 📝 支持富文本编辑：加粗、斜体、标题、列表等
- 🖼️ 支持图片插入和链接添加
- 🎯 支持自定义工具栏配置
- 📱 响应式设计，支持自定义高度
- 🔒 支持只读和禁用模式
- 🖥️ **全屏编辑模式**，提供沉浸式编辑体验
- ⚡ Vue3 响应式双向绑定
- 🎭 支持 TypeScript

## 安装依赖

```bash
npm install quill
```

## 基本使用

```jsx
import { ref } from 'vue';
import RichTextEditor from '@/components/rich-text-editor/index.jsx';

const content = ref('<p>默认内容</p>');

// 在模板中使用
<RichTextEditor
  v-model={content.value}
  placeholder="请输入内容..."
  height="400px"
  onChange={(newContent) => console.log(newContent)}
/>
```

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | String | '' | 编辑器内容（v-model） |
| placeholder | String | '请输入内容...' | 占位符文本 |
| readonly | Boolean | false | 是否只读 |
| disabled | Boolean | false | 是否禁用 |
| height | String \| Number | '300px' | 编辑器高度 |
| minHeight | String \| Number | '200px' | 最小高度 |
| maxHeight | String \| Number | '600px' | 最大高度 |
| theme | String | 'snow' | 主题，可选 'snow' 或 'bubble' |
| modules | Object | 见下方配置 | Quill 模块配置 |

### 默认工具栏配置

```js
{
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['fullscreen'],
    ['clean']
  ]
}
```

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | content | 内容更新时触发 |
| change | content | 内容变化时触发 |
| ready | quill | 编辑器初始化完成时触发 |
| focus | range | 编辑器获得焦点时触发 |
| blur | - | 编辑器失去焦点时触发 |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 参数 | 说明 |
|--------|------|------|
| getText | - | 获取纯文本内容 |
| getHTML | - | 获取HTML内容 |
| setContent | content | 设置编辑器内容 |
| insertText | text, formats | 插入文本 |
| clear | - | 清空内容 |
| focus | - | 聚焦编辑器 |
| blur | - | 失焦编辑器 |
| enable | enabled | 启用/禁用编辑器 |

## 高级用法

### 自定义工具栏

```jsx
<RichTextEditor
  v-model={content.value}
  modules={{
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }}
/>
```

### 只读模式

```jsx
<RichTextEditor
  v-model={content.value}
  readonly
  height="200px"
/>
```

### 禁用模式

```jsx
<RichTextEditor
  v-model={content.value}
  disabled
  height="200px"
/>
```

### 自定义样式

```jsx
<RichTextEditor
  v-model={content.value}
  height="500px"
  minHeight="300px"
  maxHeight="800px"
/>
```

## 完整示例

参考 `example.jsx` 文件查看完整的使用示例。

## 全屏功能

编辑器支持全屏编辑模式：

- 点击工具栏中的全屏按钮进入全屏模式
- 在全屏模式下提供更大的编辑空间
- 支持ESC键快速退出全屏
- 全屏模式下会显示专用的退出按钮

```jsx
<RichTextEditor
  v-model={content.value}
  modules={{
    toolbar: [
      // ... 其他工具栏配置
      ['fullscreen'], // 添加全屏按钮
      ['clean']
    ]
  }}
/>
```

## 注意事项

1. 确保项目中已安装 Quill.js 依赖
2. 组件使用了 Quill 的 Snow 主题样式
3. 在只读或禁用状态下，工具栏会自动隐藏或禁用
4. 支持 v-model 双向数据绑定
5. 内容变化时会同时触发 update:modelValue 和 change 事件
6. 全屏模式下会隐藏页面滚动条，提供沉浸式编辑体验