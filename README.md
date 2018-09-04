# uke cli

管理系统的帮助工具，可以快速搭建、生成、开发基于 uke admin 模版的管理后台以及 web server

## 使用

安装 uke cli

```shell
npm i uke-cli -g # 安装成功可以使用 uke cli
```

## 命令一览

- uka 为 uke-admin 的缩写
- uks 为 uke-server 的缩写

```js
uka -v
uks -v
uke-admin -v
uke-server -v
```

## 自动构建管理后台脚手架和 web server 脚手架

```shell
# 构建管理系统的命令
uka init
uke-admin init
# 此处是分步操作，根据提示，分别输入项目的英文名称，开发者名称
# 以下例子使用 test-proj
# 初始化成功后会在当前目录生成 ./test-proj 项目

# 构建 web server 的命令
uks init
uke-server init
# 此处是分步操作，根据提示，分别输入项目的英文名称，开发者名称
# 以下例子使用 test-proj
# 初始化成功后会在当前目录生成 ./test-proj 项目
# 并且会自动执行 npm install; git init; npm run setVersion，并且生成系统需要的一些依赖文件，等两分钟就好了

cd ./test-proj

# 准备就绪，启动项目
npm start
```

### 构建 uke-admin

同步操作 uke addp *pageName* *pageAlias* *pageTypeFlag*

```shell
uka addp xtgg 系统公告 -r

# 此处是同步操作, 创建一个 report 类型的系统公告 action 和 page
# 页面类型 -r == report | -f == form | -i == iframe(未实现) | -m == markdown(未实现)
```

分步操作

```shell
uka add xtgg

# 此处同样是分步操作，根据提示选择页面的类型，输入页面的中文名称即可
# 页面类型 report | form | iframe(未实现) | markdown(未实现)
# 后面会详细讲述不同的类型
```

会自动创建 xtgg.js，并且添加到菜单中，菜单可以自行调整位置

### 构建 uke-web-server

TODO

- 构建 service
- 构建动态路由
