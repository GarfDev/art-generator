import { useState } from 'react'
import styled from 'styled-components'
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

      <Main>
        <Button onClick={onGenerate}>Generate art</Button>

        <PreviewWrapper>
          {NFT.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              alt="Test"
              width="450px"
              height="450px"
            />
          ))}
        </PreviewWrapper>
      </Main>
    </div>
  )
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  margin: 5px;
  background: none;
  cursor: pointer;
  border: 1px solid black;
  font-weight: 500;
  border-radius: 5px;
`

const PreviewWrapper = styled.div`
  display: grid;
  padding: 30px;
  grid-template-columns: repeat(4, minmax(300px, 450px));
  grid-gap: 12px;
`
