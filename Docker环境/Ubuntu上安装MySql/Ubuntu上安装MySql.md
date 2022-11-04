## Ubuntu 上安装MySql



> 我们前面在docker上安装了Ubuntu  现在按window键搜索Docker Desktop 打开Docker

![](E:\LearnSpace\FullStack\Docker环境\Ubuntu上安装MySql\m1.png)

> 如果前面安装ubuntu的时候已经跟着教程运行起来了 现在就是运行状态 ，不是运行状态的话点击运行ubuntu
>
> ![](E:\LearnSpace\FullStack\Docker环境\Ubuntu上安装MySql\m2.png)

+ 点击正在运行的Ubuntu 

  > 更新你的 ubuntu 依赖库索引  
  >
  > ```
  >  apt update
  > ```

  ![](E:\LearnSpace\FullStack\Docker环境\Ubuntu上安装MySql\m3.png)

##### 安装MySql

+ 查看mysql-server(mysql在这里的名称为mysql-server) 的可用版本 

  ```
  apt-cache policy mysql-server
  ```

  

  ![](E:\LearnSpace\FullStack\Docker环境\Ubuntu上安装MySql\m4.png)

+ 开始安装

  > ```
  > apt install mysql-server
  > ```
  >
  > 

  > 安装时Ubuntu会询问是否继续 输入 **Y** 即可
  >
  > ![](E:\LearnSpace\FullStack\Docker环境\Ubuntu上安装MySql\m5.png)
  >
  > 接下来就是一个漫长的等待过程...
  >
  > ![](E:\LearnSpace\FullStack\Docker环境\Ubuntu上安装MySql\m6.png)
  >
  > 我这里安装完成后 可以看到mysql已经启动了  如果有没有启动的情况，以防万一
  >
  > 可以确定一下
  >
  > ```
  > service mysql restart
  > ```
  >
  > 
  >
  > 重启 mysql 服务以保证mysql 已经启动
  >
  > ![](E:\LearnSpace\FullStack\Docker环境\Ubuntu上安装MySql\m7.png)

+ 设置MySql

  > 第一次安装好mysql后，我们需要运行mysql自带的安全脚本来确保数据库系统的安全。这个脚本会把一些默认选项，例如允许远程root登录之类的设置改掉。
  >
  > 我们以root权限运行一下安全脚本
  >
  > ```
  > mysql_secure_installation
  > ```
  >
  > 
  >
  > 这个脚本运行后会问我们几个问题：
  >
  > 1. 是否需要mysql 帮你检查密码强度  Y
  >    ``````
  >    Securing the MySQL server deployment.
  >       
  >    Connecting to MySQL using a blank password.
  >       
  >    VALIDATE PASSWORD COMPONENT can be used to test passwords
  >    and improve security. It checks the strength of password
  >    and allows the users to set only those passwords which are
  >    secure enough. Would you like to setup VALIDATE PASSWORD component?
  >       
  >    Press y|Y for Yes, any other key for No: Y
  >
  > 2. 选择那种强度的密码 0=低强度 1=中等强度 2=强密码  我们选择2
  >
  >    > 强密码 数字、大小写混合且大于8位
  >    > ```
  >    > There are three levels of password validation policy:
  >    > 
  >    > LOW    Length >= 8
  >    > MEDIUM Length >= 8, numeric, mixed case, and special characters
  >    > STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file
  >    > 
  >    > Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 2
  >    > ```
  >    >
  >    > 
  >
  > 3. 设置自己的密码
  >
  > 4. Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : Y
  >
  >    您希望使用提供的密码继续吗？ Y
  >
  > 5. 其余的几个问题是加强安全系数用的，一路答 `Y` 代表 Yes 即可

> 中途遇到什么问题或者意外卡主之类的 可以 
>
> [卸载mysql]: #卸载mysql
>
>  重新来过 

+ 连接mysql数据库

  > `mysql`
  >
  > 注意光标前面的 `mysql>` 这代表我们已经在 MySQL 服务器上了

+ 我们需要查看用户的鉴权设置

  > ```sql
  > SELECT user,authentication_string,plugin,host FROM mysql.user;
  > ```
  >
  > ```sql
  > 输出应该如下
  > mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
  > +------------------+------------------------------------------------------------------------+-----------------------+-----------+
  > | user             | authentication_string                                                  | plugin                | host      |
  > +------------------+------------------------------------------------------------------------+-----------------------+-----------+
  > | debian-sys-maint | $A$005$T%phQ~^fKO6EfMfxl5rrigRsYygC8pogyigznzNbJFLWgkYObYp7 | caching_sha2_password | localhost |
  > | mysql.infoschema | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
  > | mysql.session    | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
  > | mysql.sys        | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
  > | root             |                                                                        | auth_socket           | localhost |
  > +------------------+------------------------------------------------------------------------+-----------------------+-----------+
  > 5 rows in set (0.04 sec)
  > ```
  >
  > 注意看 `root` 用户这一行（第5行），它的 `plugin` 这一列就是我们刚说的 `auth_socket`，这是不允许用密码登录的。那么，我们用 `ALTER USER` SQL 语句来把它改掉，如下
  >
  > ```sql
  > ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'YOUR_PASS_WORD';
  > ```
  >
  > 我这里出现修改密码失败的问题，其意思（MySQL服务器运行时使用了——skip-grant-tables选项，所以它不能执行此语句）
  >
  > ```
  >  mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'QWEqwe123!@#';
  > ERROR 1290 (HY000): The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement
  > ```
  >
  > 解决：
  >
  > mysql> flush privileges;
  > Query OK, 0 rows affected (0.01 sec)
  >
  > mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'QWEqwe123!@#';
  > Query OK, 0 rows affected (0.02 sec)

+ 查看是否更改成功

  > ```
  > mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
  > +------------------+------------------------------------------------------------------------+-----------------------+-----------+
  > | user             | authentication_string                                                  | plugin                | host      |
  > +------------------+------------------------------------------------------------------------+-----------------------+-----------+
  > | debian-sys-maint | $A$005$T%phQ~^fKO6EfMfxl5rrigRsYygC8pogyigznzNbJFLWgkYObYp7 | caching_sha2_password | localhost |
  > | mysql.infoschema | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
  > | mysql.session    | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
  > | mysql.sys        | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | localhost |
  > | root             | $A$005$8(Q\/,^ L%ueEo72s28YwBNCsg.nm8rBB5Fk9BfKYrz29xU2.A3RjDv616 | caching_sha2_password | localhost |
  > +------------------+------------------------------------------------------------------------+-----------------------+-----------+
  > 5 rows in set (0.00 sec)
  > ```
  >
  > 注意 `root` 这行，鉴权已经换成了 `caching_sha2_password`
  >
  > 这时我们可以用 `ctrl + D` 或者敲入 `exit` 来退出 MySQL 回到 Ubuntu 命令行

+ 最后 测试下mysql 是不是完全安装成功

  > service 命令是用来管理服务的  （ MySQL 也是 Ubuntu 里服务的一种）
  >
  > ```
  > # service mysql status
  >  * /usr/bin/mysqladmin  Ver 8.0.31-0ubuntu0.22.04.1 for Linux on x86_64 ((Ubuntu))
  > Copyright (c) 2000, 2022, Oracle and/or its affiliates.
  > 
  > Oracle is a registered trademark of Oracle Corporation and/or its
  > affiliates. Other names may be trademarks of their respective
  > owners.
  > 
  > Server version          8.0.31-0ubuntu0.22.04.1
  > Protocol version        10
  > Connection              Localhost via UNIX socket
  > UNIX socket             /var/run/mysqld/mysqld.sock
  > Uptime:                 4 hours 37 min 23 sec
  > 
  > Threads: 1  Questions: 20  Slow queries: 0  Opens: 131  Flush tables: 3  Open tables: 52  Queries per second avg: 0.001
  > ```
  >
  > 如果 MySQL 没有在运行的话，你可以用 
  >
  > ``` 
  > service mysql restart
  > ```
  >
  > 来重启它。
  >
  > 



+ 验证客户端mysql是不是通畅，使用 `mysqladmin` 来尝试连接mysql

  > ```bash
  > mysqladmin -p -u root version
  > # 输入后它会询问你 root 用户的密码
  > ```

  > ```bash
  > # -p 代表使用密码，-u root 代表用户为 root，最后的 version 代表我们想要查看 MySQL 版本，这里查看版本这个
  > # 动作只是为了验证 MySQL 是否可以连上而已。如果连不上，会报错
  > 
  > ```

  > ```bash
  > # 如果你的密码输入正确，那么输出应该类似
  > # mysqladmin -p -u root version
  > Enter password: 
  > mysqladmin  Ver 8.0.31-0ubuntu0.22.04.1 for Linux on x86_64 ((Ubuntu))
  > Copyright (c) 2000, 2022, Oracle and/or its affiliates.
  > 
  > Oracle is a registered trademark of Oracle Corporation and/or its
  > affiliates. Other names may be trademarks of their respective
  > owners.
  > 
  > Server version          8.0.31-0ubuntu0.22.04.1
  > Protocol version        10
  > Connection              Localhost via UNIX socket
  > UNIX socket             /var/run/mysqld/mysqld.sock
  > Uptime:                 4 hours 46 min 3 sec
  > 
  > Threads: 1  Questions: 22  Slow queries: 0  Opens: 131  Flush tables: 3  Open tables: 52  Queries per second avg: 0.001
  > ```
  >
  > 上面的输出说明你的 MySQL 正在健康地运行

+ 登录mysql 

  > ```
  > mysql -u root -p
  > QWEqwe123!@#
  > ```
  >
  > 

## 安装Q&A

```
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : y
 ... Failed! Error: SET PASSWORD has no significance for user 'root'@'localhost' as the authentication method used doesn't store authentication data in the MySQL server. Please consider using ALTER USER instead if you want to change authentication parameters.
```

## 卸载mysql

+ 编写本文时mysql版本为8.0

```
apt-get autoremove --purge mysql-server
apt-get remove mysql-common
rm -rf /etc/mysql/  /var/lib/mysql
```



# 清理残留数据

```
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
apt autoremove
apt autoclean
```

