const program = require('commander');
const csv = require('csv');
const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

const createProject = require('./create-proj');
const createPage = require('./create-page');

program
  .version('0.1.0', '-v, --version')
  // .option('-r, --report [list]', 'List of customers in CSV');

program
  .command('init')
  .action(createProject);

program
  .option('-r, --report', 'Create report page')
  .option('-f, --form', 'Create form page')
  .command('add <pageName>')
  .action(createPage)

program.parse(process.argv);
console.log(program.report)