const csv = require('csv');
const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

const config = require('../config');
const log = console.log;

function genProjFromGit(targetName) {
  exec(`git clone ${config.targetProjectGitUrl} ${targetName}`, (err, msg) => {
    if(err) return log(err);
    exec(`cd ./${targetName}; rm -Rf ./.git;`, (err, msg) => {
      if(err) return log(err);
    });
  })
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
}

module.exports = createProject;