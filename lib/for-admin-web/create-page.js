const csv = require("csv");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");
const { exec } = require("child_process");

const { scaffoldConfig } = require("./config");
const { createPageQues, overrideFile } = require("../question");

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

const wrapFileName = (pageName, tsx, isTypescript = scaffoldConfig.typescript) => {
  return `${pageName}.${isTypescript ? `ts${tsx ? "x" : ""}` : "js"}`;
};

const generateFile = async ({
  targetFilePath,
  pageName,
  storeDir,
  content,
  alias,
  isWriteToIndex,
  pageType
}) => {
  const componentName = pageNameFilter(pageName);

  // 分析模版内容
  const contentRes = TemplateEngine(content, {
    comment: scaffoldConfig.wrapComment({
      developer: process.env.USER, 
      pageName, 
      alias
    }),
    pageName: componentName
  });

  // 检测是否存在存放目录
  const storeFileDirPath = wrapCurrPath(targetFilePath, storeDir);
  if(!fs.existsSync(storeFileDirPath)) {
    // 如果不存在，则创建目录
    try {
      shell.mkdir("-p", storeFileDirPath);
      // fs.mkdirSync(storeFileDirPath);
    } catch(e) {
      return console.error(e);
    }
    // 并且写入到 page ref 文件
    registePageRef(storeDir);
  }

  // 写入目标文件
  const targetPageFileName = wrapFileName(pageName, true);
  const _targetFilePath = path.join(storeFileDirPath, targetPageFileName);
  if (fs.existsSync(_targetFilePath)) {
    const { isOverride } = await inquirer.prompt(overrideFile(targetPageFileName));
    if(!isOverride) {
      return {
        componentName
      };
    }
  }
  fs.writeFileSync(_targetFilePath, contentRes);

  // 处理 index 文件
  const indexFilePath = path.join(
    storeFileDirPath,
    wrapFileName("index", false)
  );
  let indexFile = "";
  if(!fs.existsSync(indexFilePath)) {
    // 如果当前存放目录没有 index 文件，则创建一个
    fs.writeFileSync(indexFilePath, "");
  }
  if(isWriteToIndex) {
    // 写入 index 文件
    indexFile = fs.readFileSync(indexFilePath, "utf8");
    indexFile += `export * from './${pageName}';\n`;
    fs.writeFileSync(indexFilePath, indexFile);
  }

  return {
    createdPageName: _targetFilePath,
    componentName
  };
};

const generatePage = async ({
  pageType,
  pageName,
  storeDir,
  isWriteToIndex,
  alias
}) => {
  const pageTmpl = getTmpl(pageType);

  const createRes = await generateFile({
    targetFilePath: scaffoldConfig.pagePath,
    pageName,
    storeDir,
    pageType,
    isWriteToIndex,
    content: pageTmpl,
    alias,
  });

  if(!createRes) return;

  saveMenuData({
    alias,
    pageName: createRes.componentName,
  });

  console.log(chalk.blue(`Created page ${createRes.createdPageName} successed!`));
};

const createPage = async ({
  pageName, alias, pageType, storeDir, isWriteToIndex = true
}) => {
  if(!alias) {
    const answer = await inquirer.prompt(createPageQues);
    pageType = answer.pageType;
    alias = answer.alias;
    isWriteToIndex = answer.isWriteToIndex[0];
  }
  try {
    generatePage({
      pageType,
      pageName,
      storeDir,
      alias,
      isWriteToIndex,
    });
  } catch(e) {
    console.log(e + "");
  }
};

module.exports = createPage;
