/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import styled from 'styled-components'

import Head from 'next/head'
import Image from 'next/image'

import { BLEND_MODE, Layer, LayerConfig } from '../core/types'

import { ListItem } from '../core/components/ListItem'

const initialLayerConfig: LayerConfig = {
  gif: false,
  growEditionSizeTo: 5,
  archivedLayers: [],
  layersOrder: [
    {
      name: 'Background',
      options: { blend: BLEND_MODE.sourceOver, opacity: 1 },
    },
    { name: 'Eyeball', options: { blend: BLEND_MODE.sourceOver, opacity: 1 } },
    {
      name: 'Eye color',
      options: { blend: BLEND_MODE.sourceOver, opacity: 1 },
    },
    { name: 'Iris', options: { blend: BLEND_MODE.sourceOver, opacity: 1 } },
    { name: 'Shine', options: { blend: BLEND_MODE.sourceOver, opacity: 1 } },
    {
      name: 'Bottom lid',
      options: { blend: BLEND_MODE.sourceOver, opacity: 1 },
    },
    { name: 'Top lid', options: { blend: BLEND_MODE.sourceOver, opacity: 1 } },
  ],
}

export default function Home() {
  // states
  const [NFT, setNFT] = useState([])
  const [layerConfigs, setLayerConfigs] = useState<LayerConfig[]>([
    initialLayerConfig,
  ])

  // mapped values
  const totalEditionSize = layerConfigs.reduce(
    (pre, cur) => pre + cur.growEditionSizeTo,
    0
  )

  // event handlers
  const onGenerate = async () => {
    const result = await fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify({
        layerConfigs,
      }),
    })
    const data = await result.json()
    setNFT(data.result)
  }

  const onAddNewLayerConfig = () => {
    setLayerConfigs((configs) => [
      ...configs,
      { ...initialLayerConfig, growEditionSizeTo: totalEditionSize + 5 },
    ])
  }

  // main return
  return (
    <div>
      <Head>
        <title>Art Generator</title>
        <meta name="description" content="Generate NFT by NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Container>
          <Section>
            <h1>Art Generator</h1>
          </Section>

          <Section>
            <CreateButton onClick={onAddNewLayerConfig}>+</CreateButton>
          </Section>

          <Section>
            <ConfigGrid>
              {layerConfigs.map((config, index) => {
                const onGrowSizeChange = (
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const updatedLayer: LayerConfig = {
                    ...layerConfigs[index],
                    growEditionSizeTo: parseInt(event.target.value),
                  }
                  setLayerConfigs(
                    layerConfigs.map((config, innerIndex) =>
                      innerIndex === index ? updatedLayer : config
                    )
                  )
                }

                const onChangeUpdate = () => {
                  const updatedLayer: LayerConfig = {
                    ...layerConfigs[index],
                    gif: !layerConfigs[index].gif,
                  }
                  setLayerConfigs(
                    layerConfigs.map((config, innerIndex) =>
                      innerIndex === index ? updatedLayer : config
                    )
                  )
                }

                const movePetListItem = (
                  dragIndex: number,
                  hoverIndex: number
                ) => {
                  const dragItem = config.layersOrder[dragIndex]
                  const hoverItem = config.layersOrder[hoverIndex]
                  // Swap places of dragItem and hoverItem in the pets array
                  const updatedConfig = { ...config }
                  const updatedLayers = [...config.layersOrder]

                  updatedLayers[dragIndex] = hoverItem
                  updatedLayers[hoverIndex] = dragItem
                  updatedConfig.layersOrder = updatedLayers

                  setLayerConfigs(
                    layerConfigs.map((config, innerIndex) =>
                      innerIndex === index ? updatedConfig : config
                    )
                  )
                }

                const onLayerChange = (updatedLayer: Layer) => {
                  const nextConfig = { ...config }

                  nextConfig.layersOrder = nextConfig.layersOrder.map((layer) =>
                    layer.name === updatedLayer.name ? updatedLayer : layer
                  )
                  setLayerConfigs(
                    layerConfigs.map((config, innerIndex) =>
                      innerIndex === index ? nextConfig : config
                    )
                  )
                }

                return (
                  <ConfigContainer key={`main-config-layer-${index}`}>
                    <div>
                      Currently generate up to{' '}
                      <GrowSizeInput
                        value={config.growEditionSizeTo}
                        onChange={onGrowSizeChange}
                      />
                      <input
                        type="checkbox"
                        onChange={onChangeUpdate}
                        value={config.gif as any}
                      />
                      <label>GIF</label>
                    </div>
                    <h3>Active Layers</h3>
                    <div>
                      {config.layersOrder.map((layer, index) => (
                        <ListItem
                          layer={layer}
                          key={index + layer.name}
                          index={index}
                          moveListItem={movePetListItem}
                          onLayerChange={onLayerChange}
                        />
                      ))}
                    </div>
                  </ConfigContainer>
                )
              })}
            </ConfigGrid>
          </Section>

          <Button onClick={onGenerate}>Generate art</Button>

          <PreviewGrid>
            {NFT.map((item, index) => (
              <Image
                key={index}
                src={item.image}
                alt="Test"
                width="450px"
                height="450px"
              />
            ))}
          </PreviewGrid>
        </Container>
      </Main>
    </div>
  )
}

const Main = styled.main`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  max-width: 1200px;
  min-height: 100vh;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Button = styled.button`
  margin: 5px;
  background: none;
  cursor: pointer;
  border: 1px solid black;
  font-weight: 500;
  border-radius: 5px;
`

const CreateButton = styled(Button)`
  width: 32px;
`

const PreviewGrid = styled.div`
  display: grid;
  padding: 30px 0px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
`

const ConfigGrid = styled.div`
  display: grid;
  padding: 30px 0px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
`

const ConfigContainer = styled.div`
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
`

const GrowSizeInput = styled.input`
  margin: 5px;
  background: none;
  cursor: pointer;
  text-align: center;
  border: 1px solid black;
  font-weight: 500;
  border-radius: 5px;
  display: inline;
  width: 48px;
`
