const fs = require('fs');
const path = require('path');
const deepmerge = require('deepmerge');
const localConfig = require('./default-config');

const customConfigJsonName = '.uke-generator-config.js';

let mergeConfig;

if(fs.existsSync(path.resolve(process.cwd(), customConfigJsonName))) {
  const customConfig = require(path.resolve(process.cwd(), customConfigJsonName));
  mergeConfig = deepmerge(localConfig, customConfig);
} else {
  mergeConfig = localConfig;
}

let scaffoldConfig = mergeConfig

function mkdir(dirname) {
  fs.readdir(dirname, (err) => {
    if(err) {
      fs.mkdirSync(dirname);
    } else {
      console.log('dir already exist');
    }
  });
}

module.exports = {
  targetProjectGitUrl: 'https://github.com/SANGET/uke-admin-seed.git',
  storeFileName: customConfigJsonName,
  scaffoldConfig,
  mkdir
}
