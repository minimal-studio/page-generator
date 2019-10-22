const dateFormat = require("dateformat");

module.exports = {
  // 是否生成 typescript
  typescript: true,
  /** 模版路径 */
  tmplPath: {
    /** 报表 */
    report: "_template/page-report.tmpl",
    /** 表单 */
    form: "_template/page-form.tmpl",
  },
  // 菜单存储的配置
  menuDataPath: "src/config/generate-nav-config.js",
  // 页面引用文件
  pageRefPath: "src/pages/generate-pages-refs.js",
  // 页面存储路径
  pagePath: "src/pages",
  // 注释的 wrapper
  wrapComment: ({ developer = process.env.USER, pageName = "", alias = "" }) => {
    const createDate = Date.now();
    return `/**
 * Author: ${developer}
 * CreateDate: ${dateFormat(createDate)}
 * PageName: ${pageName}
 * Alias: ${alias}
 */`;
  }
};
