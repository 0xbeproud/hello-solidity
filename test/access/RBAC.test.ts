import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ethers} from 'hardhat';
import {expect} from 'chai';
import {RBAC} from '../../typechain-types/contracts/access/RBAC';
import {RBAC__factory} from '../../typechain-types/factories/contracts/access/RBAC__factory';

describe('RBAC', () => {
    let owner: SignerWithAddress, admin: SignerWithAddress, moderator: SignerWithAddress, minter: SignerWithAddress;
    let notAdmin: SignerWithAddress, notModerator: SignerWithAddress, notMinter: SignerWithAddress;
    let user: SignerWithAddress;

    let sut: RBAC;

    beforeEach(async () => {
        [owner, admin, moderator, minter, notAdmin, notModerator, notMinter, user] = await ethers.getSigners();

        const RBACContractFactory: RBAC__factory = await ethers.getContractFactory('RBAC');
        sut = (await RBACContractFactory.deploy()) as RBAC;
        await sut.deployed();
    });

    describe('construct', () => {
        it('ok', async () => {
            await expect(await sut.hasRole(sut.ROLE_ADMIN(), owner.address)).to.true;
            await expect(await sut.hasRole(sut.ROLE_MODERATOR(), owner.address)).to.true;
            // await expect(await sut.hasRole(sut.ROLE_MINTER(), owner.address)).to.true;
        });
    });

    describe('addAdmin', () => {
        it('ok', async () => {
            // given, when, then
            let tx = await sut.addAdmin(admin.address);
            await tx.wait();

            await expect(await sut.hasRole(sut.ROLE_ADMIN(), admin.address)).to.true;
            await expect(await sut.hasRole(sut.ROLE_MODERATOR(), admin.address)).to.true;
            // await expect(await sut.hasRole(sut.ROLE_MODERATOR(), admin.address)).to.true;
            // await expect(sut.connect(notAdmin).addAdmin(user.address)).to.be.reverted;
        });
    });

    describe('isAdmin', () => {
        beforeEach(async () => {
            let tx = await sut.addAdmin(admin.address);
            await tx.wait();
        });

        it('ok', async () => {
            // given, when, then
            await expect(await sut.isAdmin(admin.address)).to.be.true;
            await expect(await sut.isAdmin(moderator.address)).to.be.false;
        });
    });

    describe('addModerator', () => {
        it('ok', async () => {
            // given, when, then
            let tx = await sut.addModerator(moderator.address);
            await tx.wait();
            await expect(await sut.hasRole(sut.ROLE_MODERATOR(), moderator.address)).to.true;
        });

        it('onlyModerator', async () => {
            // given, when, then
            await expect(sut.connect(notModerator).addModerator(user.address)).to.be.reverted;
        });
    });

    describe('isModerator', () => {
        beforeEach(async () => {
            let tx = await sut.addModerator(moderator.address);
            await tx.wait();
        });

        it('ok', async () => {
            // given, when, then
            await expect(await sut.isModerator(moderator.address)).to.be.true;
            // await expect(await sut.isModerator(user.address)).to.be.false;
        });
    });

    describe('addMinter', () => {
        beforeEach(async () => {
            let tx = await sut.addMinter(minter.address);
            await tx.wait();
        });

        it('ok', async () => {
            // given, when, then
            await expect(await sut.hasRole(sut.ROLE_MINTER(), minter.address)).to.be.true;
        });

        it('onlyMinter', async () => {
            // given, when, then
            await expect(sut.connect(notMinter).addMinter(user.address)).to.be.reverted;
        });
    });

    describe('isMinter', () => {
        beforeEach(async () => {
            let tx = await sut.addMinter(minter.address);
            await tx.wait();
        });

        it('ok', async () => {
            // given, when, then
            await expect(await sut.isMinter(minter.address)).to.be.true;
            // await expect(await sut.isModerator(user.address)).to.be.false;
        });
    });
});
