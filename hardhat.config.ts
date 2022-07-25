import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-waffle';
import '@openzeppelin/hardhat-upgrades';

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.9',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        localhost: {
            url: 'http://127.0.0.1:8545',
            loggingEnabled: true,
        },
        // baobab: {
        //   chainId: 1001,
        //   url: 'https://kaikas.baobab.klaytn.net:8651/',
        //   // url: "https://public-en.fanto.io/v1/baobab",
        //   accounts: [PRIVATE_KEY],
        //   gas: 6000000,
        //   gasPrice: 0x3a35294400,
        //   loggingEnabled: true,
        // },
    },
    paths: {
        sources: './contracts',
        tests: './test',
        cache: './cache',
        artifacts: './artifacts',
    },
    mocha: {
        timeout: 40000,
    },
};

export default config;
