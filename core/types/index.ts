export enum BLEND_MODE {
  sourceOver = 'source-over',
  sourceIn = 'source-in',
  sourceOut = 'source-out',
  sourceAtop = 'source-out',
  destinationOver = 'destination-over',
  destinationIn = 'destination-in',
  destinationOut = 'destination-out',
  destinationAtop = 'destination-atop',
  lighter = 'lighter',
  copy = 'copy',
  xor = 'xor',
  multiply = 'multiply',
  screen = 'screen',
  overlay = 'overlay',
  darken = 'darken',
  lighten = 'lighten',
  colorDodge = 'color-dodge',
  colorBurn = 'color-burn',
  hardLight = 'hard-light',
  softLight = 'soft-light',
  difference = 'difference',
  exclusion = 'exclusion',
  hue = 'hue',
  saturation = 'saturation',
  color = 'color',
  luminosity = 'luminosity',
}

export interface Layer {
  name: string
  options: {
    blend?: string
    opacity: number
  }
}

export interface LayerConfig {
  gif: boolean
  growEditionSizeTo: number
  archivedLayers: Layer[]
  layersOrder: Layer[]
}
