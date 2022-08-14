import {CollectibleGenerator, CollectibleGenerator__factory} from "../../typechain-types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {ethers} from "hardhat";
import {expect} from "chai";

describe('CollectibleGenerator', () => {
    const name: string = 'hello contract';
    const symbol: string = 'COLECTIBLE';

    let owner: SignerWithAddress, user: SignerWithAddress;
    let sut: CollectibleGenerator;

    beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        const CollectibleGeneratorContractFactory: CollectibleGenerator__factory = await ethers.getContractFactory('CollectibleGenerator');
        sut = (await CollectibleGeneratorContractFactory.deploy()) as CollectibleGenerator;
        await sut.deployed()
    })

    describe('generate', () => {
        it('ok', async () => {
            let tx = await sut.generate(name, symbol);
            await tx.wait();
            tx = await sut.generate(name, symbol);
            await tx.wait();
            expect(await sut.generated(0)).not.to.empty
            expect(await sut.generated(1)).not.to.empty
        })
    })
})