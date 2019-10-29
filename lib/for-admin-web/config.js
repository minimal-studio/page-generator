const fs = require("fs");
const path = require("path");
const deepmerge = require("deepmerge");
const localConfig = require("./default-config");
const rename = require("./rename");

const oldCustomConfigJsonName = ".uke-generator-config.js";
const customConfigJsonName = ".page-generator-config.js";

rename(oldCustomConfigJsonName, customConfigJsonName);

let mergeConfig;

if(fs.existsSync(path.resolve(process.cwd(), customConfigJsonName))) {
  const customConfig = require(path.resolve(process.cwd(), customConfigJsonName));
  mergeConfig = deepmerge(localConfig, customConfig);
} else {
  mergeConfig = localConfig;
}

const scaffoldConfig = mergeConfig;

function mkdir(dirname) {
  fs.readdir(dirname, (err) => {
    if(err) {
      fs.mkdirSync(dirname);
    } else {
      console.log("dir already exist");
    }
  });
}

module.exports = {
  targetProjectGitUrl: "https://github.com/minimal-studio/admin-dashboard.git",
  storeFileName: customConfigJsonName,
  scaffoldConfig,
  mkdir
};
