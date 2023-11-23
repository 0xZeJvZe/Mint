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