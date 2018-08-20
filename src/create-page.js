const csv = require('csv');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

const {commandConfig, scaffoldConfig} = require('../config');
const {createPageQues} = require('./question');

const wrapCurrPath = (...targetPath) => {
  return path.resolve(process.cwd(), ...targetPath);
}

const getTmpl = (pageType, pageCate) => {
  let pageTypeTester = /report|form/;
  let pageCateTester = /page|action/;
  
  if(!pageTypeTester.test(pageType)) return console.log('pageType error');
  if(!pageCateTester.test(pageCate)) return console.log('pageCate error');
  
  let tmplPath = scaffoldConfig.tmplPath[pageType][pageCate];
  return fse.readFileSync(wrapCurrPath(tmplPath), 'utf-8');
}

const TemplateEngine = (tmpl, data) => {
  let regex = /{%([^%>]+)?%}/g;
  let match;
  while(match = regex.exec(tmpl)) {
    tmpl = tmpl.replace(match[0], data[match[1]]);
  }
  return tmpl;
}

const registeActionRef = (pageName) => {
  let filePath = wrapCurrPath(scaffoldConfig.actionRefPath);
  let actionRefFile = fs.readFileSync(filePath, 'utf8');
  actionRefFile += `export * from './${pageName}';\n`;
  fs.writeFileSync(filePath, actionRefFile);
}

const registePageRef = (pageName) => {
  let filePath = wrapCurrPath(scaffoldConfig.pageRefPath);
  let pageRefFile = fs.readFileSync(filePath, 'utf8');
  pageRefFile += `export * from './${pageName}';\n`;
  fs.writeFileSync(filePath, pageRefFile);
}

const saveMenuData = ({alias, pageName}) => {
  let menuDataFilePath = wrapCurrPath(scaffoldConfig.menuDataPath);
  let menuData = require(menuDataFilePath);
  menuData.child.push({
    title: alias,
    code: pageName
  });
  fs.writeFileSync(menuDataFilePath, `module.exports = ${JSON.stringify(menuData)}`)
}

const pageNameFilter = (pageName) => {
  let pageSlice = pageName.split('-');
  let nextPageName = '';

  pageSlice.forEach(item => nextPageName += [item[0].toUpperCase(), item.slice(1)].join(''))

  return nextPageName;
}

const genFile = ({targetFilePath, pageName, content, storeInfo, alias}) => {
  let componentName = pageNameFilter(pageName);

  let contentRes = TemplateEngine(content, {
    comment: scaffoldConfig.wrapComment({...storeInfo, pageName, alias}),
    pageName: componentName
  });

  let targetDirPath = wrapCurrPath(targetFilePath, pageName);
  try {
    fs.mkdirSync(targetDirPath);
  } catch(e) {
    return console.log(pageName + ' exist');
  }
  fs.writeFileSync(path.join(targetDirPath, './index.js'), contentRes);

  return {
    componentName
  };
}

const genAction = ({pageType, pageName, ...other}) => {
  let actionTmpl = getTmpl(pageType, 'action');

  genFile({
    targetFilePath: scaffoldConfig.actionPath, 
    pageName, 
    content: actionTmpl,
    ...other
  });

  registeActionRef(pageName);
}

const genPage = ({pageType, pageName, alias, ...other}) => {
  let pageTmpl = getTmpl(pageType, 'page');

  let {componentName} = genFile({
    targetFilePath: scaffoldConfig.pagePath, 
    pageName, 
    content: pageTmpl,
    alias,
    ...other
  });

  registePageRef(pageName);

  saveMenuData({
    alias,
    pageName: componentName,
  });
}

const getStoreInfo = () => {
  let storeFilePath = wrapCurrPath(commandConfig.storeFileName);
  return require(storeFilePath);
}

const createPage = async (pageName, alias, pageType) => {
  if(!alias) {
    let answer = await inquirer.prompt(createPageQues);
    pageType = answer.pageType;
    alias = answer.alias;
  }
  try {
    let storeInfo = getStoreInfo();
    genAction({
      pageType,
      pageName,
      alias,
      storeInfo
    });
    genPage({
      pageType,
      pageName,
      alias,
      storeInfo
    });
  } catch(e) {
    console.log(e + '')
  }
}

module.exports = createPage;
