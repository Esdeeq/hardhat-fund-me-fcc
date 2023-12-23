const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
describe("FundMe", async function () {
  let fundMe;
  let deployer;
  let mockV3Aggregator;
  const sendValue = ethers.utils.parseEther("1");
  beforeEach(async function () {
    // const accounts = await ethers.getSigner();
    // const accountZero = accounts[0];
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContractFactory("FundMe", deployer);
    mockV3Aggregator = await ethers.getContractFactory(
      "MockV3Aggregator",
      deployer
    );
  });

  describe("constructor", async function () {
    it("sets the aggregator address correctly", async function () {
      const response = await fundMe.priceFeed;
      assert.equal(response, mockV3Aggregator.address);
    });
  });
  describe("constructor", async function () {
    it("Fails if you don't send enough eth", async function () {
      await expect(fundMe.fund, "You need to spend more gas");
    });
  });
});
