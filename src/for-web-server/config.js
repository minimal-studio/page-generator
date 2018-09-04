const fs = require('fs');
const dateFormat = require('dateformat');

let scaffoldConfig = {
  wrapComment: ({developer = '', pageName = '', alias = ''}) => {
    let createDate = Date.now();
    return `/**
 * Author: ${developer}
 * CreateDate: ${dateFormat(createDate)}
 * Router: ${pageName}
 * Alias: ${alias}
 */`
  }
}

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
  targetProjectGitUrl: 'https://github.com/SANGET/orion-web-server.git',
  storeFileName: '_orion-data.js',
  scaffoldConfig,
  mkdir
}
