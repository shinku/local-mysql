## how to use
+ add local_mysql in your package.json。 set the mysql connection profile as below
```json
{
  "local_mysql":{
    "vmtype":"docker",
    "password":"1234567",
    "port": 3307,
    "username": "shingu",
    "database":"shin_db_test"
  }
}
```