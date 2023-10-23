const hre = require("hardhat");



async function main() {
  const message = await hre.ethers.deployContract("Message")
  await message.waitForDeployment()


  console.log(
    `message deployed to: ${message.target}`
  );

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
