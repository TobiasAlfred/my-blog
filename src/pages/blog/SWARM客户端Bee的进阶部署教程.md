---
layout: '../../layouts/BlogPost.astro'
title: 'SWARM客户端Bee的进阶部署教程'
date: '2021-03-07'
description: '距离上一篇关于Bee的文章（关于SWARM空投节点的简明架设教程）已有两周的时间，出乎我意料的是，上篇文章的累计总阅读量竟然突破了2000+，这期间也有不少读者后台留言向我咨询关于Bee部署的细节问题，基于大家的期待，我想才有这篇文章的产生。'
tags: ['深度思考', '区块链技术']
---

距离上一篇关于Bee的文章（[关于SWARM空投节点的简明架设教程](#wechat_redirect)）已有两周的时间，出乎我意料的是，上篇文章的累计总阅读量竟然突破了2000+，这期间也有不少读者后台留言向我咨询关于Bee部署的细节问题，基于大家的期待，才有了这篇文章的产生。

![ef03d34d-cc88-4fa5-ad66-8abfcf445a1e](/blog/ef03d34d-cc88-4fa5-ad66-8abfcf445a1e.jpg)

在这里特别向SWARM官方支持组的@ldeffenb表示感谢，在测试Bee客户端的过程中，我反复向他求教了很多细节的问题，都一一得到了耐心的答复。我想用他对我的一句留言来开启今天的文章：

> If one person has a question, then it's likely that 10 other people are interested in the answer.

极客的精神就是求知和分享，希望本篇文章能对你有所启发。 ⚠️ **重要提示：以下所有内容均为笔者自己的探索经验，不构成投资建议**

------

#### 一、决定Bee客户端支票产量的核心因素

这是大家最关心的问题，笔者为了探索Bee客户端产出支票的影响因素，先后测试了国内、国外不同配置的云服务器，通过反复的客户端部署和观察，总结出以下可参考的结论。

> 以下说明基于Ubuntu系统，使用Xshell和Winscp链接云服务器，使用root用户操作，所有命令基于官方文档：https://docs.ethswarm.org/docs/

#### 1、带宽

SWARM作为底层分布式存储和通信项目，节点间的通信质量和效率，是决定本地客户端对外链接节点数量的最重要因素：

- 国内4核8G内存5M带宽的云服务器：对外节点连接数量稳定在40以内，**每日支票产出量6-10张**，属于最基本节点运行水平。
- 家用宽带：虽然下行速率普遍在100M-500M甚至更高，但上行速率被运营商限制在几十M左右，上传速度不足会严重影响出票效率。
- 国外1G带宽服务器：对外节点连接数量波动区间在200-500左右，**每日产出支票大概在60-150张**。

#### 2、CPU

Bee客户端对CPU资源消耗量非常大：

- 单服务器同时运行2个Bee节点，数据同步初期：4核心CPU占用300%+，8核心CPU占用150%+
- 节点运行稳定后：4核心CPU占用180%+，8核心CPU占用90%+ 长期高CPU占用会导致宕机、客户端进程断开，这也是很多节点运行不稳定的核心原因。

#### 3、硬盘占用

SWARM是分布式存储项目，对硬盘要求较高：

- 默认配置下，客户端运行后硬盘占用稳定在21G左右：Bee配置文件中默认`db-capacity: 5000000`，人为设置了数据承载上限为21G。
- 优化建议：可以在配置文件中调大`db-capacity`参数提高空间承载能力，对节点出票有明显好处，笔者一般设置为`25000000`（约97G）。
- 硬盘类型选择：固态硬盘SSD出票效率远高于机械硬盘HDD，NVMe协议的SSD性能优于SATA协议SSD。

#### 4、Bee-clef签名工具

笔者测试发现：**不使用Bee-clef比使用Bee-clef出票效率更高**。 Bee-clef是外部签名工具，不使用的话Bee客户端会用自带的key进行签名，只需要在配置文件中添加`clef-signer-enable: false`即可关闭。

#### 5、独立swap-endpoint

尽量不要使用公用的swap-endpoint，自己登陆[infura.io](https://infura.io)注册专属的swap-endpoint，添加到配置文件中，出票效率会有明显提升。

------

#### 二、单台服务器运行多个Bee客户端教程

在服务器资源有限的情况下，运行多个Bee客户端可以大幅提高资源利用率，获取更多支票，需要满足4个前提条件：

1. 不使用Bee-clef签名工具
2. 每个客户端使用独立的配置文件启动
3. 每个客户端占用不同的对外通信端口
4. 每个客户端使用独立的目录存储节点数据

以上配置都可以通过修改客户端启动文件实现，具体步骤如下：

#### 1、部署第一个客户端

进入`/etc/bee`目录，修改`bee.yaml`配置文件，确保包含以下内容（括号内为说明，复制时请删除）：

```yaml
api-addr: :1633 # HTTP API端口
clef-signer-enable: false # 关闭Bee-clef
config: /etc/bee/bee.yaml # 指定配置文件位置
data-dir: /var/lib/bee # 指定客户端数据存储目录
db-capacity: 25000000 # 指定客户端数据储存上限，可自定义
debug-api-addr: 127.0.0.1:1635 # 调试端口
debug-api-enable: true # 开放调试API
p2p-addr: :1634 # P2P通信端口
password-file: /var/lib/bee/password # keystore密码文件路径
swap-endpoint: XX # 自己注册的infura API接口地址
verbosity: 5 # 显示所有客户端运行日志信息
```

使用以下命令启动第一个Bee客户端：

```bash
bee start \
--config /etc/bee/bee.yaml
```

#### 2、部署第二个客户端

进入`/etc/bee`目录，复制`bee.yaml`配置文件并重命名为`bee02.yaml`，修改对应参数：

```yaml
api-addr: :1643 # 端口从1633改为未被占用的新端口
clef-signer-enable: false
config: /etc/bee/bee02.yaml # 改为新配置文件路径
data-dir: /var/lib/bee02 # 改为新的独立数据存储目录
db-capacity: 25000000
debug-api-addr: 127.0.0.1:1645 # 改为未被占用的新调试端口
debug-api-enable: true
p2p-addr: :1644 # 改为未被占用的新P2P通信端口
password-file: /var/lib/bee/password # 可复用或自定义密码路径
swap-endpoint: XX # 可复用或更换infura接口地址
verbosity: 5
```

使用以下命令启动第二个Bee客户端：

```bash
bee start \
--config /etc/bee/bee02.yaml
```

#### 3、部署更多客户端

需要运行第三、第四个客户端的话，重复上述步骤，修改对应端口和目录即可。

------

#### 三、不使用Bee-clef时获取钱包私钥教程

之前的文章讲解过使用Bee-clef时获取keystore和密码导入Metamask的方法，不使用Bee-clef时可以参考@ldeffenb给出的方案：https://pastebee.com/?3b2a4cecafa21a7afcdd4d4f3d74fef1d5551acd91eb2d3a5b750dc9a161fbcf

#### 实现原理

不使用Bee-clef时，keystore位置为`/var/lib/bee/keys/swarm.key`，密码位置为`/var/lib/bee/password`，但swarm.key的格式不是Metamask支持的导入格式，需要通过转换工具还原出私钥，再用私钥导入钱包。

#### 具体操作步骤

#### 1、安装go语言环境

```bash
sudo apt install golang-go
```

安装完成后执行`go version`，正常返回版本号即为安装成功。

#### 2、创建工作目录

```bash
cd ~
mkdir exportKey
cd exportKey
```

#### 3、下载转换工具源代码

```bash
wget https://raw.githubusercontent.com/ethersphere/exportSwarmKey/master/pkg/main.go
wget https://raw.githubusercontent.com/ethersphere/exportSwarmKey/master/go.mod
wget https://raw.githubusercontent.com/ethersphere/exportSwarmKey/master/go.sum
```

#### 4、复制swarm.key到工作目录并赋予权限

```bash
cp /var/lib/bee/keys/swarm.key .
# 注意最后有个点，代表复制到当前目录
chmod a+x swarm.key
```

#### 5、运行转换工具导出私钥

```bash
go run main.go . [password文件中存储的密码原文]
```

运行完毕后，`private key：`后面跟着的内容就是私钥，可直接导入Metamask。

如果需要多次使用，可以提前编译成可执行文件：

```bash
go build main.go
```

编译后会生成名为`main`的可执行文件，后续直接运行以下命令即可导出同目录下swarm.key对应的私钥：

```bash
./main . [密码原文]
```

------

由于篇幅有限，无法就所有操作细节展开说明，遇到问题可以后续交流，也可以直接进入官方Discord频道提问，频道内还有官方提供的gBZZ水管。 后续我会更新使用crontab自动兑现支票、查询已获取支票数量等相关内容，敬请期待。
