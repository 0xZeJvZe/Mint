//1. `const { ethers } = require("ethers");`: 这行代码导入ethers.js库，使其可用于脚本。
//2. 设置私钥（`privateKey`）和目标地址（`toAddress`），分别代表发送方的私钥和接收方的地址。

//3. `const provider = new ethers.providers.JsonRpcProvider("Polygon节点URL");`: 使用JsonRpcProvider连接到Polygon网络，需要提供Polygon节点的URL。在哪个链上打就用哪个链的URL

//4. `const wallet = new ethers.Wallet(privateKey, provider);`: 创建一个钱包，使用提供的私钥和连接到Polygon网络的提供者。

//5. `const hexData = "...";`: 这里是你要打铭文的16进制

//6. `async function getCurrentNonce(wallet) { ... }`: 这个函数用于获取当前账户的交易nonce，即交易次序号。

//7. `async function getGasPrice() { ... }`: 获取当前主网 gas 价格的函数。

//8. `async function getGasLimit() { ... }`: 获取链上实时 gasLimit 的函数。

//9. `async function sendTransaction(nonce) { ... }`: 这个函数用于发送交易。它构建了一个交易对象，包括接收地址、金额、十六进制数据等，并且指定了 gas 价格、gas 限制和nonce等信息。

//10. `const repeatCount = 300;`: 这是设置交易重复次数的变量。

//11. `async function sendTransactions() { ... }`: 这个函数用于发送多个交易，它调用`sendTransaction`函数来多次发送交易，根据设定的重复次数来执行。

//12. `sendTransactions();`: 最后，调用`sendTransactions`函数来执行整个过程，发送多个交易到目标地址。




const { ethers } = require("ethers");

// 配置你的私钥和目标地址
const privateKey = "你的私钥"; 
const toAddress = "你的地址"; 

// 连接到你要打的铭文链上节点
const provider = new ethers.providers.JsonRpcProvider("这里填URL"); 

// 创建钱包
const wallet = new ethers.Wallet(privateKey, provider);

// 自定义十六进制数据
const hexData = "在这填！"; // 要打铭文的十六进制数据

// 获取当前账户的 nonce
async function getCurrentNonce(wallet) {
  try {
    const nonce = await wallet.getTransactionCount("pending");
    console.log("Nonce:", nonce);
    return nonce;
  } catch (error) {
    console.error("Error fetching nonce:", error.message);
    throw error;
  }
}

// 获取当前主网 gas 价格
async function getGasPrice() {
  const gasPrice = await provider.getGasPrice();
  return gasPrice;
}
// 获取链上实时 gasLimit
async function getGasLimit() {
  const gasLimit = await provider.estimateGas({
    to: toAddress,
    value: ethers.utils.parseEther("0"),
    data: hexData,
  });

  return gasLimit.toNumber();
}

// 转账交易
async function sendTransaction(nonce) {
  const currentGasPrice = await getGasPrice(); // 获取实时 gasPrice
  const increasedGasPrice = currentGasPrice.mul(110).div(100); // 在当前 gasPrice 上增加10%
  const gasLimit = await getGasLimit(); 

  const transaction = {
    to: toAddress,
    value: ethers.utils.parseEther("0"), // 替换为你要转账的金额
    data: hexData, 
    nonce: nonce, 
    gasPrice: increasedGasPrice, 
    gasLimit: gasLimit, 
  };

  try {
    const tx = await wallet.sendTransaction(transaction);
    console.log(`Transaction with nonce ${nonce} hash:`, tx.hash);
  } catch (error) {
    console.error(`Error in transaction with nonce ${nonce}:`, error.message);
  }
}

// 定义重复次数
const repeatCount = 300; // 你想要打多少张，这里就设置多少，第一次先打一张，跑一下试试

async function sendTransactions() {
  const currentNonce = await getCurrentNonce(wallet);

  for (let i = 0; i < repeatCount; i++) {
    const gasPrice = await getGasPrice(); // 获取实时 gas 价格
    await sendTransaction(currentNonce + i, gasPrice);
  }
}

sendTransactions();