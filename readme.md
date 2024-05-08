if you are coding in a nodejs project.
and you need test your code with a temp mysql, then this is a tool for you.

## 安装
+ 安装local-mysql模块
``npm i local-mysql --dev``
+ 本地环境安装 docker 或者 podman 比如
`brew install docker`
## 使用方式
+ 在`package.json`中增加字段 `local_mysql` 。通过vmtype字段指定容器类型。比如`docker`。以及设置当前单元测试用到的mysql账户和密码和端口号。这个端口就是本地监听的mysql镜像容器的端口号。mysql镜像内部启用的端口是3306。如果你像在本地通过3307跟镜像内3306建立映射。docker中通过`docker run -p 3307:3306 ` 。
而通过local-mysql工具，你只需在local_mysql 中设置 port为3307即可。
```json
{
  ......
  "local_mysql":{
    "vmtype":"docker",
    "password":"1234567",
    "port": 3307,
    "username": "shingu",
    "database":"shin_db_test"
  }
}
```
`password`,`port`,`username`,`database` 就是用在你单元测试环境的相关用户身份，在package.json中保持同步。
除了 vmtype目前只支持 docker 和podman意外，其他的都可以自定义。
你可以通过
```javascript
const databaseConfig  = JSON.parse(fs.readFileAsync(path.join(process.cwd(),'./package')))['local_mysql']。
```
获取到相关配置，并在你的项目的unittest环境的配置文件中指定mysql链接信息，以确保单元测试环境数据的一致性。
+ 在运行单元测试(jest/mocha)之前启用运行 `local-mysql`命令。该命令会在本地127.0.0.1:3307 端口，通过对应的用户身份连接上指定的数据库名。 并为你的单元测试创建了临时本地数据库环境。
`
local-mysql && jest xxxxx --runInBand
`

PS：`--runInBand`表示jest的单元测试场景是非多线程执行, 多线程执行会导致单元测试之间的数据受到影响。为避免数据冲突，使用单线程的方式开启单侧，这会一定程度上影响单元测试的时长。
## 如何在单元测试中使用事先准备的sql数据
 如果你在相对路劲中准备了相关sql数据用于你的场景单元测试 "./test/sql/init.sql"。使用 initSql 的方式在单元测试的用例运行之前执行`initSql`
```javascript
import {initSql} from local-mysql
describe(()=>{
  beforeAll(async ()=>{
    await initSql(["./test/sql/init.sql"])
  })
})

```
## 如何执行sql？
你想在你配置的local_mysql中相关的
使用`query`即可。
如下。
```js
import { query,initSql } from local-mysql
describe(()=>{
  beforeAll(async ()=>{
    await initSql(["./test/sql/init.sql"])
  })
})
test("xxxx",async ()=>{
  const result = await query("select * from xxxx");
})

```

## how to install
+ install local-mysql
``npm i local-mysql --dev``
+ install container such as docker or podman(mac)
`brew install docker`
## how to use
+  specify the container type in vmtype. for example: `docker`.
add local_mysql in your `package.json`. set the mysql connection profile as below. 
`port` is your local port listing mysql container.
`vmtype` only has two values current now. `docker` and `podman`.instance of docker and podman you have already installed in you computer. 

```json
{
  ......
  "local_mysql":{
    "vmtype":"docker",
    "password":"1234567",
    "port": 3307,
    "username": "shingu",
    "database":"shin_db_test"
  }
}
```
`password`,`port`,`username`,`database` could be used in your unit testing enviromemt.
you can use code:
```javascript
const databaseConfig  = JSON.parse(fs.readFileAsync(path.join(process.cwd(),'./package')))['local_mysql']。
```
in you unit testing env config file such as `config.unittest.ts` 

+ run command with jest/mocha
`
local-mysql && jest xxxxx --runInBand
`
if you have numbers of testing at the same time. use Single threaded mode in jest or mocha.
like `--runInBand` in jest command to avoid data conflicts between unit tests.
## how to init sql file in your test
 if you have a sql for your test and the file path is "./test/sql/init.sql"
```js
import {initSql} from local-mysql
describe(()=>{
  beforeAll(async ()=>{
    await initSql(["./test/sql/init.sql"])
  })
})

```
## how to query a sql
```js
import { query,initSql } from local-mysql
describe(()=>{
  beforeAll(async ()=>{
    await initSql(["./test/sql/init.sql"])
  })
})
test("xxxx",async ()=>{
  const result = await query("select * from xxxx");
})

```
PS: `initSql` and `query` will use the account which you have setted in package.json in `local_mysql` field