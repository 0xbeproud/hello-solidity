import {ethers, upgrades} from 'hardhat';
import {Contract} from 'ethers';
import {expect} from 'chai';
import {
    Greeting,
    Greeting__factory,
    GreetingV2,
    GreetingV2__factory,
    GreetingV3,
    GreetingV3__factory,
    GreetingV4,
    GreetingV4__factory,
    GreetingV5__factory,
    GreetingV6__factory,
} from '../../typechain-types';

describe('Upgradable', () => {
    let greeting: Contract;

    beforeEach(async () => {
        const GreetingFactory = (await ethers.getContractFactory('Greeting')) as Greeting__factory;
        greeting = (await upgrades.deployProxy(GreetingFactory, ['hello'], {
            initializer: 'initialize',
        })) as Greeting;
        await greeting.deployed();

        await greeting.increment(1);
    });

    it('GreetingV2 - 변수, 메소드 추가', async () => {
        const ContractFactory = (await ethers.getContractFactory('GreetingV2')) as GreetingV2__factory;
        const contract = (await upgrades.upgradeProxy(greeting.address, ContractFactory)) as GreetingV2;
        await contract.deployed();

        await expect(await greeting.greet()).to.be.equal('hello');
        await expect(await contract.greet()).to.be.equal('hello');
    });

    it('GreetingV2 - proxy를 통해서 생성된 contract는 storage를 공유한다', async () => {
        const ContractFactory = (await ethers.getContractFactory('GreetingV2')) as GreetingV2__factory;
        const contract = (await upgrades.upgradeProxy(greeting.address, ContractFactory)) as GreetingV2;
        await contract.deployed();

        await expect(await contract.greet()).to.be.equal('hello');

        const tx = await contract.setGreeting('hello again');
        await tx.wait();

        // storage를 공유함.
        await expect(await greeting.greet()).to.be.equal('hello again');
        await expect(await contract.greet()).to.be.equal('hello again');
    });

    it('GreetingV3 - 메소드 삭제한 경우', async () => {
        const ContractFactory = (await ethers.getContractFactory('GreetingV3')) as GreetingV3__factory;
        const contract = (await upgrades.upgradeProxy(greeting.address, ContractFactory)) as GreetingV3;
        await contract.deployed();

        await expect(await contract.greet()).to.be.equal('hello');
    });

    it('GreetingV4 - struct의 변수 삭제 한 경우', async () => {
        const ContractFactory = (await ethers.getContractFactory('GreetingV4')) as GreetingV4__factory;
        try {
            await upgrades.upgradeProxy(greeting.address, ContractFactory);
        } catch (e) {
            expect(e, 'New storage layout is incompatible');
        }
    });

    it('GreetingV5 - 사용하고 있는 struct에 변수 추가 하면 안됨', async () => {
        const ContractFactory = (await ethers.getContractFactory('GreetingV5')) as GreetingV5__factory;
        try {
            await upgrades.upgradeProxy(greeting.address, ContractFactory);
        } catch (e) {
            expect(e, 'New storage layout is incompatible');
        }
    });

    it('GreetingV6 - 사용하지 않는 struct에 변수 추가 가능', async () => {
        const ContractFactory = (await ethers.getContractFactory('GreetingV6')) as GreetingV6__factory;
        expect(await upgrades.upgradeProxy(greeting.address, ContractFactory)).to.be.ok;
    });
});
