const hre = require("hardhat")
const fs = require("fs")

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deployer: ", deployer.address)

  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket")
  const nftMarket = await NFTMarket.deploy()
  await nftMarket.deployed()
  console.log("nftMarket deployed to:", nftMarket.address)

  const NFT = await hre.ethers.getContractFactory("NFT")
  const nft = await NFT.deploy(nftMarket.address)
  await nft.deployed()
  console.log("nft deployed to:", nft.address)

  fs.writeFileSync(
    "./config.js",
    `
      export const nftaddress = "${nft.address}"
      export const nftmarketaddress = "${nftMarket.address}"
    `
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
