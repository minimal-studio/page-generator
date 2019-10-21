const csv = require("csv");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");
const { exec } = require("child_process");

const { scaffoldConfig } = require("./config");
const { createPageQues } = require("../question");

const wrapCurrPath = (...targetPath) => {
  return path.resolve(process.cwd(), ...targetPath);
};

const getTmpl = (pageType) => {
  const pageTypeTester = /report|form/;
  
  if(!pageTypeTester.test(pageType)) return console.log("pageType error");
  
  const tmplPath = scaffoldConfig.tmplPath[pageType];
  return fse.readFileSync(wrapCurrPath(tmplPath), "utf-8");
};

const TemplateEngine = (tmpl, data) => {
  const regex = /{%([^%>]+)?%}/g;
  let match;
  while(match = regex.exec(tmpl)) {
    tmpl = tmpl.replace(match[0], data[match[1]]);
  }
  return tmpl;
};

const registePageRef = (pageName) => {
  const filePath = wrapCurrPath(scaffoldConfig.pageRefPath);
  let pageRefFile = "";
  if(fs.existsSync(filePath)) {
    pageRefFile = fs.readFileSync(filePath, "utf8");
  }
  pageRefFile += `export * from './${pageName}';\n`;
  fs.writeFileSync(filePath, pageRefFile);
};

const saveMenuData = ({ alias, pageName }) => {
  const menuDataFilePath = wrapCurrPath(scaffoldConfig.menuDataPath);
  let menuData = {
    child: []
  };
  const menuStorePath = path.dirname(menuDataFilePath);
  if(!fs.existsSync(menuDataFilePath)) {
    shell.mkdir("-p", menuStorePath);
  } else {
    try {
      menuData = require(menuDataFilePath);
    } catch(e) {
      console.log(e);
    }
  }
  menuData.child.push({
    title: alias,
    code: pageName
  });
  fs.writeFileSync(menuDataFilePath, `module.exports = ${JSON.stringify(menuData)}`);
};

const pageNameFilter = (pageName) => {
  const pageSlice = pageName.split("-");
  let nextPageName = "";

  pageSlice.forEach(item => nextPageName += [item[0].toUpperCase(), item.slice(1)].join(""));

  return nextPageName;
};

const genFile = ({ targetFilePath, pageName, content, alias, pageType }) => {
  const componentName = pageNameFilter(pageName);

  const contentRes = TemplateEngine(content, {
    comment: scaffoldConfig.wrapComment({
      developer: process.env.USER, 
      pageName, 
      alias
    }),
    pageName: componentName
  });

  const targetDirPath = wrapCurrPath(targetFilePath, pageName);
  try {
    shell.mkdir("-p", targetDirPath);
    // fs.mkdirSync(targetDirPath);
  } catch(e) {
    return console.error(e);
  }
  const targetFileName = `${pageType}.${scaffoldConfig.typescript ? "tsx" : "js"}`;
  const _targetFilePath = path.join(
    targetDirPath, 
    targetFileName
  );
  // 写入对应的 page
  fs.writeFileSync(_targetFilePath, contentRes);

  // 写入 index 文件
  const indexFilePath = path.join(
    targetDirPath, 
    `./index.${scaffoldConfig.typescript ? "ts" : "js"}`
  );
  let indexFile = "";
  if(fs.existsSync(indexFilePath)) {
    indexFile = fs.readFileSync(indexFilePath, "utf8");
  }
  indexFile += `export * from './${pageType}'`;
  fs.writeFileSync(indexFilePath, indexFile);

  return {
    componentName
  };
};

const genPage = ({ pageType, pageName, alias, ...other }) => {
  const pageTmpl = getTmpl(pageType);

  const createRes = genFile({
    targetFilePath: scaffoldConfig.pagePath, 
    pageName, 
    pageType, 
    content: pageTmpl,
    alias,
    ...other
  });

  if(!createRes) return;

  registePageRef(pageName);

  saveMenuData({
    alias,
    pageName: createRes.componentName,
  });

  console.log(chalk.blue(`Create ${createRes.componentName} successed!`));
};

const createPage = async (pageName, alias, pageType) => {
  if(!alias) {
    const answer = await inquirer.prompt(createPageQues);
    pageType = answer.pageType;
    alias = answer.alias;
  }
  try {
    genPage({
      pageType,
      pageName,
      alias,
    });
  } catch(e) {
    console.log(e + "");
  }
};

module.exports = createPage;
