// 将旧配置重命名为新配置
const fs = require("fs");
const path = require("path");

module.exports = (oldConfigFileName, newConfigFileName) => {
  const oldConfigPath = path.join(process.cwd(), oldConfigFileName);
  const configPath = path.join(process.cwd(), newConfigFileName);
  
  if(fs.existsSync(oldConfigPath)) {
    console.log(`工具自动将 ${oldConfigFileName} 重命名为 ${newConfigFileName}`);
    fs.renameSync(oldConfigPath, configPath);
  }
}
