let commandConfig = {
  targetProjectGitUrl: 'https://github.com/SANGET/orion-admin-seed.git',
  storeFileName: '_orion-data.js',
}
let scaffoldConfig = {
  reportActionPath: './_template/action-report.tmpl',
  formActionPath: './_template/action-form.tmpl',
  menuDataPath: './src/config/generate-nav-config.js',
  pageRefPath: './src/pages/generate-pages-refs.js',
  pagePath: './src/pages',
  actionPath: './src/actions',
}

module.exports.scaffoldConfig = scaffoldConfig;
module.exports.commandConfig = commandConfig;