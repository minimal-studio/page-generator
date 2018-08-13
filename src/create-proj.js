const csv = require('csv');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

process.env.NODE_ENV = 'development';

const {commandConfig} = require('../config');
const {createProjectQues} = require('./question');

const log = console.log;

function genProjFromGit(targetName) {
  fs.readdir(targetName, (err) => {
    if(err) {
      exec(`git clone ${commandConfig.targetProjectGitUrl} ${targetName}`, (err, msg) => {
        if(err) return log(err);
        exec(`cd ./${targetName}; rm -Rf ./.git;`, (err, msg) => {
          if(err) return log(err);
        });
      });
    } else {
      console.log('project already exist');
    }
  });
}

function storeInfo(state) {
  const {projName} = state;
  let writePath = path.resolve(__dirname, '../', projName, commandConfig.storeFileName);
  let str = `
    module.exports = ${JSON.stringify(state)};
  `;
  fs.writeFile(writePath, str, (err) => console.log(err || 'stored info'));
}

async function createProject() {
  let answer = await inquirer.prompt(createProjectQues);
  genProjFromGit(answer.projName);
  storeInfo(answer);
}

module.exports = createProject;