---
layout: app
---

# 阿里云CentOS服务器配置

## 机器基础配置

### 远程连接

```bash
ssh root@120.27.238.110
```

输入服务器密码

### 更新yum

```
yum update
yum upgrade
```

### 安装必须组件

```bash
yum install git
```

### 安装sqlite3

```bash
wget https://www.sqlite.org/2019/sqlite-autoconf-3280000.tar.gz
tar -zxvf sqlite-autoconf-3280000.tar.gz
cd sqlite-autoconf-3280000
./configure
make && make install
## 更改旧的版本
mv /usr/bin/sqlite3 /usr/bin/sqlite3_old
## 把新版本复制到目标路径
cp sqlite3 /usr/bin/sqlite3
## 检查是否成功
```

### 安装python3

```bash
##下载python3
wget https://www.python.org/ftp/python/3.6.8/Python-3.6.8.tar.xz
##安装相关工具
yum -y groupinstall "Development tools"
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
yum install libffi-devel -y
##安装python3
tar -xvJf  Python-3.6.8.tar.xz
mv Python-3.6.8 /usr/local/python-3.6
cd /usr/local/python-3.6/
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
./configure --prefix=/usr/local/sbin/python-3.6
LD_RUN_PATH=/usr/local/lib ./configure LDFLAGS="-L/usr/local/lib" CPPFLAGS="-I/usr/local/include"  --prefix=/usr/local/sbin/python-3.6
LD_RUN_PATH=/usr/local/lib make
make install
##查找python位置
which python
ln -sv /usr/local/sbin/python-3.6/bin/python3 /usr/bin/python3
ln -s /usr/local/sbin/python-3.6/bin/pip3 /usr/bin/pip3
export PATH=$PATH:/usr/local/sbin/python-3.6/bin
##检查是否成功
python3 -V
pip3 -V
```

* * *

## 安装服务器

### 下载平台

```bash
git clone https://github.com/PKU-EconCS/godlie_platform.git
```

### 安装项目的requirements

```bash
cd godlie_platform
pip3 install -r requirements.txt
```

* * *

### 安装uWSGI

```bash
pip3 install uwsgi
```

建立软连接

```bash
ln -s /usr/local/sbin/python-3.6/bin/uwsgi /usr/bin/uwsgi
```

### 配置uWSGI

在`manage.py`所在的文件夹创建`uwsgi.ini`

```python
[uwsgi]
#服务端口
http = 0.0.0.0:80
 
#指定与Nginx通信的方式，不影响uwsgi本身运行。如果配置了需要到nginx中进行相关配置-才能通过nginx访问Django
#socket = 127.0.0.1:8001
 
# 启动一个master进程，来管理其余的子进程
master = True
processes = 4
threads = 2
 
#python虚拟环境目录绝对路径。如果有的话，home是虚拟环境根目录，PYTHNONHOME是虚拟环境下的bin目录（放置了Python执行文件）
#home = /env
#PYTHONHOME = /env/bin
 
#django项目目录，与manager.py同级
chdir = ./
 
#主应用中的wsgi，下面这种配法是在Django根目录下运行uwsgi有效，主APP名为有settings.py的那个目录名。如果是其他目录运行，下面建议写成绝对路径。
wsgi-file = info_ellicitation/wsgi.py
 
#服务停止时自动移除unix Socket和pid文件
vacuum = true
 
#设置每个工作进程处理请求的上限，达到上限时，将回收（重启）进程，可以预防内存泄漏
max-requests=5000
 
#设置后台运行保存日志。只要配置了daemonize就会让uwsgi后台运行，同时将日志输出到指定目录
daemonize=../platform.log
 
#保存主进程的pid，用来控制uwsgi服务
pidfile=../platform.pid
#uwsgi --stop/reload xxx.pid 停止/重启uwsgi
 
#静态文件映射
#static-map = /static=Django下static目录的绝对路径
```

### 运行uwsgi

```bash
uwsgi uwsgi.ini
```

### 停止运行uwsgi

```bash
uwsgi --stop ../platform.pid
```

* * *

### 安装Nginx

```bash
yum -y install nginx
```

### 配置Nginx

```bash
vim /etc/nginx/nginx.conf
```

修改其中代码

```javascript
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  _;
    root         /usr/share/nginx/html;
    # Load configuration files for the default server block.
    include /etc/nginx/default.d/\*.conf;
    location / {
    	include uwsgi_params;
    	uwsgi_pass 127.0.0.1:8001;
    }
    location /static {
        alias /home/www/library_system/static/;
    }
    access_log /var/log/nginx_access.log;
    error_log /var/log/nginx_error.log;
```

### Nginx控制命令

```bash
systemctl start nginx.service
systemctl start nginx.service
```

* * *

## 控制台

安装完后写入这段代码即可

```bash
cd godlie_platform/info_ellicitation
uwsgi uwsgi.ini
systemctl start nginx.service
```

即可启动

不使用Nginx

```bash
cd godlie_platform/info_ellicitation
uwsgi uwsgi.ini
```

