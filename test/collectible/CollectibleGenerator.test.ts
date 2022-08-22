import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ethers} from 'hardhat';
import {CollectibleGenerator, CollectibleGenerator__factory, RBAC, RBAC__factory} from '../../typechain-types';
import {expect} from "chai";

describe('CollectibleGenerator', () => {
    const name: string = 'be:theprooud';
    const symbol: string = 'BEPROUD';

    let owner: SignerWithAddress, admin: SignerWithAddress, moderator: SignerWithAddress, user: SignerWithAddress;
    let sut: CollectibleGenerator;
    let RBACContract: RBAC

    beforeEach(async () => {
        [owner, admin, moderator, user] = await ethers.getSigners();

        const RBACContractFactory: RBAC__factory = await ethers.getContractFactory('RBAC');
        RBACContract = await RBACContractFactory.deploy();
        await RBACContract.deployed();


        const tx = await RBACContract.addAdmin(admin.address);
        await tx.wait();

        const CollectibleGeneratorContractFactory: CollectibleGenerator__factory = await ethers.getContractFactory(
            'CollectibleGenerator',
        );
        sut = (await CollectibleGeneratorContractFactory.deploy(RBACContract.address)) as CollectibleGenerator;
        await sut.deployed();
    });

    describe('generate', () => {
        it('ok', async () => {
            // given, when, then
            await sut.connect(admin).generate(name, symbol);
        });

        it('adminOnly', async () => {
            // given, when, then
            await sut.connect(admin).generate(name, symbol);
            await expect(sut.connect(moderator).generate(name, symbol)).to.be.revertedWith('admin only allowed');
        });
    });

    describe('doModeratorOnly', () => {
        it('ok', async () => {
            // given, when, then
            await RBACContract.addModerator(moderator.address);
            await sut.connect(moderator).doModeratorOnly();
        });

        it('admin도 moderatoryOnly 실행 가능', async () => {
            // given, when, then
            await sut.connect(admin).doModeratorOnly();
        });
    });
});
