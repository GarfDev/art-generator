export interface Layer {
  name: string
  active: boolean
}

export interface LayerConfig {
  growEditionSizeTo: number
  layersOrder: Layer[]
}

export interface LayerPayload {
  name: string
}

export interface LayerConfigPayload {
  growEditionSizeTo: number
  layersOrder: LayerPayload[]
}
