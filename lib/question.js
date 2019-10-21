const inquirer = require('inquirer');

const createProjectQues = [
  {
    type: 'input',
    name: 'projName',
    message: "Project's name 项目名称"
  },
  {
    type: 'input',
    name: 'developer',
    message: "Developer's name 开发者名字"
  }
];
const createPageQues = [
  {
    type: 'list',
    name: 'pageType',
    message: "Page's type 页面类型",
    choices: [
      new inquirer.Separator('页面类型'),
      'report-表格类型',
      'form-表单类型'
    ],
    filter: function(val) {
      return val.split('-')[0];
    }
  },
  {
    type: 'input',
    name: 'alias',
    message: "页面中文名"
  },
];

const createPageWithoutPassName = [
  {
    type: 'input',
    name: 'pageName',
    message: "页面代号"
  },
];

module.exports = {
  createProjectQues, createPageQues, createPageWithoutPassName
};
