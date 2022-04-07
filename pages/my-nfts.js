import { ethers } from "ethers"
import { useEffect, useState } from "react"
import web3 from "web3"
import axios from "axios"
import Web3Modal from "web3modal"
import Link from "next/link"
import Image from "next/image"

import { nftmarketaddress, nftaddress } from "../config"

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json"
import NFT from "../artifacts/contracts/NFT.sol/NFT.json"

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loaded, setLoaded] = useState("not-loaded")
  // ******************

  // Allow user to fetch purchased NFTs
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    )
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchMyNFTs()

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
    console.log(2, "items: ", items)
    setNfts(items)
    setLoaded("loaded")
  }

  if (loaded === "loaded" && !nfts.length)
    return (
      <h1 className="p-20 text-4xl text-text-1">
        You have no NFTickets! Purchase them{" "}
        <Link href="/">
          <a className="underline text-blue-400 hover:text-blue-600">here</a>
        </Link>
        !
      </h1>
    )

  if (loaded === "not-loaded" && !nfts.length)
    return (
      <button
        onClick={loadNFTs}
        className="rounded bg-black-russian py-2 px-12 text-text-1 m-16 border-none"
      >
        Fetch NFTs
      </button>
    )

  return (
    <div className="flex justify-center bg-charcoal-gray w-screen h-full">
      <div style={{ width: 800, height: 950 }}>
        <div className="grid grid-cols-3 gap-4 pt-8">
          {nfts.map((nft, i) => (
            <div key={i} className="border p-4 shadow rounded bg-black-russian">
              <Image
                src={nft.image}
                className="rounded h-30 w-64"
                width={350}
                height={350}
                alt="image"
              />
              <p className="text-2xl my-4 font-bold text-text-1">
                Price paid: {nft.price}
              </p>
              <p className="text-2xl my-4 font-bold text-text-1">
                Event: Music
              </p>
              <p className="text-2xl my-4 font-bold text-text-1">Owner:</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
