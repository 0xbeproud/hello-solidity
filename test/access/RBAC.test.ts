import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ethers} from 'hardhat';
import {expect} from 'chai';
import {RBAC} from '../../typechain-types/contracts/access/RBAC';
import {RBAC__factory} from '../../typechain-types/factories/contracts/access/RBAC__factory';

describe('RBAC', () => {
    let owner: SignerWithAddress, admin: SignerWithAddress, moderator: SignerWithAddress;
    let notAdmin: SignerWithAddress, notModerator: SignerWithAddress;
    let user: SignerWithAddress;

    let sut: RBAC;
    beforeEach(async () => {
        [owner, admin, moderator, notAdmin, notModerator, user] = await ethers.getSigners();

        const RBACContractFactory: RBAC__factory = await ethers.getContractFactory('RBAC');
        sut = (await RBACContractFactory.deploy()) as RBAC;
        await sut.deployed();

        // admin 추가
        let tx = await sut.addAdmin(admin.address);
        await tx.wait();
        tx = await sut.addModerator(moderator.address);
        await tx.wait();
    });

    describe('construct', () => {
        it('ok', async () => {
            await expect(await sut.hasRole(sut.ROLE_ADMIN(), owner.address)).to.true;
            await expect(await sut.hasRole(sut.ROLE_MODERATOR(), owner.address)).to.true;
        });
    });

    describe('addAdmin', () => {
        it('ok', async () => {
            // given, when, then
            await expect(await sut.hasRole(sut.ROLE_ADMIN(), admin.address)).to.true;
            await expect(await sut.hasRole(sut.ROLE_MODERATOR(), admin.address)).to.true;
        });

        it('onlyAdmin', async () => {
            // given, when, then
            await expect(sut.connect(notAdmin).addAdmin(user.address)).to.be.reverted;
        });
    });

    describe('isAdmin', () => {
        it('ok', async () => {
            // given, when, then
            await expect(await sut.isAdmin(admin.address)).to.be.true;
            await expect(await sut.isAdmin(moderator.address)).to.be.false;
        });
    });

    describe('addModerator', () => {
        it('ok', async () => {
            // given, when, then
            await expect(await sut.hasRole(sut.ROLE_MODERATOR(), moderator.address)).to.true;
        });

        it('onlyModerator', async () => {
            // given, when, then
            await expect(sut.connect(notModerator).addModerator(user.address)).to.be.reverted;
        });
    });

    describe('isModerator', () => {
        it('ok', async () => {
            // given, when, then
            await expect(await sut.isModerator(admin.address)).to.be.true;
            await expect(await sut.isModerator(moderator.address)).to.be.true;
            await expect(await sut.isModerator(user.address)).to.be.false;
        });
    });

});
