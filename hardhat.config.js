require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const REPORT_GAS = process.env.REPORT_GAS || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        compilers: [{ version: "0.6.6" }, { version: "0.8.8" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL || "",
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            chainId: 4,
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        enabled: REPORT_GAS !== undefined,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        outputFile: "gas-report.txt",
        noColors: true,
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}
