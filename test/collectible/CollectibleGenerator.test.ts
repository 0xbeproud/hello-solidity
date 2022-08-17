import {CollectibleGenerator, CollectibleGenerator__factory} from '../../typechain-types';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ethers} from 'hardhat';

describe('CollectibleGenerator', () => {
    const name: string = 'be:theprooud';
    const symbol: string = 'BEPROUD';

    let owner: SignerWithAddress, user: SignerWithAddress;
    let sut: CollectibleGenerator;

    beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        const CollectibleGeneratorContractFactory: CollectibleGenerator__factory = await ethers.getContractFactory(
            'CollectibleGenerator',
        );
        sut = (await CollectibleGeneratorContractFactory.deploy()) as CollectibleGenerator;
        await sut.deployed();
    });

    describe('generate', () => {
        it('ok', async () => {});
    });
});
