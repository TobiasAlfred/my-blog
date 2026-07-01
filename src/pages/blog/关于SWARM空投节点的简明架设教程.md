---
layout: '../../layouts/BlogPost.astro'
title: '关于SWARM空投节点的简明架设教程'
date: '2021-02-19'
description: '这两天朋友推荐我一个以太坊上的分布式数据存储项目SWARM，近期依据测试网的参与程度进行其代币BZZ的空投，想要参与空投需要运行SWARM的节点客户端，名称为Bee。'
tags: ['深度思考', '区块链技术']
---

这两天朋友推荐我一个以太坊上的分布式数据存储项目SWARM，近期依据测试网的参与程度进行其代币BZZ的空投，想要参与空投需要运行SWARM的节点客户端，名称为Bee。现将节点客户端的架设方法简要说明如下，如有错误之处，烦请指正。

> 🔖 说明：以下操作基于Ubuntu系统，使用Xshell和Winscp连接云服务器，全程使用root用户操作，所有命令参考官方文档：https://docs.ethswarm.org/docs/

------

![035e9c9d-0995-4098-a9d2-050eeb6c0e4c](/blog/035e9c9d-0995-4098-a9d2-050eeb6c0e4c.jpg)

#### 一、安装Bee-clef

Bee-clef是密钥管理工具，bee-clef文件夹下存储着与私钥等同的keystore和password文件，非常重要请妥善保管。

#### 1. 使用wget下载Bee-clef安装包

```bash
wget https://github.com/ethersphere/bee-clef/releases/download/v0.4.7/bee-clef_0.4.7_amd64.deb
```

#### 2. 安装Bee-clef

```bash
sudo dpkg -i bee-clef_0.4.7_amd64.deb
```

命令执行成功即完成Bee-clef的安装。

------

#### 二、安装节点客户端Bee

Bee是节点客户端程序，负责维持节点的正常运行。

#### 1. 使用wget下载Bee安装包

```bash
wget https://github.com/ethersphere/bee/releases/download/v0.5.0/bee_0.5.0_amd64.deb
```

#### 2. 安装Bee

```bash
sudo dpkg -i bee_0.5.0_amd64.deb
```

命令执行成功即完成Bee的安装，初期准备工作完成。

------

#### 三、生成Bee节点客户端的地址

节点地址是与你运行的Bee节点对应的以太坊地址，也是未来官方发放空投的地址，空投BZZ数量与节点的运行时间、运行质量直接挂钩。

仅需要执行以下启动命令即可生成地址，执行时需要输入两次节点运行密码，输入完成后节点会报错启动失败，属于正常情况可以忽略：

```bash
bee start \
--verbosity 5 \
--swap-endpoint https://rpc.slock.it/goerli \
--debug-api-enable \
--clef-signer-enable \
--clef-signer-endpoint /var/lib/bee-clef/clef.ipc
```

运行信息中可以在以下几个位置找到自己的地址，可以交叉验证：

1. INFO信息中`using ethereum address` 后面的字符串（没有0x开头）
2. WARN信息中`receiver=`后面的字符串（以0x开头）
3. `/var/lib/bee-clef/keystore`目录下的keystore文件名中也含有以0x开头的地址

获取地址后使用`ctrl+c`结束节点运行即可。

> ⚠️ 注意：使用`bee-get-addr`命令获取的地址与上述提到的以太坊空投地址不一致，不要使用该命令获取的地址。

------

#### 四、获取gETH和gBZZ

这两类代币都是以太坊Goerli测试网上的测试代币，无需付费，可以登录官方水龙头网站，输入第三节获取的以太坊地址，免费领取gETH和gBZZ： 👉 水龙头地址：https://faucet.ethswarm.org/

------

#### 五、通过screen工具在后台运行节点程序

前四步完成后，我们使用screen工具运行节点程序，确保断开Xshell连接后，节点仍能在后台持续运行。

#### 1. 打开screen虚拟终端

```bash
screen -S swarm
```

#### 2. 启动Bee节点客户端

在打开的虚拟终端中执行之前的启动命令：

```bash
bee start \
--verbosity 5 \
--swap-endpoint https://rpc.slock.it/goerli \
--debug-api-enable \
--clef-signer-enable \
--clef-signer-endpoint /var/lib/bee-clef/clef.ipc
```

正常运行时会有大量日志输出，只要出现与其他节点成功通信并交换令牌的提示，就说明节点运行成功。

#### 3. 监测节点连接数

可以执行以下命令查看当前节点已经连接了多少个其他节点：

```bash
curl -s http://localhost:1635/peers | jq '.peers | length'
```

#### 4. 后台挂起节点

使用`ctrl+a`然后按`d`退出screen虚拟终端，此时Bee客户端就会进入后台运行，你可以关闭Xshell或者进行其他操作。如果需要回到节点终端查看日志，执行：

```bash
screen -r swarm
```

------

#### 六、检查是否获取支票及Cashout操作

节点成功运行后，会不断与其他节点通信，交换令牌的过程就会产生所谓的「支票」，获取的有效支票越多，能拿到的空投就越多。支票需要定期兑现（也就是Cashout），只有兑现成功的支票才能计入空投核算。

#### 1. 查看当前支票数量

```bash
curl localhost:1635/chequebook/cheque | jq
```

返回结果中每一段包含`peer`到`payout`字段的大括号就代表一张支票，有几段就代表有几张支票。

> ⚠️ 注意：`"lastreceived": null`的支票是无效支票，无法兑现，不计入空投。

#### 2. 使用脚本自动兑现支票

为了简化cashout操作，我们可以使用现成的自动化脚本：

1. 下载脚本到当前目录：

```bash
wget -O cashout.sh https://gist.githubusercontent.com/ralph-pichler/3b5ccd7a5c5cd0500e6428752b37e975/raw/7ba05095e0836735f4a648aefe52c584e18e065f/cashout.sh
```

1. 给脚本赋予执行权限：

```bash
chmod a+x cashout.sh
```

1. 查看所有可兑现的支票：

```bash
./cashout.sh
```

1. 自动兑现所有价值超过5BZZ的支票：

```bash
./cashout.sh cashout-all 5
```

只要保持节点持续运行，定期执行cashout操作，等待官方空投即可。

------

#### 七、使用Metamask管理节点地址钱包

空投发放后，BZZ代币的交易需要用到Metamask钱包，节点地址的私钥相关文件保存在`/var/lib/bee-clef/`目录下：

- `keystore`文件夹下保存着keystore加密私钥文件
- 同目录下的`password`文件明文保存着与keystore配对的密码

安装Metamask后，先创建一个默认钱包，然后使用「导入钱包」功能，上传对应的keystore文件并输入密码，即可导入节点地址的钱包，后续可以直接管理收到的BZZ代币。

------

> 📢 风险提示：笔者接触SWARM项目仅两天，对项目理解尚浅，以上内容仅为技术操作分享，不构成任何投资建议，写这篇文章仅为了帮助大家少走弯路，欢迎大家批评指正。
