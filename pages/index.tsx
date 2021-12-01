import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const [NFT, setNFT] = useState([])

  const onGenerate = async () => {
    const result = await fetch('/api/hello')
    const data = await result.json()
    setNFT(data.result)
  }

  return (
    <div>
      <Head>
        <title>Art Generator</title>
        <meta name="description" content="Generate NFT by NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button onClick={onGenerate}>Generate art</button>

        {NFT.map((item, index) => (
          <Image
            key={index}
            src={item.image}
            alt="Test"
            width="500px"
            height="500px"
          />
        ))}
      </main>
    </div>
  )
}
