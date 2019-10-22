const program = require("commander");

const { createProject } = require("../create-proj");
// const createPage = require('./create-page');

const { version } = require("../common-config");
const { createProjectQues } = require("../question");
const { targetProjectGitUrl } = require("./config");

program
  .version(version, "-v, --version");

program
  .command("init")
  .action(createProject(createProjectQues, targetProjectGitUrl));

// program
//   .command('addp <pageName> <alias>')
//   .option('-r, --report', 'Create report page')
//   .option('-f, --form', 'Create form page')
//   .action((pageName, alias) => {
//     let pageType = program.report ? 'report' : 'form';
//     createPage(pageName, alias, pageType);
//   });

// program
//   .option('-r, --report', 'Create report page')
//   .option('-f, --form', 'Create form page')
//   .command('add <pageName>')
//   .action(createPage);

program.parse(process.argv);
