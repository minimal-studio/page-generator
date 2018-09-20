const program = require('commander');

const { createProject, setProjectInfo } = require('../create-proj');
const createPage = require('./create-page');

const { version } = require('../common-config');
const { createProjectQues } = require('../question');
const { storeFileName, targetProjectGitUrl } = require('./config');

program
  .version(version, '-v, --version')

program
  .command('init')
  .action(createProject(createProjectQues, targetProjectGitUrl, storeFileName));

program
  .command('setUser <developer>')
  .action((developer) => {
    setProjectInfo({developer}, storeFileName);
  });

program
  .command('addp <pageName> <alias>')
  .option('-r, --report', 'Create report page')
  .option('-f, --form', 'Create form page')
  .action((pageName, alias) => {
    let pageType = program.report ? 'report' : 'form';
    createPage(pageName, alias, pageType);
  });

program
  .command('add <pageName>')
  .action((pageName) => {
    let pageType = program.report ? 'report' : 'form';
    createPage(pageName, null, pageType);
  });

program.parse(process.argv);