const program = require('commander');
const csv = require('csv');
const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

const createProject = require('./create-proj');
const createPage = require('./create-page');

const log = console.log;

program
  .version('0.1.0', '-v, --version')
  .option('-l, --list [list]', 'List of customers in CSV')
  .option('-i, --init [list]', 'List of customers in CSV');
  
program.command('init')
  .action(createProject);

program.command('add <pageName>')
  .action(createPage)

program.parse(process.argv)