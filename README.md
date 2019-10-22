# uke cli

管理系统的帮助工具，可以快速搭建、生成、开发基于 uke admin 模版的管理后台以及 web server

## 使用

安装 uke cli

```shell
yarn add uke-cli -D
# or
npm i uke-cli --save-dev
```

在项目根目录的 `package.json` 添加 scripts

```json
"scripts": {
  "gen:page": "uka create"
}
```

## Command

- uka 为 uke-admin 的缩写

```shell
uka -v
uke-admin -v
```

### 新建页面

```js
uka create
```

根据提示依次输入

- 存放目录 StoreDir: 存放的目录，在配置的 `pagePath` 目录之下
- 文件名 PageName: 创建的文件名 StoreDir/PageName.tsx
- 页面类型 PageType: 选择 report or form，获取 tmpl 路径并写入项目
- 是否在 index 中引用: 是否写入 index 文件，默认为 false
- 页面中文名 PageCNName: 页面的中文名，方便后续查找，可以忽略

## 配置

在项目根目录创建 `.uke-generator-config.js` 文件，以下为默认配置：

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
