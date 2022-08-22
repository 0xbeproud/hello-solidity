import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ethers} from 'hardhat';
import {CollectibleGenerator, CollectibleGenerator__factory, RBAC, RBAC__factory} from '../../typechain-types';

describe('CollectibleGenerator', () => {
    const name: string = 'be:theprooud';
    const symbol: string = 'BEPROUD';

    let owner: SignerWithAddress, admin: SignerWithAddress, moderator: SignerWithAddress, user: SignerWithAddress;
    let sut: CollectibleGenerator;

    beforeEach(async () => {
        [owner, admin, moderator, user] = await ethers.getSigners();

        const RBACContractFactory: RBAC__factory = await ethers.getContractFactory('RBAC');
        const RBACContract: RBAC = await RBACContractFactory.deploy();
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
            await sut.connect(admin).generate(name, symbol);
        });

        it('ok', async () => {
            await sut.connect(admin).generate(name, symbol);
        });
    });
});
