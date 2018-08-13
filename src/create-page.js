const csv = require('csv');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

const {commandConfig, scaffoldConfig} = require('../config');
const {createPageQues} = require('./question');

const TemplateEngine = (tmpl, data) => {
  let regex = /{%([^%>]+)?%}/g;
  let match;
  while(match = regex.exec(tmpl)) {
    tmpl = tmpl.replace(match[0], data[match[1]]);
  }
  return tmpl;
}

const wrapCurrPath = (...targetPath) => {
  return path.resolve(process.cwd(), ...targetPath);
}

const registeAction = (pageName) => {
  let filePath = wrapCurrPath(scaffoldConfig.actionRefPath);
  let actionRefFile = fs.readFileSync(filePath, 'utf8');
  actionRefFile += `export * from './${pageName}';\n`;
  fs.writeFileSync(filePath, actionRefFile);
}

// const registePageRef = (pageName) => {
//   let filePath = wrapCurrPath(scaffoldConfig.pageRefPath);
//   let pageRefFile = fs.readFileSync(filePath, 'utf8');
//   pageRefFile += `export * from './${pageName}';\n`;
//   fs.writeFileSync(filePath, pageRefFile);
// }

const saveMenuData = ({alias, pageName}) => {
  // console.log(alias)
  let menuDataFilePath = wrapCurrPath(scaffoldConfig.menuDataPath);
  let menuData = require(menuDataFilePath);
  menuData.child.push({
    title: alias,
    code: pageName
  });
  fs.writeFileSync(menuDataFilePath, `module.exports = ${JSON.stringify(menuData)}`)
}

const genAction = ({tmpl, pageName, storeInfo, alias}) => {
  let nextPageName = pageName.toLowerCase();
  nextPageName = [nextPageName[0].toUpperCase(), nextPageName.slice(1)].join('');

  let result = TemplateEngine(tmpl, {
    comment: scaffoldConfig.wrapComment({...storeInfo, pageName, alias}),
    pageName: nextPageName
  });

  let filePath = wrapCurrPath(scaffoldConfig.actionPath, pageName);
  fs.mkdir(filePath, (err) => {
    if(err) return console.log(pageName + ' exist');
    fs.writeFileSync(path.join(filePath, './index.js'), result);
    registeAction(pageName);
    // registePageRef(pageName);
  });
  return result;
}

const getStoreInfo = () => {
  let storeFilePath = wrapCurrPath(commandConfig.storeFileName);
  return require(storeFilePath);
}

const getTmpl = (pageType) => {
  let actionTmplPath;
  switch (pageType) {
    case 'report':
      actionTmplPath = scaffoldConfig.reportActionPath;
      break;
    case 'form':
      actionTmplPath = scaffoldConfig.formActionPath;
      break;
  }
  return fse.readFileSync(wrapCurrPath(actionTmplPath), 'utf-8');
}

const createPage = async (pageName) => {
  let {pageType, alias} = await inquirer.prompt(createPageQues);
  try {
    let storeInfo = getStoreInfo();
    let actionTmpl = getTmpl(pageType);
    genAction({
      tmpl: actionTmpl,
      pageName,
      alias,
      storeInfo
    });
    saveMenuData({
      alias,
      pageName,
    });
  } catch(e) {
    console.log(e + '')
  }
}

module.exports = createPage;