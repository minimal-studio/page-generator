const inquirer = require("inquirer");

const createProjectQues = [
  {
    type: "input",
    name: "projName",
    message: "Project's name 项目名称"
  }
];
const createPageQues = [
  {
    type: "list",
    name: "pageType",
    message: "Page's type 页面类型",
    choices: [
      new inquirer.Separator("页面类型"),
      "report-表格类型",
      "form-表单类型"
    ],
    filter: function(val) {
      return val.split("-")[0];
    }
  },
  {
    type: "checkbox",
    name: "isWriteToIndex",
    message: "是否在 index 中引用",
    choices: [
      {
        name: "是",
        value: true,
      },
    ]
  },
  {
    type: "input",
    name: "alias",
    message: "页面中文名"
  },
];

const createPageWithoutPassName = [
  {
    type: "input",
    name: "storeDir",
    message: "存放目录"
  },
  {
    type: "input",
    name: "pageName",
    message: "文件名"
  },
];

const overrideFile = (filename) => [
  {
    type: "confirm",
    name: "isOverride",
    message: `已存在文件 ${filename} 是否覆盖?`
  },
];

module.exports = {
  createProjectQues, createPageQues, createPageWithoutPassName,
  overrideFile
};
