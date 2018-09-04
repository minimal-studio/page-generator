const fs = require('fs');
const dateFormat = require('dateformat');

let scaffoldConfig = {
  tmplPath: {
    report: {
      page: './_template/page-report.tmpl',
      action: './_template/action-report.tmpl',
    },
    form: {
      page: './_template/page-form.tmpl',
      action: './_template/action-form.tmpl',
    },
  },
  menuDataPath: './src/config/generate-nav-config.js',
  pageRefPath: './src/pages/generate-pages-refs.js',
  actionRefPath: './src/actions/generate-actions-refs.js',
  pagePath: './src/pages',
  actionPath: './src/actions',
  wrapComment: ({developer = '', pageName = '', alias = ''}) => {
    let createDate = Date.now();
    return `/**
 * Author: ${developer}
 * CreateDate: ${dateFormat(createDate)}
 * PageName: ${pageName}
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
  targetProjectGitUrl: 'https://github.com/SANGET/orion-admin-seed.git',
  storeFileName: '_orion-data.js',
  scaffoldConfig,
  mkdir
}