---
layout: app
---

# tensorflow-gpu的配置和安装
### 系统配置

![avatar](/blog_2_1.png)

### 更新源

打开终端，运行

```sh
sudo apt-get update	
sudo apt-get upgrade
```

这个步骤需要花比较多的时间

### 禁用nouveau驱动

在终端中输入

```sh
lsmod | grep nouveau
```

如果有输出，说明nouveau驱动正在运行，需要我们手动禁用。

在终端中输入

```sh
sudo gedit /etc/modprobe.d/blacklist-nouveau.conf
```
	
在文件中输入
	
	blacklist nouveau
	options nouveau modeset=0
	
之后关闭并保存文件

再在终端中输入

```sh
sudo update-initramfs -u
```

之后重启即可

### 安装CUDA 9.0

**CUDA 9.1的版本已经出了，但是tensorflow-gpu还不支持，所以使用老版本的CUDA 9.0**

打开[CUDA9.0官网](https://developer.nvidia.com/cuda-90-download-archive)

![avatar](/blog_2_2.png)

下载runfile文件

之后按ctrl+alt+F1进入控制台，登录后在控制台输入

```sh
sudo service lightdm stop
```
	
关闭图形界面

在控制台输入

```sh
sudo sh cuda_9.0.176_384.81_linux.run
```
	
运行CUDA工具安装包

所有的问题如果有默认就选默认，否则就选yes。

因为安装包中带有NVIDIA显卡驱动，所以如果已经安装过显卡驱动可以在询问是否安装显卡驱动时选择no。

安装好后启动图形界面

```sh
sudo service lightdm start
```
	
之后设置环境变量

```sh
sudo gedit /etc/profile
```
	
在文件末尾输入(64位系统)

	export PATH=/usr/local/cuda/bin:$PATH
	export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
	
保存并重启，之后检查是否安装成功

1. 检查显卡驱动是否安装成功

	```sh
	cat /proc/driver/nvidia/version
	```
	
2. 验证CUDA Toolkit

	```sh
	nvcc -V
	```
	
3. 编译sample，这一步需要大概10~20分钟，如果出错会立刻停止

	```sh
	cd /home/user_name/NVIDIA_CUDA-9.0_Samples
	sudo make
	```
		
	如果编译成功会显示Finished building CUDA samples
	
4. 运行编译完的sample

	```sh
	cd bin/x86_64/linux/release
	./deviceQuery
	```
	
	如果输出Result = PASS则成功

5. 最后检查CUDA-Capable deviced的连接情况

	```sh
	./bandwidthTest
	```
	
	如果输出Result = PASS则成功
	
### 安装cuDNN 7.1.3 for CUDA 9.0

打开[cuDNN官网](https://developer.nvidia.com/cudnn)

![avator](/blog_2_3.png)

下载最下面3个关于Ubuntu的deb文件

打开终端进行安装

```sh
sudo dpkg -i libcudnn7_7.1.3.16-1+cuda9.1_amd64.deb
sudo dpkg -i libcudnn7-dev_7.1.3.16-1+cuda9.1_amd64.deb
sudo dpkg -i libcudnn7-doc_7.1.3.16-1+cuda9.1_amd64.deb
```
	
安装完成后，我们检查是否安装成功

打开终端测试样例程序

```sh
cp -r /usr/src/cudnn_samples_v7 $HOME
cd $HOME/cudnn_samples_v7/mnistCUDNN
make clean && make
./mnistCUDNN
```

如果安装成功，会出现“Test passed!”信息

### 安装tensorflow-gpu

首先用终端安装python-pip

```sh
sudo apt-get install python-pip
```
	
为了加快之后安装tensorflow-gpu的速度，我们将pip源修改为清华大学的源

```sh
sudo mkdir ~/.pip
sudo gedit ~/.pip/pip.conf
```
	
在文件内输入

	[global]
	index-url = https://pypi.tuna.tsinghua.edu.cn/simple
	
并保存即可

之后在终端运行

```sh
sudo pip install numpy
sudo pip install tensorflow-gpu
```
	
检查是否安装成功

新建sample.py文件，在文件内输入

```python
import tensorflow as tf
hello = tf.constant('Hello World!')
sess = tf.Session()
print(sess.run(hello))
```

再终端中运行该程序

```sh
python sample.py
```
	
如果输出Hello World!则说明安装成功，Congratulations！

如果安装失败，可以尝试重装系统，换一份教程。。
