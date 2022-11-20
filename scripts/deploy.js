const hre = require("hardhat");

async function main() {
  const BezikNFT = await hre.ethers.getContractFactory("BezikNFT");
  const bezikNFT = await BezikNFT.deploy();

  await bezikNFT.deployed();

  console.log(`BezikNFT deployed to: ${bezikNFT.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
