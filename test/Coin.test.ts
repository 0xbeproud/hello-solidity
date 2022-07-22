import {expect} from 'chai';
import {Contract, utils} from 'ethers';
import {ethers} from 'hardhat';

describe('Coin', () => {

    let coin: Contract;
    let owner: any, sender: any, receiver: any;
    beforeEach(async ()=>{
        [owner, sender, receiver] = await ethers.getSigners();

        const CoinFactory = await ethers.getContractFactory('Coin');
        coin = await CoinFactory.deploy();
        await coin.deployed();
    })

    describe('send', () => {
        it('revertedWithCustomError', async () =>{
            await expect(coin.send(receiver.address, 1000)).to.be.revertedWithCustomError(coin, 'InsufficientBalance')
        })
    })
})