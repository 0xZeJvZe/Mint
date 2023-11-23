# Mint

**1. 下载Node.JS软件：**
```
https://nodejs.org/en
```
安装好之后，检查一下是否安装成功，打开一个终端窗口，输入：
```
node -v
npm -v
```
<img width="218" alt="image" src="https://github.com/0xsongsu/autoMint/assets/66813860/2c2d3327-44ef-4f18-a12f-f8831337a41c">

像这样返回版本号就说明安装成功，如果实在不知道怎么安装，百度或者google搜索安装教程


**2. 下载VS Code：**
```
https://code.visualstudio.com/download
```
下载最新版的就可以，看不懂英文就自行搜索“Vs code中文翻译插件“相关教程


**3. 在终端或者CMD安装ethers模块：**
```
npm install ethers@5
```
如果你是windows电脑，最好是使用管理员身份打开终端


**4. 修改程序参数：**

以上3步都安装完成后，使用Vs code打开代码文件，并修改如下参数，16进制我已经放了Pols的16进制，如果你打这个铭文，16进制不需要修改
  - PrivateKey：钱包私钥
  - toAddress：私钥对应的钱包地址
  - provider：alchemy申请的RPC节点，或者使用chainlist的节点链接，炼金术网站：https://dashboard.alchemy.com/
  - hexData：铭文的16进制数据
  - repeatCount：需要打多少张铭文


**5. 运行脚本：**

在VS Code的终端中执行命令
```
node automint.js
```
<img width="833" alt="image" src="https://github.com/0xsongsu/autoMint/assets/66813860/8b55a180-2df4-4d27-beed-237cee19b4a7">

mac电脑：对着脚本文件夹点右键，然后“新建位于文件夹位置的终端”，再在终端中输入“node automint.js”

windows：在文件夹上方的路径栏输入“CMD”，然后输入“node automint.js”


**6. 查询你打的张数和当前进度：**

```
https://dune.com/sleeeeep/pols
```
在dune看板中输入你的地址，就可以看到打了多少张
