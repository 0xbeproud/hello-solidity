import {ethers, upgrades} from 'hardhat';

async function main() {
  const UpgradeFactory = await ethers.getContractFactory('Upgrade');
  const Upgrade = await upgrades.deployProxy(UpgradeFactory, [], {
    initializer: 'initialize',
  });

  console.log(`Upgrade deployed: ${Upgrade.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
