import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000000,
      },
    },
  },
  networks: {
    goerli: {
      url: 'https://goerli.infura.io/v3/cd82571d19ab490e828dd0f86ec3cbf0',
      accounts: ['adb36d4fc3a403f03382cb43794abd1fb93cfbeab620ffacdc3870b6da84bae0']
    }
  }
};

export default config;
