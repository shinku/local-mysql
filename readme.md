if you are coding in a nodejs project.
and you need test your code with a temp mysql, then this is a tool for you.


## how to install
+ install local-mysql
``npm i local-mysql --dev``
+ install container such as docker or podman(mac)
`brew install docker`
## how to use
+  specify the container type in vmtype. for example: `docker`.
add local_mysql in your `package.json`. set the mysql connection profile as below. and 
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
+ run command with jest/mocha
`
local-mysql && jest xxxxx
`
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