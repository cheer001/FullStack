## Docker上安装Ubuntu

+ 推荐使用 Windows Terminal

> 下载地址

https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=zh-sg&gl=sg

+ 打开刚下载的Windows Terminal(Windows PowerShell)

  `docker version`

![](E:\LearnSpace\FullStack\Docker环境\Docker上安装ubuntu\u1.png)

> 查看doker 是否安装成功

+ 拉取 Ubuntu 

  `docker pull ubuntu:latest`

![](E:\LearnSpace\FullStack\Docker环境\Docker上安装ubuntu\u2.png)

> 显示 pull compalte （拉取完成）

+ 查询拉取下来的ubuntu 

  `docker images`

![](E:\LearnSpace\FullStack\Docker环境\Docker上安装ubuntu\u3.png)

+ 运行容器，通过exec 命令进入 ubuntu 容器

  `docker run -itd --name ubuntu-test ubuntu` 

![](E:\LearnSpace\FullStack\Docker环境\Docker上安装ubuntu\u4.png)

+ 安装成功

  > 通过 `docker ps` 命令查看容器的运行信息
  >
  > ![](E:\LearnSpace\FullStack\Docker环境\Docker上安装ubuntu\u5.png)

