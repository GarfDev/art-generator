import { startCreating } from '../../core/hashlips/src/main'

export default async function handler(req, res) {
  try {
    const body = JSON.parse(req.body)
    // buildSetup()

    const result = await startCreating(body.layerConfigs)
    res.status(200).json({ result })
  } catch {
    res.status(500).send()
  }
}
