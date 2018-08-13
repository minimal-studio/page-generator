const csv = require('csv');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

process.env.NODE_ENV = 'development';

const {commandConfig} = require('../config');
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
  let question = [
    {
      type: 'input',
      name: 'projName',
      message: "Project's name 项目名称"
    },
    {
      type: 'input',
      name: 'developer',
      message: "Developer's name 开发者名字"
    }
  ];
  let answer = await inquirer.prompt(question);
  genProjFromGit(answer.projName);
  storeInfo(answer);
}

module.exports = createProject;