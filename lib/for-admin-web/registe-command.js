const program = require('commander');
const inquirer = require('inquirer');

const { createProject } = require('../create-proj');
const createPage = require('./create-page');

const { version } = require('../common-config');
const { createProjectQues } = require('../question');
const { targetProjectGitUrl } = require('./config');
const { createPageWithoutPassName } = require('../question');

program
  .version(version, '-v, --version')

program
  .command('init')
  .action(createProject(createProjectQues, targetProjectGitUrl));

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

program
  .command('create')
  .action(async () => {
    let { pageName } = await inquirer.prompt(createPageWithoutPassName);
    let pageType = program.report ? 'report' : 'form';
    createPage(pageName, null, pageType);
  });

program.parse(process.argv);
