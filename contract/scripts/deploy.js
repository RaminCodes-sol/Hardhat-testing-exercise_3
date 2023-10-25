const hre = require("hardhat");



async function main() {
  const message = await hre.ethers.deployContract("Message", ["Hello NewYork"])
  await message.waitForDeployment()

  console.log(`message deployed to: ${message.target}`)

  console.log(`Message: ${await message.getMessage()}`)

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
