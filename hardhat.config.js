require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
//require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const CMC_KEY = process.env.CMC_KEY;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
    // goerli: {
    //   url :
    //   chainId: 5,
    //   blockConfirmations : 5,
    //   accounts:
    // }
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  },

  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: CMC_KEY,
    // token: Matic,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 500000,
  },
};
