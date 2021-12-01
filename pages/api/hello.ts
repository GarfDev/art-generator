import { startCreating, buildSetup } from '../../core/hashlips/src/main'

export default async function handler(req, res) {
  try {
    buildSetup()
    const result = await startCreating()
    res.status(200).json({ result })
  } catch {
    res.status(500).send()
  }
}
