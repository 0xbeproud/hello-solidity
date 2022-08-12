import {ethers} from 'hardhat';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {Collectible, Collectible__factory} from '../../typechain-types';
import {expect} from 'chai';

describe('Collectible', () => {
    const name: string = 'hello contract';
    const symbol: string = 'COLECTIBLE';

    let sut: Collectible;
    let owner: SignerWithAddress, user: SignerWithAddress;

    beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        const CollectibleContractFactory: Collectible__factory = await ethers.getContractFactory('Collectible');
        sut = (await CollectibleContractFactory.deploy(name, symbol)) as Collectible;
        await sut.deployed();
    });

    describe('mint', () => {
        it('ok', async () => {
            let tx = await sut.safeMint(user.address, 'hello');
            await tx.wait();
            await expect(await sut.balanceOf(user.address)).to.equals(1);
        });
    });
});
