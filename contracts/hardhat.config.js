require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

console.log(process.env.PRIVATE_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    "optimism-goerli": {
      url: "https://goerli.optimism.io",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    scrollTestnet: {
      url: "https://alpha-rpc.scroll.io/l2",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: {
      goerli: "YOUR-API-KEY-HERE",
    },
  },
};
