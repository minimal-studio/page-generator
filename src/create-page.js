const csv = require('csv');
const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

const config = require('../config');
const log = console.log;

async function createPage(pageName) {
  log(pageName)
}

module.exports = createPage;