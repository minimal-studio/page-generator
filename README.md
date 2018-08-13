# orion admin generator

管理系统的帮助工具，可以快速搭建、生成、开发基于 orion admin 模版的管理后台

## 使用

### 1. 推荐使用 orion-admin-generator 自动化生成工具，自动生成系统所需的 action，page 和添加菜单数据

安装 orion cli

```shell
npm i orion-admin-generator -g # 安装成功可以使用 orion cli

orion -v
```

生成项目，根据提示操作即可，方便轻松

```shell
orion init
# 此处是分步操作，根据提示，分别输入项目的英文名称，开发者名称
# 以下例子使用 test-proj
# 初始化成功后会在当前目录生成 ./test-proj 项目
```

项目初始化

```shell
cd ./test-proj

npm run init
# 运行初始化脚本，程序会自动执行 npm install; git init; npm run setVersion，并且生成系统需要的一些依赖文件，等两分钟就好了
```

准备就绪，启动项目，程序自动在浏览器中打开，并且提供 webpack react 的热更新机制

```shell
npm start
```

添加功能页面，以 “系统公告 xtgg” 为例

```shell
orion add xtgg

# 此处同样是分步操作，根据提示选择页面的类型，输入页面的中文名称即可
# 页面类型 report | form | iframe(未实现)
# 后面会详细讲述不同的类型
```

系统会在项目对应的目录下创建 xtgg.js，并且添加到菜单中，菜单可以自行调整位置
