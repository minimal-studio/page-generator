# @mini-code/page-generator

管理系统页面生成工具。

## 使用

```shell
yarn add @mini-code/page-generator -D
# or
npm i @mini-code/page-generator --save-dev
```

在项目根目录的 `package.json` 添加 scripts

```json
"scripts": {
  "gen:page": "pg create"
}
```

## Command

- pg 为 page-generator 的缩写

```shell
pg -v
```

### 新建页面

```js
pg create
```

根据提示依次输入

- 存放目录 StoreDir: 存放的目录，在配置的 `pagePath` 目录之下
- 文件名 PageName: 创建的文件名 StoreDir/PageName.tsx
- 页面类型 PageType: 选择 report or form，获取 tmpl 路径并写入项目
- 是否在 index 中引用: 是否写入 index 文件，默认为 false
- 页面中文名 PageCNName: 页面的中文名，方便后续查找，可以忽略

## 配置

在项目根目录创建 `.page-generator-config.js` 文件，以下为默认配置：

```js
const dateFormat = require('dateformat');

module.exports = {
  // 是否生成 typescript
  typescript: true,
  /** 模版路径 */
  tmplPath: {
    /** 报表 */
    report: '_template/page-report.tmpl',
    /** 表单 */
    form: '_template/page-form.tmpl',
  },
  // 菜单存储的配置
  menuDataPath: 'src/config/generate-nav-config.js',
  // 页面引用文件
  pageRefPath: 'src/pages/generate-pages-refs.js',
  // 页面存储路径
  pagePath: 'src/pages',
  // 注释的 wrapper
  wrapComment: ({developer = process.env.USER, pageName = '', alias = ''}) => {
    let createDate = Date.now();
    return `/**
 * Author: ${developer}
 * CreateDate: ${dateFormat(createDate)}
 * PageName: ${pageName}
 * Alias: ${alias}
 */`
  }
}
```
