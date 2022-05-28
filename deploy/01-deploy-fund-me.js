const { networkConfig, developmentChain } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")
// main function
// calling of main function

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (developmentChain.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // mock for local
    log("Deploying FundMe and waiting for confirmations...")

    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log(`FundMe deployed at ${fundMe.address}`)
    log("--------------------------")

    if (!developmentChain.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(fundMe.address, args)
    }
}

module.exports.tags = ["all", "fundme"]
