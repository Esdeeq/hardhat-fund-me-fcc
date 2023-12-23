const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let ethPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethAggregator = await deployments.get("MockV3Aggregator.sol");
    ethPriceFeedAddress = ethAggregator.address;
  } else {
    ethPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  const args = [ethPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations,
  });
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
  }
};
