import {ethers, upgrades} from 'hardhat';

async function main() {
    const GreetingFactory = await ethers.getContractFactory('Greeting');
    const greeting = await upgrades.deployProxy(GreetingFactory, ['hello'], {
        initializer: 'initialize',
    });
    console.log(`Upgrade deployed: ${greeting.address}`);

    const GreetingV2Factory = await ethers.getContractFactory('GreetingV2');
    const greetingV2 = await upgrades.upgradeProxy(greeting.address, GreetingV2Factory);
    console.log(`UpgradeV2 deployed: ${greetingV2.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
