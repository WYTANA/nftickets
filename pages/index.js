import { ethers } from "ethers"
import { useEffect, useState } from "react"
import web3 from "web3"
import axios from "axios"
import Web3Modal from "web3modal"
// import Image from "next/image"

import { nftaddress, nftmarketaddress } from "../config"

import NFT from "../artifacts/contracts/NFT.sol/NFT.json"
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json"

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loaded, setLoaded] = useState("not-loaded")

  useEffect(() => {
    loadNFTs()
  }, [])

  // Fetch unsold NFTs from the Marketplace
  async function loadNFTs() {
    // "https://rpc-mumbai.maticvigil.com/"
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com/"
    )
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    )
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        let price = web3.utils.fromWei(i.price.toString(), "ether")
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
        }
        return item
      })
    )
    // Update state
    console.log(1, "items: ", items)
    setNfts(items)
    setLoaded("loaded")
  }

  // Function that allows the user to buy an NFT
  async function buyNft(nft) {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = web3.utils.toWei(nft.price.toString(), "ether")

    console.log("price: ", price)

    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    )
    await transaction.wait()
    loadNFTs()
  }

  if (loaded === "loaded" && !nfts.length)
    return <h1 className="p-20 text-4xl text-text-1">Sold Out of NFTickets!</h1>

  return (
    <div className="flex justify-center w-screen h-full bg-charcoal-gray">
      <div style={{ width: 800, height: 950 }}>
        <div className="grid grid-cols-3 gap-4 pt-8">
          {nfts.map((nft, i) => (
            <div key={i} className="border p-4 shadow rounded bg-black-russian">
              <img src={nft.image} className="rounded h-30 w-64 " alt="image" />
              <p className="text-2xl my-4 font-bold text-text-1">
                Price: {nft.price} ETH
              </p>
              <p className="text-2xl my-4 font-bold text-text-1">
                Event: Music
              </p>
              <button
                className="bg-green-600 text-text-1 py-2 px-12 rounded"
                onClick={() => buyNft(nft)}
              >
                Buy NFT
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
