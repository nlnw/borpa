const main = async () => {
  const borpaSwapper = await hre.ethers.getContractFactory("BorpaSwapper");
  const borpaSwapperContract = await borpaSwapper.deploy(
    "0xFCa08024A6D4bCc87275b1E4A1E22B71fAD7f649", // Connext on Goerli
    "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1", // TEST on Goerli // TODO: Replace with ARB
    "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1" // TEST on Goerli // TODO: Replace with OP
  );
  await borpaSwapperContract.deployed();
  console.log("Contract deployed to:", borpaSwapperContract.address);
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
