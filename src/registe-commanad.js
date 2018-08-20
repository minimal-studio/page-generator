const program = require('commander');
const fse = require('fs-extra');
const path = require('path');

const createProject = require('./create-proj');
const createPage = require('./create-page');

const packageData = fse.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8');
const { version } = JSON.parse(packageData);

program
  .version(version, '-v, --version')

program
  .command('init')
  .action(createProject);

program
  .option('-r, --report', 'Create report page')
  .option('-f, --form', 'Create form page')
  .command('add <pageName>')
  .action(createPage)

program.parse(process.argv);