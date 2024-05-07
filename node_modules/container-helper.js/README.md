# container-help.js
## description
nodejs模块，可以帮助你在nodejs环境跟容器应用比如 docker,podman,lima 等容器应用交互。

## （跟docker交互）how to use like a docker
```javascript
const c = require('container-helper.js')
const docker =c.getVm('docker')
// docker images
docker.showImages().then(images=>console.log(images))
```

## （跟podman交互）how to use like a podman
```javascript
const c = require('container-helper.js')
const podman =c.getVm('podman')
// docker images
podman.showImages().then(images=>console.log(images))
```

## functions
以docker为例，内置的函数方法
##### 启动容器
+ docker.startVm()
##### 展示所有的images
+ docker.showImages();
##### build一个image
+ docker.buildImage 
其中 dockerFilePath 表示的是dockerFile文件存在的路径。`docker.buildImage` 会在 dockerFilePath 对应的目录下开始构建镜像
```js
  // docker build -t mysql:latest .  
  docker.buildImage({   
      imageName: "mysql",
      dockerFilePath: path.join(__dirname, "../images/mysql"),
      version: 'latest' 
  });
```
##### 启动一个容器
+ docker.runImage({});
```js
// docker run -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456789 --name test-mysql
await docker.runImage({
      p:[3307,3306],
      name: 'test-mysql',
      e: {
        "MYSQL_ROOT_PASSWORD":"123456789"
      }
    })
  
```
##### 删除一个image
+ docker.removeImage(NAME);
##### 删除一个container
+ docker.removeContainer(NAME)
##### 跑一个命令
+ docker.runCommand(command)
比如命令行:
```bash
docker build -t mysql:latest . 
```
则通过docker容器去跑对应的命令
```js
docker.runCommand("build -t mysql:latest .")
```