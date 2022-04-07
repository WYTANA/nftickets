import "../styles/globals.css"
import Link from "next/link"

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-charcoal-gray h-screen w-screen">
      <nav className="border-b px-12 py-6 bg-black-russian sticky w-screen top-0">
        <p className="text-xl text-text-1">NFTickets Marketplace</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-text-1">Home</a>
          </Link>
          {/* <Link href="/create-item">
            <a className="mr-4 text-text-1">Create NFT</a>
          </Link> */}
          <Link href="/admin-login">
            <a className="mr-4 text-text-1">Admin Portal</a>
          </Link>
          <Link href="/admin-signup">
            <a className="mr-4 text-text-1">Admin Sign Up</a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-4 text-text-1">My NFTickets!</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
