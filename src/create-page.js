const csv = require('csv');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

const {commandConfig, scaffoldConfig} = require('../config');

function wrapCurrPath(targetPath) {
  return path.resolve(process.cwd(), targetPath);
}

async function getStoreInfo() {
  let storeFilePath = wrapCurrPath(commandConfig.storeFileName);
  let js = fse.readFileSync(wrapCurrPath(scaffoldConfig.formActionPath), 'utf-8');
  // console.log(js)
  try {
    let storeInfo = require(storeFilePath);
    // console.log(storeInfo)
  } catch(e) {
    console.log('should init project first')
  }
}

async function createPage(pageName, cmd) {
  console.log(pageName, cmd)
  getStoreInfo(pageName);
}

module.exports = createPage;