import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ethers} from 'hardhat';
import {expect} from 'chai';
import {RBAC, RBAC__factory} from '../../typechain-types';

describe('AccessController', () => {
    let owner: SignerWithAddress, user: SignerWithAddress;
    let sut: RBAC;
    beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        const factory: RBAC__factory = await ethers.getContractFactory('RBAC');
        sut = (await factory.deploy()) as RBAC;
        await sut.deployed();
    });

    describe('construct', () => {
        it('ok', async () => {
            await expect(await sut.hasRole(sut.ROLE_ADMIN(), owner.address)).to.true;
            await expect(await sut.hasRole(sut.ROLE_MODERATOR(), owner.address)).to.true;
        });
    });
});
