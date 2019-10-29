const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { exec } = require("child_process");
const inquirer = require("inquirer");

const log = console.log;

function setProjectInfo(state, storePath) {
  const res = require(path.join(process.cwd(), storePath));
  const str = `module.exports = ${JSON.stringify(Object.assign({}, res, state))};`;
  fs.writeFile(storePath, str, (err) => {
    if(err) log(chalk.red(err));
  });
}

function storeProjectInfo(state, storePath) {
  const str = `module.exports = ${JSON.stringify(state)};`;
  fs.writeFile(storePath, str, (err) => {
    if(err) log(chalk.red(err));
  });
}

function genProjFromGit(targetProjectGitUrl, targetName, init = true) {
  return new Promise((resolve, reject) => {
    if(!fs.existsSync(targetName)) {
      log(chalk.cyan("Cloning..."));
      exec(`git clone ${targetProjectGitUrl} ${targetName}`, (err, msg) => {
        if(err) return log(chalk.red(err));

        log(chalk.cyan("Clone 完成, 依赖安装中, 请稍后..."));
        exec(`cd ./${targetName}; rm -Rf ./.git; ${init ? "npm run init" : ""}`, (err, msg) => {
          if(err) return log(chalk.red(err));
          log(chalk.cyan("Done."));
          resolve(null);
        });
      });
    } else {
      const err = "project already exist";
      log(chalk.red(err));
      reject(err);
    }
  });
}

function createProject(question, targetProjectGitUrl) {
  return async () => {
    const answer = await inquirer.prompt(question);
    const { projName } = answer;
    genProjFromGit(targetProjectGitUrl, projName).then(() => {
      console.log(`Create Project successed!`);
    });
  };
}

module.exports = {
  storeProjectInfo,
  createProject,
  setProjectInfo,
  genProjFromGit
};
