const main = async () => {
  const DestinationSwapper = await hre.ethers.getContractFactory(
    "DestinationSwapper"
  );
  const destinationSwapperContract = await DestinationSwapper.deploy(
    "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF" // TEST on Optimism-Goerli
  );
  await destinationSwapperContract.deployed();
  console.log("Contract deployed to:", destinationSwapperContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain().then();
