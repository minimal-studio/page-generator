const fse = require('fs-extra');
const path = require('path');

const packageData = fse.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8');
const { version } = JSON.parse(packageData);

module.exports = {
  version,
}