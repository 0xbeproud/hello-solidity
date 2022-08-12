import {ethers} from 'hardhat';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {Collectible, Collectible__factory} from '../../typechain-types';
import {expect} from 'chai';

describe('Collectible', () => {
    const name: string = 'hello contract';
    const symbol: string = 'COLECTIBLE';
    const tokenURI: string = 'tokenURL';

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
            let tx = await sut.safeMint(user.address, tokenURI);
            await tx.wait();
            await expect(await sut.balanceOf(user.address)).to.equals(1);
        });
    });

    describe('name', () => {
        it('ok', async () => {
            await expect(await sut.name()).to.equals(name);
        });
    });

    describe('symbol', () => {
        it('ok', async () => {
            await expect(await sut.symbol()).to.equals(symbol);
        });
    });

    describe('ownerOf', () => {
        it('ok', async () => {
            let tx = await sut.safeMint(user.address, tokenURI);
            await tx.wait();
            await expect(await sut.ownerOf(0)).to.equals(user.address);
        });
    });

    describe('balanceOf', () => {
        it('ok', async () => {
            await expect(await sut.balanceOf(user.address)).to.equals(0);
            let tx = await sut.safeMint(user.address, tokenURI);
            await tx.wait();
            tx = await sut.safeMint(user.address, tokenURI);
            await tx.wait();
            await expect(await sut.balanceOf(user.address)).to.equals(2);
        });
    });

    describe('tokenURI', () => {
        it('ok', async () => {
            let tx = await sut.safeMint(user.address, tokenURI);
            await tx.wait();
            await expect(await sut.tokenURI(0)).to.equals('https://example.com/nft/tokenURL');
        });
    });
});
